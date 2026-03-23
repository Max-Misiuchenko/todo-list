<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import {
  VBtn,
  VDialog,
  VForm,
  VSelect,
  VTextField,
  VTextarea,
} from 'vuetify/components';

import { useToast } from '@/composables/useToast';
import { useTodosStore } from '@/stores/todos';
import type { Todo, TodoCreate, TodoPriority, TodoStatus } from '@/types';

const props = defineProps<{
  todo?: Todo;
}>();

const model = defineModel<boolean>({ default: false });

const store = useTodosStore();
const toast = useToast();

const form = ref<InstanceType<typeof VForm> | null>(null);

const initialState = (): TodoCreate => ({
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
});

const fields = ref<TodoCreate>(initialState());
const originalFields = ref<TodoCreate>(initialState());

const isEditing = computed(() => !!props.todo);
const hasChanges = computed(() => JSON.stringify(fields.value) !== JSON.stringify(originalFields.value));

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

watch(model, (opened) => {
  if (opened && props.todo) {
    const snapshot: TodoCreate = {
      title: props.todo.title,
      description: props.todo.description ?? '',
      status: props.todo.status,
      priority: props.todo.priority,
    };
    fields.value = { ...snapshot };
    originalFields.value = { ...snapshot };
  }
});

function close() {
  model.value = false;
  fields.value = initialState();
  form.value?.resetValidation();
}

async function submit() {
  const { valid } = await form.value!.validate();
  if (!valid) return;

  if (isEditing.value) {
    store.updateTodo(props.todo!.id, fields.value);
    toast.show(`«${fields.value.title}» обновлена`);
  } else {
    store.addTodo(fields.value);
    toast.show(`«${fields.value.title}» создана`);
  }

  close();
}
</script>

<template>
  <VDialog
    :model-value="model"
    max-width="480"
    @update:model-value="close"
  >
    <VForm
      ref="form"
      @submit.prevent="submit"
    >
      <div class="pa-6 bg-surface rounded-lg">
        <div class="text-h6 mb-4">
          {{ isEditing ? 'Редактировать задачу' : 'Новая задача' }}
        </div>

        <VTextField
          v-model="fields.title"
          :rules="[(v) => !!v || 'Обязательное поле']"
          label="Название"
          class="mb-2"
          autofocus
        />

        <VTextarea
          v-model="fields.description"
          label="Описание"
          rows="3"
          class="mb-2"
          auto-grow
        />

        <div class="d-flex gap-3 mb-2">
          <VSelect
            v-model="fields.status"
            :items="statusOptions"
            label="Статус"
            class="flex-1-1"
          />

          <VSelect
            v-model="fields.priority"
            :items="priorityOptions"
            label="Приоритет"
            class="flex-1-1"
          />
        </div>

        <div class="d-flex justify-end gap-2 mt-2">
          <VBtn
            variant="text"
            @click="close"
          >
            Отмена
          </VBtn>

          <VBtn
            :disabled="isEditing && !hasChanges"
            :prepend-icon="isEditing ? 'mdi-content-save-outline' : 'mdi-plus'"
            type="submit"
            color="primary"
          >
            {{ isEditing ? 'Сохранить' : 'Создать' }}
          </VBtn>
        </div>
      </div>
    </VForm>
  </VDialog>
</template>
