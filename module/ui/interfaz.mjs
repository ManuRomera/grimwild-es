/**
 * Ajustes de interfaz del cliente y ayuda contextual.
 *
 * Ayuda contextual: cualquier elemento con `data-ayuda="clave"` muestra una explicación breve
 * al mantener el puntero encima AYUDA_MS milisegundos, o al instante con clic derecho (o pulsación
 * larga en pantallas táctiles). Con clic derecho queda fijada para poder seguir el enlace a la regla.
 * Los textos viven en `GRIMWILD.Ayuda.<clave>.{titulo,texto}`; la regla enlazada, en AYUDA_REGLAS.
 */
import { olvidarTodo } from "./memoria.mjs";

const AYUDA_MS = 1200;

/** Páginas del compendio de reglas que amplían cada ayuda (UUID estables del compendio). */
const AYUDA_REGLAS = {
	stat: "Compendium.grimwild.rules.JournalEntry.rgrd5FQnGkUcfNDl",
	mark: "Compendium.grimwild.rules.JournalEntry.mE6axXeciWLe3skm",
	bloodied: "Compendium.grimwild.rules.JournalEntry.kAGyEflDClkS3viS",
	rattled: "Compendium.grimwild.rules.JournalEntry.kAGyEflDClkS3viS",
	dropped: "Compendium.grimwild.rules.JournalEntry.kAGyEflDClkS3viS",
	spark: "Compendium.grimwild.rules.JournalEntry.jfAL6eh3f03OfuY3",
	story: "Compendium.grimwild.rules.JournalEntry.P8Z5hyFjxbTzrR1I",
	thorns: "Compendium.grimwild.rules.JournalEntry.CKZHOS0pAZTYwZQ9",
	conditions: "Compendium.grimwild.rules.JournalEntry.q1o6ubdVkVidryCj",
	pool: "Compendium.grimwild.rules.JournalEntry.5n7fkFcmZaVYZT52",
	powerPool: "Compendium.grimwild.rules.JournalEntry.uOz70fAdWHwTa9mo",
	assist: "Compendium.grimwild.rules.JournalEntry.odkrgM4X8udAbLNN",
	traits: "Compendium.grimwild.rules.JournalEntry.FryDtXnuethzJjZP",
	desires: "Compendium.grimwild.rules.JournalEntry.Af8ehkOdtpGZb5qs",
	bonds: "Compendium.grimwild.rules.JournalEntry.J3qpvKK8eSPQ181G",
	backgrounds: "Compendium.grimwild.rules.JournalEntry.83BZRL246W4kP7jc",
	xp: "Compendium.grimwild.rules.JournalEntry.IApWfIfwGKsmPCd2",
	features: "Compendium.grimwild.rules.JournalEntry.hghJreSxAm2jbA5F",
	suspense: "Compendium.grimwild.gm_toolkit.JournalEntry.r03swtJF4sEnG2fm",
	quickPools: "Compendium.grimwild.gm_toolkit.JournalEntry.Vy78jbkDvChAznib",
	spotlight: "Compendium.grimwild.gm_toolkit.JournalEntry.HIO9pDCMlifR7iox",
	challenge: "Compendium.grimwild.gm_toolkit.JournalEntry.1vcuZybwoCLWtmM1"
};

/**
 * HTML de la ayuda de una clave, o null si no existe.
 * @param {string} clave
 * @returns {string|null}
 */
function contenidoAyuda(clave) {
	const base = `GRIMWILD.Ayuda.${clave}`;
	if (!game.i18n.has(`${base}.texto`)) return null;
	const titulo = game.i18n.localize(`${base}.titulo`);
	const texto = game.i18n.localize(`${base}.texto`);
	const uuid = AYUDA_REGLAS[clave];
	const enlace = uuid
		? `<p class="gw-ayuda-regla"><a class="content-link" draggable="false" data-link data-uuid="${uuid}">`
			+ `<i class="fa-solid fa-book-open" inert></i> ${game.i18n.localize("GRIMWILD.Ayuda.verRegla")}</a></p>`
		: "";
	return `<strong class="gw-ayuda-titulo">${titulo}</strong><p>${texto}</p>${enlace}`;
}

/**
 * Muestra la ayuda de un elemento.
 * @param {HTMLElement} el
 * @param {boolean} fijar
 */
function mostrarAyuda(el, fijar) {
	const html = contenidoAyuda(el.dataset.ayuda);
	if (!html) return;
	game.tooltip.activate(el, { html, cssClass: "grimwild-ayuda", locked: fijar, direction: el.dataset.ayudaDir });
}

/** Registra los oyentes globales de la ayuda contextual (una sola vez). */
function activarAyuda() {
	let temporizador = null;
	let actual = null;
	document.addEventListener("pointerover", (event) => {
		const el = event.target.closest?.("[data-ayuda]");
		if (el === actual) return;
		clearTimeout(temporizador);
		actual = el;
		if (el) temporizador = setTimeout(() => el.isConnected && mostrarAyuda(el, false), AYUDA_MS);
	});
	document.addEventListener("pointerdown", () => clearTimeout(temporizador), true);
	document.addEventListener("contextmenu", (event) => {
		const el = event.target.closest?.("[data-ayuda]");
		if (!el || event.shiftKey) return;
		event.preventDefault();
		event.stopPropagation();
		clearTimeout(temporizador);
		mostrarAyuda(el, true);
	}, true);
	// Teclado: F1 sobre un control con ayuda la muestra fijada.
	document.addEventListener("keydown", (event) => {
		if (event.key !== "F1") return;
		const el = document.activeElement?.closest?.("[data-ayuda]");
		if (!el) return;
		event.preventDefault();
		mostrarAyuda(el, true);
	});
}

/** Aplica al <body> las clases del modo de accesibilidad. */
function aplicarAccesibilidad(activo = game.settings.get("grimwild", "accesibilidad")) {
	document.body.classList.toggle("grimwild-accesible", Boolean(activo));
}

/** Registro de ajustes de cliente de la interfaz. Llamar en `init`. */
export function registrarInterfaz() {
	game.settings.register("grimwild", "accesibilidad", {
		name: "GRIMWILD.Settings.accesibilidad.name",
		hint: "GRIMWILD.Settings.accesibilidad.hint",
		scope: "client",
		config: true,
		type: Boolean,
		default: false,
		onChange: aplicarAccesibilidad
	});
	game.settings.register("grimwild", "olvidarVentanas", {
		name: "GRIMWILD.Settings.olvidarVentanas.name",
		hint: "GRIMWILD.Settings.olvidarVentanas.hint",
		scope: "client",
		config: true,
		type: Boolean,
		default: false,
		onChange: (valor) => {
			if (!valor) return;
			olvidarTodo();
			game.settings.set("grimwild", "olvidarVentanas", false);
			ui.notifications.info("GRIMWILD.Notification.VentanasOlvidadas", { localize: true });
		}
	});
	Hooks.once("ready", () => {
		aplicarAccesibilidad();
		activarAyuda();
	});
}
