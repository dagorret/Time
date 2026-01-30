<script setup lang="ts">
import { ref } from 'vue';
import TiNavigation from './components/TiNavigation.vue';
import TiTableLazy from './components/TiTableLazy.vue';
import TiButton from './components/TiButton.vue';

const currentSkin = ref('skin-modern');
const filters = ref({ search: '', status: null });

const statusOptions = [
  { label: 'Activo', value: 'Activo' },
  { label: 'Bloqueado', value: 'Bloqueado' },
  { label: 'Inactivo', value: 'Inactivo' }
];

const columnas = [
  { field: 'id', header: 'ID' },
  { field: 'nombre', header: 'CLIENTE' },
  { field: 'estado', header: 'ESTADO' },
  { field: 'ultimo_acceso', header: 'FECHA' }
];
</script>

<template>
  <div :class="currentSkin" class="app-viewport">
    <div class="container">

      <header class="main-header">
        <h1 class="logo">TIME<span>ADMIN</span></h1>
        <div class="skin-controls">
          <TiButton
              label="MODERN"
              @click="currentSkin = 'skin-modern'"
              :variant="currentSkin === 'skin-modern' ? 'primary' : 'outline'"
          />
          <TiButton
              label="CLASSIC"
              @click="currentSkin = 'skin-classic'"
              :variant="currentSkin === 'skin-classic' ? 'primary' : 'outline'"
          />
        </div>
      </header>

      <section class="nav-section">
        <TiNavigation
            v-model="filters"
            :statusOptions="statusOptions"
            :show-search="true"
            :show-filter="true"
        />
      </section>

      <section class="table-section">
        <TiTableLazy
            api-url="/api/ti-table.json"
            :filters="filters"
            :columns="columnas"
        />
      </section>

    </div>
  </div>
</template>

<style>
/* Estilos globales de layout para que no se peguen los elementos */
.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem; /* Este espacio es vital para la estética */
}

.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-weight: 900;
  letter-spacing: -1px;
  color: var(--ti-text-main);
}

.logo span {
  color: var(--ti-primary);
}

.skin-controls {
  display: flex;
  gap: 0.5rem;
}
</style>