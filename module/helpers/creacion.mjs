/**
 * Creación de personajes: listas del reglamento y generación aleatoria.
 *
 * Trasfondos y saberes, crisol de ascendencia, arcos y vínculos proceden de Grimwild (Free Edition
 * v1.4, cap. 1 y 3) © J.D. Maxwell / Oddity Press, CC BY 4.0. Nombres y rasgos de aspecto son
 * listas propias de esta traducción. Todo va por idioma (es / en); las reglas (claves de rasgos,
 * deseos, atributos) no dependen del idioma.
 */

/** Atributos al crear: 1 en cada uno y 4 puntos más, máximo 3. */
export const ATRIBUTOS = { base: 1, puntos: 4, maximo: 3, claves: ["bra", "agi", "wit", "pre"] };

const LISTAS = {
	es: {
		trasfondos: [
			["Charlatán", "gracias sociales", "detectar incautos", "desvíos oportunos"],
			["Clero", "alegorías", "señales de pecado", "religiones del mundo"],
			["Plebeyo", "costumbres locales", "sabiduría práctica", "supersticiones"],
			["Artesano", "calidad de fabricación", "contactos comerciales", "desgaste"],
			["Errante", "encuentros fortuitos", "relatos de tierras lejanas", "disposición del terreno"],
			["Artista", "leyendas y relatos", "comportamiento de multitudes", "presencia escénica"],
			["Excéntrico", "verdades incómodas", "datos aleatorios", "aperitivos extraños"],
			["Sanador", "comidas reconfortantes", "signos de enfermedad", "propiedades herbales"],
			["Cazador", "supervivencia", "rastros", "comportamiento de la fauna"],
			["Marinero", "saber náutico", "navegación", "patrones meteorológicos"],
			["Místico", "profecías antiguas", "líneas ley", "simbología"],
			["Noble", "diplomacia", "contactos influyentes", "lujos"],
			["Golfillo", "caminos ocultos", "rumores", "astucia callejera"],
			["Sabio", "historias antiguas", "pueblos del mundo", "filosofía"],
			["Granuja", "rutas de escape", "señales de debilidad", "contactos turbios"],
			["Comerciante", "gustos culturales", "deseos de la gente", "mercancías raras"],
			["Guerrero", "planes de batalla", "contactos militares", "historias de guerra"]
		],
		// Crisol de ascendencia: pueblo + tierra + carácter. Los adjetivos son invariables en género
		// ([singular, plural]) para concordar con cualquier tierra.
		pueblos: ["Vagabundos", "Gentes pájaro", "Caminantes", "Trasgos", "Isleños", "Pescadores", "Jinetes", "Clanes",
			"Navegantes", "Tribus", "Guardianes", "Colonos", "Gnomos", "Peregrinos", "Gentes tortuga", "Ciudadanos",
			"Merodeadores", "Tallistas", "Enanos", "Tiflin", "Goliats", "Dracónidos", "Gentes de oficio", "Gentes del valle",
			"Nómadas", "Urbanitas", "Humanos", "Medianos", "Mercaderes", "Oteadores del cielo", "Elfos", "Orcos",
			"Gentes del bosque", "Gentes de las cuevas", "Saqueadores", "Proscritos"],
		caracteres: [["Retorcido", "Retorcidos"], ["de Acero", "de Acero"], ["Verdeante", "Verdeantes"],
			["Dorado", "Dorados"], ["Esmeralda", "Esmeralda"], ["Ardiente", "Ardientes"], ["Frondoso", "Frondosos"],
			["Flotante", "Flotantes"], ["Carmesí", "Carmesíes"], ["Quebrado", "Quebrados"], ["Encantado", "Encantados"],
			["Hechizado", "Hechizados"], ["Calcinado", "Calcinados"], ["Resonante", "Resonantes"],
			["Brumoso", "Brumosos"], ["Titilante", "Titilantes"], ["Lejano", "Lejanos"], ["Silente", "Silentes"],
			["Ondulante", "Ondulantes"], ["Fecundo", "Fecundos"], ["Grande", "Grandes"], ["Hundido", "Hundidos"],
			["Costero", "Costeros"], ["Sombrío", "Sombríos"], ["Abisal", "Abisales"], ["Desolado", "Desolados"],
			["Rocoso", "Rocosos"], ["Ventoso", "Ventosos"], ["Aullante", "Aullantes"], ["Eterno", "Eternos"],
			["Salvaje", "Salvajes"], ["Sereno", "Serenos"], ["Susurrante", "Susurrantes"], ["Lúgubre", "Lúgubres"],
			["Próspero", "Prósperos"], ["Inquieto", "Inquietos"]],
		// [artículo, nombre, femenino, plural]
		tierras: [["las", "Cumbres", 1, 1], ["la", "Confederación", 1, 0], ["los", "Fiordos", 0, 1], ["la", "Costa", 1, 0],
			["las", "Tierras Yermas", 1, 1], ["las", "Ciénagas", 1, 1], ["el", "Reino", 0, 0], ["las", "Tierras Salvajes", 1, 1],
			["la", "Marisma", 1, 0], ["las", "Islas", 1, 1], ["los", "Matorrales", 0, 1], ["la", "Ciudad de la Selva", 1, 0],
			["el", "Desierto", 0, 0], ["los", "Cañones", 0, 1], ["las", "Tierras Altas", 1, 1], ["las", "Cavernas", 1, 1],
			["los", "Pantanos", 0, 1], ["la", "Frontera", 1, 0], ["las", "Llanuras", 1, 1], ["el", "Norte", 0, 0],
			["los", "Páramos", 0, 1], ["las", "Ruinas", 1, 1], ["las", "Hondonadas", 1, 1], ["el", "Inframundo", 0, 0],
			["el", "Mar", 0, 0], ["las", "Praderas", 1, 1], ["los", "Puestos Avanzados", 0, 1], ["los", "Acantilados", 0, 1],
			["la", "Ciudad Minera", 1, 0], ["las", "Riberas", 1, 1], ["los", "Glaciares", 0, 1], ["las", "Arenas", 1, 1],
			["los", "Eriales", 0, 1], ["la", "Coalición", 1, 0], ["las", "Tierras Malditas", 1, 1], ["las", "Arboledas", 1, 1]],
		arcos: ["Labrarme una reputación", "Explorar el mundo", "Terminar la misión", "Enmendar las cosas",
			"Satisfacer mis deseos", "Descubrir la verdad", "Desmoronarme", "Dudar de mis convicciones",
			"Alimentar mis vicios", "Coquetear con la traición", "Guardar un secreto", "Sobrevivir a la tormenta",
			"Aceptar el cambio", "Escapar de mi pasado", "Encontrar mi lugar", "Simplemente disfrutar de la vida",
			"Demostrar mi valía", "Saldar deudas"],
		intensidades: ["Profundo", "Complejo", "Creciente", "Discreto", "Juguetón", "Tenso"],
		naturalezas: ["afecto", "camaradería", "curiosidad", "dudas", "respeto", "rivalidad"],
		aspecto: ["manos fuertes", "ojos amables", "voz ronca", "cicatriz en la ceja", "trenzas con cuentas",
			"sonrisa torcida", "manos manchadas de tinta", "capa remendada", "mirada inquieta", "tatuajes rúnicos",
			"risa escandalosa", "andar silencioso", "pelo canoso prematuro", "anillos en todos los dedos",
			"olor a humo de leña", "nariz rota", "pecas por todas partes", "voz melodiosa", "hombros enormes",
			"barba trenzada", "ojos de distinto color", "botas gastadas", "sombrero de ala ancha", "mirada penetrante",
			"dedos ágiles", "piel curtida por el sol", "colgante que nunca se quita", "cojera leve", "susurra al hablar",
			"postura impecable", "cabeza rapada", "dientes de oro", "manto de pieles", "ojeras profundas",
			"siempre masticando algo", "gestos teatrales"],
		nombres: ["Aldric", "Brisa", "Corvin", "Dalia", "Eber", "Fenna", "Garrick", "Hesper", "Idris", "Jora",
			"Kestrel", "Liora", "Maren", "Nils", "Odra", "Perrin", "Quilla", "Rook", "Sable", "Tamsin", "Ulric",
			"Vesna", "Wren", "Yara", "Zeph", "Ansel", "Bryn", "Cassia", "Dorian", "Elowen", "Faro", "Greta",
			"Hale", "Isolde", "Juniper", "Kael", "Lark", "Mira", "Nox", "Orla"],
		sobrenombres: ["el Zorro", "la Grulla", "Manoslentas", "Ojodehalcón", "Pasoligero", "Media Luna",
			"Tres Dedos", "Barbagris", "Cantarrana", "Hojaseca", "Piedrafría", "Vientonorte"]
	},
	en: {
		trasfondos: [
			["Charlatan", "social graces", "spotting marks", "timely misdirects"],
			["Clergy", "allegories", "signs of sin", "faiths of the world"],
			["Commoner", "local customs", "practical wisdom", "superstitions"],
			["Crafter", "crafting quality", "trade contacts", "wear and tear"],
			["Drifter", "chance meetings", "faraway tales", "lay of the land"],
			["Entertainer", "legends and tales", "crowd behaviors", "stage presence"],
			["Eccentric", "hard truths", "random facts", "strange snacks"],
			["Healer", "comfort foods", "signs of ailment", "herbal properties"],
			["Hunter", "survival", "tracks", "wildlife behavior"],
			["Mariner", "nautical lore", "seafaring", "weather patterns"],
			["Mystic", "ancient prophecies", "leylines", "symbology"],
			["Noble", "diplomacy", "influential contacts", "luxuries"],
			["Ragamuffin", "hidden paths", "rumors", "street smarts"],
			["Sage", "ancient histories", "peoples of the world", "philosophy"],
			["Scoundrel", "escape routes", "signs of weakness", "shady connections"],
			["Trader", "cultural tastes", "people's desires", "rare goods"],
			["Warrior", "battle plans", "military contacts", "war stories"]
		],
		pueblos: ["Vagrants", "Birdfolk", "Wayfarers", "Goblins", "Islanders", "Fisherfolk", "Riders", "Clans",
			"Seafarers", "Tribes", "Keepers", "Settlers", "Gnomes", "Pilgrims", "Turtlefolk", "Citizens", "Marauders",
			"Carvers", "Dwarves", "Tieflings", "Goliaths", "Dragonborn", "Tradesfolk", "Valleyfolk", "Nomads",
			"Cityfolk", "Humans", "Halflings", "Merchants", "Skywatchers", "Elves", "Orcs", "Forestfolk", "Cavefolk",
			"Raiders", "Outcasts"],
		caracteres: ["Twisted", "Steel", "Verdant", "Golden", "Emerald", "Burning", "Lush", "Floating", "Crimson",
			"Shattered", "Haunted", "Enchanted", "Scorched", "Echoing", "Misty", "Glimmering", "Distant", "Silent",
			"Rolling", "Bountiful", "Great", "Sunken", "Coastal", "Gloomy", "Abyssal", "Desolate", "Rocky",
			"Windswept", "Howling", "Eternal", "Feral", "Serene", "Whispering", "Grim", "Prosperous", "Restless"]
			.map((m) => [m, m]),
		tierras: ["Peaks", "Confederacy", "Fjords", "Coast", "Badlands", "Boglands", "Kingdom", "Wilds", "Marsh",
			"Isles", "Thickets", "Jungletown", "Desert", "Canyons", "Highlands", "Caverns", "Fenlands", "Borderlands",
			"Plains", "North", "Moors", "Ruins", "Hollows", "Underworld", "Sea", "Meadows", "Outposts", "Cliffs",
			"Boomtown", "Riverlands", "Glaciers", "Sands", "Wastelands", "Coalition", "Blightlands", "Groves"]
			.map((l) => ["the", l, 0, 0]),
		arcos: ["Build a Reputation", "Explore the World", "Finish the Mission", "Make Things Right", "Satisfy Desires",
			"Uncover the Truth", "Come Unraveled", "Doubt Convictions", "Feed My Vices", "Flirt with Betrayal",
			"Keep a Secret", "Survive the Storm", "Embrace Change", "Escape My Past", "Find Belonging",
			"Just Enjoy Life", "Prove Myself", "Settle Debts"],
		intensidades: ["Deep", "Complex", "Growing", "Lowkey", "Playful", "Tense"],
		naturalezas: ["affection", "camaraderie", "curiosity", "doubts", "respect", "rivalry"],
		aspecto: ["strong hands", "kind eyes", "gravelly voice", "scarred eyebrow", "beaded braids", "crooked smile",
			"ink-stained hands", "patched cloak", "restless gaze", "runic tattoos", "booming laugh", "silent step",
			"early grey hair", "rings on every finger", "smells of woodsmoke", "broken nose", "freckles everywhere",
			"lilting voice", "huge shoulders", "braided beard", "mismatched eyes", "worn-out boots", "wide-brimmed hat",
			"piercing stare", "nimble fingers", "sun-weathered skin", "pendant never removed", "slight limp",
			"speaks in whispers", "perfect posture", "shaved head", "gold teeth", "fur mantle", "dark circles",
			"always chewing something", "theatrical gestures"],
		nombres: ["Aldric", "Breeze", "Corvin", "Dahlia", "Eber", "Fenna", "Garrick", "Hesper", "Idris", "Jora",
			"Kestrel", "Liora", "Maren", "Nils", "Odra", "Perrin", "Quilla", "Rook", "Sable", "Tamsin", "Ulric",
			"Vesna", "Wren", "Yara", "Zeph", "Ansel", "Bryn", "Cassia", "Dorian", "Elowen", "Faro", "Greta",
			"Hale", "Isolde", "Juniper", "Kael", "Lark", "Mira", "Nox", "Orla"],
		sobrenombres: ["the Fox", "the Crane", "Slowhands", "Hawkeye", "Lightfoot", "Half-Moon", "Three-Fingers",
			"Greybeard", "Frogsong", "Dryleaf", "Coldstone", "Northwind"]
	}
};

