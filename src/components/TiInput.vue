<script setup lang="ts">
import InputText from 'primevue/inputtext';
defineProps(['modelValue', 'label']);
defineEmits(['update:modelValue']);
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" class="text-[10px] uppercase tracking-widest text-tx-low font-bold ml-1">{{ label }}</label>
    <InputText
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="!border-border-thin !bg-ui-bg-deep !text-tx-high !p-3 !rounded-xl focus:!ring-2 focus:!ring-int-primary/20 outline-none transition-all"
    />
  </div>
</template>