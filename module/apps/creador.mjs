/**
 * Creación de personajes: asistente guiado y personaje aleatorio.
 *
 * Sigue los pasos del reglamento (Grimwild, cap. 3 «Creación de personaje»): trasfondos, rasgos,
 * deseos, aspecto, camino, atributos, arcos y vínculos. Cada paso tiene un dado; «Todo al azar»
 * rellena el borrador completo y `GrimwildCreador.crearAleatorio()` crea un personaje sin abrir
 * el asistente. Los caminos y talentos salen del compendio de talentos por claves estables
 * (carpeta = camino, `system.core` = talento principal), no por nombres.
 */
import { ConMemoria } from "../ui/memoria.mjs";
import {
	ATRIBUTOS, listas, alAzar, variosAlAzar, ascendenciaAlAzar, trasfondoAlAzar, atributosAlAzar,
	estadoAtributos, nombreAlAzar, dosYUno, vinculoAlAzar
} from "../helpers/creacion.mjs";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;
const PACK = "grimwild.talents";

/** Caminos del compendio: {id, nombre, principal, talentos[]}. Se cachea por sesión. */
let caminosCache = null;
async function caminos() {
	if (caminosCache) return caminosCache;
	const pack = game.packs.get(PACK);
	if (!pack) return (caminosCache = []);
	const indice = await pack.getIndex({ fields: ["system.core", "system.path", "folder"] });
	caminosCache = pack.folders.contents
		.map((f) => {
			const talentos = indice.filter((e) => e.folder === f.id)
				.map((e) => ({ id: e._id, nombre: e.name, principal: Boolean(e.system?.core) }))
				.sort((a, b) => a.nombre.localeCompare(b.nombre));
			return { id: f.id, nombre: f.name, principal: talentos.find((t) => t.principal), talentos };
		})
		.filter((c) => c.talentos.length)
		.sort((a, b) => a.nombre.localeCompare(b.nombre));
	return caminosCache;
}

/** Otros PJ con los que crear vínculos. */
const otrosPJ = (actor) => game.actors
	.filter((a) => a.type === "character" && a.id !== actor?.id && (a.hasPlayerOwner || !game.users.some((u) => !u.isGM)))
	.map((a) => a.name);

/**
 * Borrador vacío (o con los datos actuales del actor).
 * @param {Actor} [actor]
 * @returns {object}
 */
function borradorInicial(actor) {
	const s = actor?.system;
	const trasfondos = [0, 1].map((i) => ({
		name: s?.backgrounds?.[i]?.name ?? "",
		wises: [0, 1, 2].map((w) => s?.backgrounds?.[i]?.wises?.[w] ?? "")
	}));
	return {
		nombre: actor?.name ?? "",
		trasfondos,
		rasgos: { si: ["", ""], no: "" },
		deseos: { si: ["", ""], no: "" },
		aspecto: (s?.features ?? "").split(/\s*[,;]\s*/).concat(["", "", ""]).slice(0, 3),
		camino: "",
		segundo: "",
		atributos: Object.fromEntries(ATRIBUTOS.claves.map((k) => [k, ATRIBUTOS.base])),
		arcos: ["", ""],
		vinculos: Object.fromEntries(otrosPJ(actor).map((n) => [n, ""]))
	};
}

/**
 * Borrador completamente al azar.
 * @param {Actor} [actor]
 * @returns {Promise<object>}
 */
async function borradorAleatorio(actor) {
	const L = listas();
	const b = borradorInicial(actor);
	b.nombre = nombreAlAzar();
	const primero = trasfondoAlAzar();
	b.trasfondos = [primero, trasfondoAlAzar([primero.name])];
	b.rasgos = dosYUno(Object.keys(CONFIG.GRIMWILD.traits));
	b.deseos = dosYUno(Object.keys(CONFIG.GRIMWILD.desires));
	b.aspecto = variosAlAzar(L.aspecto, 3);
	const camino = alAzar(await caminos());
	if (camino) {
		b.camino = camino.id;
		b.segundo = alAzar(camino.talentos.filter((t) => !t.principal))?.id ?? "";
	}
	b.atributos = atributosAlAzar();
	b.arcos = [alAzar(L.arcos), ""];
	for (const nombre of Object.keys(b.vinculos)) b.vinculos[nombre] = vinculoAlAzar();
	return b;
}

