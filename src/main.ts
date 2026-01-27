import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import App from './App.vue';

// Elección de Preset y Estilos
import { SELECTED_PRESET } from './themes/presets';
import 'primeicons/primeicons.css';
import './style.css';

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: SELECTED_PRESET, // Usamos tu preset base
        options: {
            darkModeSelector: 'html.dark',
            cssLayer: {
                name: 'primevue',
                order: 'tailwind-base, primevue, tailwind-utilities'
            }
        }
    }
});

app.mount('#app');