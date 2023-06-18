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
              <button class="btn btn-outline-danger"
              @click="openDelModal(article)">刪除</button>
            </div>
          </td>
      </tr>
    </tbody>
  </table>
  <ArticleModal
  ref="articleModal"
  :article="tempArticle"
  @update-article="updateArticle"/>
  <Pagination
  :pages="pagination"
  @emit-pages="getArticles"/>
  <Loading
  :active="isLoading"/>
  <DelModal
  :item="tempArticle"
  @del-item="delArticle"
  ref="delModal"/>
</template>

<script>
import ArticleModal from '@/components/backend/ArticleModal.vue';
import Pagination from '@/components/Pagination.vue';
import DelModal from '@/components/backend/DelModal.vue';

export default {
  inject: ['emitter', 'pushMessageState'],
  data() {
    return {
      articles: {},
      tempArticle: {
      },
      isNew: false,
      pagination: {},
      isLoading: false,
    };
  },
  components: {
    ArticleModal,
    Pagination,
    DelModal,
  },
  methods: {
    getArticles(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/articles/?page=${page}`;
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false;
          this.articles = res.data.articles;
          this.pagination = res.data.pagination;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    },
    openModal(isNew, item) {
      this.isLoading = true;
      this.isNew = isNew;
      if (isNew) {
        this.tempArticle = {
          create_at: new Date().getTime() / 1000,
          isPublic: true,
        };
      } else {
        this.tempArticle = { ...item };
        this.isLoading = true;
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${item.id}`;
        this.$http.get(api)
          .then((res) => {
            this.isLoading = false;
            this.tempArticle = res.data.article;
            // console.log('文章', this.tempArticle);
          });
      }
      this.isLoading = false;
      this.$refs.articleModal.showModal();
    },
    updateArticle(tempArticle) {
      this.tempArticle = tempArticle;
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article`;
      let httpMethod = 'post';
      this.isLoading = true;

      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${tempArticle.id}`;
        httpMethod = 'put';
      }
      this.$http[httpMethod](api, { data: this.tempArticle })
        .then((res) => {
          console.log(this.tempArticle);
          this.isLoading = false;
          this.getArticles();
          this.pushMessageState(res);
        });
      this.$refs.articleModal.hideModal();
    },
    openDelModal(item) {
      this.tempArticle = { ...item };
      this.$refs.delModal.showModal();
    },
    delArticle() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`;
      this.$http.delete(api)
        .then((res) => {
          this.$refs.delModal.hideModal();
          this.isLoading = false;
          this.getArticles();
          this.pushMessageState(res);
        });
    },
  },
  created() {
    this.getArticles();
  },
};
</script>
