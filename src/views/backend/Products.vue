<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-6">
        <div class="card mb-4 bg-dark-gray text-white">
          <div class="card-header pe-4 ps-4 pt-4 pb-2 mb-0">
            <h6 class="mb-0 fs-5">商品數量</h6>
          </div>
          <div class="card-body ps-4 pe-5">
            <h2 class="fs-1 fw-bold text-end ">{{ productsAll.length }}</h2>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="card mb-4 bg-green text-white">
          <div class="card-header pe-4 ps-4 pt-4 pb-2 mb-0">
            <h6 class="mb-0 fs-5">已上架</h6>
          </div>
          <div class="card-body ps-4 pe-5">
            <h2 class="fs-1 fw-bold text-end ">{{ products.length }}</h2>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card mb-4 bg-gray-white">
          <div class="card-header px-lg-4 pt-4 pb-lg-2 mb-0">
            <div class="row d-flex align-items-center">
              <div class="col-6">
                <h6 class="mb-0 fs-5">/Product</h6>
              </div>
              <div class="col-6 text-end">
                <button class="btn btn-outline-dark border-2 rounded-5
                me-lg-3 mb-0 px-lg-5 py-lg-3"
                @click="openModal(true)">新增商品</button>
              </div>
            </div>
          </div>
          <div class="card-body mt-lg-3 py-0 px-lg-5">
            <div class="table-responsive p-0 d-flex">
              <table class="table lh-lg mb-0 table-hover">
                <thead>
                  <tr>
                    <th class="text-secondary text-xxs fw-normal pb-lg-4 pt-sm-0
                    ">分類</th>
                    <th class="text-secondary text-xxs fw-normal pb-lg-4 pt-sm-0
                    ">名稱</th>
                    <th class="text-secondary text-xxs fw-normal pb-lg-4 pt-sm-0
                    ">售價</th>
                    <th class="text-secondary text-xxs fw-normal pb-lg-4 pt-sm-0
                    text-center">圖片</th>
                    <th class="text-secondary text-xxs fw-normal pb-lg-4 pt-sm-0
                    text-center">啟用</th>
                  </tr>
                </thead>
                <tbody >
                  <tr href="#" @click.prevent="openModal(false, item)" class="cursor-pointer"
                  v-for="item in products"
                  :key="item.id"
                  >
                    <td class="">{{ item.category }}</td>
                    <td class="">{{ item.title }}</td>
                    <td>NT${{ $filters.currency(item.price) }}</td>
                    <td class="text-center"><img class="img-30" :src="item.imageUrl" alt=""></td>
                    <td class="text-center">
                      <span v-if="item.is_enabled === 1"><i class="bi bi-check-lg fs-5"></i></span>
                      <span v-else></span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <Pagination
          :pages="pagination"
          @emit-pages="getProducts"/>
        </div>
      </div>
    </div>
  </div>

  <ProductModal
  ref="productModal"
  :product="tempProduct"
  :isNew="isNew"
  @update-product="updateProduct"
  @del-product="openDelProductModal(tempProduct)"/>

  <DelModal
  :item="tempProduct"
  ref="delModal"
  @del-item="delProduct"/>

  <Loading
  :active="isLoading"
  :zIndex ="10000"/>
</template>

<script>
import ProductModal from '@/components/backend/ProductModal.vue';
import DelModal from '@/components/backend/DelModal.vue';
import Pagination from '@/components/Pagination.vue';
// import PageTitle from '@/components/backend/PageTitle.vue';

export default {
  inject: ['emitter', 'pushMessageState'],
  components: {
    ProductModal,
    DelModal,
    Pagination,
    // PageTitle,
  },
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false,
      productsAll: [],
    };
  },
  methods: {
    getProductsAll() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/all`;
      this.$http.get(api)
        .then((res) => {
          this.productsAll = Object.values(res.data.products);
        });
    },
    getProducts(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`;
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false;
          if (res.data.success) {
            this.products = res.data.products;
            this.pagination = res.data.pagination;
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        });
    },
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
    updateProduct(item) {
      this.isLoading = true;
      this.tempProduct = item;
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';
      this.$refs.productModal.hideModal();
      this.getProducts();

      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = 'put';
      }
      this.$http[httpMethod](api, { data: this.tempProduct })
        .then((res) => {
          this.pushMessageState(res);
        });
      this.isLoading = false;
      this.$refs.productModal.hideModal();
      this.getProducts();
    },
    openDelProductModal(item) {
      this.isLoading = true;
      this.tempProduct = { ...item };
      this.isLoading = false;
      this.$refs.delModal.showModal();
    },
    delProduct() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      this.$http.delete(url)
        .then((res) => {
          this.isLoading = false;
          this.$refs.delModal.hideModal();
          this.getProducts();
          this.pushMessageState(res);
          this.$refs.productModal.hideModal();
        });
    },
  },
  created() {
    this.getProducts();
    this.getProductsAll();
  },
};
</script>
