import { defineConfig, transformWithOxc } from 'vite'
import react from '@vitejs/plugin-react'
import { analyzer } from 'vite-bundle-analyzer'
import { VitePWA } from 'vite-plugin-pwa'
import { getDynamicRoutes, getShortcuts } from './getDynamicRoutes.js'
// import browserslist from 'browserslist'
// import { browserslistToTargets } from 'lightningcss'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import Sitemap from 'vite-plugin-sitemap'
import path from 'path'
import fs from 'fs'
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
  },
})
const metadata = JSON.parse(fs.readFileSync('./src/metadata.json', 'utf-8'))
const buildVersion = `${metadata.buildMajor}.${metadata.buildMinor}.${metadata.buildRevision}${metadata.buildTag ? '-' + metadata.buildTag : ''}`

// https://vite.dev/config/
export default defineConfig({
  root: './',
  publicDir: 'public',
  define: {
    __BUILD_METADATA__: JSON.stringify(metadata),
    __BUILD_VERSION__: JSON.stringify(buildVersion),
  },
  build: {
    outDir: 'docs',
    // assetsDir: 'assets', // optional sub‑folder for static assets
    sourcemap: false,
  },
  plugins: [
    react(),
    transformJsxInJs(),
    // nodePolyfills(),
    analyzer({
      analyzerMode: 'static',
      open: false,
    }),
    Sitemap({
      outDir: 'docs',
      hostname: 'https://app.ummi.now',
      dynamicRoutes: getDynamicRoutes(),
      changefreq: 'weekly',
      priority: 0.8,
      robots: [{ userAgent: '*', allow: '/' }],
    }),
    VitePWA({
      strategies: 'injectManifest', // Required for custom push logic
      srcDir: 'src',
      registerType: 'autoUpdate',
      injectRegister: 'script',
      filename: 'sw.js',
      devOptions: {
        enabled: true,
        type: 'module',
      },
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'masked-icon.svg',
        'bgs/*.avif',
        'icons/UmmiIcon.svg',
        'icons/UmmiIcon2.svg',
        'icons/pwa-192x192.png',
        'icons/pwa-512x512.png',
        '!icons/invert/**', // exclude
      ],
      // Where your custom sw.js lives
      injectManifest: {
        // This is crucial for offline support and background images
        globPatterns: ['index.html', '**/*.{js,css}'],
        globIgnores: ['**/dev/**'],
      },
      manifest: {
        filename: 'manifest.json',
        name: 'Ummi',
        short_name: 'Ummi',
        description:
          'Understanding Me Myself & I (Ummi) is a companion app providing information for mental health and addiction recovery. It provides quick access to tools and skills learnt in SMART, Cognitive Behavioural Therapy (CBT), Acceptance Commitment Therapy (ACT), Dialectical Behaviour Therapy (DBT) and others.',
        id: '/',
        scope: '/',
        start_url: '/index.html?fullscreen=true',
        launch_handler: {
          client_mode: ['navigate-existing', 'focus-existing', 'auto'],
        },
        capture_links: 'existing_client_event',
        url_handlers: [
          {
            origin: 'https://app.ummi.now',
          },
        ],
        shortcuts: getShortcuts(),
        handle_links: ['preferred', 'auto'],
        background_color: '#1b1b1b',
        theme_color: '#1b1b1b',
        orientation: 'portrait',
        lang: 'en',
        dir: 'ltr',
        display_override: ['window-controls-overlay'],
        display: 'fullscreen',
        share_target: {
          action: '/s',
          method: 'GET',
          enctype: 'application/x-www-form-urlencoded',
          params: {
            title: 'title',
            text: 'text',
          },
        },
        icons: [
          {
            src: '/icons/UmmiIcon2.svg',
            sizes: 'any',
            type: 'image/svg+xml',
          },

          {
            src: '/icons/pwa-512x512.avif',
            sizes: '512x512',
            type: 'image/avif',
          },
          {
            src: '/icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icons/pwa-192x192.avif',
            sizes: '192x192',
            type: 'image/avif',
          },
          {
            src: '/icons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/pwa-144x144.avif',
            sizes: '144x144',
            type: 'image/avif',
          },
          {
            src: '/icons/pwa-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: '/icons/pwa-96x96.avif',
            sizes: '96x96',
            type: 'image/avif',
          },
          {
            src: '/icons/pwa-96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: '/icons/pwa-72x72.avif',
            sizes: '72x72',
            type: 'image/avif',
          },
          {
            src: '/icons/pwa-72x72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: '/icons/pwa-64x64.avif',
            sizes: '64x64',
            type: 'image/avif',
          },
          {
            src: '/icons/pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: '/icons/pwa-48x48.avif',
            sizes: '48x48',
            type: 'image/avif',
          },
          {
            src: '/icons/pwa-48x48.png',
            sizes: '48x48',
            type: 'image/png',
          },
        ],
        categories: ['reference', 'health', 'lifestyle', 'health & fitness', 'education'],
        screenshots: [
          {
            src: '/screenshots/screenshot-1.webp',
            sizes: '412x915',
            type: 'image/webp',
            label: 'Welcome screen with Quick exit button and menu stack.',
          },
          {
            src: '/screenshots/screenshot-2.webp',
            sizes: '412x915',
            type: 'image/webp',
            label: 'Recovery tools listings.',
          },
          {
            src: '/screenshots/screenshot-2-1.webp',
            sizes: '412x915',
            type: 'image/webp',
            label: 'Create personal recovery toolbox.',
          },
          {
            src: '/screenshots/screenshot-3.webp',
            sizes: '412x915',
            type: 'image/webp',
            label: 'Recovery tools explained.',
          },
          {
            src: '/screenshots/screenshot-4.webp',
            sizes: '412x915',
            type: 'image/webp',
            label: '2x Private Days Counter with custom titles.',
          },
          {
            src: '/screenshots/screenshot-5.webp',
            sizes: '412x915',
            type: 'image/webp',
            label: 'Complete library of recovery lingo & phrases.',
          },
          {
            src: '/screenshots/screenshot-6.webp',
            sizes: '412x915',
            type: 'image/webp',
            label: 'Lingo & phrases explained in understandable language.',
          },
          {
            src: '/screenshots/screenshot-7.webp',
            sizes: '412x915',
            type: 'image/webp',
            label: 'App wide controls for privacy and data of all features.',
          },
          {
            src: '/screenshots/screenshot-8.webp',
            sizes: '412x915',
            type: 'image/webp',
            label: 'Permanetly delete data at any time via settings.',
          },
          {
            src: '/screenshots/screenshot-8-1.webp',
            sizes: '412x915',
            type: 'image/webp',
            label: 'Quick exit button loading google.com instantly.',
          },
          {
            src: '/screenshots/screenshot-9.webp',
            sizes: '412x915',
            type: 'image/webp',
            label: 'Quick access menu layout.',
          },
        ],
      },
    }),
  ],

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
