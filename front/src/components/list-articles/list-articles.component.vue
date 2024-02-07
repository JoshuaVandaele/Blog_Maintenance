<template>
    <div class="sc-list-articles__container">
        <ArticleItem v-for="article in articles" :article="article"/>
    </div>

    <div v-if="articles.length === 0" class="sc-list-articles__empty">
        <p>Aucun article trouvé :(</p>
    </div>

</template>
  
<script lang="ts" setup>
    import { computed } from 'vue';
    import ArticleItem from '@/components/article-item/article-item.component.vue';

    import { useAppStore } from '@/store/app'; 

    const store = useAppStore();
    const articles = computed(() => store.getArticles);
</script>
  
  <style scoped>
    .sc-list-articles__container {
        display: flex;
        flex-wrap: wrap;
        gap: 32px;
        padding: 16px;
    }

    .sc-list-articles__empty {
        background-color: antiquewhite;
        padding: 16px;
        font-size: 20px;
        font-weight: bold;
    }
  </style>
  