import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), solid()],
  server: {
    host: true,
  },
  build: {
    lib: {
      entry: 'src/index.tsx',
      name: 'SimpleQuest',
    },
    rollupOptions: {
      output: [
        {
          format: 'iife',
          name: 'SimpleQuest',
          entryFileNames: 'simple-quest.js',
          inlineDynamicImports: true,
        },
        {
          format: 'es',
          entryFileNames: 'simple-quest.esm.js',
        },
      ],
    },
  },
})
