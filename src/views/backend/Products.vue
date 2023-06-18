<template>
  <div class="h3 bg-info">產品列表</div>
  <div class="text-end">
    <button class="btn btn-info"
    @click="openModal(true)">新增商品</button>
  </div>
  <!-- <div class="container-fluid"> -->
  <table class="table mt-4">
    <thead>
      <tr>
        <th>分類</th>
        <th>名稱</th>
        <th>單位</th>
        <th>售價</th>
        <th>是否啟用</th>
        <th>狀態</th>
      </tr>
    </thead>
    <tbody>
      <tr
      v-for="item in products"
      :key="item.id"
      >
        <td>{{ item.category }}</td>
        <td>{{ item.title }}</td>
        <td>{{ item.unit }}</td>
        <td>{{ $filters.currency(item.price) }}</td>
        <td>
          <span v-if="item.is_enabled">是</span>
          <span v-else>否</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-success"
            @click="openModal(false, item)">編輯</button>
            <button class="btn btn-outline-danger"
            @click="openDelProductModal(item)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <Pagination
  :pages="pagination"
  @emit-pages="getProducts"/>
  <ProductModal
  ref="productModal"
  :product="tempProduct"
  @update-product="updateProduct"/>
  <DelModal
  :item="tempProduct"
  ref="delModal"
  @del-item="delProduct"/>
  <Loading
  :active="isLoading"/>
</template>

<script>
import ProductModal from '@/components/backend/ProductModal.vue';
import DelModal from '@/components/backend/DelModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  inject: ['emitter', 'pushMessageState'],
  components: {
    ProductModal,
    DelModal,
    Pagination,
  },
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {
        content: {
          comparison: {
            type: '123',
          },
        },
      },
      isNew: false,
      isLoading: false,
    };
  },
  methods: {
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
      const productComponent = this.$refs.productModal;
      productComponent.showModal();
      console.log(this.tempProduct);
    },
    updateProduct(item) {
      this.isLoading = true;
      this.tempProduct = item;
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';

      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = 'put';
      }
      this.$http[httpMethod](api, { data: this.tempProduct })
        .then((res) => {
          this.isLoading = false;
          this.$refs.productModal.hideModal();
          this.getProducts();
          this.pushMessageState(res);
        });
    },
    openDelProductModal(item) {
      this.isLoading = true;
      this.tempProduct = { ...item };
      this.isLoading = false;
      const delComponent = this.$refs.delModal;
      delComponent.showModal();
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
        });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
