import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import App from './App.vue';

// Elección de Preset y Estilos
import { SELECTED_PRESET } from './themes/presets';
import 'primeicons/primeicons.css';
import './style.css';
// Si skin-tabler ya está dentro de style.css via @import, esta línea sobra.
// Si no está en style.css, déjala aquí:
import './themes/skins/skin-tabler.css';

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: SELECTED_PRESET,
        options: {
            darkModeSelector: 'html.dark',
            cssLayer: {
                name: 'primevue',
                // AGREGAMOS 'skin-tabler' al orden oficial de la cascada
                order: 'tailwind-base, primevue, skin-tabler, tailwind-utilities'
            }
        }
    }
});

app.mount('#app');