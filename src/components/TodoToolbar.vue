<script setup lang="ts">
import { VBtn } from 'vuetify/components';

import TodoFilters from '@/components/TodoFilters.vue';

const emit = defineEmits<{
  create: [];
}>();
</script>

<template>
  <div class="d-flex align-center justify-space-between flex-wrap gap-3 mb-4">
    <TodoFilters />

    <VBtn
      color="primary"
      prepend-icon="mdi-plus"
      @click="emit('create')"
    >
      Добавить задачу
    </VBtn>
  </div>
</template>
