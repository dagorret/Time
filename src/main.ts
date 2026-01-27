import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import App from './App.vue';
// Prueba con esta forma (sin el .css al final si el paquete lo permite, o con la ruta completa)
import 'primeicons/primeicons.css';
import './style.css';

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: 'html.dark',
        }
    }
});

app.mount('#app');