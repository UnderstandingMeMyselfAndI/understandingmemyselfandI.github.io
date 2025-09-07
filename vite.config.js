import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from 'vite-plugin-commonjs';
//import react from "@vitejs/plugin-react-swc"; *for swc install
const __dirname = path.dirname('./src');
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), commonjs(), cssInjectedByJsPlugin()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname),
			'@/ui/': path.resolve(__dirname) + '/src/components/ui',
		},
	},

	root: './',
	build: {
		minify: 'terser',
		outDir: './docs',
		emptyOutDir: true, // also necessary,
		commonjsOptions: { transformMixedEsModules: true }, // Change
	},
});
