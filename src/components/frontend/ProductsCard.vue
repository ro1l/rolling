<template>
  <div class="product-card">
    <div class="img-box">
      <img :src="product.imageUrl" :alt="product.title">
    </div>
    <div class="text">
      <h5>{{ product.category }}</h5>
      <p>{{ product.title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
  },
};
</script>
