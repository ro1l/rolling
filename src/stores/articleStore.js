import axios from 'axios';
import { defineStore } from 'pinia';
import statusStore from './statusStore';

const status = statusStore();

export default defineStore('articleStore', {
  state: () => ({
    articles: [],
    article: {},
    pagination: {},

  }),

  actions: {
    async getArticles(page = 1) {
      this.scrollToTop();
      status.isLoadingForStore = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/articles/?page=${page}`;

      try {
        const res = await axios.get(api);
        status.isLoadingForStore = false;

        this.articles = res.data.articles;
        this.pagination = res.data.pagination;
      } catch (error) {
        console.error('Error 找不到資料', error);
      }
    },

    async getArticle(id) {
      this.scrollToTop();
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/article/${id}`;
      status.isLoadingForStore = true;

      try {
        status.isLoadingForStore = false;
        const res = await axios.get(api);

        this.article = res.data.article;
      } catch (error) {
        console.error('Error 找不到資料', error);
      }
    },

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
});