/**
 * Listas del idioma activo (castellano si el cliente está en español; inglés en otro caso).
 * @returns {typeof LISTAS.es}
 */
export function listas() {
	return LISTAS[game.i18n.lang?.startsWith("es") ? "es" : "en"];
}

/**
 * Elemento al azar.
 * @template T
 * @param {T[]} lista
 * @returns {T}
 */
export const alAzar = (lista) => lista[Math.floor(Math.random() * lista.length)];

/**
 * `n` elementos distintos al azar.
 * @template T
 * @param {T[]} lista
 * @param {number} n
 * @returns {T[]}
 */
export function variosAlAzar(lista, n) {
	const copia = [...lista];
	for (let i = copia.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[copia[i], copia[j]] = [copia[j], copia[i]];
	}
	return copia.slice(0, n);
}

/**
 * Ascendencia del crisol: pueblo + tierra + carácter, con concordancia en castellano.
 * @returns {string}
 */
export function ascendenciaAlAzar() {
	const L = listas();
	const pueblo = alAzar(L.pueblos);
	const [articulo, tierra, , plural] = alAzar(L.tierras);
	const caracter = alAzar(L.caracteres)[plural ? 1 : 0];
	if (L === LISTAS.en) return `${pueblo} of the ${caracter} ${tierra}`;
	const de = articulo === "el" ? "del" : `de ${articulo}`;
	return `${pueblo} ${de} ${tierra} ${caracter}`;
}

