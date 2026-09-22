import { leer, escribir } from "../ui/memoria.mjs";

/**
 * Suspense tracker and scene quick pools, shown above the hotbar.
 *
 * Two modes for the GM: play (see and roll) and configuration (rename, dice count, visibility,
 * delete, add), switched with the gear button and remembered per user. Players only see what the
 * world settings allow, without controls.
 */

const { escapeHTML } = foundry.utils;

/**
 * Current suspense value.
 * @returns {number}
 */
function getSuspense() {
	return game.settings.get("grimwild", "suspense");
}

/**
 * Set suspense value.
 * @param {number} value
 */
function setSuspense(value) {
	game.settings.set("grimwild", "suspense", Math.max(value, 0));
}

/**
 * The scene holding the quick pools.
 * @returns {Scene|undefined}
 */
function getScene() {
	return canvas?.scene ?? game.scenes.active;
}

/**
 * Quick pools of the current scene.
 * @returns {object[]}
 */
function getPools() {
	return foundry.utils.deepClone(getScene()?.getFlag("grimwild", "quickPools") ?? []);
}

/**
 * Save quick pools to the current scene.
 * @param {object[]} pools
 * @returns {Promise|void}
 */
function savePools(pools) {
	return getScene()?.setFlag("grimwild", "quickPools", pools);
}

const configurando = () => Boolean(leer("suspense").configurar);

/**
 * HTML of the quick pool strip.
 * @param {boolean} isGM
 * @returns {string}
 */
function poolsHTML(isGM) {
	const scene = getScene();
	if (!scene) return "";
	const config = isGM && configurando();
	const t = (k) => game.i18n.localize(k);
	const pools = getPools()
		.map((pool, index) => ({ ...pool, index }))
		.filter((pool) => isGM || pool.visible);

	const items = pools.map((pool) => {
		const label = escapeHTML(pool.label ?? "");
		const dice = Number(pool.diceNum) || 0;
		const hidden = pool.visible ? "" : " is-hidden";
		if (config) {
			return `
			<li class="gw-qp gw-qp--config${hidden}" data-pool="${pool.index}">
				<input type="text" class="gw-qp__label-input" data-field="label" value="${label}" aria-label="${t("GRIMWILD.UI.label")}">
				<div class="gw-qp__dice-edit">
					<button type="button" data-qp="dec" aria-label="${t("GRIMWILD.UI.less")}"><i class="fa-solid fa-minus" inert></i></button>
					<input type="number" data-field="diceNum" value="${dice}" min="0" aria-label="${t("GRIMWILD.UI.poolDice")}">
					<button type="button" data-qp="inc" aria-label="${t("GRIMWILD.UI.more")}"><i class="fa-solid fa-plus" inert></i></button>
				</div>
				<div class="gw-qp__tools">
					<button type="button" data-qp="visible" aria-pressed="${Boolean(pool.visible)}"
						data-tooltip="${t(pool.visible ? "GRIMWILD.UI.hideFromPlayers" : "GRIMWILD.UI.showToPlayers")}"
						aria-label="${t(pool.visible ? "GRIMWILD.UI.hideFromPlayers" : "GRIMWILD.UI.showToPlayers")}">
						<i class="fa-solid ${pool.visible ? "fa-eye" : "fa-eye-slash"}" inert></i></button>
					<button type="button" data-qp="delete" class="gw-danger" data-tooltip="${t("GRIMWILD.UI.deletePool")}"
						aria-label="${t("GRIMWILD.UI.deletePool")}"><i class="fa-solid fa-trash" inert></i></button>
				</div>
			</li>`;
		}
		const roll = isGM
			? `<button type="button" class="gw-qp__roll" data-qp="roll" ${dice > 0 ? "" : "disabled"}
				aria-label="${game.i18n.format("GRIMWILD.UI.rollPool", { name: label, dice })}"
				data-tooltip="${game.i18n.format("GRIMWILD.UI.rollPool", { name: label, dice })}">
				<i class="fa-solid fa-dice-d6" inert></i></button>`
			: "";
		const hiddenMark = isGM && !pool.visible
			? `<i class="fa-solid fa-eye-slash gw-qp__hidden" data-tooltip="${t("GRIMWILD.UI.hiddenFromPlayers")}" inert></i>`
			: "";
		return `
		<li class="gw-qp${hidden}" data-pool="${pool.index}">
			<span class="gw-qp__dice">${dice}<small>d</small></span>
			<span class="gw-qp__label">${hiddenMark}${label}</span>
			${roll}
		</li>`;
	}).join("");

	if (!items && !isGM) return "";
	const add = config
		? `<button type="button" class="gw-qp-add" data-qp="add"><i class="fa-solid fa-plus" inert></i> ${t("GRIMWILD.UI.addQuickPool")}</button>`
		: "";
	return `
	<div class="gw-qps" data-ayuda="quickPools">
		<ol class="gw-qps__list" aria-label="${t("GRIMWILD.UI.quickPools")}">${items}</ol>
		${add}
	</div>`;
}

