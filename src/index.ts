import TiButton from './components/TiButton.vue';
import TiInput from './components/TiInput.vue';
import TiLayout from './components/TiLayout.vue'; // <--- Importar
import './style.css';

export { TiButton, TiInput, TiLayout }; // <--- Exportar para uso individual

export default {
  install: (app: any) => {
    app.component('TiButton', TiButton);
    app.component('TiInput', TiInput);
    app.component('TiLayout', TiLayout); // <--- Registrar para uso global
  }
};