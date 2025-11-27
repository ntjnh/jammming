import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'node',
        globals: true,
        include: ['tests/node/**/*.test.{js,jsx}'],
        setupFiles: ['tests/node/setup.node.js']
    }
})