/**
 * Trasfondo al azar: uno de la tabla o, a veces, una ascendencia con tres saberes tomados de la tabla.
 * @param {string[]} [excluir]  Nombres ya elegidos.
 * @returns {{name: string, wises: string[]}}
 */
export function trasfondoAlAzar(excluir = []) {
	const L = listas();
	if (Math.random() < 0.25) {
		const saberes = variosAlAzar(L.trasfondos.flatMap((t) => t.slice(1)), 3);
		return { name: ascendenciaAlAzar(), wises: saberes };
	}
	const opciones = L.trasfondos.filter((t) => !excluir.includes(t[0]));
	const [name, ...wises] = alAzar(opciones);
	return { name, wises };
}

/**
 * Reparto al azar: 1 en cada atributo y 4 puntos más, sin pasar de 3.
 * @returns {Record<string, number>}
 */
export function atributosAlAzar() {
	const valores = Object.fromEntries(ATRIBUTOS.claves.map((k) => [k, ATRIBUTOS.base]));
	let puntos = ATRIBUTOS.puntos;
	while (puntos > 0) {
		const libres = ATRIBUTOS.claves.filter((k) => valores[k] < ATRIBUTOS.maximo);
		valores[alAzar(libres)]++;
		puntos--;
	}
	return valores;
}

