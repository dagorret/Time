<script setup lang="ts">
import { ref, onMounted } from 'vue';
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

const loadLazyData = async (event?: any) => {
  loading.value = true;
  try {
    const page = event?.first ? Math.floor(event.first / (event.rows || props.rows)) + 1 : 1;
    const query = new URLSearchParams({
      page: page.toString(),
      rows: (event?.rows || props.rows).toString(),
      search: filters.value.global.value || '',
      sortField: event?.sortField || 'id',
      sortOrder: event?.sortOrder?.toString() || '1'
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

onMounted(() => loadLazyData());
</script>

<template>
  <div class="ti-container">
    <div class="flex justify-between items-end px-4 mb-4">
       <div class="flex flex-col">
           <span class="text-[9px] text-ui-text-low uppercase font-black tracking-[0.3em] mb-1">System Audit</span>
           <h2 class="text-lg font-black text-ui-text-base tracking-tighter uppercase">Activity Logs</h2>
       </div>
       <div class="relative group">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-ui-text-low z-10" :size="14" />
          <InputText v-model="filters.global.value" @keyup.enter="loadLazyData()" placeholder="Search..." class="ti-input" />
       </div>
    </div>

    <div class="ti-card-light">
      <DataTable
          v-if="serverSchema.length > 0"
          :value="items"
          lazy paginator :rows="props.rows" :totalRecords="totalRecords" :loading="loading"
          @page="loadLazyData" @sort="loadLazyData"
          class="p-datatable-sm"
      >
        <template #loading>
            <div class="ti-overlay-light">
                <Loader2 class="animate-spin text-int-primary" :size="32" />
            </div>
        </template>

        <Column v-for="col in serverSchema" :key="col.field" :field="col.field" :header="col.header" :sortable="col.sortable">
            <template #body="{ data, field }">
               <span class="ti-cell-dark">
                  {{ data[field] }}
               </span>
            </template>
        </Column>
      </DataTable>

      <div v-else class="ti-sync-light">
          <Loader2 class="animate-spin text-int-primary" :size="24" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "../style.css";

/* Input de búsqueda: Mantenemos el estilo oscuro para que contraste con la tabla clara */
.ti-input {
  @apply !bg-ui-bg-deep !border-ui-border !text-ui-text-base !text-[11px] !w-64 !pl-10 !py-2 !rounded-xl outline-none transition-all focus:!border-int-primary/50;
}

/* LA CARTA: Este es el celeste blanquecino tipo Nord Snow Storm */
.ti-card-light {
  @apply bg-[#E5E9F0] border border-white rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)];
}

.ti-overlay-light {
  @apply absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-50;
}

/* TEXTO DE CELDAS: Azul muy oscuro para legibilidad total sobre fondo claro */
.ti-cell-dark {
  @apply text-[11px] text-[#2E3440] font-mono font-bold tracking-tight;
}

/* OVERRIDES DE PRIMEVUE PARA TABLA CLARA */

:deep(.p-datatable-thead > tr > th) {
  /* Encabezado Celeste un poco más oscuro que el cuerpo */
  @apply !bg-[#D8DEE9] !text-[#4C566A] !border-b !border-[#BFCAD9] !text-[10px] !font-black !uppercase !py-5 !px-6;
}

:deep(.p-datatable-tbody > tr) {
  /* Filas blancas con borde muy sutil */
  @apply !bg-[#ECEFF4] !border-b !border-[#D8DEE9];
}

:deep(.p-datatable-tbody > tr:hover) {
  /* Hover celeste suave */
  @apply !bg-[#E5E9F0];
}

:deep(.p-paginator) {
  /* Paginador integrado en la base clara */
  @apply !bg-[#D8DEE9] !border-t !border-[#BFCAD9] !text-[#4C566A] !py-3;
}

:deep(.p-paginator-page.p-highlight) {
  @apply !bg-[#81A1C1] !text-white !font-black !rounded-lg;
}

.ti-sync-light { @apply flex items-center justify-center p-40; }
</style>
