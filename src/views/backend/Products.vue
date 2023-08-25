<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 border-bottom border-black">
        <div class="container-fluid d-flex justify-content-between
          align-items-center p-4">
          <h1 class="page-title">Products</h1>
          <button class="btn btn-outline-dark border-1 rounded-0
            me-lg-3 mb-0 px-lg-5 py-lg-2"
            type="button"
            @click.prevent="openModal(true)">
            <i class="bi bi-plus-lg"></i>
            新增商品
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
                    <th class="text-secondary text-xxs fw-normal pb-lg-4 pt-sm-0">分類</th>
                    <th class="text-secondary text-xxs fw-normal pb-lg-4 pt-sm-0">名稱</th>
                    <th class="text-secondary text-xxs fw-normal pb-lg-4 pt-sm-0">售價</th>
                    <th class="text-secondary text-xxs fw-normal pb-lg-4 pt-sm-0 text-center">
                      圖片
                    </th>
                    <th class="text-secondary text-xxs fw-normal pb-lg-4 pt-sm-0 text-center">
                      啟用
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr href="#" class="cursor-pointer"
                    @click.prevent="openModal(false, item)"
                    v-for="item in productsPage"
                    :key="item.id">
                    <td class="">{{ item.category }}</td>
                    <td class="">{{ item.title }}</td>
                    <td>NT${{ $filters.currency(item.price) }}</td>
                    <td class="text-center">
                      <img class="img-30" :src="item.imageUrl" :alt="item.title">
                    </td>
                    <td class="text-center">
                      <span v-if="item.is_enabled === 1">
                        <i class="bi bi-check-lg fs-5"></i>
                      </span>
                      <span v-else></span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <Pagination :pages="pagination" @emit-pages="getProductsPage" />
        </div>
      </div>
    </div>
  </div>

  <ProductModal ref="productModal"
    :product="tempProduct"
    :isNew="isNew"
    @update-product="updateProduct"
    @del-product="openDelProductModal(tempProduct)" />

  <DelModal :item="tempProduct"
    ref="delModal"
    @del-item="delProduct" />

  <Loading :active="isLoading"
    :zIndex="10000" />
</template>

<script>
import axios from 'axios';
import ProductModal from '@/components/backend/ProductModal.vue';
import DelModal from '@/components/backend/DelModal.vue';
import Pagination from '@/components/Pagination.vue';
import { mapState, mapActions } from 'pinia';
import productStore from '@/stores/productStore';
import statusStore from '@/stores/statusStore';
import DashboardSkeleton from '@/components/backend/DashboardSkeleton.vue';

export default {
  components: {
    ProductModal,
    DelModal,
    Pagination,
    DashboardSkeleton,
  },

  data() {
    return {
      tempProduct: {},
      isNew: false,
      isLoading: false,
      skeletonNum: 15,
    };
  },

  computed: {
    ...mapState(productStore, ['productsPage', 'pagination']),
    ...mapState(statusStore, ['isLoadingForStore']),
  },

  methods: {
    ...mapActions(productStore, ['getProductsPage']),

    openModal(isNew, item) {
      this.isLoading = true;
      if (isNew) {
        this.tempProduct = {
          imagesUrl: [],
          unit: '輛',
          is_enabled: 1,
          content: {
            comparison: {
              type: '', // 種類
              engine: '', // 引擎
              cc: '', // 排氣量
              hp: '', // 馬力
              torque: '', // 扭力
              ht: '', // 座高
              wt: '', // 車重
              afc: '', // 年耗油量
              tank: '', // 油箱
            },
          },
        };
      } else {
        this.tempProduct = { ...item };
      }
      this.isNew = isNew;
      this.isLoading = false;
      this.$refs.productModal.showModal();
    },

    async updateProduct(item) {
      try {
        this.tempProduct = item;
        let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
        let httpMethod = 'post';
        this.$refs.productModal.hideModal();
        this.getProductsPage();

        if (!this.isNew) {
          api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
          httpMethod = 'put';
        }

        const res = await axios[httpMethod](api, { data: this.tempProduct });
        this.pushMessageState(res);
      } catch (error) {
        console.error('Error 找不到資料:', error);
      } finally {
        this.$refs.productModal.hideModal();
        this.getProductsPage();
      }
    },

    openDelProductModal(item) {
      this.isLoading = true;
      this.tempProduct = { ...item };
      this.isLoading = false;
      this.$refs.delModal.showModal();
    },

    async delProduct() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      let res;

      try {
        res = await axios.delete(api);
        this.isLoading = false;
        this.$refs.delModal.hideModal();
        this.getProductsPage();
        this.$refs.productModal.hideModal();
      } catch (error) {
        console.error('Error', error);
      } finally {
        this.pushMessageState(res);
      }
    },

  },

  created() {
    this.getProductsPage();
  },

  inject: ['emitter', 'pushMessageState'],
};
</script>
