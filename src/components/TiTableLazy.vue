<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { IconCircleFilled, IconSearch } from '@tabler/icons-vue';

const props = defineProps({
  url: { type: String, required: true },
  title: { type: String, default: 'Activity Logs' }
});

const items = ref([]);
const serverSchema = ref([]);
const loading = ref(false);

const loadData = async () => {
  loading.value = true;
  try {
    const res = await fetch(props.url);
    const result = await res.json();
    serverSchema.value = result.schema || [];
    items.value = result.data || [];
  } finally {
    loading.value = false;
  }
};

const getBadgeClass = (val: string) => {
  const v = val?.toUpperCase() || '';
  if (v.includes('ERROR')) return 'badge-error';
  if (v.includes('SUCCESS')) return 'badge-success';
  return 'badge-info';
};

onMounted(() => loadData());
</script>

<template>
  <div class="ti-table-component">
    <div class="ti-table-header">
      <div class="ti-table-title-group">
        <div class="ti-table-status">
          <IconCircleFilled class="ti-dot" :size="8" />
          <span class="ti-status-text">Live Audit</span>
        </div>
        <h2 class="ti-title-text">{{ props.title }}</h2>
      </div>

      <div class="ti-table-actions">
        <div class="ti-search-box">
          <IconSearch :size="16" class="ti-search-icon" />
          <input type="text" placeholder="Buscar..." class="ti-input-search" />
        </div>
      </div>
    </div>

    <div class="ti-table-card">
      <DataTable :value="items" :loading="loading" class="p-datatable-sm">
        <Column v-for="col in serverSchema" :key="col.field" :field="col.field" :header="col.header">
          <template #body="{ data, field }">
            <template v-if="field.toUpperCase() === 'NIVEL'">
              <span :class="['ti-badge', getBadgeClass(data[field])]">
                {{ data[field] }}
              </span>
            </template>
            <span v-else class="ti-row-text">{{ data[field] }}</span>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<style scoped>
@reference "../style.css";

/* Estructura del componente TiTableLazy */
.ti-table-component { @apply flex flex-col gap-6 w-full; }
.ti-table-header { @apply flex justify-between items-end; }
.ti-table-title-group { @apply flex flex-col gap-1; }
.ti-table-status { @apply flex items-center gap-2; }
.ti-dot { @apply text-blue-500 animate-pulse; }
.ti-status-text { @apply text-[10px] font-bold uppercase tracking-widest text-slate-400; }
.ti-title-text { @apply text-2xl font-black uppercase tracking-tight text-slate-800; }

.ti-search-box { @apply relative flex items-center; }
.ti-search-icon { @apply absolute left-3 text-slate-400; }
.ti-input-search { @apply border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm w-64 focus:ring-2 focus:ring-blue-500/20 outline-none; }

.ti-table-card { @apply bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden; }
.ti-badge { @apply px-2 py-0.5 rounded text-[10px] font-bold border uppercase; }
.ti-row-text { @apply text-[13px] text-slate-600 font-medium; }
</style>