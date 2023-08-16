<template>
  <PageTitle
  :title="'文章總覽'"/>

  <PageTitleSm
  :title="'文章總覽'"/>

  <div class="articles-box">
    <a href="#"
    v-for="item in articles"
    :key="item.id"
    @click.prevent="getArticle(item.id)">
      <div class="img-box"
      v-if="item.image">
        <img :src="item.image" alt="">
      </div>
      <div class="img-box"
      v-else>
        <div class="no-image">
          <p>暫無照片</p>
        </div>
      </div>
      <div class="text">
        <h2 class="text-deep">{{ item.title }}</h2>
        <p>tag:{{ item.tag }}</p>
      </div>
    </a>
  </div>

  <Pagination
  :pages="pagination"
  @emit-pages="getArticles"/>

  <Loading
  :active="isLoading"/>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import PageTitle from '@/components/frontend/PageTitle.vue';
import PageTitleSm from '@/components/frontend/PageTitleSm.vue';

export default {
  data() {
    return {
      articles: {},
      pagination: {},
      isLoading: false,
    };
  },
  components: {
    Pagination,
    PageTitle,
    PageTitleSm,
  },
  methods: {
    getArticles(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/articles/?page=${page}`;
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false;
          this.articles = res.data.articles;
          this.pagination = res.data.pagination;
        });
    },
    getArticle(id) {
      this.$router.push(`/article/${id}`);
    },
  },
  created() {
    this.getArticles();
  },
};
</script>
