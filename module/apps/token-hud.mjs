
export class GrimwildTokenHud extends foundry.applications.hud.TokenHUD {
	static DEFAULT_OPTIONS = {
		...super.DEFAULT_OPTIONS,
		actions: {
			spotlight: GrimwildTokenHud.#onSpotlight
		}
	};

	static PARTS = {
		hud: {
			root: true,
			template: "systems/grimwild/templates/hud/token-hud.hbs"
		}
	};

	/** @override */
	async _prepareContext(options) {
		const context = await super._prepareContext(options);
		context.inCombat = Boolean(game.combats.viewed?.turns.some((c) => c.tokenId === this.object?.id));
		return context;
	}

	static #onSpotlight(event, target) {
		const combatant = game.combats.viewed?.turns.find((c) => c.tokenId === this.object.id);
		if (combatant) game.combats.viewed.spotlightCombatant(combatant.id);
		this.close();
	}
}
