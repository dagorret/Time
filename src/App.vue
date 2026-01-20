<script setup lang="ts">
import TiLayout from './components/TiLayout.vue'
import TiButton from './components/TiButton.vue'
import TiTableLazy from './components/TiTableLazy.vue'

const toggleMode = () => {
  document.documentElement.classList.toggle('dark');
}
</script>

<template>
  <TiLayout title="TIME OS - Dashboard">
    <template #sidebar>
      <div class="space-y-2">
        <div class="p-3 bg-int-primary/10 text-int-primary rounded-lg flex items-center gap-3">
          <i class="pi pi-th-large"></i>
          <span class="font-medium">Dashboard</span>
        </div>
        <div class="p-3 text-tx-med hover:bg-ui-bg-panel rounded-lg flex items-center gap-3 cursor-pointer transition-colors">
          <i class="pi pi-users"></i>
          <span>Usuarios</span>
        </div>
      </div>
    </template>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="md:col-span-2 bg-ui-bg-panel border border-border-thin p-8 rounded-2xl">
        <h1 class="text-3xl font-bold text-tx-high mb-4">Bienvenido, Carlos</h1>
        <p class="text-tx-med mb-6">El sistema Time está operando correctamente con arquitectura de tokens.</p>
        <TiButton @click="toggleMode" label="Cambiar Modo" icon="pi pi-refresh" />
      </div>

      <div class="bg-gradient-to-br from-int-primary to-blue-700 p-8 rounded-2xl shadow-lg">
        <h3 class="font-bold text-white mb-2">Estado del Sistema</h3>
        <p class="text-white/80 text-sm">Conectado al puerto 8090 (Laravel Package).</p>
      </div>
    </div>

    <div class="mt-8 bg-ui-bg-panel border border-border-thin rounded-2xl overflow-hidden">
      <div class="p-6 border-b border-border-thin">
        <h3 class="text-tx-high font-bold text-xl">Logs de Auditoría (10,500 registros)</h3>
      </div>
      <div class="p-0">
        <TiTableLazy 
          url="http://localhost:8090/api/ti-table" 
          :rows="15"
        />
      </div>
    </div>
  </TiLayout>
</template>
