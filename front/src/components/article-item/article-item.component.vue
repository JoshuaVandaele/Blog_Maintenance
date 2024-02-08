<template>
    <div class="sc-article-item__card" style="width: 18rem;">
        <div class="sc-article-item__header">
          <span>Publié par : {{article.author}} </span>
          <div class="sc-article-item__actions">
            <button v-if="article.isArticleMe" @click="deleteArticle">
              <v-icon size="24" color="white">mdi-delete</v-icon>
            </button>
            <router-link v-if="article.isArticleMe" :to="'/update-article/' + article.id">
              <v-icon size="24" color="white">mdi-pencil-outline</v-icon>
            </router-link>
            <button @click="isDisplayViewArticle = true">
              <v-icon size="24" color="white">mdi-eye</v-icon>
            </button>
          </div>
        </div>
        <div class="sc-article-item__card-body">
          <h4 class="sc-article-item__title">{{article.title}}</h4>
          <p class="sc-article-item__text-article">{{article.content}}</p>
          <p class="sc-article-item__suite-article">...</p>
          <div class="sc-article-item__date-article">
            <span>{{new Date(article.date).toLocaleDateString()}}</span>
          </div>
        </div>
    </div>
    <DialogViewArticle v-if="isDisplayViewArticle" 
      :is-display="isDisplayViewArticle"
      :article="article"
      @closeDialog="closeDialog()"
    />
  </template>
  
  <script lang="ts" setup>
  import { defineProps, ref } from 'vue';
  import { ArticleType } from '@/models/article.model';
  import Axios from "@/core/api";
  import { useAppStore } from '@/store/app';
  import { Alert, factoryAlertSuccess } from '@/models/alert.model';
  import { CriteriaFilter } from '@/models/criteriasFilter.model';
  import DialogViewArticle from '@/components/dialog-view-article/dialog-view-article.component.vue';

  const isDisplayViewArticle = ref(false);

  const store = useAppStore();

    const props = defineProps<{
      article: ArticleType;
    }>();

    const closeDialog = () => isDisplayViewArticle.value = false;

    const deleteArticle = async() => {
      try {
            await Axios.delete(`/articles/${props.article.id}`);  
            store.deleteArticle(props.article.id);
            const alert: Alert = factoryAlertSuccess('Suppression article', 'Article supprimé avec succès !');
            store.updateAlert(alert);
        } catch (error) {
            console.error(error);
        }
    };
</script>
  
<style lang="scss">
  @import './article-item.component.scss';
</style>