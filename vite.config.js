import path from "path";
import fs from "fs";
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import commonjs from "vite-plugin-commonjs";
// import {analyzer} from "vite-bundle-analyzer";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

const __dirname = path.dirname("./src");
//version meta data
const metadata = JSON.parse(fs.readFileSync("./src/metadata.json", "utf-8"));

// Generate list of all built font files
// const fontFiles = fs
// 	.readdirSync(path.resolve(__dirname, "docs/assets")) // ← after first build
// 	.filter(file => file.endsWith(".woff2") || file.endsWith(".woff"))
// 	.map(file => `/assets/${file}`);
// https://vitejs.dev/config/
export default defineConfig({
	root: "./",
	base: "./",
	publicDir: "public",
	define: {
		__BUILD_METADATA__: JSON.stringify(metadata),
		// __PRECACHE_FONTS__: JSON.stringify(fontFiles),
	},
	build: {
		minify: "terser",
		cssMinify: false,
		outDir: "./docs",
		emptyOutDir: true, // also necessary,
		commonjsOptions: {transformMixedEsModules: true}, // Change
		cssCodeSplit: true,
		rollupOptions: {
			output: {
				manualChunks: {
					"react-dom": ["react-dom"],
					"mui-icons": ["@mui/icons-material"],
					"mui-material": ["@mui/material"],
					"@gsap/react": ["@gsap/react"],
					gsap: ["gsap"],
				},
			},
		},
		watch: {
			include: ["src/**"],
			// excude: ["src/assets/**"],
			excude: ["node_modules/**", "dist/**"],

			clearScreen: false,
			skipWrite: false,
		},
	},
	plugins: [react(), commonjs(), cssInjectedByJsPlugin() /*, analyzer() uncomment for bundle analyzer*/],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src/"),
			icons: path.resolve(__dirname, "./src/components/icons/"),
			buttons: path.resolve(__dirname, "./src/components/ui/buttons/"),
			ui: path.resolve(__dirname, "./src/components/ui/"),
			components: path.resolve(__dirname, "./src/components/"),

			public: path.resolve(__dirname, "./public/"),
			data: path.resolve(__dirname, "./src/data/"),
			scss: path.resolve(__dirname, "./src/scss/"),
		},
	},
});
