import path from "path";
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import commonjs from "vite-plugin-commonjs";
const __dirname = path.dirname("./src");
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), commonjs(), cssInjectedByJsPlugin()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src/"),
			icons: path.resolve(__dirname, "./src/components/icons/"),
			buttons: path.resolve(__dirname, "./src/components/ui/buttons/"),
			ui: path.resolve(__dirname, "./src/components/ui/"),
			components: path.resolve(__dirname, "./src/components/"),
			public: path.resolve(__dirname, "./public/"),
		},
	},
});
