<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { Loader2 } from 'lucide-vue-next';

// 1. Configuración de datos genéricos
const loading = ref(false);
const totalRecords = ref(1000000);
const items = ref([]);

const loadLazyData = (event: any) => {
  loading.value = true;

  // Simulación de fetch a API
  setTimeout(() => {
    const data = [];
    const start = event.first || 0;
    const rows = event.rows || 10;

    for (let i = 0; i < rows; i++) {
      const index = start + i;
      data.push({
        id: index,
        key: `KEY-${String(index).padStart(6, '0')}`,
        label: `Data Point ${index}`,
        category: `Category ${(index % 5) + 1}`,
        status: index % 4 === 0 ? 'Active' : 'Process'
      });
    }

    items.value = data;
    loading.value = false;
  }, 350);
};

onMounted(() => {
  // Inicializamos con 10 filas por defecto
  loadLazyData({ first: 0, rows: 10 });
});

const onLazyEvent = (event: any) => {
  loadLazyData(event);
};
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between px-2">
      <div>
        <h2 class="text-xl font-bold tracking-tight text-ui-text-base">System Logs</h2>
        <p class="text-sm text-ui-text-muted">Analytic engine: {{ totalRecords.toLocaleString() }} entries indexed.</p>
      </div>
    </div>

    <div class="bg-ui-bg-panel border border-ui-border rounded-xl shadow-sm overflow-hidden relative">
      <DataTable
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
              <div :class="data.status === 'Active' ? 'bg-green-500' : 'bg-blue-500'" class="w-2 h-2 rounded-full"></div>
              <span :class="data.status === 'Active' ? 'text-green-500' : 'text-blue-500'" class="font-medium text-xs uppercase tracking-widest">
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

.p-datatable {
  @apply !bg-transparent !text-ui-text-base;
}
</style>

<style>
@reference "../style.css";

/* Estilos de PrimeVue adaptados a la jerarquía de Carlos */
.p-datatable-thead > tr > th {
  @apply !bg-ui-bg-base/30 !text-ui-text-muted !border-ui-border !text-[10px] !uppercase !tracking-[0.2em] !font-black !py-4 !px-6;
}
.p-datatable-tbody > tr {
  @apply !bg-transparent !border-ui-border hover:!bg-int-primary/5 !transition-all;
}
.p-datatable-tbody > tr > td {
  @apply !border-ui-border !py-4 !px-6 !text-sm;
}
.p-paginator {
  @apply !bg-ui-bg-panel/50 !border-t !border-ui-border !py-2 !text-xs !text-ui-text-low;
}
.p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
  @apply !bg-int-primary !text-white !rounded-lg !scale-90;
}
</style>