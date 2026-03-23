<script setup lang="ts">
import { ref } from 'vue';
import { VBtn } from 'vuetify/components';

import TodoCreateAndEditDialog from '@/components/TodoCreateAndEditDialog.vue';
import TodoFilters from '@/components/TodoFilters.vue';
import TodoTable from '@/components/TodoTable.vue';
import type { Todo } from '@/types';

const isDialogOpen = ref(false);
const editingTodo = ref<Todo | undefined>(undefined);

function openCreate() {
  editingTodo.value = undefined;
  isDialogOpen.value = true;
}

function openEdit(todo: Todo) {
  editingTodo.value = todo;
  isDialogOpen.value = true;
}
</script>

<template>
  <div>
    <div class="d-flex align-center justify-space-between flex-wrap gap-3 mb-4">
      <TodoFilters />

      <VBtn
        color="primary"
        prepend-icon="mdi-plus"
        @click="openCreate"
      >
        Добавить задачу
      </VBtn>
    </div>

    <TodoTable @edit="openEdit" />

    <TodoCreateAndEditDialog
      v-model="isDialogOpen"
      :todo="editingTodo"
    />
  </div>
</template>