/**
 * Roll a quick pool, dropping dice that show 1-3.
 * @param {number} index
 */
async function rollPool(index) {
	const pools = getPools();
	const pool = pools[index];
	const dice = Number(pool?.diceNum) || 0;
	if (!dice) return;
	const roll = new grimwild.diePools(`{${dice}d6}`, {});
	const result = await roll.evaluate();
	const dropped = result.dice[0].results.filter((die) => die.result < 4);
	const rollMode = pool.visible ? game.settings.get("core", "rollMode") : CONST.DICE_ROLL_MODES.PRIVATE;
	const msg = await roll.toMessage({
		speaker: ChatMessage.getSpeaker(),
		rollMode,
		flavor: `${game.i18n.localize("GRIMWILD.UI.quickPool")}: ${pool.label ?? ""}`
	}, { rollMode });
	if (game.dice3d && msg?.id) await game.dice3d.waitFor3DAnimationByMessageID(msg.id);
	pools[index].diceNum = dice - dropped.length;
	await savePools(pools);
}

/**
 * Delegated click handler for the whole control.
 * @param {PointerEvent} event
 */
async function onClick(event) {
	const target = event.target.closest("[data-qp], [data-sus]");
	if (!target || !game.user.isGM) return;
	const index = Number(target.closest("[data-pool]")?.dataset.pool);
	switch (target.dataset.sus ?? target.dataset.qp) {
		case "up": return setSuspense(getSuspense() + 1);
		case "down": return setSuspense(getSuspense() - 1);
		case "config":
			escribir("suspense", { configurar: !configurando() });
			return SUSPENSE_TRACKER.render();
		case "roll": return rollPool(index);
		case "add": {
			const pools = getPools();
			pools.push({
				diceNum: 4,
				label: game.i18n.localize("GRIMWILD.UI.quickPool"),
				visible: game.settings.get("grimwild", "quickPoolsVisibleDefault")
			});
			return savePools(pools);
		}
	}
	const pools = getPools();
	if (!pools[index]) return;
	switch (target.dataset.qp) {
		case "inc": pools[index].diceNum = (Number(pools[index].diceNum) || 0) + 1; break;
		case "dec": pools[index].diceNum = Math.max((Number(pools[index].diceNum) || 0) - 1, 0); break;
		case "visible": pools[index].visible = !pools[index].visible; break;
		case "delete": pools.splice(index, 1); break;
		default: return;
	}
	return savePools(pools);
}

/**
 * Delegated change handler for the configuration inputs.
 * @param {Event} event
 */
function onChange(event) {
	const input = event.target.closest("[data-field]");
	if (!input || !game.user.isGM) return;
	const index = Number(input.closest("[data-pool]")?.dataset.pool);
	const pools = getPools();
	if (!pools[index]) return;
	if (input.dataset.field === "diceNum") {
		const value = Number(input.value);
		if (!Number.isFinite(value)) return SUSPENSE_TRACKER.render();
		pools[index].diceNum = Math.max(Math.round(value), 0);
	}
	else pools[index].label = input.value;
	savePools(pools);
}

/**
 * Suspense tracker class.
 */
