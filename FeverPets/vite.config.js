import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      'components': fileURLToPath(new URL('./src/components', import.meta.url)),
      'constants': fileURLToPath(new URL('./src/constants', import.meta.url)),
      'helpers': fileURLToPath(new URL('./src/helpers', import.meta.url)),
      'plugins': fileURLToPath(new URL('./src/plugins', import.meta.url)),
      'services': fileURLToPath(new URL('./src/services', import.meta.url)),
      'store': fileURLToPath(new URL('./src/store', import.meta.url)),
      'views': fileURLToPath(new URL('./src/views', import.meta.url))
    }
  },
  test: {
    environment: 'happy-dom',
    include: ['**/*.spec.js'],
    globals: true
  }
})