import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'node:process'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV)
    },
    plugins: [react()],
    test: {
      browser: {
        provider: 'playwright',
        enabled: true,
        headless: true,
        instances: [
          {
            browser: 'chromium'
          }
        ],
        viewport: {
          width: 1440, 
          height: 900
        }
      }
    }
  }
})
