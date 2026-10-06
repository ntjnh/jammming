import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
      headless: true,
      viewport: {
        width: 1440, 
        height: 900
      }
    },
    watch: false,
    ui: false,
    testTimeout: 4000,
    globals: true,
    include: ['tests/browser/**/*.test.{js,jsx}'],
    setupFiles: ['tests/browser/setup.browser.js']
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-dom/client']
  },
  server: {
    hmr: false
  }
})
