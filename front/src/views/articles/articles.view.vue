<template>
    <h1>Mes articles</h1>
    
    <div class="home">
      <FormCriterias :isArticlesMe="true" />
      <ListArticles />
    </div>
</template>
  
<script lang="ts" setup>
  import FormCriterias from '@/components/form-criterias/form-criterias.component.vue';
  import ListArticles from '@/components/list-articles/list-articles.component.vue';
  import {CriteriaFilter, factoryEmptyCriteriasForMeFilter} from '@/models/criteriasFilter.model';

  import { useAppStore } from '@/store/app';
  import { onMounted } from 'vue';
    
  const store = useAppStore();

  onMounted(async () => {
    const criterias: CriteriaFilter = factoryEmptyCriteriasForMeFilter();

    store.searchArticles(criterias);
  });
</script>