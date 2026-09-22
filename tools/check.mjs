// Comprobaciones de traducción y de integridad. Uso: `npm run check`
//
// 1. Claves i18n usadas en el código (module, templates, src/vue) que no existen en es.json/en.json.
// 2. Claves presentes en un idioma y ausentes en el otro.
// 3. Texto visible en inglés sin internacionalizar en plantillas y componentes Vue activos.
// 4. JSON de lang/ y src/packs/ válido; enlaces @UUID de los compendios que apuntan a documentos
//    inexistentes; restos probables de inglés en los textos de los compendios.
// Sale con código 1 si hay errores (1, 2 o JSON inválido). Lo demás son avisos para revisar.
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const rel = (p) => path.relative(root, p);
let errores = 0;
const error = (msg) => { errores++; console.log(`✘ ${msg}`); };
const aviso = (msg) => console.log(`· ${msg}`);

function archivos(dir, ext) {
	const out = [];
	for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
		const p = path.join(dir, e.name);
		if (e.isDirectory()) out.push(...archivos(p, ext));
		else if (ext.some((x) => e.name.endsWith(x))) out.push(p);
	}
	return out;
}

function aplanar(obj, prefijo = "", out = {}) {
	for (const [k, v] of Object.entries(obj)) {
		const clave = prefijo ? `${prefijo}.${k}` : k;
		if (v && typeof v === "object") aplanar(v, clave, out);
		else out[clave] = v;
	}
	return out;
}

// ── 1 y 2: claves ────────────────────────────────────────────────────────────────────────────
const idiomas = {};
for (const lang of ["es", "en"]) {
	try {
		idiomas[lang] = aplanar(JSON.parse(fs.readFileSync(path.join(root, "lang", `${lang}.json`), "utf8")));
	}
	catch (e) {
		error(`lang/${lang}.json no es JSON válido: ${e.message}`);
		idiomas[lang] = {};
	}
}

const fuentes = [
	...archivos(path.join(root, "module"), [".mjs", ".js"]),
	...archivos(path.join(root, "templates"), [".hbs"]),
	...archivos(path.join(root, "src/vue"), [".vue", ".mjs"])
];
const usadas = new Map();
const patronClave = /["'`](GRIMWILD\.[A-Za-z0-9_.]+[A-Za-z0-9_])["'`]/g;
for (const f of fuentes) {
	const texto = fs.readFileSync(f, "utf8");
	for (const [, clave] of texto.matchAll(patronClave)) {
		// Claves construidas dinámicamente («GRIMWILD.Stat.» + stat) terminan en punto: se ignoran.
		if (!usadas.has(clave)) usadas.set(clave, rel(f));
	}
}
// Claves dinámicas conocidas.
for (const s of ["bra", "agi", "wit", "pre"]) for (const k of ["long", "abbr"]) usadas.set(`GRIMWILD.Stat.${s}.${k}`, "dinámica");
for (const r of ["crit", "perfect", "messy", "grim", "disaster"]) usadas.set(`GRIMWILD.Dice.results.${r}`, "dinámica");
for (const t of ["minor", "major", "mythic"]) usadas.set(`GRIMWILD.UI.${t}Arcana`, "dinámica");

const esPrefijo = (clave, dic) => Object.keys(dic).some((k) => k.startsWith(`${clave}.`));
for (const [clave, donde] of usadas) {
	for (const lang of ["es", "en"]) {
		if (!(clave in idiomas[lang]) && !esPrefijo(clave, idiomas[lang])) error(`Falta ${clave} en ${lang}.json (usada en ${donde})`);
	}
}
for (const clave of Object.keys(idiomas.en)) if (!(clave in idiomas.es)) error(`${clave} está en en.json pero no en es.json`);
for (const clave of Object.keys(idiomas.es)) if (!(clave in idiomas.en)) aviso(`${clave} está en es.json pero no en en.json`);
for (const [clave, valor] of Object.entries(idiomas.es)) {
	if (valor === idiomas.en[clave] && /[a-z]{4,}/i.test(valor) && !/^(Grimwild|Suspense|Arcana|Berserker|Élite|d6|Total)$/.test(valor)) {
		aviso(`es.json: ${clave} = «${valor}» es idéntico al inglés`);
	}
}

// ── 3: texto visible sin internacionalizar ───────────────────────────────────────────────────
const palabrasIngles = /\b(Add|Delete|Remove|Create|Roll|Name|Label|Value|Type|Pool|Points|Table|Notes|Description|Traits|Moves|Challenge|Talent|Arcana Name|Compendium|Condition|Bond|Harm|Marks|Take|None|Toggle|Edit|Import|Crucible)\b/;
const plantillas = [
	...archivos(path.join(root, "templates"), [".hbs"]),
	...archivos(path.join(root, "src/vue"), [".vue"])
];
for (const f of plantillas) {
	let texto = fs.readFileSync(f, "utf8");
	texto = texto.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<!--[\s\S]*?-->/g, "").replace(/{{!--[\s\S]*?--}}/g, "");
	// Texto entre etiquetas y atributos visibles con literal.
	const visibles = [
		...[...texto.matchAll(/>([^<>{}]*[A-Za-z][^<>{}]*)</g)].map((m) => m[1].trim()),
		...[...texto.matchAll(/\s(?:title|placeholder|aria-label|data-tooltip)="([^"{}]*[A-Za-z][^"{}]*)"/g)].map((m) => m[1])
	];
	for (const v of visibles) {
		if (v && palabrasIngles.test(v) && !/^GRIMWILD\.|^[A-Z]+\.[A-Za-z]/.test(v)) aviso(`${rel(f)}: texto visible sin traducir «${v}»`);
	}
}

