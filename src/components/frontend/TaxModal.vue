<template>
  <div class="modal" tabindex="-1"
  ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">稅金試算</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"
          aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="form-floating mb-3">
              <input type="text" id="search" class="form-control"  placeholder="search"
              v-model="cacheSearch">
              <label for="search">搜尋</label>
            </div>

            <div class="list-group option"
            v-if="cacheSearch"
            >
              <label class="list-group-item p-3"
              v-for="(item, key) in filterSearch"
              :key="item + key">
              <input type="radio" :checked="cacheArea.title === item.title"
              class="form-check-input me-1 "
              @click="removeFilterSearch(item)">
              {{ item.title }}
              </label>
            </div>
            <div v-if="cacheArea">
            {{ cacheArea.title }}
            <img style="width : 200px ; height : 150px ; object-fit : cover; flex : 1 ;"
            class="card-img-top p-2"
            :src="cacheArea.imageUrl">
            <p>排氣量：
              {{ cacheArea.content.comparison.cc }}cc</p>
            <p>車牌顏色：
              <span
              v-if="cacheArea.content.comparison.cc <= 500">黃色</span>
              <span v-else>紅色</span>
            </p>
            <p>牌照稅：NT$
              {{ $filters.currency(licenseTax) }}
            </p>
            <p>燃料稅：NT$
              {{ $filters.currency(fuelTax) }}
            </p>
            <p>總計：NT${{ $filters.currency(totalTax) }}</p>
            </div>
            <div v-else>請選擇車款</div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  data() {
    return {
      modal: {},
      cc: '',
      products: [],
      cacheSearch: '',
      cacheArea: '',
      isShow: false,
    };
  },
  methods: {
    getProduct() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products`;
      this.$http.get(api)
        .then((res) => {
          this.products = res.data.products;
          console.log(this.products);
        });
    },
    removeFilterSearch(item) {
      this.cacheArea = item;
      this.cacheSearch = '';
    },
  },
  mixins: [modalMixin],
  computed: {
    filterSearch() {
      const regex = new RegExp(this.cacheSearch, 'i');
      return this.products.filter((item) => item.title.match(regex));
    },
    licenseTax() {
      const license = this.cacheArea.content.comparison.cc;
      if (license <= 500) {
        return 1620;
      }
      if (license <= 600) {
        return 2160;
      }
      if (license <= 1200) {
        return 4320;
      }
      if (license <= 1800) {
        return 7120;
      }
      return 11230;
    },
    fuelTax() {
      const fuel = this.cacheArea.content.comparison.cc;
      if (fuel <= 500) {
        return 900;
      }
      if (fuel <= 600) {
        return 1200;
      }
      if (fuel <= 1200) {
        return 1800;
      }
      if (fuel <= 500) {
        return 900;
      }
      return 2010;
    },
    totalTax() {
      const total = this.licenseTax + this.fuelTax;
      return total;
    },
  },
  created() {
    this.getProduct();
  },
};
</script>
