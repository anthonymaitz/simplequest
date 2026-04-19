import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), solid()],
  build: {
    lib: {
      entry: 'src/index.tsx',
      formats: ['iife'],
      name: 'SimpleQuest',
      fileName: () => 'simple-quest.js',
    },
    rollupOptions: {
      output: { inlineDynamicImports: true },
    },
  },
})
