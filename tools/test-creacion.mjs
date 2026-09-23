// Comprobación de la creación aleatoria: `npm test`.
import assert from "node:assert/strict";

for (const lang of ["es", "en"]) {
	globalThis.game = { i18n: { lang } };
	const c = await import(`../module/helpers/creacion.mjs?${lang}`);
	for (let i = 0; i < 2000; i++) {
		const a = c.atributosAlAzar();
		assert.ok(c.estadoAtributos(a).valido, `reparto inválido ${JSON.stringify(a)}`);
		assert.ok(Object.values(a).every((v) => v >= 1 && v <= 3));

		const t = c.trasfondoAlAzar();
		assert.ok(t.name && t.wises.length === 3 && t.wises.every(Boolean), `trasfondo incompleto ${JSON.stringify(t)}`);
		const otro = c.trasfondoAlAzar([t.name]);
		assert.notEqual(otro.name, t.name);

		const { si, no } = c.dosYUno(["a", "b", "c", "d"]);
		assert.equal(new Set([...si, no]).size, 3);

		const asc = c.ascendenciaAlAzar();
		assert.ok(!/\bde el\b|undefined/.test(asc), asc);
	}
	assert.deepEqual(c.estadoAtributos({ bra: 1, agi: 1, wit: 1, pre: 1 }), { restantes: 4, valido: false });
	assert.equal(c.estadoAtributos({ bra: 3, agi: 3, wit: 1, pre: 1 }).valido, true);
	assert.equal(c.estadoAtributos({ bra: 4, agi: 2, wit: 1, pre: 1 }).valido, false);
	console.log(`OK creación (${lang}): ${c.ascendenciaAlAzar()} · ${c.nombreAlAzar()}`);
}