/**
 * Estado del reparto de atributos.
 * @param {Record<string, number>} valores
 * @returns {{restantes: number, valido: boolean}}
 */
export function estadoAtributos(valores) {
	const gastados = ATRIBUTOS.claves.reduce((t, k) => t + (Number(valores[k]) - ATRIBUTOS.base), 0);
	const enRango = ATRIBUTOS.claves.every((k) => valores[k] >= ATRIBUTOS.base && valores[k] <= ATRIBUTOS.maximo);
	const restantes = ATRIBUTOS.puntos - gastados;
	return { restantes, valido: enRango && restantes === 0 };
}

/**
 * Nombre al azar.
 * @returns {string}
 */
export function nombreAlAzar() {
	const L = listas();
	const nombre = alAzar(L.nombres);
	return Math.random() < 0.4 ? `${nombre} ${alAzar(L.sobrenombres)}` : nombre;
}

/**
 * Tres claves distintas de una lista de opciones: dos «sí» y una «no».
 * @param {string[]} claves
 * @returns {{si: string[], no: string}}
 */
export function dosYUno(claves) {
	const [a, b, c] = variosAlAzar(claves, 3);
	return { si: [a, b], no: c };
}

/**
 * Vínculo al azar.
 * @returns {string}
 */
export function vinculoAlAzar() {
	const L = listas();
	return `${alAzar(L.intensidades)} ${alAzar(L.naturalezas)}`;
}
