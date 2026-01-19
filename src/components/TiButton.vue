<script setup>
import Button from 'primevue/button';
defineProps(['label']);
</script>

<template>
  <Button :label="label" class="rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-700" />
</template>
