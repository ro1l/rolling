<template>
  <div class="h3 bg-info">單一產品頁面</div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link :to="{ name: '所有產品' }">所有產品</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
      </ol>
    </nav>
  <div>
    <button class="btn btn-dark text-white">加入購物車</button>
    <div>
      {{ product.title }}
    </div>
    <div>
      {{ $filters.currency(product.price) }}
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
export default {
  data() {
    return {
      product: {},
      id: '',
      isLoading: false,
    };
  },
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
  },
  created() {
    this.id = this.$route.params.productId;
    this.getProduct();
  },
};
</script>
