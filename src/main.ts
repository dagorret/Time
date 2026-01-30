// src/main.ts
import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import App from './AppPlayground.vue'; // Cambiamos a Playground para probar

// Estilos globales y capas
import './style.css';
import 'primeicons/primeicons.css';

// Importamos ambos skins para que el switch de clases (.skin-modern / .skin-classic) funcione
import './themes/skins/skin-tabler.css';
import './themes/skins/skin-classic.css';

import { SELECTED_PRESET } from './themes/presets';

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: SELECTED_PRESET,
        options: {
            darkModeSelector: 'html.dark',
            cssLayer: {
                name: 'primevue',
                // El orden es vital: tailwind-utilities al final para permitir ajustes rápidos
                order: 'tailwind-base, primevue, ti-skins, tailwind-utilities'
            }
        }
    }
});

app.mount('#app');