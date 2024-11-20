import { defineConfig } from 'vitest/config'

import react from '@vitejs/plugin-react'

import tsconfigPaths from 'vite-tsconfig-paths'

import path from 'path'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: '/react-contacts-list/',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/__tests__/utils/setup.ts']
  },
  build: {
    outDir: path.join(__dirname, "docs"),
  },
})
