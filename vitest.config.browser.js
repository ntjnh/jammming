import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        browser: {
            provider: 'playwright',
            enabled: true,
            headless: true,
            ui: false,
            instances: [{ browser: 'chromium' }],
            viewport: {
                width: 1440, 
                height: 900
            }
        },
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
