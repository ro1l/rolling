<template>
  <div class="media-scrolled">
    <div class="media-element"
    v-for="product in reversedProducts"
    :key="product.id">
      <a href="#"
      @click.prevent="getProduct(product.id)">
        <img :src="product.imageUrl" alt="">
        <h5>{{ product.category }}</h5>
        <p>{{ product.title }}</p>
      </a>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    products: Array,
  },
  methods: {
    getProduct(id) {
      this.$router.push(`/product/${id}`);
    },
  },
  computed: {
    reversedProducts() {
      return this.products.slice(-5).reverse();
    },
  },
};
</script>
