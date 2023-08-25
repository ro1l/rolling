<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 border-bottom border-black">
        <div class="container-fluid d-flex justify-content-between
          align-items-center p-4">
          <h1 class="page-title">Articles</h1>
          <button class="btn btn-outline-dark border-1 rounded-0
            me-lg-3 mb-0 px-lg-5 py-lg-2"
            type="button"
            @click.prevent="openModal(true)">
            <i class="bi bi-plus-lg"></i>
            新增文章
          </button>
        </div>
      </div>

      <DashboardSkeleton
        v-if="isLoadingForStore"/>

      <div class="col-12"
        v-if="!isLoadingForStore">
        <div class="card mb-4 bg-gray-white">
          <div class="card-body pt-lg-4 mt-lg-3 py-0 px-lg-5">
            <div class="table-responsive p-0 d-flex">
              <table class="table lh-lg mb-0 table-hover">
                <thead>
                  <tr>
                    <th class="text-secondary text-xxs fw-normal pb-lg-4 pt-sm-0">標題</th>
                    <th class="text-secondary text-xxs fw-normal pb-lg-4 pt-sm-0">建立時間</th>
                    <th class="text-secondary text-xxs fw-normal pb-lg-4 pt-sm-0">作者</th>
                    <th class="text-secondary text-xxs fw-normal pb-lg-4 pt-sm-0 text-center">
                      啟用
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="cursor-pointer"
                    @click.prevent="openModal(false, article)"
                    v-for="article in articles"
                    :key=article.id>
                    <td>{{ article.title }}</td>
                    <td>{{ $filters.date(article.create_at) }}</td>
                    <td>{{ article.author }}</td>
                    <td class="text-center">
                      <span v-if="article.isPublic === true">
                        <i class="bi bi-check-lg fs-5"></i></span>
                      <span v-else></span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <Pagination :pages="pagination"
            @emit-pages="getArticles" />

        </div>
      </div>
    </div>
  </div>

  <ArticleModal ref="articleModal"
    :article="tempArticle"
    @del-article="openDelModal(tempArticle)"
    @update-article="updateArticle"
    :isNew="isNew" />

  <Loading :active="isLoading"
    :zIndex="10000"/>

  <DelModal :item="tempArticle"
    @del-item="delArticle"
    ref="delModal" />
</template>

<script>
import axios from 'axios';
import ArticleModal from '@/components/backend/ArticleModal.vue';
import Pagination from '@/components/Pagination.vue';
import DelModal from '@/components/backend/DelModal.vue';
import { mapActions, mapState } from 'pinia';
import articleStore from '@/stores/articleStore';
import statusStore from '@/stores/statusStore';
import DashboardSkeleton from '@/components/backend/DashboardSkeleton.vue';

export default {
  components: {
    ArticleModal,
    Pagination,
    DelModal,
    DashboardSkeleton,
  },

  data() {
    return {
      tempArticle: {
      },
      isNew: false,
      isLoading: false,
      skeletonNum: 15,
    };
  },

  computed: {
    ...mapState(articleStore, ['articles', 'pagination']),
    ...mapState(statusStore, ['isLoadingForStore']),
  },

  methods: {
    ...mapActions(articleStore, ['getArticles']),

    async openModal(isNew, item) {
      this.isLoading = true;
      if (isNew) {
        this.tempArticle = {
          create_at: new Date().getTime() / 1000,
          isPublic: true,
          content: '',
        };
      } else {
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${item.id}`;

        try {
          const res = await axios.get(api);

          this.tempArticle = res.data.article;
        } catch (error) {
          console.error('Error 找不到資料', error);
        }
      }
      this.isNew = isNew;
      this.isLoading = false;
      this.$refs.articleModal.showModal();
    },

    async updateArticle(tempArticle) {
      try {
        this.tempArticle = tempArticle;
        let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article`;
        let httpMethod = 'post';
        this.isLoading = true;

        if (!this.isNew) {
          api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${tempArticle.id}`;
          httpMethod = 'put';
        }

        const res = await this.$http[httpMethod](api, { data: this.tempArticle });
        this.isLoading = false;
        this.getArticles();
        this.pushMessageState(res);
      } catch (error) {
        console.error('Error 找不到資料:', error);
      } finally {
        this.$refs.articleModal.hideModal();
      }
    },

    openDelModal(item) {
      this.tempArticle = { ...item };
      this.$refs.delModal.showModal();
    },

    async delArticle() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`;

      try {
        const res = await axios.delete(api);

        this.isLoading = false;
        this.getArticles();
        this.pushMessageState(res);
      } catch (error) {
        console.error('Error 找不到資料', error);
      } finally {
        this.$refs.delModal.hideModal();
        this.$refs.articleModal.hideModal();
      }
    },
  },

  created() {
    this.getArticles();
  },

  inject: ['emitter', 'pushMessageState'],
};
</script>
