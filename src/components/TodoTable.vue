<script setup lang="ts">
import { VBtn, VChip, VDataTable, VDialog, VIcon, VTextField, VTooltip } from 'vuetify/components';

import { useTodoTable } from '@/components/useTodoTable';
import type { Todo } from '@/types';

const emit = defineEmits<{
  edit: [todo: Todo];
}>();

const {
  store,
  search,
  deletingTodo,
  statusConfig,
  priorityConfig,
  dataTableConfig,
  confirmDelete,
  cancelDelete,
  applyDelete,
} = useTodoTable();
</script>

<template>
  <VDataTable v-bind="dataTableConfig">
    <template #top>
      <div class="px-4 pt-4 pb-2">
        <VTextField
          v-model="search"
          label="Поиск"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="compact"
          clearable
          hide-details
        />
      </div>
      <div class="px-4 py-2 text-caption text-medium-emphasis">
        Выполнено: {{ store.completedCount }} / {{ store.todos.length }}
      </div>
    </template>

    <template #item.status="{ item: rawItem }">
      <VChip
        :color="statusConfig[(rawItem as Todo).status].color"
        size="small"
        variant="tonal"
      >
        {{ statusConfig[(rawItem as Todo).status].label }}
      </VChip>
    </template>

    <template #item.title="{ item: rawItem }">
      <span :class="{ 'text-decoration-line-through text-medium-emphasis': (rawItem as Todo).status === 'done' }">
        {{ (rawItem as Todo).title }}
      </span>
    </template>

    <template #item.description="{ item: rawItem }">
      <VTooltip
        v-if="(rawItem as Todo).description"
        max-width="320"
      >
        <template #activator="{ props }">
          <VBtn
            v-bind="props"
            variant="text"
            density="compact"
            icon
          >
            <VIcon size="18">mdi-text-long</VIcon>
          </VBtn>
        </template>

        {{ (rawItem as Todo).description }}
      </VTooltip>
    </template>

    <template #item.priority="{ item: rawItem }">
      <VChip
        :color="priorityConfig[(rawItem as Todo).priority].color"
        size="small"
        variant="tonal"
      >
        {{ priorityConfig[(rawItem as Todo).priority].label }}
      </VChip>
    </template>

    <template #item.actions="{ item: rawItem }">
      <VBtn
        variant="text"
        density="compact"
        icon
        @click="emit('edit', rawItem as Todo)"
      >
        <VIcon>mdi-pencil-outline</VIcon>
      </VBtn>

      <VBtn
        variant="text"
        density="compact"
        icon
        @click="confirmDelete(rawItem as Todo)"
      >
        <VIcon>mdi-delete-outline</VIcon>
      </VBtn>
    </template>
  </VDataTable>

  <VDialog
    :model-value="!!deletingTodo"
    max-width="400"
    @update:model-value="cancelDelete"
  >
    <div class="pa-6 bg-surface rounded-lg">
      <div class="text-h6 mb-2">Удалить задачу?</div>
      <div class="text-body-2 text-medium-emphasis mb-6">
        «{{ deletingTodo?.title }}» будет удалена без возможности восстановления.
      </div>

      <div class="d-flex justify-end gap-2">
        <VBtn
          variant="text"
          @click="cancelDelete"
        >
          Отмена
        </VBtn>

        <VBtn
          color="error"
          variant="tonal"
          @click="applyDelete"
        >
          Удалить
        </VBtn>
      </div>
    </div>
  </VDialog>
</template>