/**
 * Aplica un borrador a un actor (o crea uno nuevo).
 * @param {object} b
 * @param {Actor|null} actor
 * @returns {Promise<Actor>}
 */
async function aplicar(b, actor) {
	const t = (k) => game.i18n.localize(k);
	const lista = await caminos();
	const camino = lista.find((c) => c.id === b.camino);
	const trait = (k) => (CONFIG.GRIMWILD.traits[k] ? t(CONFIG.GRIMWILD.traits[k]) : k);
	const desire = (k) => (CONFIG.GRIMWILD.desires[k] ? t(CONFIG.GRIMWILD.desires[k]) : k);
	const arcos = b.arcos.map((a) => a.trim()).filter(Boolean);

	const system = {
		path: camino?.nombre ?? actor?.system.path ?? "",
		backgrounds: b.trasfondos.map((tr) => ({ name: tr.name.trim(), wises: tr.wises.map((w) => w.trim()) })),
		traits: [
			{ are: true, value: trait(b.rasgos.si[0]) }, { are: true, value: trait(b.rasgos.si[1]) },
			{ are: false, value: trait(b.rasgos.no) }
		],
		desires: [
			{ are: true, value: desire(b.deseos.si[0]) }, { are: true, value: desire(b.deseos.si[1]) },
			{ are: false, value: desire(b.deseos.no) }
		],
		features: b.aspecto.map((a) => a.trim()).filter(Boolean).join(", "),
		stats: Object.fromEntries(ATRIBUTOS.claves.map((k) => [k, { value: Number(b.atributos[k]), marked: false }])),
		bonds: [
			...(actor?.system.toObject().bonds ?? []).filter((v) => !(v.name in b.vinculos)),
			...Object.entries(b.vinculos).filter(([, v]) => v.trim()).map(([name, description]) => ({ name, description }))
		]
	};
	if (arcos.length) {
		const bloque = `<h3>${t("GRIMWILD.Creador.arcos")}</h3><ul>${arcos.map((a) => `<li>${foundry.utils.escapeHTML(a)}</li>`).join("")}</ul>`;
		system.notes = `${actor?.system.notes ?? ""}${bloque}`;
	}

	const nombre = b.nombre.trim() || actor?.name || t("GRIMWILD.Creador.sinNombre");
	if (actor) await actor.update({ name: nombre, system });
	else actor = await getDocumentClass("Actor").create({ name: nombre, type: "character", system }, { gwCreador: true });

	// Talentos del camino: el principal y el elegido, sin duplicar los que ya tenga.
	const pack = game.packs.get(PACK);
	const tiene = new Set(actor.items.map((i) => i._stats?.compendiumSource?.split(".").pop()));
	const ids = [camino?.principal?.id, b.segundo].filter((id) => id && !tiene.has(id));
	const docs = await Promise.all(ids.map((id) => pack.getDocument(id)));
	if (docs.length) await actor.createEmbeddedDocuments("Item", docs.filter(Boolean).map((d) => game.items.fromCompendium(d)));
	return actor;
}

export class GrimwildCreador extends ConMemoria(HandlebarsApplicationMixin(ApplicationV2)) {
	static SCROLL_MEMORIA = [".gw-creador__pasos"];

