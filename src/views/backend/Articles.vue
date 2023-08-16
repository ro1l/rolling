<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 border-bottom border-black">
        <div class="container-fluid d-flex justify-content-between
        align-items-center p-4">
          <h1 class="page-title">Articles</h1>
          <button class="btn btn-outline-dark border-1 rounded-0
          me-lg-3 mb-0 px-lg-5 py-lg-2"
          @click="openModal(true)">
          <i class="bi bi-plus-lg"></i>
          新增文章</button>
        </div>
      </div>

      <div class="col-12">
        <div class="card mb-4 bg-gray-white  ">
          <div class="card-body pt-4 mt-lg-3 py-0 px-lg-5">
            <div class="table-responsive p-0 d-flex">
              <table class="table lh-lg mb-0 table-hover">
                <thead>
                  <tr>
                    <th class="text-secondary text-xxs fw-normal pb-lg-4 pt-sm-0">標題</th>
                    <th class="text-secondary text-xxs fw-normal pb-lg-4 pt-sm-0">建立時間</th>
                    <th class="text-secondary text-xxs fw-normal pb-lg-4 pt-sm-0">作者</th>
                    <th class="text-secondary text-xxs fw-normal pb-lg-4 pt-sm-0
                    text-center">啟用</th>
                  </tr>
                </thead>
                <tbody >
                  <tr @click="openModal(false, article)" class="cursor-pointer"
                  v-for="article in articles"
                  :key=article.id>
                    <td>{{ article.title }}</td>
                    <td>{{ $filters.date(article.create_at) }}</td>
                    <td>{{ article.author }}</td>
                    <td class="text-center">
                      <span
                      v-if="article.isPublic === true"><i class="bi bi-check-lg fs-5"></i></span>
                      <span v-else></span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <Pagination
          :pages="pagination"
          @emit-pages="getArticles"/>
        </div>
      </div>
    </div>
  </div>

  <ArticleModal
  ref="articleModal"
  :article="tempArticle"
  @del-article="openDelModal(tempArticle)"
  @update-article="updateArticle"
  :isNew="isNew"/>
  <Loading
  :active="isLoading"/>
  <DelModal
  :item="tempArticle"
  @del-item="delArticle"
  ref="delModal"/>
</template>

<style lang="scss" scoped>
#true:checked~.true,
#false:checked~.false {
  border: 1px solid black;
  border-radius: 20px;
}
</style>

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
      if (isNew) {
        this.tempArticle = {
          create_at: new Date().getTime() / 1000,
          isPublic: true,
        };
      } else {
        // this.tempArticle = { ...item };
        this.isLoading = true;
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${item.id}`;
        this.$http.get(api)
          .then((res) => {
            this.isLoading = false;
            this.tempArticle = res.data.article;
          });
      }
      this.isNew = isNew;
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
          this.$refs.articleModal.hideModal();
        });
    },
  },
  created() {
    this.getArticles();
  },
};
</script>
