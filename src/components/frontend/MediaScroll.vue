<template>
  <div class="media-scrolled">
    <div class="media-element" v-for="product in reversedProducts" :key="product.id">
      <a href="#" @click="getProduct(product.id)">
        <div class="img-box">
          <img :src="product.imageUrl" :alt="product.title">
        </div>
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

  computed: {
    reversedProducts() {
      return this.products.slice(-5).reverse();
    },
  },

  methods: {
    getProduct(id) {
      setTimeout(() => {
        this.$router.push(`/product/${id}`);
      });
    },
  },
};
</script>
