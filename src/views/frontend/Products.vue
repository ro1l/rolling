<template>
  <div class="products-box">

    <!-- category -->
    <div class="category sidebar">
      <li>
        <router-link  class="text-deep"
        :to="{ name: '所有產品' }">所有商品</router-link>
      </li>
      <li>
        <input type="checkbox" name="" id="collapsible-title" checked>
        <label for="collapsible-title" class="text-shallow" >
          <i class="bi bi-chevron-right"></i>
          <h5>車款廠牌</h5>
        </label>
        <div class="collapsible-item">
          <li
          v-for="(item, key) in productsCategory"
          :key="key">
            <a class="text-deep" href="#"
            @click.prevent="changeCategory(item)">{{ item }}</a>
          </li>
        </div>
      </li>
    </div>

    <!-- products -->
    <div class="products">
      <div class="products-box" id="infinite-list">
        <div class="products-item"
        v-for="item in productByCategory"
        :key="item.id">
          <ProductsCard
          :product="item"
          @click="getProduct(item.id)"/>
        </div>
      </div>
    </div>

    <!-- filter -->
    <div class="filter sidebar">
      <li class="text-deep">篩選</li>
      <li>
        <input type="checkbox" name="" id="cc" checked>
        <label for="cc" class="text-shallow">
          <i class="bi bi-chevron-right"></i>
          <h5>排氣量</h5>
        </label>
        <div class="collapsible-item">
          <div class="box">
            <input class="text-shallow"
            type="checkbox" id="black">
            <label for="black">251~500cc</label>
          </div>
          <div class="box">
            <input class="text-shallow"
            type="checkbox" id="red">
            <label for="red">501~600cc</label>
          </div>
        </div>
      </li>
    </div>

  </div>

  <Loading
  :active="isLoading"/>

  <Pagination
  :pages="pagination"
  @emit-pages="showCategory"/>
</template>

<script>
import ProductsCard from '@/components/frontend/ProductsCard.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    ProductsCard,
    Pagination,
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
    };
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http.get(api)
        .then((res) => {
          this.products = res.data.products;
          this.products.forEach((item) => {
            if (!this.productsCategory.includes(item.category)) {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              this.isLoading = false;
              this.productsCategory.push(item.category);
            }
          });
        });
    },
    getProduct(id) {
      this.$router.push(`/product/${id}`);
    },
    changeCategory(category) {
      this.$router.push({ name: '所有產品', query: { category } });
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
  },
  watch: {
    $route() {
      this.selectCategory = this.$route.query.category || '';
    },
    categoryProduct() {
      this.showCategory();
    },
  },
  computed: {
    categoryProduct() {
      let categoryProduct = [];
      categoryProduct = this.products.filter((item) => item.category?.match(this.selectCategory));
      return categoryProduct;
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
