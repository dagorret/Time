/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tx-low': '#525252',
        'tx-med': '#a3a3a3',
        'tx-high': '#ffffff',
        'ui-bg-base': '#0a0a0a',
        'ui-bg-panel': '#141414',
        'int-primary': '#3b82f6',
        'border-thin': 'rgba(255,255,255,0.1)',
      }
    },
  },
  plugins: [],
}
