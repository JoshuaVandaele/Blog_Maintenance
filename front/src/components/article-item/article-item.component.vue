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
  
<style scoped>

.sc-article-item__actions {
  display: flex;
  gap: 8px;
}

.sc-article-item__card {
  width: 18rem;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;}

.sc-article-item__card-body {
  padding: 16px;
}

.sc-article-item__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #1867C0;
    font-size: 12px;
    font-weight: bold;
    padding: 16px;
     color: white 
}

.sc-article-item__date-article {
    display: flex;
    justify-content: flex-end;
    font-size: 12px;
}

.sc-article-item__suite-article {
    font-size: 30px;
    text-align: left;
}

.sc-article-item__text-article {
    position: relative;
    height: 80px; /* Ajustez en fonction de vos besoins */
    overflow: hidden;
    font-size: 14px;
    margin-bottom: 0;
    text-align: left;
}

.sc-article-item__text-article::after {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 40px; /* Ajustez en fonction de vos besoins */
    background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1) 100%);
}
.sc-article-item__title {
    font-size: 24px;
    font-weight: bold;
    margin: 0 0 16px 0;
    text-align: left;
}

</style>
  