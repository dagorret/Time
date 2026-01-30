<script setup lang="ts">
import TiLayout from './components/TiLayout.vue'; // Ajusta la ruta según tu carpeta
import TiTableLazy from './components/TiTableLazy.vue'; // Ajusta la ruta según tu carpeta
import {
  IconLayoutDashboard,
  IconUsers,
  IconSettings,
  IconActivity
} from '@tabler/icons-vue';

// Configuración de navegación para el Sidebar
const navigation = [
  { label: 'Dashboard', icon: IconLayoutDashboard, path: '/' },
  { label: 'Usuarios', icon: IconUsers, path: '/usuarios' },
  { label: 'Logs de Sistema', icon: IconActivity, path: '/logs' },
  { label: 'Configuración', icon: IconSettings, path: '/config' },
];
</script>

<template>
  <TiLayout
      title="Time Lab"
      :navItems="navigation"
  >
    <div class="space-y-6">

      <TiTableLazy
          url="/api/ti-table.json"
          :rows="15"
      />

    </div>
  </TiLayout>
</template>

<style>
/* Estilos globales mínimos para asegurar que el body no tenga márgenes */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #f6f8fb; /* El fondo oficial Tabler */
}

#app {
  height: 100%;
}
</style>