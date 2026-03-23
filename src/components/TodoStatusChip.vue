<script setup lang="ts">
import { VChip } from 'vuetify/components';

import type { TodoStatus } from '@/types';

defineProps<{
  status: TodoStatus;
}>();

const statusConfig: Record<TodoStatus, { color: string; label: string }> = {
  'todo': { color: 'default', label: 'Todo' },
  'in-progress': { color: 'info', label: 'In Progress' },
  'done': { color: 'success', label: 'Done' },
};
</script>

<template>
  <VChip
    :color="statusConfig[status].color"
    size="small"
    variant="tonal"
  >
    {{ statusConfig[status].label }}
  </VChip>
</template>
