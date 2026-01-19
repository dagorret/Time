<script setup>
import InputText from 'primevue/inputtext';
defineProps(['modelValue', 'label']);
defineEmits(['update:modelValue']);
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" class="text-sm text-slate-400">{{ label }}</label>
    <InputText 
      :value="modelValue" 
      @input="$emit('update:modelValue', $event.target.value)" 
      class="border border-slate-700 bg-slate-800 p-2 rounded text-white"
    />
  </div>
</template>
