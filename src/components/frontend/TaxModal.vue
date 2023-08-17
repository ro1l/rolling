<template>
  <Transition name="modal">
    <div v-if="show" class="tax-modal-mask modal-mask">
      <div class="modal-container border-box">

        <!-- title -->
        <div class="title">
          <h1>稅金試算</h1>
          <button class="modal-default-button"
          @click="$emit('close')"><i class="bi bi-x text-deep"></i>
          </button>
        </div>

        <!-- search -->
        <div class="search border-box">
          <div class="search-bar">
            <input class="border-box" type="text" id="search" placeholder="請輸入車款"
            v-model="cacheSearch">
            <button class="text-deep"
            v-if="!cacheSearch.length < 1" @click="delCacheSearch">移除</button>
          </div>
          <div v-if="cacheSearch">
            <label v-for="(item, key) in filterSearch.splice(0, 3)" :key="item + key">
              <p>{{ item.title }}</p>
              <input type="radio" :checked="cacheArea.title === item.title"
              @click="removeFilterSearch(item)">
            </label>
          </div>
        </div>

        <!-- product -->
        <div class="product item-underline" v-if="cacheArea">
          <div class="img-box">
            <img :src="cacheArea.imageUrl" alt="">
          </div>
          <h2 class="text-deep">{{ cacheArea.category }}</h2>
          <p>{{ cacheArea.title }}</p>
          <p>排氣量：{{ cacheArea.content.comparison.cc }}cc</p>
        </div>

        <!-- tax -->
        <div class="tax" v-if="cacheArea">
          <p class="text-deep">總稅金 NT${{ $filters.currency(totalTax) }}</p>
          <small>
            (牌照稅${{ $filters.currency(licenseTax) }} +
            燃料稅$
            {{ $filters.currency(fuelTax) }})</small>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script>
import taxMixin from '@/mixins/taxMixin';

export default {
  props: {
    show: Boolean,
  },
  data() {
    return {
      cc: '',
      products: [],
      cacheSearch: '',
      cacheArea: '',
    };
  },
  computed: {
    filterSearch() {
      const regex = new RegExp(this.cacheSearch, 'i');
      return this.products.filter((item) => item.title.match(regex));
    },
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http.get(api)
        .then((res) => {
          this.products = res.data.products;
        });
    },
    removeFilterSearch(item) {
      this.cacheArea = item;
      this.cacheSearch = '';
    },
    delCacheSearch() {
      this.cacheSearch = '';
    },
  },
  created() {
    this.getProducts();
  },
  mixins: [taxMixin],

};
</script>
