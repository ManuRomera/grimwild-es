import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// Compila src/vue en vue/components.vue.es.mjs (+ sourcemap).
// Vue no se empaqueta: se importa de lib/vue.esm-browser.js, que debe ser la misma
// versión que el paquete "vue" de devDependencies (compilador de plantillas).
export default defineConfig({
	plugins: [
		vue({
			template: {
				compilerOptions: {
					isCustomElement: (tag) => ["prose-mirror"].includes(tag)
				}
			}
		})
	],
	resolve: {
		alias: {
			"@/": `${path.resolve(import.meta.dirname, "src/vue")}/`
		}
	},
	build: {
		sourcemap: true,
		outDir: "./vue",
		emptyOutDir: true,
		lib: {
			entry: path.resolve(import.meta.dirname, "src/vue/index.mjs"),
			formats: ["es"],
			fileName: () => "components.vue.es.mjs"
		},
		rollupOptions: {
			external: ["vue"],
			output: {
				paths: { vue: "../lib/vue.esm-browser.js" }
			}
		}
	}
});
