<template>
      <FormArticle :modeDisplay="'UPDATE'" :article=article />
  </template>
  
  <script lang="ts" setup>
    import { computed, defineProps } from 'vue';
    import FormArticle from '@/components/form-article/form-article.component.vue';

    const props = defineProps<{
      id: string;
    }>();

    import { useAppStore } from '@/store/app'; // import your search store
    const store = useAppStore(); // use the store
    const article = computed(() => store.getArticles.find((article) => article.id === props.id));
  </script>

  <style scoped>
  </style>