	static DEFAULT_OPTIONS = {
		classes: ["grimwild", "grimwild-creador"],
		tag: "form",
		position: { width: 780, height: 820 },
		window: { icon: "fa-solid fa-user-plus", resizable: true },
		form: { handler: GrimwildCreador.#guardar, submitOnChange: false, closeOnSubmit: true },
		actions: {
			azar: GrimwildCreador.#azar,
			todoAzar: GrimwildCreador.#todoAzar,
			paso: GrimwildCreador.#paso,
			ir: GrimwildCreador.#ir
		}
	};

	static PARTS = {
		creador: { template: "systems/grimwild/templates/apps/creador.hbs", scrollable: [".gw-creador__pasos"] }
	};

	/**
	 * Abre el asistente para un actor (o para crear uno nuevo si no se indica).
	 * @param {Actor} [actor]
	 * @returns {Promise<GrimwildCreador>}
	 */
	static abrir(actor) {
		const id = `grimwild-creador-${actor?.id ?? "nuevo"}`;
		const app = foundry.applications.instances.get(id) ?? new GrimwildCreador({ id, actor, memoria: "creador" });
		return app.render({ force: true });
	}

	/**
	 * Crea un personaje completamente aleatorio y abre su ficha.
	 * @returns {Promise<Actor>}
	 */
	static async crearAleatorio() {
		const actor = await aplicar(await borradorAleatorio(null), null);
		actor.sheet.render({ force: true });
		ui.notifications.info(game.i18n.format("GRIMWILD.Creador.creado", { name: actor.name }));
		return actor;
	}

	constructor(options = {}) {
		super(options);
		this.actor = options.actor ?? null;
		this.borrador = borradorInicial(this.actor);
	}

	get title() {
		return this.actor
			? game.i18n.format("GRIMWILD.Creador.tituloActor", { name: this.actor.name })
			: game.i18n.localize("GRIMWILD.Creador.titulo");
	}

	/** @override */
	async _prepareContext(options) {
		const b = this.borrador;
		const L = listas();
		const t = (k) => game.i18n.localize(k);
		const lista = await caminos();
		const camino = lista.find((c) => c.id === b.camino);
		const opciones = (obj, elegido) => Object.entries(obj).map(([clave, etiqueta]) => ({ clave, etiqueta: t(etiqueta), elegido: clave === elegido }));
		const estado = estadoAtributos(b.atributos);
		return {
			id: this.id,
			pasos: ["nombre", "trasfondos", "rasgos", "deseos", "aspecto", "camino", "atributos", "arcos", "vinculos"]
				.map((clave, i) => ({ clave, num: i + 1 })),
			b,
			nuevo: !this.actor,
			trasfondos: b.trasfondos.map((tr, i) => ({ ...tr, i })),
			tablaTrasfondos: L.trasfondos.map(([nombre, ...saberes]) => ({ nombre, saberes: saberes.join(", ") })),
			rasgos: {
				si: b.rasgos.si.map((k, i) => ({ i, opciones: opciones(CONFIG.GRIMWILD.traits, k) })),
				no: opciones(CONFIG.GRIMWILD.traits, b.rasgos.no)
			},
			deseos: {
				si: b.deseos.si.map((k, i) => ({ i, opciones: opciones(CONFIG.GRIMWILD.desires, k) })),
				no: opciones(CONFIG.GRIMWILD.desires, b.deseos.no)
			},
			aspecto: b.aspecto.map((valor, i) => ({ i, valor })),
			sugerenciasAspecto: L.aspecto,
			caminos: lista.map((c) => ({ ...c, elegido: c.id === b.camino })),
			principal: camino?.principal,
			segundos: {
				mismo: (camino?.talentos ?? []).filter((x) => !x.principal).map((x) => ({ ...x, elegido: x.id === b.segundo })),
				otros: lista.filter((c) => c.id !== b.camino).map((c) => ({
					nombre: c.nombre,
					talentos: c.talentos.filter((x) => !x.principal).map((x) => ({ ...x, elegido: x.id === b.segundo }))
				}))
			},
			atributos: ATRIBUTOS.claves.map((k) => ({
				clave: k, nombre: t(`GRIMWILD.Stat.${k}.long`), valor: b.atributos[k],
				puedeBajar: b.atributos[k] > ATRIBUTOS.base, puedeSubir: b.atributos[k] < ATRIBUTOS.maximo && estado.restantes > 0
			})),
			estadoAtributos: estado,
			arcos: b.arcos.map((valor, i) => ({ i, valor })),
			sugerenciasArcos: L.arcos,
			vinculos: Object.entries(b.vinculos).map(([nombre, valor], i) => ({ nombre, valor, i })),
			sugerenciasVinculos: L.intensidades.flatMap((i) => L.naturalezas.map((n) => `${i} ${n}`))
		};
	}

	/** @override */
	async _onRender(context, options) {
		await super._onRender(context, options);
		if (!options.isFirstRender) return;
		// Los cambios se guardan en el borrador sin repintar (salvo los que cambian otras partes).
		this.element.addEventListener("change", (event) => {
			this.#leer();
			const campo = event.target.name ?? "";
			if (campo === "trasfondoTabla") this.#aplicarTabla(event.target);
			if (campo === "camino" || campo === "trasfondoTabla") this.render();
		});
	}

	/** Vuelca el formulario al borrador. */
	#leer() {
		const d = foundry.utils.expandObject(new foundry.applications.ux.FormDataExtended(this.element).object);
		const b = this.borrador;
		b.nombre = d.nombre ?? b.nombre;
		if (d.trasfondos) b.trasfondos = [0, 1].map((i) => ({
			name: d.trasfondos[i]?.name ?? "",
			wises: [0, 1, 2].map((w) => d.trasfondos[i]?.wises?.[w] ?? "")
		}));
		if (d.rasgos) b.rasgos = { si: [d.rasgos.si?.[0] ?? "", d.rasgos.si?.[1] ?? ""], no: d.rasgos.no ?? "" };
		if (d.deseos) b.deseos = { si: [d.deseos.si?.[0] ?? "", d.deseos.si?.[1] ?? ""], no: d.deseos.no ?? "" };
		if (d.aspecto) b.aspecto = [0, 1, 2].map((i) => d.aspecto[i] ?? "");
		if (d.camino !== undefined) {
			if (d.camino !== b.camino) b.segundo = "";
			else b.segundo = d.segundo ?? b.segundo;
			b.camino = d.camino;
		}
		if (d.arcos) b.arcos = [0, 1].map((i) => d.arcos[i] ?? "");
		if (d.vinculos) Object.keys(b.vinculos).forEach((nombre, i) => (b.vinculos[nombre] = d.vinculos[i] ?? ""));
	}

