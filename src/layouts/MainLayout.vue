<script setup lang="ts">
import { VApp, VContainer, VMain } from 'vuetify/components';
</script>

<template>
  <VApp>
    <VMain>
      <VContainer max-width="1200">
        <RouterView />
      </VContainer>
    </VMain>
  </VApp>
</template>
