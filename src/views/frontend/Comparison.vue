<template>
  <div class="h3 bg-info">比較</div>
  {{ product }}
  <h3>標題</h3>
  <div
  v-for="item in product"
  :key="item.id">
  <ul>
    <li>{{ item.title }}</li>
  </ul></div>
</template>

<script>
import { mapState } from 'pinia';
import productStore from '@/stores/productStore';

export default {
  data() {
    return {
      tempProduct: {},
    };
  },
  inject: ['emitter'],
  computed: {
    ...mapState(productStore, ['product']),
  },
  created() {
  },
};
</script>
