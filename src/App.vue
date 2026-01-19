<script setup lang="ts">
import TiLayout from './components/TiLayout.vue'
import TiButton from './components/TiButton.vue'

// Función opcional para probar el cambio de modo desde la consola
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
        <TiButton @click="toggleMode" label="Cambiar Modo (Prueba)" icon="pi pi-refresh" />
      </div>

      <div class="bg-gradient-to-br from-int-primary to-blue-700 p-8 rounded-2xl shadow-abismo">
        <h3 class="font-bold text-white mb-2">Estado del Sistema</h3>
        <p class="text-white/80 text-sm">Todos los módulos de la librería están cargados y sincronizados.</p>
      </div>
    </div>

    <div class="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-border-thin pt-6 mt-6">

      <div class="p-6 border-2 border-int-primary/30 hover:border-int-primary bg-transparent text-tx-high rounded-xl transition-all cursor-pointer group">
        <h4 class="font-bold group-hover:text-int-primary transition-colors">1. Efecto Border-Focus</h4>
        <p class="text-sm text-tx-med">Usa borde con opacidad. En modo Light el texto se vuelve oscuro automáticamente.</p>
      </div>

      <div class="p-6 bg-ui-bg-panel shadow-abismo rounded-xl border border-border-heavy">
        <div class="w-10 h-10 bg-int-primary text-white rounded-full flex items-center justify-center mb-3">
          <i class="pi pi-bolt"></i>
        </div>
        <h4 class="font-bold text-tx-high">2. Elevación Semántica</h4>
        <p class="text-sm text-tx-med">bg-ui-bg-panel es azul oscuro en Dark y gris seda en Light.</p>
      </div>

      <div class="p-6 bg-ui-bg-base rounded-xl">
        <h4 class="text-tx-high font-bold mb-1 underline decoration-int-primary">3. Jerarquía de Texto</h4>
        <p class="text-tx-high font-medium text-xs uppercase tracking-widest">Énfasis Alto</p>
        <p class="text-tx-med text-sm italic">Énfasis Medio (Lectura larga)</p>
        <p class="text-tx-low text-xs mt-2">Énfasis Bajo (Metadatos o deshabilitado)</p>
      </div>

    </div>
  </TiLayout>
</template>