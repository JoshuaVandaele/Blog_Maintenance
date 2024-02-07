// Utilities
import { defineStore } from 'pinia'
import Axios from "@/core/api";
import {ArticleType} from '@/models/article.model';
import {CriteriaFilter} from '@/models/criteriasFilter.model';
import { Alert } from '@/models/alert.model';
import { UUID } from 'crypto';


export interface AppState {
  articles: ArticleType[];
  alert: Alert | null;
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    articles: [],
    alert: null
  }),
  getters: {
    getArticles(): ArticleType[] {
      return this.articles;
    },
    getAlert(): Alert | null {
      return this.alert;
    },
  },
  actions: {
    updateAlert(alert: Alert | null) {
      this.alert = alert;

     setTimeout(() => {
        this.alert = null;
      }, 5000);
    },
    async searchArticles(criterias: CriteriaFilter) {
      try {
        const response = await Axios.get(`/articles?isArticlesMe=${criterias.isArticlesMe}&title=${criterias.title}&author=${criterias.author}&content=${criterias.content}`);
        this.articles = response.data.data;
      } catch (error) {
        console.error(error);
      }
    },

    deleteArticle(articleId: UUID) {
      this.articles = this.articles.filter(article => article.id !== articleId);
    }
  },
})






