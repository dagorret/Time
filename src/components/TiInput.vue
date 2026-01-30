<script setup lang="ts">
import InputText from 'primevue/inputtext';

// Usamos defineModel para que la sincronización sea nativa de Vue 3.4+
const model = defineModel();

defineProps({
  label: String,
  placeholder: String
});
</script>

<template>
  <div class="ti-input-wrapper">
    <label v-if="label" class="ti-label">{{ label }}</label>
    <InputText
        v-model="model"
        :placeholder="placeholder"
        class="ti-input-field"
    />
  </div>
</template>

<style scoped>
.ti-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

.ti-label {
  font-size: 10px;
  font-weight: bold;
  color: var(--ti-text-muted);
  margin-left: 2px;
}

:deep(.ti-input-field) {
  background: var(--ti-bg-card) !important;
  border: 1px solid var(--ti-border-color) !important;
  color: var(--ti-text-main) !important;
  border-radius: var(--ti-radius) !important;
  padding: 10px 14px !important;
  font-size: 14px !important;
  width: 100% !important;
  transition: all 0.2s ease;
}

:deep(.ti-input-field:focus) {
  outline: none !important;
  border-color: var(--ti-primary) !important;
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--ti-primary), transparent 85%) !important;
}
</style>