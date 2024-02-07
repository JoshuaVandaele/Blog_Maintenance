<template>
  <div class="home">
    <h1>Liste des articles</h1>
    <div class="home">
      <FormCriterias :isArticlesMe="false"/>
      <ListArticles />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import FormCriterias from '@/components/form-criterias/form-criterias.component.vue';
  import ListArticles from '@/components/list-articles/list-articles.component.vue';
  import {CriteriaFilter, factoryEmptyCriteriasForNotMeFilter} from '@/models/criteriasFilter.model';
  import { useAppStore } from '@/store/app';
    
  const store = useAppStore();

  const criterias: CriteriaFilter = factoryEmptyCriteriasForNotMeFilter();

  store.searchArticles(criterias);
</script>
