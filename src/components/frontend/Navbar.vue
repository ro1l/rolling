<template>
  <!-- 導覽列 -->
  <nav class="nav-bar bg-color" :class="{ 'isHome': isHome }" id="nav">
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
            <TaxModal :show="showTaxModal" @close="showTaxModal = false">
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
          <div class="mode-toggle" @click="modeToggle" :class="{ 'darkDark': true, }">
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

  <!-- 手機版導覽列按鈕 -->
  <button class="nav-button bg-color text-deep" @click="toggleOffcanvas" v-if="showNav">
    <i class="bi bi-list" v-if="isMenuOpen === false"></i>
    <i class="bi bi-x-lg" v-if="isMenuOpen === true"></i>
    <span v-if="isMenuOpen === false">導覽列</span>
    <span v-if="isMenuOpen === true">關 閉</span>
  </button>

  <!-- 手機版導覽列以及篩選按鈕 -->
  <div class="button-ground bg-color text-deep" v-if="productsNavbar">
    <button @click="toggleFilter">
      <span v-if="isFilterOpen === false">篩選</span>
      <span v-if="isFilterOpen === true">關 閉</span>
    </button>
    <button class="text-deep" @click="toggleOffcanvas">
      <i class="bi bi-list" v-if="isMenuOpen === false"></i>
      <i class="bi bi-x-lg" v-if="isMenuOpen === true"></i>
      <span v-if="isMenuOpen === false">導覽列</span>
      <span v-if="isMenuOpen === true">關 閉</span>
    </button>
  </div>

  <!-- 手機導覽列頁面 -->
  <div class="nav-page bg-color" v-if="isMenuOpen">
    <div class="nav-list">
      <ul>
        <li>
          <div class="mode-toggle" @click="modeToggle" :class="{ 'darkDark': true, }">
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
</template>

<script>
import emitter from '@/methods/emitter';
import TaxModal from './TaxModal.vue';

export default {
  components: {
    TaxModal,
  },
  data() {
    return {
      isHome: false,
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
      emitter.emit('sendToggleFilter', this.isFilterOpen);
      if (this.isFilterOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
      document.body.style.overflow = 'auto';
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
      if (to.name === 'home') {
        this.isHome = true;
      } else {
        this.isHome = false;
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
  watch: {
    $route() {
      this.checkRoute();
      this.isMenuOpen = false;
      this.isFilterOpen = false;
      document.body.style.overflow = 'auto';
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
  mounted() {
    this.getCartProducts();
    this.checkRoute();
    if (window.innerWidth >= 768) {
      this.isFilterOpen = true;
    } else {
      this.isFilterOpen = false;
    }
  },
};
</script>
