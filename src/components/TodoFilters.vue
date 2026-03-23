<script setup lang="ts">
import { computed } from 'vue';
import { VBtn, VSelect } from 'vuetify/components';

import { useTodosStore } from '@/stores/todos';
import type { TodoPriority, TodoStatus } from '@/types';

const store = useTodosStore();

const statusOptions: { title: string; value: TodoStatus }[] = [
  { title: 'Todo', value: 'todo' },
  { title: 'In Progress', value: 'in-progress' },
  { title: 'Done', value: 'done' },
];

const priorityOptions: { title: string; value: TodoPriority }[] = [
  { title: 'Низкий', value: 'low' },
  { title: 'Средний', value: 'medium' },
  { title: 'Высокий', value: 'high' },
];

function setFilterStatus(value: TodoStatus | null) {
  store.filterStatus = value;
}

function setFilterPriority(value: TodoPriority | null) {
  store.filterPriority = value;
}

function reset() {
  store.filterStatus = null;
  store.filterPriority = null;
}

const hasActiveFilters = computed(() => store.filterStatus !== null || store.filterPriority !== null);

const filtersOptions = {
  variant: 'outlined',
  density: 'compact',
  style: 'min-width: 180px;',
  clearable: true,
  hideDetails: true,
} as const;
</script>



<template>
  <div class="d-flex align-center gap-3 flex-wrap">
    <VSelect
      v-bind="filtersOptions"
      :model-value="store.filterStatus"
      :items="statusOptions"
      label="Статус"
      @update:model-value="setFilterStatus"
    />

    <VSelect
      v-bind="filtersOptions"
      :model-value="store.filterPriority"
      :items="priorityOptions"
      label="Приоритет"
      @update:model-value="setFilterPriority"
    />

    <VBtn
      v-if="hasActiveFilters"
      variant="text"
      density="compact"
      @click="reset"
    >
      Сбросить
    </VBtn>
  </div>
</template>