// ── 4: compendios ────────────────────────────────────────────────────────────────────────────
const packsDir = path.join(root, "src/packs");
const docs = new Map();
const ids = new Set();
for (const f of archivos(packsDir, [".json"])) {
	try {
		const d = JSON.parse(fs.readFileSync(f, "utf8"));
		docs.set(f, d);
		const recoger = (o) => {
			if (Array.isArray(o)) o.forEach(recoger);
			else if (o && typeof o === "object") {
				if (typeof o._id === "string") ids.add(o._id);
				Object.values(o).forEach(recoger);
			}
		};
		recoger(d);
	}
	catch (e) {
		error(`${rel(f)} no es JSON válido: ${e.message}`);
	}
}
const inglesSuelto = /\b(the|and|you|your|with|when|roll|take|mark|harm|spark|thorn|pool|of|to|on|if)\b/;
let restos = 0;
for (const [f, d] of docs) {
	const textos = [];
	const recoger = (o, clave) => {
		if (typeof o === "string") textos.push([clave, o]);
		else if (Array.isArray(o)) o.forEach((x) => recoger(x, clave));
		else if (o && typeof o === "object") for (const [k, v] of Object.entries(o)) if (!["_stats", "flags", "_key", "img", "src"].includes(k)) recoger(v, k);
	};
	recoger(d, "");
	for (const [clave, texto] of textos) {
		for (const [, uuid] of texto.matchAll(/@UUID\[([^\]]+)\]/g)) {
			const id = uuid.split(".").pop();
			if (uuid.startsWith("Compendium.grimwild.") && !ids.has(id)) error(`${rel(f)}: enlace roto ${uuid}`);
		}
		if (["name", "content", "description", "value", "label", "text", "biography", "notes", "sights", "sounds", "smells"].includes(clave)) {
			const limpio = texto.replace(/<[^>]+>/g, " ").replace(/@\w+\[[^\]]*\]/g, " ").replace(/\[\[[^\]]*\]\]/g, " ");
			if (inglesSuelto.test(limpio) && restos < 40) {
				restos++;
				aviso(`${rel(f)} (${clave}): posible inglés «${limpio.match(inglesSuelto)[0]}» en «${limpio.trim().slice(0, 70)}»`);
			}
		}
	}
}

console.log(errores ? `\n${errores} error(es).` : "\nSin errores.");
process.exit(errores ? 1 : 0);
