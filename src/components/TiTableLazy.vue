<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import { Loader2, Search } from 'lucide-vue-next';

const props = defineProps({
  url: {
    type: String,
    default: 'http://localhost:8090/api/ti-table'
  },
  rows: {
    type: Number,
    default: 15
  }
});

const loading = ref(false);
const totalRecords = ref(0);
const items = ref([]);
let debounceTimer: any = null;

const filters = ref({
  global: { value: null, matchMode: 'contains' }
});

const loadLazyData = async (event: any) => {
  loading.value = true;
  try {
    const page = Math.floor(event.first / event.rows) + 1;
    const search = event.filters?.global?.value || '';
    
    const queryParams = new URLSearchParams({
      page: page.toString(),
      rows: event.rows.toString(),
      search: search
    });

    const response = await fetch(`${props.url}?${queryParams}`);
    const result = await response.json();

    items.value = result.data;
    totalRecords.value = result.total;
  } catch (error) {
    console.error("Error cargando datos:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadLazyData({ first: 0, rows: props.rows, filters: filters.value });
});

const onLazyEvent = (event: any) => {
  if (debounceTimer) clearTimeout(debounceTimer);
  if (event.type !== 'input') {
    loadLazyData(event);
    return;
  }
  debounceTimer = setTimeout(() => {
    loadLazyData(event);
  }, 600);
};
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between px-2">
      <div>
        <h2 class="text-xl font-bold tracking-tight text-ui-text-base">System Logs</h2>
        <p class="text-sm text-ui-text-muted">Total: {{ totalRecords.toLocaleString() }} registros.</p>
      </div>

      <IconField iconPosition="left">
        <InputIcon>
          <Search :class="loading ? 'text-int-primary animate-pulse' : 'text-ui-text-low'" :size="16" />
        </InputIcon>
        <InputText
            v-model="filters['global'].value"
            @input="(e) => onLazyEvent({ type: 'input', first: 0, rows: props.rows, filters: filters })"
            placeholder="Search logs..."
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
          :rows="props.rows"
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

        <Column field="id" header="ID" style="width: 10%"></Column>
        <Column field="event_name" header="Evento" style="width: 50%"></Column>
        <Column field="status" header="Estado" style="width: 15%">
          <template #body="{ data }">
            <span class="px-2 py-1 rounded text-[10px] font-bold uppercase" 
                  :class="data.status === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'">
              {{ data.status }}
            </span>
          </template>
        </Column>
        <Column field="started_at" header="Fecha" style="width: 25%"></Column>
      </DataTable>
    </div>
  </div>
</template>

<style scoped>
.ti-input-search {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  color: white;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border-radius: 0.5rem;
  width: 250px;
}
</style>
