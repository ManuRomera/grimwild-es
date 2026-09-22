/**
 * Identidad estable de caminos y talentos.
 *
 * Las reglas nunca deben depender del nombre visible (traducible) de un documento. Un talento se
 * identifica por su `_id` en el compendio del sistema, que se conserva en `_stats.compendiumSource`
 * al arrastrarlo a un actor; un camino, por la clave `system.path` de sus talentos ("fighter"…).
 */

/** Talentos del compendio con efectos automatizados, por `_id` del compendio grimwild.talents. */
export const TALENTOS = {
	weaponMastery: "JsmQDELRkKavY179"
};

/**
 * `_id` del compendio del que procede un talento (o su propio id si no consta el origen).
 * @param {Item} item
 * @returns {string|null}
 */
function idDeOrigen(item) {
	const origen = item._stats?.compendiumSource ?? item.flags?.core?.sourceId;
	if (origen?.startsWith("Compendium.grimwild.talents.")) return origen.split(".").pop();
	return item.id ?? null;
}

/**
 * ¿Tiene el actor este talento del compendio?
 * @param {Actor} actor
 * @param {keyof TALENTOS} clave
 * @returns {boolean}
 */
export function tieneTalento(actor, clave) {
	const id = TALENTOS[clave];
	return Boolean(id && actor?.itemTypes?.talent?.some((t) => idDeOrigen(t) === id));
}

/**
 * Clave normalizada de un camino ("fighter", "wizard"…).
 * @param {string} valor
 * @returns {string}
 */
export const normalizarCamino = (valor) => (valor ?? "").trim().toLowerCase();

/**
 * Claves de camino del actor, deducidas de sus talentos principales (system.core), que llevan
 * `system.path` con la clave estable del camino.
 * @param {Actor} actor
 * @returns {Set<string>}
 */
export function caminosDelActor(actor) {
	const caminos = new Set();
	for (const t of actor?.itemTypes?.talent ?? []) {
		if (t.system.core && t.system.path) caminos.add(normalizarCamino(t.system.path));
	}
	return caminos;
}

/**
 * Claves de camino del actor: las de sus talentos principales y, si el jugador ha escrito el nombre
 * de un camino en la ficha, la del camino cuya carpeta del compendio de talentos se llama así (el
 * nombre se escribe en el idioma del compendio instalado; la clave resultante no depende de él).
 * @param {Actor} actor
 * @returns {Promise<Set<string>>}
 */
export async function clavesDeCamino(actor) {
	const caminos = caminosDelActor(actor);
	const escrito = normalizarCamino(actor?.system?.path);
	const pack = game.packs.get("grimwild.talents");
	if (!escrito || !pack) return caminos;
	const carpeta = pack.folders.find((f) => normalizarCamino(f.name) === escrito);
	if (!carpeta) return caminos;
	const indice = await pack.getIndex({ fields: ["system.path"] });
	for (const e of indice) {
		if (e.folder === carpeta.id && e.system?.path) caminos.add(normalizarCamino(e.system.path));
	}
	return caminos;
}

/**
 * Carpeta del compendio de talentos que corresponde al camino del actor.
 * @param {CompendiumCollection} pack
 * @param {Actor} actor
 * @returns {Promise<Folder|undefined>}
 */
export async function carpetaDelCamino(pack, actor) {
	const caminos = await clavesDeCamino(actor);
	if (!caminos.size) return undefined;
	const indice = await pack.getIndex({ fields: ["system.path"] });
	const entrada = indice.find((e) => e.folder && caminos.has(normalizarCamino(e.system?.path)));
	return entrada ? pack.folders.get(entrada.folder) : undefined;
}
