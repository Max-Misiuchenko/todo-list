import { defineStore } from 'pinia';
import { computed, readonly, ref } from 'vue';

import { useLocalStorage } from '@/composables/useLocalStorage';
import type { Todo, TodoCreate, TodoPriority, TodoStatus } from '@/types';

const migrateTodo = (todo: Todo & { done?: boolean }): Todo => {
  if (!todo.status) {
    todo.status = todo.done ? 'done' : 'todo';
  }
  return todo;
};

export const useTodosStore = defineStore('todos', () => {
  const todos = useLocalStorage<Todo[]>('todos', []);

  todos.value = todos.value.map(migrateTodo);

  const filterStatus = ref<TodoStatus | null>(null);
  const filterPriority = ref<TodoPriority | null>(null);

  const filteredTodos = computed(() =>
    todos.value
      .filter((t) => filterStatus.value === null || t.status === filterStatus.value)
      .filter((t) => filterPriority.value === null || t.priority === filterPriority.value),
  );

  const completedCount = computed(() => todos.value.filter(({ status }) => status === 'done').length);

  const addTodo = (data: TodoCreate) => {
    todos.value.push({
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString().slice(0, 10),
    });
  };

  const updateTodo = (id: Todo['id'], data: TodoCreate) => {
    const todo = todos.value.find((t) => t.id === id);
    if (todo) Object.assign(todo, data);
  };

  const deleteTodo = (id: Todo['id']) => {
    todos.value = todos.value.filter((t) => t.id !== id);
  };

  return {
    todos: readonly(todos),
    filteredTodos,
    filterStatus,
    filterPriority,
    completedCount,
    addTodo,
    updateTodo,
    deleteTodo,
  };
});
