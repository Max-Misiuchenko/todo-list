<script setup lang="ts">
import { VSnackbar } from 'vuetify/components';

import { useToast } from '@/composables/useToast';

const toast = useToast();
</script>

<template>
  <RouterView />

  <VSnackbar
    v-model="toast.visible.value"
    :color="toast.state.value.color"
    :offset="400"
    :timeout="3000"
    location="bottom right"
  >
    {{ toast.state.value.message }}
  </VSnackbar>
</template>
