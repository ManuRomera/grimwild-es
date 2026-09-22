/**
 * Memoria de ventanas.
 *
 * Cada ventana del sistema recuerda, por usuario y mundo: posición y tamaño (por separado para
 * el modo normal y el compacto), pestaña activa, secciones desplegadas, modo compacto y
 * desplazamiento. Una ficha nueva hereda el último tamaño usado en su clase de ventana.
 *
 * Es una preferencia de este navegador, no un dato del mundo: vive en localStorage bajo UNA sola
 * clave versionada por mundo y usuario. Se guardan como mucho MAXIMO ventanas; al pasar de ahí se
 * descartan las usadas hace más tiempo.
 */
const VERSION = 1;
const MAXIMO = 150;
const GEOMETRIA = ["left", "top", "width", "height"];

const clave = () => `grimwild.ui.v${VERSION}.${game.world?.id}.${game.user?.id}`;

function todo() {
	try {
		return JSON.parse(localStorage.getItem(clave())) ?? {};
	}
	catch {
		return {};
	}
}

/**
 * Estado recordado de una ventana.
 * @param {string} id
 * @returns {object}
 */
export function leer(id) {
	return todo()[id] ?? {};
}

/**
 * Mezcla cambios en el estado de una ventana.
 * @param {string} id
 * @param {object} cambios
 */
export function escribir(id, cambios) {
	const datos = todo();
	datos[id] = { ...datos[id], ...cambios, t: Date.now() };
	const ids = Object.keys(datos);
	if (ids.length > MAXIMO) {
		ids.sort((a, b) => (datos[a].t ?? 0) - (datos[b].t ?? 0));
		for (const viejo of ids.slice(0, ids.length - MAXIMO)) delete datos[viejo];
	}
	try {
		localStorage.setItem(clave(), JSON.stringify(datos));
	}
	catch (error) {
		console.warn("grimwild | No se pudo guardar el estado de la ventana", error);
	}
}

/** Borra toda la memoria de ventanas de este usuario en este mundo. */
export function olvidarTodo() {
	try {
		localStorage.removeItem(clave());
	}
	catch {}
}

/**
 * Geometría guardada, saneada para la pantalla actual: solo números, tamaños dentro del viewport y
 * la barra de título siempre alcanzable. (ApplicationV2 vuelve a encajarla al aplicarla.)
 * @param {object} pos
 * @param {string[]} campos
 * @returns {object}
 */
export function encajar(pos, campos = GEOMETRIA) {
	const r = {};
	for (const c of campos) if (Number.isFinite(pos?.[c])) r[c] = Math.round(pos[c]);
	const { innerWidth: w, innerHeight: h } = window;
	if (r.width) r.width = Math.min(r.width, w);
	if (r.height) r.height = Math.min(r.height, h);
	if (r.left !== undefined) r.left = Math.clamp(r.left, 0, Math.max(w - (r.width ?? 200), 0));
	if (r.top !== undefined) r.top = Math.clamp(r.top, 0, Math.max(h - 40, 0));
	return r;
}

/**
 * Mixin de memoria para ApplicationV2.
 *
 * Opciones estáticas de la subclase:
 *  - COMPACTO: {width, height} por defecto del modo compacto, si la ventana lo tiene.
 *  - SCROLL_MEMORIA: selectores cuyo scroll se recuerda al cerrar.
 * Opción de instancia `memoria`: identificador para ventanas sin documento.
 *
 * El estado de interfaz propio de la ventana (pestaña, secciones abiertas…) está en `this.ui`,
 * un objeto plano que las hojas pueden hacer reactivo; se guarda con `recordarUI()`.
 * @param {typeof foundry.applications.api.ApplicationV2} Base
 * @returns {typeof foundry.applications.api.ApplicationV2}
 */
export function ConMemoria(Base) {
	return class extends Base {
		constructor(options = {}) {
			const Clase = new.target;
			const id = options.memoria ?? options.document?.uuid ?? Clase.name;
			const propia = leer(id);
			const compacto = Boolean(Clase.COMPACTO && propia.ui?.compacto);
			const modo = compacto ? "compacta" : "posicion";
			const heredada = propia[modo] ? {} : encajar(leer(`clase.${Clase.name}`)[modo], ["width", "height"]);
			const porDefecto = compacto ? Clase.COMPACTO : {};
			super({
				...options,
				position: { ...options.position, ...porDefecto, ...heredada, ...encajar(propia[modo]) }
			});
			this._memoria = { id, scroll: propia.scroll ?? {} };
			this.ui = { compacto, pestana: null, abiertos: {}, ...propia.ui, ...{ compacto } };
		}

		get compacto() {
			return Boolean(this.ui.compacto);
		}

		/** @override */
		_onPosition(position) {
			super._onPosition?.(position);
			if (!this.rendered) return;
			clearTimeout(this._memoria.temporizador);
			this._memoria.temporizador = setTimeout(() => this.#guardarPosicion(), 250);
		}

		#guardarPosicion() {
			// Minimizada, la altura es la de la barra de título: solo cuenta la posición.
			const campos = this.minimized ? ["left", "top"] : GEOMETRIA;
			const modo = this.compacto ? "compacta" : "posicion";
			const pos = encajar(this.position, campos);
			escribir(this._memoria.id, { [modo]: { ...leer(this._memoria.id)[modo], ...pos } });
			if (!this.minimized) {
				escribir(`clase.${this.constructor.name}`, { [modo]: encajar(this.position, ["width", "height"]) });
			}
		}

		/** Guarda el estado de interfaz (`this.ui`). */
		recordarUI() {
			escribir(this._memoria.id, { ui: foundry.utils.deepClone({ ...this.ui }) });
		}

		/**
		 * Restaura el scroll recordado de los selectores de SCROLL_MEMORIA.
		 * Llamar tras el primer renderizado.
		 */
		restaurarScroll() {
			for (const [selector, top] of Object.entries(this._memoria.scroll)) {
				const el = this.element?.querySelector(selector);
				if (el) el.scrollTop = top;
			}
		}

		/** @override */
		async close(options) {
			if (this.rendered) {
				const scroll = {};
				for (const selector of this.constructor.SCROLL_MEMORIA ?? []) {
					const el = this.element.querySelector(selector);
					if (el) scroll[selector] = el.scrollTop;
				}
				this.#guardarPosicion();
				escribir(this._memoria.id, { scroll });
			}
			return super.close(options);
		}

		/** Alterna el modo compacto conservando la geometría de cada modo por separado. */
		async alternarCompacto() {
			if (!this.constructor.COMPACTO) return;
			this.#guardarPosicion();
			this.ui.compacto = !this.ui.compacto;
			this.recordarUI();
			const modo = this.ui.compacto ? "compacta" : "posicion";
			const guardada = encajar(leer(this._memoria.id)[modo]);
			const porDefecto = this.ui.compacto ? this.constructor.COMPACTO : this.constructor.DEFAULT_OPTIONS.position;
			this.element?.classList.toggle("compacto", this.ui.compacto);
			this.setPosition({ ...encajar(porDefecto, ["width", "height"]), ...guardada });
		}
	};
}
