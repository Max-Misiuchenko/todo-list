<script setup lang="ts">
import { VBtn, VDataTable, VIcon, VTextField, VTooltip } from 'vuetify/components';

import TodoDeleteDialog from '@/components/TodoDeleteDialog.vue';
import TodoPriorityChip from '@/components/TodoPriorityChip.vue';
import TodoRowActions from '@/components/TodoRowActions.vue';
import TodoStatusChip from '@/components/TodoStatusChip.vue';
import { useTodoTable } from '@/components/useTodoTable';
import type { Todo } from '@/types';

const emit = defineEmits<{
  edit: [todo: Todo];
}>();

const {
  store,
  search,
  deletingTodo,
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
      <TodoStatusChip :status="(rawItem as Todo).status" />
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
      <TodoPriorityChip :priority="(rawItem as Todo).priority" />
    </template>

    <template #item.actions="{ item: rawItem }">
      <TodoRowActions
        @edit="emit('edit', rawItem as Todo)"
        @delete="confirmDelete(rawItem as Todo)"
      />
    </template>
  </VDataTable>

  <TodoDeleteDialog
    :todo="deletingTodo"
    @confirm="applyDelete"
    @cancel="cancelDelete"
  />
</template>
