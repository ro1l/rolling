<template>
  <!-- nav-bar-lg -->
  <nav
  class="nav-bar-lg nav-bar"
  :class="{ 'onScroll': isScroll }"
  id="nav">
    <!-- left -->
    <div class="nav-list nav-left">
      <ul>
        <li>
          <router-link :to="{ name: '所有產品' }">車款總覽</router-link>
        </li>
        <li>
          <router-link :to="{ name: '車款比較' }">車款比較</router-link>
        </li>
        <li>
          <router-link :to="{ name: '文章總覽' }">文章總覽</router-link>
        </li>
        <li>
          <a id="show-modal" @click="showTaxModal = true">稅金試算</a>
          <teleport to='body'>
            <TaxModal :show="showTaxModal"
            @close="showTaxModal = false">
            </TaxModal>
          </teleport>
        </li>
      </ul>
    </div>
    <!-- center -->
    <div class="nav-list">
      <router-link class="logo" :to="{ name: 'home' }">Rolling</router-link>
    </div>
    <!-- right -->
    <div class="nav-list nav-right">
      <ul>
        <li>
          <router-link :to="{ name: '搜尋' }">搜尋</router-link>
        </li>
        <li>
          <div class="mode-toggle"
          @click="modeToggle"
          :class="darkDark">
            <div class="toggle">
              <div class="dark-mode" type="checkbox"></div>
            </div>
          </div>
        </li>
        <li>
          <router-link class="cart" :to="{ name: '購物車' }">
            <span>購物車</span>
            <span v-if="cartProducts.length > 0">({{ cartsNum }})</span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>

  <!-- nav-bar-sm -->
  <nav
  class="nav-bar-sm nav-bar">
    <div class="nav-list">
      <router-link class="logo" :to="{ name: 'home' }">Rolling</router-link>
    </div>
    <div class="nav-list">
      <router-link class="cart" :to="{ name: '購物車' }">
        <span>購物車</span>
        <span v-if="cartProducts.length > 0">({{ cartsNum }})</span>
      </router-link>
    </div>
  </nav>

  <!-- nav-button -->
  <button class="nav-button"
  @click="toggleOffcanvas"
  v-if="showNav">
    <i class="bi bi-list"
    v-if="isMenuOpen === false"></i>
    <i class="bi bi-x-lg"
    v-if="isMenuOpen === true"></i>
    <span
    v-if="isMenuOpen === false">導覽列</span>
    <span
    v-if="isMenuOpen === true">關  閉</span>
  </button>

  <!-- button-ground -->
  <div class="button-ground"
  v-if="productsNavbar">
    <button
    @click="toggleFilter">
      <span
      v-if="isFilterOpen === false">篩選</span>
      <span
      v-if="isFilterOpen === true">關  閉</span>
    </button>
    <button
    @click="toggleOffcanvas">
      <i class="bi bi-list"
      v-if="isMenuOpen === false"></i>
      <i class="bi bi-x-lg"
      v-if="isMenuOpen === true"></i>
      <span
      v-if="isMenuOpen === false">導覽列</span>
      <span
      v-if="isMenuOpen === true">關  閉</span>
    </button>
  </div>

  <!-- nav-page -->
  <div class="nav-page"
  v-if="isMenuOpen">
    <div class="nav-list">
      <ul>
        <li>
          <div class="mode-toggle"
          @click="modeToggle"
          :class="darkDark">
            <div class="toggle">
              <div class="dark-mode" type="checkbox"></div>
            </div>
          </div>
        </li>
        <li>
          <router-link :to="{ name: '所有產品' }">車款總覽</router-link>
        </li>
        <li>
          <router-link :to="{ name: '車款比較' }">車款比較</router-link>
        </li>
        <li>
          <router-link :to="{ name: '文章總覽' }">文章總覽</router-link>
        </li>
        <li>
          <a id="show-modal" @click="showTaxModal = true">稅金試算</a>
          <teleport to='body'>
            <TaxModal :show="showTaxModal" @close="closeModal">
            </TaxModal>
          </teleport>
        </li>
        <li>
          <router-link :to="{ name: '搜尋' }" class="search">搜尋商品</router-link>
        </li>
      </ul>
    </div>
  </div>

  <!-- filter-page -->
  <div class="filter-page nav-page"
  v-if="isFilterOpen">
    <div class="nav-list">
      <ul>
        <li><h3>篩選</h3></li>
        <li>分類</li>
        <li>
          <div class="category-box">
          <router-link  class="text-deep"
          @click="changeFilter"
          :to="{ name: '所有產品' }"
          >所有商品</router-link>
          <template v-for="(item, key) in productsCategory"
            :key="key">
            <a class="text-deep" href="#"
            @click.prevent="changeCategory(item)">{{ item }}</a>
          </template>
          </div>
        </li>
            <!-- cc -->
        <li>
          <h5>排氣量</h5>
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
      </ul>
    </div>
