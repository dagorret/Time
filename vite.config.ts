import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss()
  ],
  build: {
    lib: {
      // Este es el archivo que exporta tus TiButton, TiInput, etc.
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TimeUI',
      // El nombre de los archivos que se generarán
      fileName: 'time-ui'
    },
    rollupOptions: {
      // IMPORTANTE: No metemos Vue dentro de la librería
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
