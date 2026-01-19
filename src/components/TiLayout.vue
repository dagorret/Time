<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  title?: string;
}>();

const isSidebarOpen = ref(true);
</script>

<template>
  <div class="min-h-screen bg-[#0f172a] text-slate-200 font-sans flex flex-col">
    <header class="h-14 border-b border-slate-800 bg-[#1e293b]/50 backdrop-blur-md flex items-center justify-between px-4 sticky top-0 z-50">
      <div class="flex items-center gap-4">
        <button
            @click="isSidebarOpen = !isSidebarOpen"
            class="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400"
        >
          <i class="pi pi-bars text-xl"></i>
        </button>
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20">
            <span class="font-black text-white text-xs">T</span>
          </div>
          <span class="font-bold tracking-tight text-white">{{ title || 'TIME' }}</span>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <div class="text-right hidden sm:block">
          <p class="text-xs font-bold text-white leading-none">Carlos Dagorret</p>
          <p class="text-[10px] text-slate-500 uppercase tracking-widest">Architect</p>
        </div>
        <div class="w-9 h-9 rounded-full border-2 border-slate-700 p-0.5">
          <div class="w-full h-full rounded-full bg-gradient-to-tr from-blue-600 to-indigo-400 flex items-center justify-center text-[10px] font-bold text-white">
            CD
          </div>
        </div>
      </div>
    </header>

    <div class="flex flex-1">
      <aside
          :class="[
          'border-r border-slate-800 bg-[#0f172a] transition-all duration-300 overflow-hidden flex flex-col',
          isSidebarOpen ? 'w-64' : 'w-0 opacity-0'
        ]"
      >
        <nav class="p-4 flex-1 space-y-1">
          <slot name="sidebar">
            <div class="text-xs text-slate-500 font-bold px-3 py-2 uppercase tracking-wider">Main Menu</div>
            <div class="flex items-center gap-3 px-3 py-2 text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-lg cursor-pointer transition-all">
              <i class="pi pi-home"></i>
              <span>Dashboard</span>
            </div>
          </slot>
        </nav>
        <div class="p-4 border-t border-slate-800 text-[10px] text-slate-600 text-center uppercase tracking-widest font-medium">
          Powered by Time UI
        </div>
      </aside>

      <main class="flex-1 bg-[#020617] relative overflow-y-auto">
        <div class="p-6 lg:p-10 max-w-7xl mx-auto">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Estilos específicos si hicieran falta, pero Tailwind 4 hace casi todo */
</style>