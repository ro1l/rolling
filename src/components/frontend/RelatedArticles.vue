<template>
  <div class="reversed-articles-box"
  v-for="article in reversedArticles"
  :key="article.id">
    <a href="#"
    @click="getArticle(article.id)">{{ article.title }}<i class="bi bi-arrow-right"></i></a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
    };
  },
  methods: {
    getArticles(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/articles/?page=${page}`;
      this.$http.get(api)
        .then((res) => {
          this.articles = res.data.articles;
        });
    },
    getArticle(id) {
      setTimeout(() => {
        this.$router.push(`/article/${id}`);
      });
    },
  },
  created() {
    this.getArticles();
  },
  computed: {
    reversedArticles() {
      return this.articles.slice(5).reverse();
    },
  },
};
</script>
