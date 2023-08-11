<template>
  <PageTitleSm :title="title" :content="`${productsLength}項商品`" />

  <div class="products-box">

    <!-- category -->
    <div class="category sidebar">
      <li>
        <router-link class="text-deep" :to="{ name: '所有產品' }">所有商品</router-link>
      </li>
      <li>
        <input type="checkbox" name="" id="collapsible-title" checked>
        <label for="collapsible-title" class="text-shallow">
          <i class="bi bi-chevron-right"></i>
          <h5>車款廠牌</h5>
        </label>
        <div class="collapsible-item">
      <li v-for="(item, key) in productsCategory" :key="key">
        <a class="text-deep" href="#" @click.prevent="changeCategory(item)">{{ item }}</a>
      </li>
    </div>
    </li>
  </div>

  <!-- products -->
  <div class="products">
    <Breadcrumb
    :title="title"
    :content="`${productsLength}項商品`"/>
    <div class="products-box" id="infinite-list">
      <div class="products-item" v-for="item in productByCategory" :key="item.id">
        <ProductsCard :product="item" @click="getProduct(item.id)" />
      </div>
    </div>
  </div>

  <!-- filter -->
  <div class="filter sidebar">
    <li class="text-deep">篩選</li>

    <!-- cc -->
    <li>
      <input type="checkbox" name="" id="cc" checked>
      <label for="cc" class="text-shallow">
        <i class="bi bi-chevron-right"></i>
        <h5>排氣量</h5>
      </label>
    <div class="collapsible-item">
      <div class="box" v-for="(item, key) in selectCc" :key="'item' + key">
        <input class="text-shallow" type="checkbox"
        :id="'cc_' + item.min + '_' + item.max" v-model="selectedCc" :value="item">
        <label :for="'cc_' + item.min + '_' + item.max">{{ formatRange(item) }}</label>
      </div>
    </div>
    </li>

    <!-- 種類 -->
    <li>
      <input type="checkbox" name="" id="type" checked>
      <label for="type" class="text-shallow">
        <i class="bi bi-chevron-right"></i>
        <h5>種類</h5>
      </label>
    <div class="collapsible-item">
      <div class="box" v-for="(item, key) in productsType" :key="'item' + key">
        <input class="text-shallow" type="checkbox"
        :id="item" v-model="selectedProductsType" :value="item">
        <label :for="item">{{ item }}</label>
      </div>
    </div>
    </li>

    <!-- 車牌 -->
    <!-- <li>
      <input type="checkbox" name="" id="licensePlateColor" checked>
      <label for="licensePlateColor" class="text-shallow">
        <i class="bi bi-chevron-right"></i>
        <h5>車牌</h5>
      </label>
    <div class="collapsible-item">
      <div class="box" v-for="(item, key) in selectLicensePlateColor" :key="'item' + key">
        <input class="text-shallow" type="checkbox"
        :id="item" v-model="selectedLicensePlateColor" :value="item">
        <label :for="item">{{ item }}</label>
      </div>
    </div>
    </li> -->
  </div>

  </div>

  <Loading :active="isLoading" />

  <Pagination :pages="pagination" @emit-pages="showCategory" />
</template>

<script>
import ProductsCard from '@/components/frontend/ProductsCard.vue';
import Pagination from '@/components/Pagination.vue';
import emitter from '@/methods/emitter';
import PageTitleSm from '@/components/frontend/PageTitleSm.vue';
import Breadcrumb from '@/components/frontend/Breadcrumb.vue';

export default {
  components: {
    ProductsCard,
    Pagination,
    PageTitleSm,
    Breadcrumb,
  },
  inject: ['emitter', 'pushMessageState'],
  data() {
    return {
      products: [],
      productsCategory: [],
      productByCategory: [],
      nowCategory: '',
      selectCategory: '',
      pagination: {
        current_page: 1,
        has_next: true,
        has_pre: false,
        total_pages: 1,
      },
      isLoadingMore: false,
      isLoading: false,
      title: '',
      productsLength: 0,
      selectCc: [
        { min: 251, max: 550 },
        { min: 501, max: 600 },
        { min: 601, max: 1200 },
        { min: 1201, max: 1800 },
        { min: 1800, max: 10000 },
      ],
      selectedCc: [],
      // selectLicensePlateColor: [
      //   '黃牌', '紅牌',
      // ],
      // selectedLicensePlateColor: [],
      productsType: [],
      selectedProductsType: [],
    };
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http.get(api)
        .then((res) => {
          this.products = res.data.products;
          this.productsLength = this.products.length;
          this.products.forEach((item) => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (!this.productsCategory.includes(item.category)) {
              this.isLoading = false;
              this.productsCategory.push(item.category);
            }
          });
          this.products.forEach((item) => {
            if (!this.productsType.includes(item.content.comparison.type)) {
              this.isLoading = false;
              this.productsType.push(item.content.comparison.type);
              console.log(this.productsType);
            }
          });
        });
    },
    getProduct(id) {
      setTimeout(() => {
        this.$router.push(`/product/${id}`);
      });
    },
    changeCategory(category) {
      setTimeout(() => {
        this.$router.push({ name: '所有產品', query: { category } });
      });
      this.nowCategory = category;
    },
    showCategory(page = 1) {
      const tempProductCategory = [...this.categoryProduct];
      const allPage = Math.ceil(tempProductCategory.length / 9);
      this.nowCategory = this.selectCategory === '' ? '所有產品' : this.selectCategory;
      this.pagination = {
        current_page: page,
        total_pages: allPage,
        has_pre: page > 1,
        has_next: page < allPage,
      };
      this.productByCategory = tempProductCategory.splice((page - 1) * 9, page * 9);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    checkRoute() {
      const to = this.$route;
      if (to.name === '所有產品') {
        this.title = '所有產品';
        this.productsLength = this.products.length;
      }
      if (to.query.category) {
        this.title = to.query.category;
        this.productsLength = this.categoryProduct.length;
      }
    },
    formatRange(range) {
      return `${range.min}~${range.max}cc`;
    },
  },
  watch: {
    $route() {
      this.selectCategory = this.$route.query.category || '';
      this.checkRoute();
    },
    categoryProduct() {
      this.showCategory();
    },
  },
  computed: {
    categoryProduct() {
      let categoryProduct = this.products.filter(
        (item) => item.category?.match(this.selectCategory),
      );

      if (this.selectedCc.length > 0) {
        categoryProduct = categoryProduct.filter((item) => {
          const productCc = parseInt(item.content.comparison.cc, 10);
          return this.selectedCc.some((range) => productCc >= range.min && productCc <= range.max);
        });
      }

      if (this.selectedProductsType.length > 0) {
        categoryProduct = categoryProduct.filter(
          (item) => item.content.comparison.type?.match(this.selectedProductsType),
        );
      }

      // if (this.selectedLicensePlateColor.length > 0) {
      //   categoryProduct = categoryProduct.filter((item) => {
      //     const productCc = parseInt(item.content.comparison.cc, 10);
      //     if (this.selectedLicensePlateColor.includes('黃牌')) {
      //       return productCc >= 250 && productCc <= 550;
      //     }
      //     if (this.selectedLicensePlateColor.includes('紅牌')) {
      //       return productCc >= 550 && productCc <= 10000;
      //     }
      //     return false;
      //   });
      // }

      return categoryProduct;
    },
  },
  mounted() {
    this.getProducts();
    this.checkRoute();
  },
  created() {
    emitter.emit('sendCategory', this.productsCategory);
    this.getProducts();
  },
};
</script>
