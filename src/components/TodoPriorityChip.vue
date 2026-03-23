<script setup lang="ts">
import { VChip } from 'vuetify/components';

import type { TodoPriority } from '@/types';

defineProps<{
  priority: TodoPriority;
}>();

const priorityConfig: Record<TodoPriority, { color: string; label: string }> = {
  low: { color: 'success', label: 'Низкий' },
  medium: { color: 'warning', label: 'Средний' },
  high: { color: 'error', label: 'Высокий' },
};
</script>

<template>
  <VChip
    :color="priorityConfig[priority].color"
    size="small"
    variant="tonal"
  >
    {{ priorityConfig[priority].label }}
  </VChip>
</template>
