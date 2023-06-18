<template>
  <div class="h3 bg-info">所有產品</div>
  <div class="container">
  <div class="row">
    <div class="col-12">
      <table class="table">
        <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td style="width: 150px">
              <div style="height: 100px;">
                <img :src="item.imageUrl" alt="">
              </div>
            </td>
            <td>{{ item.title }}</td>
            <td>
              <del>原價{{ $filters.currency(item.origin_price) }}</del>
              <div class="h5 text-danger">現在只要NT{{ $filters.currency(item.price) }}</div>
            </td>
            <td>
              <div class="btn-group">
                <button class="btn btn-outline-danger" @click="getProduct(item.id)">查看更多</button>
                <button class="btn btn-outline-danger"
                @click="addCart(item.id)"
                :disabled="this.status.loadingItem === item.id">加入購物車</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  </div>
  <Pagination :pages="pagination" @emit-pages="getProducts" />
  <Loading :active="isLoading">
  </Loading>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
// import { mapState, mapActions } from 'pinia';
// import productStore from '@/stores/productStore';

export default {
  inject: ['emitter', 'pushMessageState'],
  data() {
    return {
      products: {},
      pagination: {},
      isLoading: false,
      status: {
        loadingItem: '',
      },
    };
  },
  // computed: {
  //   ...mapState(productStore, ['products']),
  // },
  components: {
    Pagination,
  },
  methods: {
    // ...mapActions(productStore, ['getProducts']),
    getProducts(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/?page=${page}`;
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false;
          if (res.data.success) {
            this.products = res.data.products;
            this.pagination = res.data.pagination;
          }
        });
    },
    getProduct(id) {
      this.$router.push(`/product/${id}`);
    },
    addCart(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty: 1,
      };
      this.$http.post(api, { data: cart })
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          this.status.loadingItem = '';
          this.pushMessageState(res);
        });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
