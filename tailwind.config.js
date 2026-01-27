/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores de Interacción (el que falló al final)
        'int-primary': '#206bc4',

        // Colores de Texto
        'tx-high': '#1a1c23',
        'tx-med': '#626976',
        'tx-low': '#9ca3af',

        // Colores de UI / Fondos
        'ui-bg-deep': '#f4f6fa',
        'ui-card': '#ffffff',

        // Colores de Bordes
        'border-thin': '#e6e8eb',

        // Color Primario General
        'primary': '#206bc4',
      },
    },
  },
  plugins: [],
}