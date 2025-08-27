import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    coverage: {
      reporter: ['text', 'json'],
      
    },
    globals: true,
    setupFiles: ['./src/__test__/setup.ts'],
    onConsoleLog(log) {
      if (log.includes('[dotenv@') && log.includes('injecting env')) {
        return false //Remove todos os log do .env de testes.
      }
    }
  },
})