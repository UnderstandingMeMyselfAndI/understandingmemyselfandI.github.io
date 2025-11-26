import path from "path";
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import commonjs from "vite-plugin-commonjs";
// import {analyzer} from "vite-bundle-analyzer";
const __dirname = path.dirname("./src");
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
// https://vitejs.dev/config/
export default defineConfig({
	root: "./",
	base: "./",
	publicDir: "public",
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
					"react-player": ["react-player"], // Group Vue and Vue Router into a 'vendor' chunk
					"media-chrome": ["media-chrome"],
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
