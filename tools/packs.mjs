// Compila los compendios: src/packs/<pack>/*.json -> packs/<pack> (LevelDB que carga Foundry).
// `node tools/packs.mjs unpack` hace lo contrario (útil tras editar un compendio dentro de Foundry).
import { compilePack, extractPack } from "@foundryvtt/foundryvtt-cli";
import fs from "node:fs";
import path from "node:path";

const mode = process.argv[2] ?? "pack";
const SRC = "src/packs";
const DEST = "packs";

for (const name of fs.readdirSync(SRC)) {
	const src = path.join(SRC, name);
	const dest = path.join(DEST, name);
	if (!fs.statSync(src).isDirectory()) continue;
	if (mode === "pack") {
		fs.rmSync(dest, { recursive: true, force: true });
		await compilePack(src, dest, { log: false });
		console.log(`pack ${name}`);
	}
	else {
		await extractPack(dest, src, { log: false, clean: true });
		console.log(`unpack ${name}`);
	}
}