	/**
	 * Elegir un trasfondo de la tabla rellena su tarjeta.
	 * @param {HTMLSelectElement} select
	 */
	#aplicarTabla(select) {
		const i = Number(select.dataset.index);
		const fila = listas().trasfondos.find((f) => f[0] === select.value);
		if (!fila) return;
		const [name, ...wises] = fila;
		this.borrador.trasfondos[i] = { name, wises };
	}

	/**
	 * Dado de un paso.
	 * @this {GrimwildCreador}
	 * @param {PointerEvent} event
	 * @param {HTMLElement} target
	 */
	static async #azar(event, target) {
		this.#leer();
		const b = this.borrador;
		const L = listas();
		const i = Number(target.dataset.index ?? 0);
		switch (target.dataset.paso) {
			case "nombre": b.nombre = nombreAlAzar(); break;
			case "trasfondo": b.trasfondos[i] = trasfondoAlAzar(b.trasfondos.map((x) => x.name)); break;
			case "ascendencia": b.trasfondos[i] = { name: ascendenciaAlAzar(), wises: variosAlAzar(L.trasfondos.flatMap((x) => x.slice(1)), 3) }; break;
			case "rasgos": b.rasgos = dosYUno(Object.keys(CONFIG.GRIMWILD.traits)); break;
			case "deseos": b.deseos = dosYUno(Object.keys(CONFIG.GRIMWILD.desires)); break;
			case "aspecto": b.aspecto = variosAlAzar(L.aspecto, 3); break;
			case "camino": {
				const c = alAzar(await caminos());
				b.camino = c?.id ?? "";
				b.segundo = alAzar(c?.talentos.filter((x) => !x.principal) ?? [])?.id ?? "";
				break;
			}
			case "segundo": {
				const c = (await caminos()).find((x) => x.id === b.camino);
				b.segundo = alAzar(c?.talentos.filter((x) => !x.principal) ?? [])?.id ?? "";
				break;
			}
			case "atributos": b.atributos = atributosAlAzar(); break;
			case "arcos": b.arcos = [alAzar(L.arcos), b.arcos[1]]; break;
			case "vinculo": b.vinculos[target.dataset.nombre] = vinculoAlAzar(); break;
		}
		this.render();
	}

	/**
	 * Todo al azar.
	 * @this {GrimwildCreador}
	 */
	static async #todoAzar() {
		this.borrador = await borradorAleatorio(this.actor);
		this.render();
	}

	/**
	 * Subir o bajar un atributo respetando el reparto (1 + 4 puntos, máximo 3).
	 * @this {GrimwildCreador}
	 * @param {PointerEvent} event
	 * @param {HTMLElement} target
	 */
	static #paso(event, target) {
		this.#leer();
		const { clave, delta } = target.dataset;
		const a = this.borrador.atributos;
		const siguiente = a[clave] + Number(delta);
		const { restantes } = estadoAtributos(a);
		if (siguiente < ATRIBUTOS.base || siguiente > ATRIBUTOS.maximo) return;
		if (Number(delta) > 0 && restantes <= 0) return;
		a[clave] = siguiente;
		this.render();
	}

	/**
	 * Índice de pasos: desplaza hasta el paso.
	 * @this {GrimwildCreador}
	 * @param {PointerEvent} event
	 * @param {HTMLElement} target
	 */
	static #ir(event, target) {
		this.element.querySelector(`#${this.id}-paso-${target.dataset.paso}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
	}

	/**
	 * Crear o aplicar.
	 * @this {GrimwildCreador}
	 */
	static async #guardar() {
		this.#leer();
		const estado = estadoAtributos(this.borrador.atributos);
		if (!estado.valido) ui.notifications.warn("GRIMWILD.Creador.avisoAtributos", { localize: true });
		const actor = await aplicar(this.borrador, this.actor);
		actor.sheet.render({ force: true });
		ui.notifications.info(game.i18n.format("GRIMWILD.Creador.creado", { name: actor.name }));
	}
}

/**
 * Puntos de entrada: botones en el directorio de actores, control en la ficha y apertura
 * automática al crear un personaje vacío (ajuste de mundo).
 */
export function registrarCreador() {
	game.settings.register("grimwild", "asistenteAlCrear", {
		name: "GRIMWILD.Settings.asistenteAlCrear.name",
		hint: "GRIMWILD.Settings.asistenteAlCrear.hint",
		scope: "world",
		config: true,
		type: Boolean,
		default: true
	});

	Hooks.on("renderActorDirectory", (app, html) => {
		if (!game.user.can("ACTOR_CREATE")) return;
		const acciones = html.querySelector(".header-actions");
		if (!acciones || acciones.querySelector(".gw-creador-botones")) return;
		const t = (k) => game.i18n.localize(k);
		acciones.insertAdjacentHTML("beforeend", `
			<div class="gw-creador-botones">
				<button type="button" data-gw-creador="asistente"><i class="fa-solid fa-user-plus" inert></i><span>${t("GRIMWILD.Creador.botonAsistente")}</span></button>
				<button type="button" data-gw-creador="azar"><i class="fa-solid fa-dice" inert></i><span>${t("GRIMWILD.Creador.botonAzar")}</span></button>
			</div>`);
		acciones.querySelector("[data-gw-creador=asistente]").addEventListener("click", () => GrimwildCreador.abrir());
		acciones.querySelector("[data-gw-creador=azar]").addEventListener("click", () => GrimwildCreador.crearAleatorio());
	});

	Hooks.on("createActor", (actor, options, userId) => {
		if (userId !== game.user.id || actor.type !== "character") return;
		if (!game.settings.get("grimwild", "asistenteAlCrear") || options.gwCreador) return;
		// Solo personajes vacíos creados a mano (no importados, duplicados ni generados).
		if (actor.items.size || actor.system.path || actor._stats?.compendiumSource || actor._stats?.duplicateSource) return;
		GrimwildCreador.abrir(actor);
	});
}
