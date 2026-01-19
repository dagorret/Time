import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

// Usamos esta pequeña función para convertir versiones a formato u32 que entiende Rust
function browserslistToLightning(version: number) {
  return version << 16;
}

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  build: {
    // Usamos Lightning CSS para minificar el CSS final
    cssMinify: 'lightningcss',
    // 100kb de límite para que las fuentes de PrimeIcons se metan dentro del CSS
    assetsInlineLimit: 102400,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  css: {
    // Activamos Lightning CSS como transformador principal
    transformer: 'lightningcss',
    lightningcss: {
      // Definimos los objetivos sin usar arrays [] para evitar el error de "sequence"
      targets: {
        safari: browserslistToLightning(15),
        chrome: browserslistToLightning(90),
        edge: browserslistToLightning(90),
        firefox: browserslistToLightning(102), // Versión sólida de soporte extendido
      },
      drafts: {
        customMedia: true // Permite usar sintaxis moderna de Media Queries
      }
    }
  }
});