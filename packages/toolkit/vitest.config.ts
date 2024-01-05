import { defineConfig } from 'vitest/config'

import path from 'path'
import { fileURLToPath } from 'url'

// No __dirname under Node ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.js'],
    include: ['./src/**/*.(spec|test).[jt]s?(x)'],
    alias: {
      '@reduxjs/toolkit/query/react': path.join(__dirname,'./src/query/react/index.ts'), // @remap-prod-remove-line
      '@reduxjs/toolkit/query': path.join(__dirname, './src/query/index.ts'), // @remap-prod-remove-line
      '@reduxjs/toolkit/react': path.join(__dirname, './src/index.ts'), // @remap-prod-remove-line
      '@reduxjs/toolkit': path.join(__dirname, './src/index.ts'), // @remap-prod-remove-line

      // this mapping is disabled as we want `dist` imports in the tests only to be used for "type-only" imports which don't play a role for jest
      //'^@reduxjs/toolkit/dist/(.*)$': '<rootDir>/src/*',
      '@internal': path.join(__dirname, './src'),
    },
    deps: {
      interopDefault: true,
      inline: ['redux', '@reduxjs/toolkit'],
    },
  },
})
