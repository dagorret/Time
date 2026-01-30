<script setup lang="ts">
import { ref } from 'vue';
import {
  IconMenu2,
  IconLayoutDashboard,
  IconDatabase,
  IconSettings,
  IconChevronRight
} from '@tabler/icons-vue';

interface NavItem {
  label: string;
  icon?: any;
  path: string;
}

const props = defineProps<{
  title?: string;
  userName?: string;
  userRole?: string;
  navItems?: NavItem[];
}>();

const isSidebarOpen = ref(true);

// Items por defecto si no se pasan por props
const defaultNav = [
  { label: 'Dashboard', icon: IconLayoutDashboard, path: '/' },
  { label: 'Registros', icon: IconDatabase, path: '/registros' },
  { label: 'Configuración', icon: IconSettings, path: '/config' },
];
</script>

<template>
  <div class="skin-tabler-app min-h-screen flex flex-col font-sans">

    <header class="h-16 border-b border-[var(--tabler-border-color)] bg-white flex items-center justify-between px-6 sticky top-0 z-50">
      <div class="flex items-center gap-4">
        <button @click="isSidebarOpen = !isSidebarOpen"
                class="p-2 hover:bg-slate-50 rounded-md transition-colors text-[var(--tabler-text-muted)] hover:text-[var(--tabler-primary)]">
          <IconMenu2 :size="20" />
        </button>

        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-[var(--tabler-primary)] rounded flex items-center justify-center shadow-sm">
            <span class="font-bold text-white text-xs">T</span>
          </div>
          <span class="font-bold tracking-tight text-[var(--tabler-text-main)] text-lg uppercase">{{ title || 'TIME' }}</span>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <div class="text-right hidden sm:block">
          <p class="text-xs font-bold text-[var(--tabler-text-main)] leading-none">Carlos Dagorret</p>
          <p class="text-[10px] text-[var(--tabler-text-muted)] uppercase tracking-widest mt-1">System Architect</p>
        </div>
        <div class="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[11px] font-bold text-[var(--tabler-primary)]">
          CD
        </div>
      </div>
    </header>

    <div class="flex flex-1">
      <aside
          :class="[
          'border-r border-[var(--tabler-border-color)] bg-white transition-all duration-300 overflow-hidden flex flex-col',
          isSidebarOpen ? 'w-64' : 'w-0 opacity-0'
        ]"
      >
        <nav class="p-4 flex-1 space-y-1">
          <slot name="sidebar">
            <div class="text-[10px] text-[var(--tabler-text-muted)] font-bold px-3 py-2 uppercase tracking-widest opacity-50">Menú Principal</div>

            <router-link
                v-for="item in (navItems || defaultNav)"
                :key="item.path"
                :to="item.path"
                class="flex items-center justify-between px-3 py-2 text-[var(--tabler-text-muted)] hover:bg-slate-50 hover:text-[var(--tabler-primary)] rounded-md transition-all group"
                active-class="!bg-blue-50 !text-[var(--tabler-primary)] font-medium"
            >
              <div class="flex items-center gap-3">
                <component :is="item.icon" :size="18" />
                <span class="text-sm">{{ item.label }}</span>
              </div>
              <IconChevronRight :size="14" class="opacity-0 group-hover:opacity-100 transition-opacity" />
            </router-link>
          </slot>
        </nav>

        <div class="p-4 border-t border-slate-100 text-[9px] text-[var(--tabler-text-muted)] text-center uppercase tracking-widest font-semibold opacity-60">
          Powered by Time UI v2.0
        </div>
      </aside>

      <main class="flex-1 bg-[#f6f8fb] relative overflow-y-auto">
        <div class="p-8 lg:p-12 max-w-[1600px] mx-auto">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>