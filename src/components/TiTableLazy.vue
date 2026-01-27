<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'; // + watch
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import { Loader2, Search } from 'lucide-vue-next';

const props = defineProps({
  url: { type: String, required: true },
  rows: { type: Number, default: 15 }
});

const loading = ref(false);
const totalRecords = ref(0);
const items = ref([]);
const serverSchema = ref([]);
const filters = ref({ global: { value: null } });

// Guardamos el último evento de PrimeVue para re-usarlo al buscar
const lastTableEvent = ref();

const loadLazyData = async (event?: any) => {
  if (event) lastTableEvent.value = event;
  loading.value = true;

  try {
    const e = lastTableEvent.value;
    const page = e?.first ? Math.floor(e.first / (e.rows || props.rows)) + 1 : 1;

    const query = new URLSearchParams({
      page: page.toString(),
      rows: (e?.rows || props.rows).toString(),
      search: filters.value.global.value || '',
      sortField: e?.sortField || 'id',
      sortOrder: e?.sortOrder === 1 ? 'asc' : (e?.sortOrder === -1 ? 'desc' : 'desc')
    });

    const response = await fetch(`${props.url}?${query}`);
    const result = await response.json();

    if (result?.schema) serverSchema.value = result.schema;
    items.value = result.data || [];
    totalRecords.value = result.total || 0;
  } catch (e) {
    console.error("TIME Sync Error:", e);
  } finally {
    loading.value = false;
  }
};

// Debounce para la búsqueda: espera 400ms tras dejar de escribir
let searchTimeout: any;
watch(() => filters.value.global.value, (newValue) => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    loadLazyData();
  }, 400);
});

onMounted(() => loadLazyData());
</script>

<template>
  <div class="ti-container">
    <div class="flex justify-between items-end px-4 mb-4">
      <div class="flex flex-col">
        <span class="text-[9px] text-tx-low uppercase font-black tracking-[0.3em] mb-1">System Audit</span>
        <h2 class="text-lg font-black text-tx-high tracking-tighter uppercase">Activity Logs</h2>
      </div>
      <div class="relative group">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-tx-low z-10" :size="14" />
        <InputText v-model="filters.global.value" placeholder="Search..." class="ti-input" />
      </div>
    </div>

    <div class="ti-card-light">
      <DataTable
          v-if="serverSchema.length > 0"
          :value="items"
          lazy paginator :rows="props.rows" :totalRecords="totalRecords" :loading="loading"
          @page="loadLazyData" @sort="loadLazyData"
          class="p-datatable-sm"
          dataKey="id"
      >
        <template #loading>
          <div class="ti-overlay-light">
            <Loader2 class="animate-spin text-int-primary" :size="32" />
          </div>
        </template>

        <Column v-for="col in serverSchema"
                :key="col.field"
                :field="col.field"
                :header="col.header"
                :sortable="col.sortable"
                :style="{ width: col.width }"
        >
          <template #body="{ data, field }">
       <span class="ti-cell-dark">
          {{ data[field] }}
       </span>
          </template>
        </Column>
      </DataTable>

      <div v-else class="flex items-center justify-center p-40">
        <Loader2 class="animate-spin text-int-primary/30" :size="24" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Tu estilo se mantiene igual, está perfecto */
@reference "../style.css";

.ti-input {
  @apply !bg-ui-bg-deep !border-border-thin !text-tx-high !text-[11px] !w-64 !pl-10 !py-2 !rounded-xl outline-none transition-all focus:!border-int-primary/50;
}

.ti-card-light {
  @apply bg-[#E5E9F0] border border-white/10 rounded-2xl overflow-hidden shadow-2xl;
}

.ti-overlay-light {
  @apply absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-50;
}

.ti-cell-dark {
  @apply text-[11px] text-[#2E3440] font-mono font-bold tracking-tight;
}

:deep(.p-datatable-thead > tr > th) {
  @apply !bg-[#D8DEE9] !text-[#4C566A] !border-b !border-[#BFCAD9] !text-[10px] !font-black !uppercase !py-5 !px-6;
}

:deep(.p-datatable-tbody > tr) {
  @apply !bg-[#ECEFF4] !border-b !border-[#D8DEE9]/50;
}

:deep(.p-paginator) {
  @apply !bg-[#D8DEE9] !border-t !border-[#BFCAD9] !text-tx-med !py-3;
}
</style>