<template>
  <v-form @submit.prevent="search">
    <v-row class="u-padding">
      <v-col cols="6" sm="4" md="4" lg="2" xl="2">
        <v-text-field v-model="title" label="Titre" />
      </v-col>
      <v-col v-if="!isArticlesMe" cols="6" sm="4" md="4" lg="2" xl="2">
        <v-text-field v-model="author" label="Auteur" />
      </v-col>
      <v-col cols="6" sm="4" md="4" lg="2" xl="2">
        <v-text-field v-model="content" label="Contenu" />
      </v-col>
      <v-col cols="6" sm="4" md="4" lg="2" xl="2">
        <v-btn
          block
          height="70%"
          type="submit"
          color="primary"
          append-icon="mdi-magnify"
        >
          Filtrer
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts" setup>
  import { defineProps, ref } from "vue";
  import {CriteriaFilter, factoryCriteriasFilter} from '@/models/criteriasFilter.model';
  import { useAppStore } from '@/store/app'; // import your search store

  const props = defineProps<{
    isArticlesMe: boolean;
    }>();

  const title = ref<string>('');
  const author = ref<string>('');
  const content = ref<string>('');

  const store = useAppStore(); // use the store

  const search = () => {
    const criterias: CriteriaFilter = factoryCriteriasFilter(props.isArticlesMe, title.value, author.value, content.value);
    store.searchArticles(criterias);
  }
</script>