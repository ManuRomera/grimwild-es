import { tieneTalento, clavesDeCamino } from "../helpers/claves.mjs";
import { ConMemoria } from "../ui/memoria.mjs";

/**
 * @typedef {object} GrimwildRollDialogRollData
 * @property {string} [name]                        Name of the rolling actor
 * @property {string} stat                          Shorthand string for the stat being rolled
 * @property {string} diceLabel                     Label of the main dice source
 * @property {number} diceDefault                   The number of dice associated with the stat being rolled
 * @property {number} spark                         The maximum spark available to be used
 * @property {boolean} isBloodied                   If the actor is bloodied
 * @property {boolean} isRattled                    If the actor is rattled
 * @property {boolean} isMarked                     If the stat being rolled is marked
 * @property {Actor} [actor]                        The rolling actor
 */

/**
 * @typedef {object} GrimwildRollDialogResponse
 * @property {number} dice                          The number of dice to roll
 * @property {number} thorns                        The number of thorns to roll
 * @property {number} sparkUsed                     The number of spark used on the roll
 * @property {object} assisters                     An object with the key of the assister's name and
 *                                                  the value of the number of dice they roll
 */

/**
 * Roll dialog: dice sources on one side, thorn sources on the other, and both totals always
 * visible on top. Totals are recomputed from every source on each change.
 *
 * @example
 * const result = await GrimwildRollDialog.open({ rollData: { stat: "bra", diceDefault: 2 } });
 */
export class GrimwildRollDialog extends ConMemoria(foundry.applications.api.DialogV2) {
	static DEFAULT_OPTIONS = {
		classes: ["grimwild", "grimwild-roll-dialog"],
		position: { width: 520 },
		actions: {
			addAssist: this.#onAddAssist,
			removeAssist: this.#onRemoveAssist,
			step: this.#onStep
		}
	};

	/**
	 * Opens a new Grimwild Roll Dialog.
	 * @param {object} options
	 * @param {GrimwildRollDialogRollData} options.rollData
	 * @returns {Promise<null|GrimwildRollDialogResponse>}
	 */
	static async open({ rollData, ...options } = {}) {
		const actor = rollData.actor;
		const context = {
			...rollData,
			img: actor?.img && actor.img !== "icons/svg/mystery-man.svg" ? actor.img : null,
			hasSpark: rollData.spark > 0,
			sparkArray: Array.from({ length: rollData.spark ?? 0 }, (_, i) => i),
			conditions: 0
		};

		// Possible helpers: other characters (player characters first as quick buttons).
		const others = game.actors.filter((a) => a.type === "character" && a.id !== actor?.id && a.name !== rollData.name);
		context.assistants = others.map((a) => a.name);
		context.helpers = others.filter((a) => a.hasPlayerOwner).map((a) => a.name);

		// Weapon mastery acts as an extra assist die. Identified by compendium id and path key,
		// never by the (translatable) visible names.
		if (actor && (tieneTalento(actor, "weaponMastery") || (await clavesDeCamino(actor)).has("fighter"))) {
			const label = game.i18n.localize("GRIMWILD.Dialog.WeaponMastery");
			context.assistants.push(label);
			context.helpers.unshift(label);
		}

		options.content = await foundry.applications.handlebars.renderTemplate(
			"systems/grimwild/templates/dialog/stat-roll.hbs",
			context
		);
		options.modal = true;
		options.memoria = "dialogo-tirada";
		options.window = {
			title: game.i18n.localize("GRIMWILD.Dialog.GrimwildRoll"),
			icon: "fa-solid fa-dice-d6"
		};
		options.rejectClose = false;
		options.buttons = [{
			label: game.i18n.localize("GRIMWILD.Dialog.Roll"),
			icon: "fa-solid fa-dice-d6",
			action: "roll",
			default: true,
			callback: (event, button, dialog) => dialog.resultado()
		}];
		return this.wait(options);
	}

