<template>
    <div class="product-card">
      <img :src="product.imageUrl" alt="">
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
  data() {
    return {
    };
  },
};
</script>
