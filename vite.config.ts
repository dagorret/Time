import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

// Función para Lightning CSS
function browserslistToLightning(version: number) {
  return version << 16;
}

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  server: {
    // Esto evita que el error te bloquee la pantalla mientras programas
    hmr: {
      overlay: false
    }
  },
  build: {
    cssMinify: 'lightningcss',
    assetsInlineLimit: 102400,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: {
        safari: browserslistToLightning(15),
        chrome: browserslistToLightning(90),
        edge: browserslistToLightning(90),
        firefox: browserslistToLightning(102),
      },
      drafts: {
        customMedia: true
      }
    }
  }
});