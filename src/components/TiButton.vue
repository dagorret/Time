<script setup lang="ts">
defineProps({
  label: String,
  variant: { type: String, default: 'primary' }
});
defineEmits(['click']);
</script>

<template>
  <button
      type="button"
      :class="['ti-btn', variant]"
      @click="$emit('click', $event)"
  >
    <span v-if="label">{{ label }}</span>
    <slot />
  </button>
</template>

<style scoped>
.ti-btn {
  padding: 8px 16px;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: var(--ti-radius);
  transition: all 0.2s;
  border: 1px solid transparent;
}
.primary { background: var(--ti-primary); color: #fff; border-color: var(--ti-primary); }
.outline { background: transparent; color: var(--ti-text-main); border-color: var(--ti-border-color); }
</style>