class SuspenseTracker {
	init() {
		game.settings.register("grimwild", "suspenseVisible", {
			name: game.i18n.localize("GRIMWILD.Settings.suspenseVisible.name"),
			hint: game.i18n.localize("GRIMWILD.Settings.suspenseVisible.hint"),
			scope: "world",
			config: true,
			type: Boolean,
			default: true,
			onChange: () => this.render()
		});
		game.settings.register("grimwild", "quickPoolsVisible", {
			name: game.i18n.localize("GRIMWILD.Settings.quickPoolsVisible.name"),
			hint: game.i18n.localize("GRIMWILD.Settings.quickPoolsVisible.hint"),
			scope: "world",
			config: true,
			type: Boolean,
			default: true,
			onChange: () => this.render()
		});
		game.settings.register("grimwild", "quickPoolsVisibleDefault", {
			name: game.i18n.localize("GRIMWILD.Settings.quickPoolsVisibleDefault.name"),
			hint: game.i18n.localize("GRIMWILD.Settings.quickPoolsVisibleDefault.hint"),
			scope: "world",
			config: true,
			type: Boolean,
			default: false,
			onChange: () => this.render()
		});
		game.settings.register("grimwild", "suspense", {
			name: game.i18n.localize("GRIMWILD.Resources.suspense"),
			scope: "world",
			config: false,
			type: Number,
			default: 0,
			onChange: (value) => this.render(value)
		});
	}

	/**
	 * Render the control. A numeric value (suspense changed) briefly highlights it.
	 * @param {number} [changed]
	 */
	render(changed) {
		const isGM = game.user.isGM;
		const showSuspense = isGM || game.settings.get("grimwild", "suspenseVisible");
		const showPools = isGM || game.settings.get("grimwild", "quickPoolsVisible");
		let control = document.getElementById("sus-control");

		if (!control) {
			const bottom = document.getElementById("ui-bottom");
			if (!bottom) return;
			control = document.createElement("section");
			control.id = "sus-control";
			control.className = "faded-ui";
			control.setAttribute("aria-label", game.i18n.localize("GRIMWILD.Resources.suspense"));
			control.addEventListener("click", onClick);
			control.addEventListener("change", onChange);
			bottom.prepend(control);
		}

		if (!showSuspense && !showPools) {
			control.innerHTML = "";
			return;
		}

		const t = (k) => game.i18n.localize(k);
		const config = isGM && configurando();
		const suspense = showSuspense ? `
		<div class="gw-sus" data-ayuda="suspense">
			<div class="gw-sus__display" aria-live="polite">
				<span class="gw-sus__value">${getSuspense()}</span>
				<span class="gw-sus__label">${t("GRIMWILD.Resources.suspense")}</span>
			</div>
			${isGM ? `
			<div class="gw-sus__adjust">
				<button type="button" data-sus="up" aria-label="${t("GRIMWILD.UI.suspenseUp")}" data-tooltip="${t("GRIMWILD.UI.suspenseUp")}"><i class="fa-solid fa-plus" inert></i></button>
				<button type="button" data-sus="down" aria-label="${t("GRIMWILD.UI.suspenseDown")}" data-tooltip="${t("GRIMWILD.UI.suspenseDown")}"><i class="fa-solid fa-minus" inert></i></button>
			</div>` : ""}
		</div>` : "";
		const gear = isGM && getScene() ? `
		<button type="button" class="gw-sus__config" data-qp="config" aria-pressed="${config}"
			aria-label="${t(config ? "GRIMWILD.UI.doneConfiguring" : "GRIMWILD.UI.configurePools")}"
			data-tooltip="${t(config ? "GRIMWILD.UI.doneConfiguring" : "GRIMWILD.UI.configurePools")}">
			<i class="fa-solid ${config ? "fa-check" : "fa-gear"}" inert></i></button>` : "";

		// Keep the horizontal scroll of the pool strip across re-renders.
		const scroll = control.querySelector(".gw-qps__list")?.scrollLeft ?? 0;
		control.classList.toggle("is-config", config);
		control.innerHTML = `${suspense}${showPools ? poolsHTML(isGM) : ""}${gear}`;
		const list = control.querySelector(".gw-qps__list");
		if (list) list.scrollLeft = scroll;

		if (Number.isFinite(changed) && !isGM) {
			const display = control.querySelector(".gw-sus__display");
			display?.classList.add("flash");
			setTimeout(() => display?.classList.remove("flash"), 600);
		}
	}
}

export const SUSPENSE_TRACKER = new SuspenseTracker();
