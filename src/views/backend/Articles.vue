<template>
  <div class="h3 bg-info">文章</div>
  <div class="text-end">
    <button class="btn bg-info"
    @click="openModal(true)">
      新增文章
    </button>
  </div>
  <table class="table">
    <thead>
      <tr>
        <th>標題</th>
        <th>描述</th>
        <th>建立時間</th>
        <th>作者</th>
        <th>是否公開</th>
        <th>狀態</th>
      </tr>
    </thead>
    <tbody>
      <tr
      v-for="article in articles"
      :key=article.id>
          <td>{{ article.title }}</td>
          <td>{{ article.description }}</td>
          <td>{{ $filters.date(article.create_at) }}</td>
          <td>{{ article.author }}</td>
          <td>
            <span class="text-success"
            v-if="article.isPublic === true">公開</span>
            <span v-else>不公開</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-success"
              @click="openModal(false, article)">編輯</button>
              <button class="btn btn-outline-danger">刪除</button>
            </div>
          </td>
      </tr>
    </tbody>
  </table>
  <ArticleModal
  ref="articleModal"
  :article="tempArticle"
  @update-article="updateArticle"/>
</template>

<script>
import ArticleModal from '@/components/backend/ArticleModal.vue';

export default {
  data() {
    return {
      articles: {},
      tempArticle: {
      },
      isNew: false,
    };
  },
  components: {
    ArticleModal,
  },
  methods: {
    getArticles() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/articles`;
      this.$http.get(api)
        .then((res) => {
          this.articles = res.data.articles;
          this.pagination = res.data.pagination;
        });
    },
    openModal(isNew, item) {
      this.isNew = isNew;
      if (isNew) {
        this.tempArticle = {
          create_at: new Date().getTime() / 1000,
          isPublic: true,
        };
      } else {
        this.tempArticle = { ...item };
      }
      this.$refs.articleModal.showModal();
    },
    updateArticle(tempArticle) {
      this.tempArticle = tempArticle;
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article`;
      let httpMethod = 'post';

      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${tempArticle.id}`;
        httpMethod = 'put';
      }
      this.$http[httpMethod](api, { data: this.tempArticle })
        .then((res) => {
          console.log(res);
        });
      this.$refs.articleModal.hideModal();
      this.getArticles();
    },
  },
  created() {
    this.getArticles();
  },
};
</script>
