export const GRIMWILD = {};

/**
 * The set of Stat Scores used within the system.
 * @type {object}
 */
GRIMWILD.stats = {
	bra: "GRIMWILD.Stat.bra.long",
	agi: "GRIMWILD.Stat.agi.long",
	wit: "GRIMWILD.Stat.wit.long",
	pre: "GRIMWILD.Stat.pre.long"
};

GRIMWILD.statAbbreviations = {
	bra: "GRIMWILD.Stat.bra.abbr",
	agi: "GRIMWILD.Stat.agi.abbr",
	wit: "GRIMWILD.Stat.wit.abbr",
	pre: "GRIMWILD.Stat.pre.abbr"
};

GRIMWILD.traits = {
	brave: "GRIMWILD.Traits.brave",
	caring: "GRIMWILD.Traits.caring",
	confident: "GRIMWILD.Traits.confident",
	curious: "GRIMWILD.Traits.curious",
	gentle: "GRIMWILD.Traits.gentle",
	honest: "GRIMWILD.Traits.honest",
	honorable: "GRIMWILD.Traits.honorable",
	persistent: "GRIMWILD.Traits.persistent",
	protective: "GRIMWILD.Traits.protective",
	quiet: "GRIMWILD.Traits.quiet",
	rash: "GRIMWILD.Traits.rash",
	stubborn: "GRIMWILD.Traits.stubborn"
};

GRIMWILD.desires = {
	belonging: "GRIMWILD.Desires.belonging",
	glory: "GRIMWILD.Desires.glory",
	harmony: "GRIMWILD.Desires.harmony",
	honor: "GRIMWILD.Desires.honor",
	justice: "GRIMWILD.Desires.justice",
	knowledge: "GRIMWILD.Desires.knowledge",
	love: "GRIMWILD.Desires.love",
	power: "GRIMWILD.Desires.power",
	renown: "GRIMWILD.Desires.renown",
	thrills: "GRIMWILD.Desires.thrills",
	wealth: "GRIMWILD.Desires.wealth",
	wisdom: "GRIMWILD.Desires.wisdom"
};

export const isPhysicalStat = (stat) => {
	return stat === "bra" || stat === "agi";
};

export const isMentalStat = (stat) => {
	return !isPhysicalStat(stat);
};

/** i18n labels of the pool fields that can be rolled from sheets (used in chat flavours). */
const POOL_LABELS = {
	bloodied: "GRIMWILD.Damage.bloodied",
	rattled: "GRIMWILD.Damage.rattled",
	conditions: "GRIMWILD.Damage.conditions",
	pool: "GRIMWILD.UI.challengePool",
	failure: "GRIMWILD.Item.Challenge.FIELDS.failure.label"
};

/**
 * Chat flavour for a pool roll: "Condiciones: Tobillo torcido", "Talento: Escurridizo"…
 * Never shows internal keys.
 * @param {string} kind   Field key (conditions, pool…) or "item:<type>".
 * @param {string} name   Name of what is rolled.
 * @returns {string}
 */
export function poolFlavor(kind, name) {
	const key = kind?.startsWith("item:") ? `TYPES.Item.${kind.slice(5)}` : POOL_LABELS[kind];
	const label = key ? game.i18n.localize(key) : "";
	return [label, name].filter(Boolean).join(": ");
}
