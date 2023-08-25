<template>
  <div class="related-articles-box"
    v-for="article in relatedArticles" :key="article.id">
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

    relatedArticles() {
      return this.articles.slice(0, 5);
    },
  },

  methods: {
    ...mapActions(articleStore, ['getArticles']),

    getArticle(id) {
      setTimeout(() => {
        this.$router.push(`/article/${id}`);
      });
    },
  },

  created() {
    this.getArticles();
  },
};
</script>
