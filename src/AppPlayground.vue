<script setup lang="ts">
import { ref } from 'vue';
import TiInput from './components/TiInput.vue';
import TiButton from './components/TiButton.vue';
import TiSelect from './components/TiSelect.vue';

const currentSkin = ref('skin-modern');
const nombre = ref('');
const ciudad = ref(null);

const opcionesCiudades = [
  { nombre: 'Buenos Aires', id: 'ba' },
  { nombre: 'Córdoba', id: 'cb' },
  { nombre: 'Rosario', id: 'rs' }
];
</script>

<template>
  <div :class="currentSkin" class="playground-root">
    <div class="test-card">
      <header class="card-header">
        <h2 class="ti-title">Configuración</h2>
        <div class="theme-selector">
          <TiButton label="Modern" @click="currentSkin = 'skin-modern'" :variant="currentSkin === 'skin-modern' ? 'primary' : 'outline'" />
          <TiButton label="Classic" @click="currentSkin = 'skin-classic'" :variant="currentSkin === 'skin-classic' ? 'primary' : 'outline'" />
        </div>
      </header>

      <div class="card-body">
        <TiInput v-model="nombre" label="Nombre del Proyecto" placeholder="Ej: Sistema Alpha" />

        <TiSelect
            v-model="ciudad"
            :options="opcionesCiudades"
            optionLabel="nombre"
            label="Sede Central"
            placeholder="Seleccione ciudad..."
        />

        <div class="preview-box">
          <p><strong>Input:</strong> {{ nombre || '---' }}</p>
          <p><strong>Select:</strong> {{ ciudad ? ciudad.nombre : '---' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.playground-root {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--ti-bg-app);
  padding: 20px;
}

.test-card {
  width: 100%;
  max-width: 450px;
  background-color: var(--ti-bg-card);
  border: 1px solid var(--ti-border-color);
  border-radius: var(--ti-radius);
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.card-header {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.theme-selector {
  display: flex;
  gap: 0.5rem;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.preview-box {
  margin-top: 1rem;
  padding: 1rem;
  background-color: var(--ti-bg-app);
  border-radius: var(--ti-radius);
  font-size: 13px;
  border: 1px dashed var(--ti-border-color);
}
</style>