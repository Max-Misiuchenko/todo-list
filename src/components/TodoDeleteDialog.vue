<script setup lang="ts">
import { VBtn, VDialog } from 'vuetify/components';

import type { Todo } from '@/types';

defineProps<{
  todo: Todo | null;
}>();

const emit = defineEmits<{
  confirm: [];
  cancel: [];
}>();
</script>

<template>
  <VDialog
    :model-value="todo !== null"
    max-width="400"
    @update:model-value="emit('cancel')"
  >
    <div class="pa-6 bg-surface rounded-lg">
      <div class="text-h6 mb-2">Удалить задачу?</div>
      <div class="text-body-2 text-medium-emphasis mb-6">
        «{{ todo?.title }}» будет удалена без возможности восстановления.
      </div>

      <div class="d-flex justify-end gap-2">
        <VBtn
          variant="text"
          @click="emit('cancel')"
        >
          Отмена
        </VBtn>

        <VBtn
          color="error"
          variant="tonal"
          @click="emit('confirm')"
        >
          Удалить
        </VBtn>
      </div>
    </div>
  </VDialog>
</template>
