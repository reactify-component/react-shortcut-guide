import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import react from '@vitejs/plugin-react'

const { resolve } = require('path')

export default defineConfig({
  base: '',
  plugins: [
    react(),
    tsconfigPaths({
      projects: [
        resolve(__dirname, './example/tsconfig.json'),
        resolve(__dirname, './tsconfig.json'),
      ],
    }),
  ],
  root: resolve(__dirname, './example'),
  build: {
    emptyOutDir: true,

    rollupOptions: {
      input: resolve(__dirname, './example/index.html'),
    },
  },
})
