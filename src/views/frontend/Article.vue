<template>
  <PageTitle :title="article.title" />

  <div class="article-box">
    <h1 class="article-title">{{ article.title }}</h1>
    <div class="article">
      <p class="text-shallow">
        {{ $filters.date(article.create_at) }}
        <span>By&nbsp;{{ article.author }}</span>
      </p>
      <p class="text-shallow article-description">“{{ article.description }}”</p>
      <div class="img-box">
        <img :src="article.image" :alt="article.title">
      </div>
      <article class="article-content"
        v-html="article.content">
      </article>
      <div class="share">
        <p>分享於</p>
        <a href="https://www.facebook.com/">FB</a>
        <a href="https://www.instagram.com/">IG</a>
        <a href="https://twitter.com/home">X</a>
      </div>
    </div>

    <div class="related-articles">
      <p>最新文章</p>
      <RelatedArticles />
    </div>
  </div>

  <Loading :active="isLoadingForStore" />
</template>

<script>
import RelatedArticles from '@/components/frontend/RelatedArticles.vue';
import PageTitle from '@/components/frontend/PageTitle.vue';
import { mapState, mapActions } from 'pinia';
import articleStore from '@/stores/articleStore';
import statusStore from '@/stores/statusStore';

export default {
  components: {
    RelatedArticles,
    PageTitle,
  },

  computed: {
    ...mapState(articleStore, ['article']),
    ...mapState(statusStore, ['isLoadingForStore']),
  },

  methods: {
    ...mapActions(articleStore, ['getArticle']),
  },

  created() {
    const id = this.$route.params.articleId;
    this.getArticle(id);
  },
};
</script>
