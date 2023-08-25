<template>
  <PageTitle :title="'文章總覽'" />

  <PageTitleSm :title="'文章總覽'" />

  <div class="articles-box">
    <template v-if="isLoadingForStore">
      <a href="#" class="skeleton-item"
      v-for="(item, key) in skeletonNum" :key="key">
        <div class="img-box load"></div>
        <div class="text">
          <h2 class="load"></h2>
        </div>
      </a>
    </template>

    <a href="#" v-for="item in articles" :key="item.id"
      @click.prevent="getArticle(item.id)">
      <div class="img-box"
        v-if="item.image">
        <img :src="item.image" :alt="item.title">
      </div>
      <div class="img-box" v-else>
        <div class="no-image">
          <p>暫無照片</p>
        </div>
      </div>
      <div class="text">
        <h2 class="text-deep">{{ item.title }}</h2>
      </div>
    </a>
  </div>

  <Pagination :pages="pagination"
    @emit-pages="getArticles" />

  <Loading :active="isLoading && isLoadingForStore" />
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import PageTitle from '@/components/frontend/PageTitle.vue';
import PageTitleSm from '@/components/frontend/PageTitleSm.vue';
import { mapActions, mapState } from 'pinia';
import articleStore from '@/stores/articleStore';
import statusStore from '@/stores/statusStore';

export default {
  components: {
    Pagination,
    PageTitle,
    PageTitleSm,
  },

  data() {
    return {
      isLoading: false,
      skeletonNum: 4,
    };
  },

  computed: {
    ...mapState(articleStore, ['articles', 'pagination']),
    ...mapState(statusStore, ['isLoadingForStore']),
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
