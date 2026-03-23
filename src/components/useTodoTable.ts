import { computed, ref } from 'vue';
import { VDataTable } from 'vuetify/components';

import { useToast } from '@/composables/useToast';
import { useTodosStore } from '@/stores/todos';
import type { Todo } from '@/types';

export const useTodoTable = () => {
  const store = useTodosStore();
  const toast = useToast();

  const search = ref('');
  const deletingTodo = ref<Todo | null>(null);

  const headers: InstanceType<typeof VDataTable>['$props']['headers'] = [
    { title: 'Статус', key: 'status', width: '150px' },
    { title: 'Задача', key: 'title' },
    { title: '', key: 'description', width: '40px', sortable: false },
    { title: 'Приоритет', key: 'priority', width: '140px' },
    { title: 'Дата', key: 'createdAt', width: '120px' },
    { title: '', key: 'actions', width: '96px', sortable: false },
  ];

  const dataTableConfig = computed<InstanceType<typeof VDataTable>['$props']>(() => ({
    headers,
    items: store.filteredTodos,
    search: search.value,
    'filter-keys': ['title', 'description'],
    'items-per-page': 10,
    'item-value': 'id',
  }));

  function confirmDelete(todo: Todo) {
    deletingTodo.value = todo;
  }

  function cancelDelete() {
    deletingTodo.value = null;
  }

  function applyDelete() {
    if (deletingTodo.value) {
      toast.show(`«${deletingTodo.value.title}» удалена`, 'error');
      store.deleteTodo(deletingTodo.value.id);
      deletingTodo.value = null;
    }
  }

  return {
    store,
    search,
    deletingTodo,
    dataTableConfig,
    confirmDelete,
    cancelDelete,
    applyDelete,
  };
};
