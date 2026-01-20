<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import { Loader2, Search } from 'lucide-vue-next';

const loading = ref(false);
const totalRecords = ref(1000000);
const items = ref([]);
let debounceTimer: any = null; // Variable para el control del tiempo

const filters = ref({
  global: { value: null, matchMode: 'contains' }
});

const loadLazyData = (event: any) => {
  loading.value = true;

  setTimeout(() => {
    const data = [];
    const start = event.first || 0;
    const rows = event.rows || 10;
    const searchTerm = event.filters?.global?.value?.toLowerCase() || '';

    if (searchTerm) {
      totalRecords.value = 500;
    } else {
      totalRecords.value = 1000000;
    }

    for (let i = 0; i < rows; i++) {
      const index = start + i;
      data.push({
        id: index,
        key: `KEY-${String(index).padStart(6, '0')}`,
        label: searchTerm ? `Result for "${searchTerm}" #${index}` : `Data Point ${index}`,
        category: `Category ${(index % 5) + 1}`,
        status: index % 4 === 0 ? 'Active' : 'Process'
      });
    }

    items.value = data;
    loading.value = false;
  }, 350);
};

onMounted(() => {
  loadLazyData({ first: 0, rows: 10, filters: filters.value });
});

// --- EL MOTOR DEL DEBOUNCE ---
const onLazyEvent = (event: any) => {
  // 1. Limpiamos el temporizador anterior si el usuario sigue escribiendo
  if (debounceTimer) clearTimeout(debounceTimer);

  // 2. Si el evento es un cambio de página o sort, cargamos de inmediato
  if (event.type !== 'input') {
    loadLazyData(event);
    return;
  }

  // 3. Si es búsqueda (input), esperamos 300ms
  debounceTimer = setTimeout(() => {
    loadLazyData(event);
  }, 800);
};
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between px-2">
      <div>
        <h2 class="text-xl font-bold tracking-tight text-ui-text-base">System Logs</h2>
        <p class="text-sm text-ui-text-muted">Analytic engine: {{ totalRecords.toLocaleString() }} entries indexed.</p>
      </div>

      <IconField iconPosition="left">
        <InputIcon>
          <Search :class="debounceTimer ? 'text-int-primary animate-pulse' : 'text-ui-text-low'" :size="16" />
        </InputIcon>
        <InputText
            v-model="filters['global'].value"
            @input="(e) => onLazyEvent({ ...filters, type: 'input', first: 0, rows: 10, filters: filters })"
            placeholder="Search index..."
            class="ti-input-search"
        />
      </IconField>
    </div>

    <div class="bg-ui-bg-panel border border-ui-border rounded-xl shadow-sm overflow-hidden relative">
      <DataTable
          v-model:filters="filters"
          :value="items"
          lazy
          paginator
          :rows="10"
          :totalRecords="totalRecords"
          :loading="loading"
          @page="onLazyEvent"
          @sort="onLazyEvent"
          @filter="onLazyEvent"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="{first} - {last} of {totalRecords}"
          :rowsPerPageOptions="[10, 25, 50, 100]"
          class="p-datatable-sm"
          dataKey="id"
      >
        <template #loading>
          <div class="flex items-center justify-center bg-ui-bg-panel/60 absolute inset-0 z-50 backdrop-blur-sm">
            <Loader2 class="animate-spin text-int-primary" :size="32" />
          </div>
        </template>

        <Column field="key" header="Reference" sortable style="width: 20%"></Column>
        <Column field="label" header="Resource Name" sortable style="width: 35%"></Column>
        <Column field="category" header="Group" style="width: 25%"></Column>
        <Column field="status" header="Status" style="width: 20%">
          <template #body="{ data }">
            <div class="flex items-center gap-2">
              <div :class="data.status === 'Active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]'" class="w-1.5 h-1.5 rounded-full"></div>
              <span :class="data.status === 'Active' ? 'text-green-500' : 'text-blue-500'" class="font-medium text-[10px] uppercase tracking-widest">
                {{ data.status }}
              </span>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<style scoped>
@reference "../style.css";

.ti-input-search {
  @apply !bg-ui-bg-base/50 !border-ui-border !text-ui-text-base !text-xs !py-2 !pl-10 !rounded-lg !transition-all !w-64;
}

.ti-input-search:focus {
  @apply !ring-1 !ring-int-primary !border-int-primary !bg-ui-bg-base !w-80;
  box-shadow: 0 0 15px rgba(37, 99, 235, 0.1);
}
</style>