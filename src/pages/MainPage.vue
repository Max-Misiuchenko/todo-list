<script setup lang="ts">
import { ref } from 'vue';

import TodoCreateAndEditDialog from '@/components/TodoCreateAndEditDialog.vue';
import TodoTable from '@/components/TodoTable.vue';
import TodoToolbar from '@/components/TodoToolbar.vue';
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
    <TodoToolbar @create="openCreate" />

    <TodoTable @edit="openEdit" />

    <TodoCreateAndEditDialog
      v-model="isDialogOpen"
      :todo="editingTodo"
    />
  </div>
</template>
