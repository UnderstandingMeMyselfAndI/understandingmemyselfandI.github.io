import { defineConfig, transformWithOxc } from 'vite'
import react from '@vitejs/plugin-react'
// import babel from '@rolldown/plugin-babel'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

import path from 'path'

const transformJsxInJs = () => ({
  name: 'transform-jsx-in-js',
  enforce: 'pre',
  async transform(code, id) {
    if (!id.match(/.*\.js$/)) {
      return null
    }

    return await transformWithOxc(code, id, {
      lang: 'jsx',
    })
import path from 'path'
import fs from 'fs'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { analyzer } from 'vite-bundle-analyzer'
import Sitemap from 'vite-plugin-sitemap'
import { VitePWA } from 'vite-plugin-pwa'
import { getDynamicRoutes, getShortcuts } from './getDynamicRoutes.js'
import browserslist from 'browserslist'
import { browserslistToTargets } from 'lightningcss'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
//version meta data
const metadata = JSON.parse(fs.readFileSync('./src/metadata.json', 'utf-8'))
const buildVersion = `${metadata.buildMajor}.${metadata.buildMinor}.${metadata.buildRevision}${metadata.buildTag ? '-' + metadata.buildTag : ''}`

export default defineConfig({
  root: './',
  publicDir: 'public',
  define: {
    __BUILD_METADATA__: JSON.stringify(metadata),
    __BUILD_VERSION__: JSON.stringify(buildVersion),
  },
  css: {
    transformer: 'lightningcss', // Use LightningCSS for transformations
    lightningcss: {
      targets: browserslistToTargets(browserslist('>= 0.25%')), // Browser compatibility
    },
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), transformJsxInJs()],
  build: {
    // <‑‑‑ change this line
    outDir: 'docs', // <-- your desired build directory
    // assetsDir: 'assets', // optional – sub‑folder for static assets
    sourcemap: false, // keep build size small
  },
  resolve: {
    alias: {
      // Root level
      '@/': path.resolve('./'),
      '@src': path.resolve('./src'),
      '@public': path.resolve('./public'),
      '@data': path.resolve('./src/data'),
      '@css': path.resolve('./src/css'),
      '@scss': path.resolve('./src/scss'),
      '@js': path.resolve('./src/js'),
      '@store': path.resolve('./src/store'),
      '@assets': path.resolve('./src/assets'),
      // Components
      '@qrcodes': path.resolve('./src/qrcodes'),
      '@components': path.resolve('./src/components'),
      '@ui': path.resolve('./src/components/ui'),
      '@activity': path.resolve('./src/components/activity'),
      '@icons': path.resolve('./src/components/icons'),
      '@routing': path.resolve('./src/components/routing'),
      '@buttons': path.resolve('./src/components/ui/buttons'),
      '@utils': path.resolve('./src/utils'),
      '@hooks': path.resolve('./src/hooks'),
    },
  },
})
