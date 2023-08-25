<template>
  <Transition name="modal">
    <div v-if="show" class="tax-modal-mask modal-mask">
      <div class="modal-container border-box">

        <!-- title -->
        <div class="title">
          <h1>稅金試算</h1>
          <button class="modal-default-button"
            @click.prevent="$emit('close')"
            type="button">
            <i class="bi bi-x text-deep"></i>
          </button>
        </div>

        <!-- search -->
        <div class="search border-box">
          <div class="search-bar">
            <input class="border-box"
              type="text" id="search" placeholder="請輸入車款"
              v-model="cacheSearch">
            <button class="text-deep"
              type="button"
              v-if="!cacheSearch.length < 1"
              @click.prevent="delCacheSearch">
              移除
            </button>
          </div>
          <div v-if="cacheSearch">
            <label v-for="(item, key) in filterSearch.splice(0, 3)" :key="item + key">
              <p>{{ item.title }}</p>
              <input type="radio"
                :checked="cacheArea.title === item.title"
                @click.prevent="removeFilterSearch(item)">
            </label>
          </div>
          <p v-if="notFoundData">未找到符合的項目</p>
        </div>

        <!-- product -->
        <div class="product item-underline" v-if="cacheArea">
          <a href="#" @click.prevent="getProduct(cacheArea.id)"
            @click="$emit('close')">
            <div class="img-box">
              <img :src="cacheArea.imageUrl" :alt="cacheArea.title">
            </div>
            <h2 class="text-deep">{{ cacheArea.category }}</h2>
            <p>{{ cacheArea.title }}</p>
            <p>排氣量：{{ cacheArea.content.comparison.cc }}cc</p>
          </a>
        </div>

        <!-- tax -->
        <div class="tax" v-if="cacheArea">
          <p class="text-deep">
            總稅金 NT${{ $filters.currency(licenseTax(cc) + fuelTax(cc)) }}
          </p>
          <small>
            (牌照稅${{ $filters.currency(licenseTax(cc)) }} + 燃料稅${{ $filters.currency(fuelTax(cc)) }})
          </small>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import productStore from '@/stores/productStore';

export default {
  props: {
    show: Boolean,
  },

  data() {
    return {
      cacheSearch: '',
      cacheArea: '',
      notFoundData: false,
    };
  },

  computed: {
    ...mapState(productStore, ['products', 'cc']),

    filterSearch() {
      const regex = new RegExp(this.cacheSearch, 'i');
      return this.products.filter((item) => item.title.match(regex));
    },
  },

  methods: {
    ...mapActions(productStore, ['getProducts', 'licenseTax', 'fuelTax']),

    removeFilterSearch(item) {
      this.cacheArea = item;
      this.cacheSearch = '';
    },

    delCacheSearch() {
      this.cacheSearch = '';
    },

    updateNotFoundData() {
      const regex = new RegExp(this.cacheSearch, 'i');
      this.notFoundData = this.products.filter((item) => item.title.match(regex)).length === 0;
    },

    getProduct(id) {
      this.$router.push(`/product/${id}`);
      setTimeout(() => {
        window.location.reload();
      }, 100);
    },
  },

  watch: {
    cacheSearch: 'updateNotFoundData',
  },

  created() {
    this.getProducts();
  },
};
</script>
