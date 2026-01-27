import { App } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

import 'primeicons/primeicons.css';

// Importaciones con nombres EXACTOS según tu comando ls
import TiTableLazy from './components/TiTableLazy.vue';
import TiInput from './components/TiInput.vue'; 
import TiButton from './components/TiButton.vue';
import TiLayout from './components/TiLayout.vue';

export default {
    install(app: App) {
        // Configuramos PrimeVue (Esto soluciona el error de $primevue undefined)
        app.use(PrimeVue, {
            theme: {
                preset: Aura,
                options: { darkModeSelector: 'system' }
            }
        });

        // Registramos los componentes que existen en tu carpeta
        app.component('ti-table-lazy', TiTableLazy);
        app.component('ti-input', TiInput);
        app.component('ti-button', TiButton);
        app.component('ti-layout', TiLayout);
    }
};
