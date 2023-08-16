<template>
  <PageTitle
  :title="article.title"/>

  <div class="article-box">
    <h1 class="article-title">{{ article.title }}</h1>
    <div class="article">
      <p class="text-shallow">
        {{ $filters.date(article.create_at) }} <span>By&nbsp;{{ article.author }}</span></p>
      <p class="text-shallow article-description">“{{ article.description }}“</p>
      <div class="img-box">
        <img :src="article.image" alt="">
      </div>
      <article class="article-content" v-html="article.content"></article>
      <div class="share">
        <p>分享於</p>
        <a href="">FB</a>
        <a href="">IG</a>
        <a href="">twitter</a>
      </div>
    </div>

    <div class="related-articles">
      <p>最新文章</p>
      <RelatedArticles/>
    </div>
  </div>

</template>

<script>
import RelatedArticles from '@/components/frontend/RelatedArticles.vue';
import PageTitle from '@/components/frontend/PageTitle.vue';

export default {
  components: {
    RelatedArticles,
    PageTitle,
  },
  data() {
    return {
      id: '',
      article: {},
      router: '/articles',
    };
  },
  methods: {
    getArticle() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/article/${this.id}`;
      this.$http.get(api)
        .then((res) => {
          this.article = res.data.article;
        });
    },
  },
  created() {
    this.id = this.$route.params.articleId;
    this.getArticle();
  },
};
</script>
