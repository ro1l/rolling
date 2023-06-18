<template>
  <div class="h3 bg-info">單一產品頁面</div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link :to="{ name: '所有產品' }">所有產品</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
      </ol>
    </nav>
  <div>
    <button class="btn btn-dark text-white"
    @click="addCart(product.id)"
    :disabled="this.status.loadingItem === product.id">加入購物車</button>
    <button class="btn btn-danger"
    @click="addComparison">加入比較</button>
    <div>
      {{ product.title }}
    </div>
    <div>
      廠牌{{ product.category }}
    </div>
    <div>NT$
      {{ $filters.currency(product.price) }}
    </div>
    <div v-if="product.content">
      <ul>
        <li>種類<br>{{ product.content.comparison.type }}</li>
        <li>引擎<br>{{ product.content.comparison.engine }}</li>
        <li>排氣量<br>{{ product.content.comparison.cc }}cc</li>
        <li>馬力<br>{{ product.content.comparison.hp }}</li>
        <li>扭力<br>{{ product.content.comparison.torque }}</li>
        <li>座高<br>{{ product.content.comparison.ht }}mm</li>
        <li>重量<br>{{ product.content.comparison.wt }}kg</li>
        <li>年耗油量<br>{{ product.content.comparison.afc }}公升</li>
        <li>油箱容量<br>{{ product.content.comparison.tank }}公升</li>
      </ul>
    </div>
    <div>
      <img :src="product.imageUrl" alt="">
    </div>
    <div></div>
    <div></div>
  </div>
  <Loading
  :active="isLoading"/>
</template>

<script>
import productStore from '@/stores/productStore';

export default {
  data() {
    return {
      product: {},
      id: '',
      isLoading: false,
      status: {
        loadingItem: '',
      },
    };
  },
  inject: ['emitter', 'pushMessageState'],
  methods: {
    getProduct() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`;
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false;
          this.product = res.data.product;
        });
    },
    addCart(id) {
      this.isLoading = true;
      this.status.loadingItem = id;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      const cart = {
        product_id: id,
        qty: 1,
      };
      this.$http.post(api, { data: cart })
        .then((res) => {
          this.isLoading = false;
          this.status.loadingItem = '';
          this.pushMessageState(res);
        });
    },
    addComparison() {
      const product = productStore();
      product.setProduct(this.product);
      this.$router.push('/comparison');
    },
  },
  created() {
    this.id = this.$route.params.productId;
    this.getProduct();
  },
};
</script>
