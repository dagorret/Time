<script setup lang="ts">
import { ref } from 'vue';

interface NavItem {
  label: string;
  icon: string;
  path: string;
  active?: boolean;
}

defineProps<{
  title?: string;
  userName?: string;
  userRole?: string;
  navItems?: NavItem[];
}>();

const isSidebarOpen = ref(true);
</script>

<template>
  <div class="min-h-screen bg-ui-bg-base text-tx-high font-sans flex flex-col">

    <header class="h-14 border-b border-border-thin bg-ui-bg-panel/50 backdrop-blur-md flex items-center justify-between px-4 sticky top-0 z-50">

      <div class="flex items-center gap-4">
        <button @click="isSidebarOpen = !isSidebarOpen"
                class="p-2 hover:bg-ui-bg-panel rounded-lg text-tx-med transition-colors cursor-pointer">
          <i class="pi pi-bars text-xl"></i>
        </button>

        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-int-primary rounded-lg flex items-center justify-center shadow-lg shadow-int-primary/20">
            <span class="font-black text-white text-xs">T</span>
          </div>
          <span class="font-bold tracking-tight text-tx-high">{{ title || 'TIME' }}</span>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <div class="text-right hidden sm:block">
          <p class="text-xs font-bold text-tx-high leading-none">Carlos Dagorret</p>
          <p class="text-[10px] text-tx-low uppercase tracking-widest">Architect</p>
        </div>
        <div class="w-9 h-9 rounded-full border-2 border-border-thin p-0.5">
          <div class="w-full h-full rounded-full bg-gradient-to-tr from-int-primary to-blue-400 flex items-center justify-center text-[10px] font-bold text-white">
            CD
          </div>
        </div>
      </div>
    </header>

    <div class="flex flex-1">
      <aside
          :class="[
          'border-r border-border-thin bg-ui-bg-base transition-all duration-300 overflow-hidden flex flex-col',
          isSidebarOpen ? 'w-64' : 'w-0 opacity-0'
        ]"
      >
        <nav class="p-4 flex-1 space-y-1">
          <slot name="sidebar">
            <div class="text-[10px] text-tx-low font-black px-3 py-2 uppercase tracking-[0.2em]">Main Menu</div>

            <div v-for="item in navItems" :key="item.path"
                 class="flex items-center gap-3 px-3 py-2 text-tx-med hover:bg-ui-bg-panel hover:text-tx-high rounded-lg cursor-pointer transition-all">
              <i :class="item.icon" class="text-sm"></i>
              <span class="text-sm font-medium">{{ item.label }}</span>
            </div>
          </slot>
        </nav>

        <div class="p-4 border-t border-border-thin text-[9px] text-tx-low text-center uppercase tracking-widest font-black">
          Powered by Time UI
        </div>
      </aside>

      <main class="flex-1 bg-ui-bg-deep relative overflow-y-auto">
        <div class="p-6 lg:p-10 max-w-7xl mx-auto">
          <slot />
        </div>
      </main>

    </div>
  </div>
</template>

<style scoped>
/* Estilos adicionales si fueran necesarios */
</style>