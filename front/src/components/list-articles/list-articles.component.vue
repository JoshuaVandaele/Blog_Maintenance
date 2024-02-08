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
  
<style lang="scss">
    @import './list-articles.component.scss';
</style>
  