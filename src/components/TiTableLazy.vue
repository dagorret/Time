<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { mockTableApi } from '../services/mockApi'; // Importamos tu Proxy

const props = defineProps({
  apiUrl: { type: String, required: true },
  filters: { type: Object, required: true },
  columns: { type: Array, required: true }
});

// Estados de la tabla
const loading = ref(false);
const totalRecords = ref(0);
const records = ref([]);

// Parámetros que PrimeVue maneja internamente para Lazy Loading
const lazyParams = ref({
  first: 0, // Índice del primer registro (Offset)
  rows: 10,  // Cantidad de registros por página (Limit)
  page: 0
});

/**
 * Función núcleo: Se comunica con el Mock API
 * que lee el JSON del disco y lo procesa.
 */
const loadLazyData = async () => {
  loading.value = true;

  try {
    // Llamamos al Proxy enviando la URL del JSON y los parámetros actuales
    const result = await mockTableApi(props.apiUrl, {
      offset: lazyParams.value.first,
      limit: lazyParams.value.rows,
      ...props.filters // Enviamos search, rol, etc.
    });

    // Actualizamos la UI con lo que el Proxy filtró y paginó
    records.value = result.data;
    totalRecords.value = result.total;
  } catch (error) {
    console.error("Error cargando datos en TiTableLazy:", error);
  } finally {
    loading.value = false;
  }
};

/**
 * Evento disparado por PrimeVue al cambiar de página
 */
const onPage = (event: any) => {
  lazyParams.value = event;
  loadLazyData();
};

/**
 * VIGILANTE: Si el usuario escribe en el buscador o cambia un select,
 * reseteamos a la página 0 y pedimos datos nuevos.
 */
watch(() => props.filters, () => {
  lazyParams.value.first = 0;
  loadLazyData();
}, { deep: true });

// Carga inicial
onMounted(() => {
  loadLazyData();
});
</script>

<template>
  <div class="ti-table-wrapper">
    <DataTable
        :value="records"
        lazy
        paginator
        :rows="10"
        :totalRecords="totalRecords"
        :loading="loading"
        @page="onPage"
        paginatorTemplate="PrevPageLink PageLinks NextPageLink"
        responsiveLayout="scroll"
        class="ti-datatable"
    >
      <Column
          v-for="col in columns"
          :key="col.field"
          :field="col.field"
          :header="col.header"
          :sortable="col.sortable"
      />

      <template #empty>
        <div class="empty-msg">No se encontraron registros.</div>
      </template>
    </DataTable>
  </div>
</template>

<style scoped>
.ti-table-wrapper {
  border: 1px solid var(--ti-border-color);
  border-radius: var(--ti-radius);
  background: var(--ti-bg-card);
  overflow: hidden;
}

/* Alineación con el Skin System */
:deep(.p-datatable-thead > tr > th) {
  background: var(--ti-bg-app) !important;
  color: var(--ti-text-muted) !important;
  font-size: 11px;
  text-transform: uppercase;
  padding: 1rem;
  border-bottom: 2px solid var(--ti-border-color) !important;
}

:deep(.p-paginator) {
  background: var(--ti-bg-card) !important;
  border-top: 1px solid var(--ti-border-color) !important;
  padding: 0.5rem;
  justify-content: center;
}

:deep(.p-paginator-page),
:deep(.p-paginator-next),
:deep(.p-paginator-prev) {
  border-radius: var(--ti-radius) !important;
  min-width: 2.5rem;
  height: 2.5rem;
}

.empty-msg {
  padding: 3rem;
  text-align: center;
  color: var(--ti-text-muted);
}
</style>