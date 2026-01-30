<script setup lang="ts">
import TiInput from './TiInput.vue';
import TiSelect from './TiSelect.vue';
import TiButton from './TiButton.vue';

// Definimos el modelo para sincronizar con el padre (App.vue)
const filters = defineModel<{ search: string; status: any }>({ required: true });

defineProps({
  statusOptions: { type: Array, default: () => [] },
  showFilter: { type: Boolean, default: true },
  showSearch: { type: Boolean, default: true }
});

const resetFilters = () => {
  filters.value = { search: '', status: null };
};
</script>

<template>
  <div class="ti-navigation-container">
    <div class="nav-main">
      <div v-if="showSearch" class="nav-field search">
        <TiInput v-model="filters.search" placeholder="Buscar registros..." />
      </div>

      <div v-if="showFilter" class="nav-field filter">
        <TiSelect
            v-model="filters.status"
            :options="statusOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Estado"
        />
      </div>
    </div>

    <div class="nav-actions">
      <TiButton label="Limpiar" variant="outline" @click="resetFilters" />
    </div>
  </div>
</template>

<style scoped>
.ti-navigation-container {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.25rem;
  background: var(--ti-bg-card);
  border: 1px solid var(--ti-border-color);
  border-radius: var(--ti-radius);
  box-shadow: 0 2px 8px rgba(0,0,0,0.05); /* Toque de profundidad */
}

.nav-main {
  display: flex;
  flex: 1; /* Esto empuja las acciones a la derecha */
  gap: 1rem;
  align-items: center;
}

.search {
  flex: 3; /* El buscador es prioritario */
  min-width: 250px;
}

.filter {
  flex: 1.5;
  min-width: 200px;
}

.nav-actions {
  display: flex;
  align-items: center;
  padding-left: 1rem;
  border-left: 1px solid var(--ti-border-color);
}

/* Responsive: se apilan en móviles */
@media (max-width: 768px) {
  .ti-navigation-container { flex-direction: column; align-items: stretch; }
  .nav-main { flex-direction: column; }
  .nav-actions { border-left: none; border-top: 1px solid var(--ti-border-color); padding: 1rem 0 0; }
}
</style>