	/** @override */
	_onRender(context, options) {
		super._onRender(context, options);
		this.element.addEventListener("input", () => this.recalcular());
		this.element.addEventListener("change", () => this.recalcular());
		this.recalcular();
	}

	/** Recompute both totals from every source. */
	recalcular() {
		const el = this.element;
		const numero = (input) => Math.max(parseInt(input?.value || 0, 10) || 0, 0);
		const marcados = (sel) => el.querySelectorAll(`${sel}:checked`).length;
		const suma = (sel) => Array.from(el.querySelectorAll(sel)).reduce((t, i) => t + numero(i), 0);

		const dice = suma("[data-dice]") + marcados("[data-spark]") + suma("[data-assist-value]");
		const thorns = marcados("[data-thorn]") + suma("[data-thorns]");
		el.querySelector("[data-total=dice]").textContent = dice;
		el.querySelector("[data-total=thorns]").textContent = thorns;
		el.querySelector("[name=totalDiceInput]").value = dice;
		el.querySelector("[name=totalThornsInput]").value = thorns;
		el.querySelector(".gw-total--dice").classList.toggle("empty", dice === 0);
	}

	/**
	 * Values returned to the caller.
	 * @returns {GrimwildRollDialogResponse}
	 */
	resultado() {
		this.recalcular();
		const el = this.element;
		const assisters = {};
		for (const row of el.querySelectorAll("[data-assist-row]")) {
			const value = parseInt(row.querySelector("[data-assist-value]").value || 0, 10) || 0;
			if (value <= 0) continue;
			const name = row.querySelector("[data-assist-name]").value.trim() || game.i18n.localize("GRIMWILD.Dialog.Assist");
			assisters[name] = (assisters[name] ?? 0) + value;
		}
		return {
			dice: Number(el.querySelector("[name=totalDiceInput]").value),
			thorns: Number(el.querySelector("[name=totalThornsInput]").value),
			assisters,
			sparkUsed: el.querySelectorAll("[data-spark]:checked").length
		};
	}

	/**
	 * Add an assist row, optionally prefilled with a helper's name.
	 * @this {GrimwildRollDialog}
	 * @param {PointerEvent} event
	 * @param {HTMLElement} target
	 */
	static #onAddAssist(event, target) {
		const name = target.dataset.name ?? "";
		const li = document.createElement("li");
		li.className = "gw-assist";
		li.dataset.assistRow = "";
		const nombre = game.i18n.localize("Name");
		const quitar = game.i18n.localize("GRIMWILD.Dialog.RemoveAssist");
		li.innerHTML = `
			<input type="text" data-assist-name list="assistants-list" placeholder="${nombre}" aria-label="${nombre}">
			<input type="number" data-assist-value value="1" min="0" aria-label="${game.i18n.localize("GRIMWILD.Dice.dice")}">
			<button type="button" class="gw-icon-button" data-action="removeAssist" aria-label="${quitar}" data-tooltip="${quitar}">
				<i class="fa-solid fa-xmark" inert></i>
			</button>`;
		li.querySelector("[data-assist-name]").value = name;
		this.element.querySelector("[data-assists]").append(li);
		if (!name) li.querySelector("[data-assist-name]").focus();
		this.recalcular();
	}

	/**
	 * @this {GrimwildRollDialog}
	 * @param {PointerEvent} event
	 * @param {HTMLElement} target
	 */
	static #onRemoveAssist(event, target) {
		target.closest("[data-assist-row]")?.remove();
		this.recalcular();
	}

	/**
	 * Stepper buttons (−/+) for numeric sources.
	 * @this {GrimwildRollDialog}
	 * @param {PointerEvent} event
	 * @param {HTMLElement} target
	 */
	static #onStep(event, target) {
		const input = this.element.querySelector(`[name="${target.dataset.target}"]`);
		if (!input) return;
		input.value = Math.max((parseInt(input.value || 0, 10) || 0) + Number(target.dataset.step), 0);
		this.recalcular();
	}
}