</div>
</template>

<script>
import emitter from '@/methods/emitter';
import TaxModal from './TaxModal.vue';

export default {
  data() {
    return {
      isScroll: false,
      showTaxModal: false,
      showSearchModal: false,
      darkMode: false,
      cartProducts: [],
      isMenuOpen: false,
      isFilterOpen: false,
      productsNavbar: false,
      productsCategory: [],
      showNav: true,
      routesWithoutNav: ['單一產品', '所有產品', '購物車'],
      taxStatus: false,
    };
  },
  components: {
    TaxModal,
  },
  props: ['isHomePage'],
  methods: {
    getCartProducts() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false;
          this.cartProducts = res.data.data.carts;
        });
    },
    changeNavbar() {
      const scrollContainer = document.getElementById('scroll-container');
      const scrollPosition = scrollContainer.scrollTop;

      const { offsetTop: activityOffsetTop, offsetHeight: activityOffsetHeight } = document.getElementById('activity');
      const { offsetTop: bannerOffsetTop, offsetHeight: bannerOffsetHeight } = document.getElementById('banner');

      const isActivityScroll = scrollPosition >= activityOffsetTop
      && scrollPosition < activityOffsetTop + activityOffsetHeight;
      const isBannerScroll = scrollPosition >= bannerOffsetTop
      && scrollPosition < bannerOffsetTop + bannerOffsetHeight;

      this.isScroll = isActivityScroll || isBannerScroll;
    },
    dark() {
      document.querySelector('body').classList.add('dark-mode');
      this.darkMode = true;
      this.$emit('dark');
    },
    light() {
      document.querySelector('body').classList.remove('dark-mode');
      this.darkMode = false;
      this.$emit('light');
    },
    modeToggle() {
      if (this.darkMode || document.querySelector('body').classList.contains('dark-mode')) {
        this.light();
      } else {
        this.dark();
      }
    },
    toggleOffcanvas() {
      this.isMenuOpen = !this.isMenuOpen;
      if (this.isMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
      this.isFilterOpen = false;
    },
    toggleFilter() {
      this.isFilterOpen = !this.isFilterOpen;
      if (this.isFilterOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
      this.isMenuOpen = false;
    },
    changeCategory(category) {
      this.$router.push({ name: '所有產品', query: { category } });
      this.isFilterOpen = false;
      document.body.style.overflow = 'auto';
    },
    changeFilter() {
      this.isFilterOpen = false;
      document.body.style.overflow = 'auto';
    },
    checkRoute() {
      const to = this.$route;
      this.showNav = !this.routesWithoutNav.includes(to.name);
      this.productsNavbar = false;
      if (to.name === '所有產品') {
        this.productsNavbar = true;
      } else {
        this.productsNavbar = false;
      }
    },
    closeModal() {
      this.showTaxModal = false;
      this.isMenuOpen = !this.isMenuOpen;
      if (this.isMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
      this.isFilterOpen = false;
    },
  },
  mounted() {
    if (this.isHomePage === true) {
      const scrollContainer = document.getElementById('scroll-container');
      scrollContainer.addEventListener('scroll', this.changeNavbar);

      const banner = document.getElementById('banner');

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target.id === 'banner') {
              this.isScroll = entry.isIntersecting;
            }
          });
        },
        {
          root: null,
          threshold: 0,
        },
      );

      observer.observe(banner);
    }
    this.getCartProducts();
    this.checkRoute();
  },
  computed: {
    darkDark() {
      return this.darkMode && 'darkmode-toggled';
    },
    cartsNum() {
      let cartNum = 0;
      this.cartProducts.forEach((e) => {
        cartNum += e.qty;
      });
      return cartNum;
    },
  },
  created() {
    emitter.on('updateCart', () => {
      this.getCartProducts();
    });
    emitter.on('sendCategory', (data) => {
      this.productsCategory = data;
    });
  },
  watch: {
    $route() {
      this.checkRoute();
      this.isMenuOpen = false;
      this.isFilterOpen = false;
      document.body.style.overflow = 'auto';
    },
  },
};
</script>
