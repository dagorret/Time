<script setup lang="ts">
import Select from 'primevue/select';

defineProps({
  modelValue: null,
  options: Array,
  optionLabel: { type: String, default: 'label' },
  optionValue: { type: String, default: 'value' },
  label: String,
  placeholder: String
});

const emit = defineEmits(['update:modelValue']);

const handleChange = (event: any) => {
  // Emitimos el objeto completo o el valor seleccionado al padre
  emit('update:modelValue', event.value);
};
</script>

<template>
  <div class="ti-select-container">
    <label v-if="label" class="ti-label">{{ label }}</label>
    <Select
        :modelValue="modelValue"
        :options="options"
        :optionLabel="optionLabel"
        @change="handleChange"
        :placeholder="placeholder"
        class="ti-select-root"
    />
  </div>
</template>

<style scoped>
.ti-select-container { display: flex; flex-direction: column; gap: 4px; width: 100%; }
.ti-label { font-size: 10px; font-weight: bold; color: var(--ti-text-muted); text-transform: uppercase; }

:deep(.ti-select-root) {
  width: 100% !important;
  background: var(--ti-bg-card) !important;
  border: 1px solid var(--ti-border-color) !important;
  border-radius: var(--ti-radius) !important;
}

:deep(.p-select-label) {
  padding: 10px 14px !important;
  color: var(--ti-text-main) !important;
}
</style>