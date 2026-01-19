<script setup lang="ts">
import TiLayout from './components/TiLayout.vue'
import TiButton from './components/TiButton.vue'
</script>

<template>
  <TiLayout title="TIME OS - Dashboard">
    <template #sidebar>
      <div class="space-y-2">
        <div class="p-3 bg-blue-600/10 text-blue-400 rounded-lg flex items-center gap-3">
          <i class="pi pi-th-large"></i>
          <span class="font-medium">Dashboard</span>
        </div>
        <div class="p-3 text-slate-400 hover:bg-slate-800 rounded-lg flex items-center gap-3 cursor-pointer transition-colors">
          <i class="pi pi-users"></i>
          <span>Usuarios</span>
        </div>
      </div>
    </template>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="md:col-span-2 bg-slate-900/50 border border-slate-800 p-8 rounded-2xl">
        <h1 class="text-3xl font-bold text-white mb-4">Bienvenido, Carlos</h1>
        <p class="text-slate-400 mb-6">El sistema Time está operando correctamente dentro de Docker.</p>
        <TiButton label="Explorar Componentes" icon="pi pi-search" />
      </div>

      <div class="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-2xl shadow-lg shadow-blue-900/20">
        <h3 class="font-bold text-white mb-2">Estado del Sistema</h3>
        <p class="text-blue-100 text-sm opacity-80">Todos los módulos de la librería están cargados.</p>
      </div>
    </div>
  </TiLayout>
</template>