import path from 'path';
import fs from 'fs';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { analyzer } from 'vite-bundle-analyzer';
import Sitemap from 'vite-plugin-sitemap';
import { VitePWA } from 'vite-plugin-pwa';
import getDynamicRoutes from './getDynamicRoutes.js';

//version meta data
const metadata = JSON.parse(fs.readFileSync('./src/metadata.json', 'utf-8'));

export default defineConfig({
  root: './',
  publicDir: 'public',
  define: {
    __BUILD_METADATA__: JSON.stringify(metadata),
  },
  build: {
    minify: 'terser',
    cssMinify: true,
    outDir: './docs',
    emptyOutDir: true,
    commonjsOptions: { transformMixedEsModules: true },
    cssCodeSplit: true,
    sourcemap: false, // Disabled for production
    rollupOptions: {
      treeshake: 'smallest',
      output: {
        manualChunks: {
          'react-dom': ['react-dom'],
          'mui-icons': ['@mui/icons-material'],
          'mui-material': ['@mui/material'],
          '@gsap/react': ['@gsap/react'],
          '@jmeirinkmarimed/age-gate': ['@jmeirinkmarimed/age-gate'],
          'react-lite-youtube-embed': ['react-lite-youtube-embed'],
          gsap: ['gsap'],
        },
      },
    },
    watch: {
      include: ['src/**'],
      exclude: ['node_modules/**', 'dist/**'],
      clearScreen: false,
      skipWrite: false,
    },
  },
  plugins: [
    react(),
    analyzer() /*, analyzer() uncomment for bundle analyzer*/,
    Sitemap({
      outDir: 'docs',
      hostname: 'https://dev.ummi.now',
      dynamicRoutes: getDynamicRoutes(),
      changefreq: 'weekly',
      priority: 0.8,
      robots: [{ userAgent: '*', allow: '/' }],
    }),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'script',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'DevUmmi',
        short_name: 'DevUmmi',
        description:
          'A companion app for Addiction Recovery, Mental Health and Wellbeing.',
        theme_color: '#819ec9',
        icons: [
          {
            src: 'icons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icons/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  server: {
    port: 5174,
    hmr: {
      host: 'localhost',
      clientPort: 5174,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve('./src/'),
      icons: path.resolve('./src/components/icons/'),
      buttons: path.resolve('./src/components/ui/buttons/'),
      ui: path.resolve('./src/components/ui/'),
      components: path.resolve('./src/components/'),
      public: path.resolve('./public/'),
      data: path.resolve('./src/data/'),
      scss: path.resolve('./src/scss/'),
    },
  },
});
