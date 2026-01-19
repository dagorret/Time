import TiButton from './components/TiButton.vue';
import TiInput from './components/TiInput.vue';
import './style.css'; // Importante para que viaje el CSS de Tailwind

export { TiButton, TiInput };

export default {
  install: (app: any) => {
    app.component('TiButton', TiButton);
    app.component('TiInput', TiInput);
  }
};
