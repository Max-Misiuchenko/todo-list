<script setup lang="ts">
import { VBtn, VIcon } from 'vuetify/components';

const emit = defineEmits<{
  edit: [];
  delete: [];
}>();
</script>

<template>
  <VBtn
    variant="text"
    density="compact"
    icon
    @click="emit('edit')"
  >
    <VIcon>mdi-pencil-outline</VIcon>
  </VBtn>

  <VBtn
    variant="text"
    density="compact"
    icon
    @click="emit('delete')"
  >
    <VIcon>mdi-delete-outline</VIcon>
  </VBtn>
</template>
