<template>
    <v-alert v-if="alert"
    closable
    density="default"
    :type="alert.typeAlert"
    :title="alert.title"
    :text="alert.text"
  ></v-alert>
  </template>
  
  <script lang="ts" setup>
    import { computed } from 'vue';
    import { useAppStore } from '@/store/app'; // import your search store
  
    const store = useAppStore();
    const alert = computed(() => store.getAlert);
  </script>
  
  <style scoped>
      .v-alert {
        flex: none !important;
    }
  </style>
  