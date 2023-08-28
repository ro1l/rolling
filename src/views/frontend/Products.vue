<template>
  <PageTitleSm :title="title"
    :content="`${filteredProductsLength}項商品`" />

  <div class="products-box">

    <!-- category -->
    <div class="category sidebar">
      <li>
        <router-link :to="{ name: '所有產品' }" class="text-deep">
          所有商品
        </router-link>
      </li>
      <li>
        <input type="checkbox" name="" id="collapsible-title" checked>
        <label for="collapsible-title" class="text-shallow">
          <i class="bi bi-chevron-right"></i>
          <h5>車款廠牌</h5>
        </label>
        <div class="collapsible-item">
      <li v-for="(item, key) in productsCategory" :key="key">
        <a class="text-deep" href="#"
          @click.prevent="changeCategory(item)">
          {{ item }}
        </a>
      </li>
    </div>
    </li>
    </div>

    <!-- products -->
    <div class="products">

      <Breadcrumb :title="title"
        :content="`${filteredProductsLength}項商品`"
        v-if="!isLoadingForStore" />

      <div class="products-box"
        v-if="isLoadingForStore">
        <div class="products-item"
          v-for="(item, key) in skeletonNum" :key="key">

          <ProductsSkeleton :skeleton="item" />

        </div>
      </div>
      <div class="products-box" id="infinite-list"
        v-if="productByCategory.length > 0">
        <div class="products-item"
          v-for="item in productByCategory" :key="item.id">

          <ProductsCard :product="item"
            @click.prevent="getProduct(item.id)" />

        </div>
      </div>
      <h4 v-else>暫無商品</h4>
    </div>

  <!-- filter -->
    <div class="filter sidebar bg-color"
      v-if="isFilterOpen">
      <h4 class="text-deep">篩選</h4>
      <div class="category">
        <li>
          <router-link :to="{ name: '所有產品' }"  class="text-deep">
            所有商品
          </router-link>
        </li>
        <li>
          <input type="checkbox" name="" id="collapsible-sm-title" checked>
          <label for="collapsible-sm-title" class="text-shallow title">
            <i class="bi bi-chevron-right"></i>
            <h5>車款廠牌</h5>
          </label>
          <div class="collapsible-item">
        <li v-for="(item, key) in productsCategory" :key="key">
          <a class="text-deep" href="#"
            @click.prevent="changeCategory(item)">
            {{ item }}
          </a>
        </li>
      </div>
      </li>
    </div>
      <li class="text-deep filter-title">篩選</li>

      <!-- 排氣量 -->
      <li>
        <input type="checkbox" name="" id="cc" checked>
        <label for="cc" class="text-shallow title">
          <i class="bi bi-chevron-right"></i>
          <h5>排氣量</h5>
        </label>
        <div class="collapsible-item">
          <div class="box"
            v-for="(item, key) in selectCc" :key="'item' + key">
            <input class="text-deep" type="checkbox"
              :id="'cc_' + item.min + '_' + item.max"
              v-model="selectedCc"
              :value="item">
            <label :for="'cc_' + item.min + '_' + item.max">
              {{ formatRange(item) }}
            </label>
          </div>
        </div>
      </li>

      <!-- 種類 -->
      <li>
        <input type="checkbox" name="" id="type" checked>
        <label for="type" class="text-shallow title">
          <i class="bi bi-chevron-right"></i>
          <h5>種類</h5>
        </label>
        <div class="collapsible-item">
          <div class="box" v-for="(item, key) in productsType" :key="'item' + key">
            <input class="text-deep" type="checkbox"
            :id="item"
            v-model="selectedProductsType"
            :value="item">
            <label :for="item">{{ item }}</label>
          </div>
        </div>
      </li>
    </div>
  </div>

  <Pagination :pages="pagination"
    @emit-pages="showCategory" />
</template>

<script>
import emitter from '@/methods/emitter';
import ProductsCard from '@/components/frontend/ProductsCard.vue';
import Pagination from '@/components/Pagination.vue';
import PageTitleSm from '@/components/frontend/PageTitleSm.vue';
import Breadcrumb from '@/components/frontend/Breadcrumb.vue';
import ProductsSkeleton from '@/components/frontend/ProductsSkeleton.vue';
import { mapState, mapActions } from 'pinia';
import productStore from '@/stores/productStore';
import statusStore from '@/stores/statusStore';

export default {
  components: {
    ProductsCard,
    Pagination,
    PageTitleSm,
    Breadcrumb,
    ProductsSkeleton,
  },

  data() {
    return {
      productByCategory: [],
      nowCategory: '',
      selectCategory: '',
      pagination: {
        current_page: 1,
        has_next: true,
        has_pre: false,
        total_pages: 1,
      },
      title: '',
      selectCc: [
        { min: 251, max: 550 },
        { min: 501, max: 600 },
        { min: 601, max: 1200 },
        { min: 1201, max: 1800 },
        { min: 1800, max: 2500 },
      ],
      selectedCc: [],
      selectedProductsType: [],
      isFilterOpen: false,
      skeletonNum: 9,
    };
  },

  computed: {
    ...mapState(productStore, ['products', 'productsCategory', 'productsType']),

    ...mapState(statusStore, ['isLoadingForStore']),

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

      return categoryProduct;
    },

    filteredProductsLength() {
      return this.categoryProduct.length;
    },
  },

  methods: {
    ...mapActions(productStore, ['getProducts']),

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
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
    },

    checkRoute() {
      const to = this.$route;
      if (to.name === '所有產品') {
        this.title = '所有產品';
        this.isFilterOpen = false;
      }
      if (to.query.category) {
        this.title = to.query.category;
        this.isFilterOpen = false;
      }
      if (window.innerWidth >= 768) {
        this.isFilterOpen = true;
      } else {
        this.isFilterOpen = false;
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

  created() {
    emitter.emit('sendCategory', this.productsCategory);
    emitter.on('sendToggleFilter', (data) => {
      this.isFilterOpen = data;
    });
    this.getProducts();
    window.scrollTo(0, 0);
  },

  mounted() {
    this.getProducts();
    this.checkRoute();
  },

  inject: ['emitter', 'pushMessageState'],
};
</script>
