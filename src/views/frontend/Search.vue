<template>
  <div class="search-box">

    <!-- title -->
    <div class="title">
      <h1>搜尋</h1>
      <button @click="goBack">
        <i class="bi bi-x text-deep">
        </i>
      </button>
    </div>

    <!-- search -->
    <div class="search border-box">
      <div class="search-bar">
        <input class="border-box" type="text" id="search"
          placeholder="請輸入車款"
          v-model="cacheProductsSearch">
        <button class="text-deep"
          v-if="!cacheProductsSearch.length < 1"
          @click="delCacheProductSearch">
          移除
        </button>
      </div>
      <div v-if="cacheProductsSearch">
        <!-- 產品 -->
        <label v-for="(item, key) in filterProductsSearch.splice(0, 3)" :key="item + key">
          <p>{{ item.title }}</p>
          <input type="radio"
            :checked="cacheProductArea.title === item.title"
            @click="getProduct(item.id)">
        </label>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import productStore from '@/stores/productStore';

export default {
  data() {
    return {
      cacheProductsSearch: '',
      cacheProductArea: '',
    };
  },

  computed: {
    ...mapState(productStore, ['products']),
    filterProductsSearch() {
      const regex = new RegExp(this.cacheProductsSearch, 'i');
      return this.products.filter((item) => item.title.match(regex));
    },

    filterArticlesSearch() {
      const regex = new RegExp(this.cacheArticlesSearch, 'i');
      return this.articles.filter((item) => item.title.match(regex));
    },
  },

  methods: {
    ...mapActions(productStore, ['getProducts']),

    removeFilterSearch(item) {
      this.cacheProductArea = item;
      this.cacheProductsSearch = '';
    },

    delCacheProductSearch() {
      this.cacheProductsSearch = '';
    },

    getProduct(id) {
      this.$router.push(`/product/${id}`);
    },

    goBack() {
      return this.$router.go(-1);
    },
  },

  created() {
    this.getProducts();
  },
};
</script>
