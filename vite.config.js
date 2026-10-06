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
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), transformJsxInJs()],
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
