<script setup lang="ts">
import Button from 'primevue/button';
defineProps<{ label: string; icon?: string }>();
</script>

<template>
  <Button
      :label="label"
      :icon="icon"
      class="!bg-int-primary hover:!bg-int-primary/90 !border-none !rounded-xl !px-6 !py-2.5 !text-white !font-bold transition-all active:scale-95 shadow-lg shadow-int-primary/20"
  />
</template>