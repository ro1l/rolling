<template>
  <div class="reversed-articles-box"
    v-for="article in reversedArticles" :key="article.id">
    <a href="#"
      @click="getArticle(article.id)">
      {{ article.title }}
      <i class="bi bi-arrow-right"></i>
    </a>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import articleStore from '@/stores/articleStore';
import statusStore from '@/stores/statusStore';

export default {
  computed: {
    ...mapState(articleStore, ['articles', 'pagination']),
    ...mapState(statusStore, ['isLoadingForStore']),

    reversedArticles() {
      return this.articles.slice(5).reverse();
    },
  },

  methods: {
    ...mapActions(articleStore, ['getArticles']),

    getArticle(id) {
      this.$router.push(`/article/${id}`);
    },
  },

  created() {
    this.getArticles();
  },
};
</script>
