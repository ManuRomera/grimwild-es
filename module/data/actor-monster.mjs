import GrimwildActorBase from "./base-actor.mjs";
import { DicePoolField } from "../helpers/schema.mjs";

export default class GrimwildMonster extends GrimwildActorBase {
	static LOCALIZATION_PREFIXES = [
		"GRIMWILD.Actor.base",
		"GRIMWILD.Actor.Monster"
	];

	static defineSchema() {
		const fields = foundry.data.fields;
		const schema = super.defineSchema();

		schema.role = new fields.StringField({
			required: false,
			initial: ""
		});
		schema.tier = new fields.StringField({
			initial: "tough"
		});

		schema.traits = new fields.ArrayField(new fields.StringField());
		schema.moves = new fields.ArrayField(new fields.StringField());

		schema.desires = new fields.ArrayField(new fields.SchemaField({
			are: new fields.BooleanField(),
			value: new fields.StringField()
		}));

		schema.sensories = new fields.SchemaField({
			colors: new fields.ArrayField(new fields.SchemaField({
				name: new fields.StringField(),
				color: new fields.ColorField()
			})),
			sights: new fields.StringField(),
			sounds: new fields.StringField(),
			smells: new fields.StringField()
		});

		schema.pool = new DicePoolField();
		// Monster tables: groups of d6 rows stored as arrays (table[group][row]), which is how the
		// compendium data and the sheet store them. (The previous object-based d66 schema did not
		// match that data, so compendium tables showed up empty.)
		schema.tables = new fields.ArrayField(new fields.SchemaField({
			name: new fields.StringField({ required: true, blank: true }),
			instructions: new fields.StringField({ required: false, blank: true }),
			table: new fields.ArrayField(new fields.ArrayField(new fields.StringField({ required: true, blank: true })))
		}));

		return schema;
	}

	/**
	 * Tables saved with the old object schema ({"1": {"1": "…"}}) become arrays.
	 * @param {object} source
	 * @returns {object}
	 */
	static migrateData(source) {
		const toArray = (value) => (value && typeof value === "object" && !Array.isArray(value)
			? Object.keys(value).sort((a, b) => Number(a) - Number(b)).map((k) => value[k])
			: value);
		for (const table of source.tables ?? []) {
			if (table?.table && !Array.isArray(table.table)) table.table = toArray(table.table);
			if (Array.isArray(table?.table)) table.table = table.table.map(toArray);
		}
		return super.migrateData(source);
	}

	prepareBaseData() {
		// Ensure desires exist.
		for (let i = 0; i < 2; i++) {
			if (!this.desires[i]) {
				this.desires[i] = {
					are: i < 1,
					value: ""
				};
			}
		}

		// Ensure colors exist.
		for (let i = 0; i < 3; i++) {
			if (!this.sensories.colors[i]) {
				this.sensories.colors[i] = {
					name: "",
					color: ""
				};
			}
		}
	}

}
