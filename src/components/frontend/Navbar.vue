<template>
  <nav class="nav-bar bg-color"
    :class="{ 'isHome': isHome }" id="nav">

    <!-- 左側（導覽列） -->
    <div class="nav-list nav-left">
      <ul>
        <li>
          <router-link :to="{ name: '所有產品' }">
            車款總覽
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: '車款比較' }">
            車款比較
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: '文章總覽' }">
            文章總覽
          </router-link>
        </li>
        <li>
          <a href="#" id="show-modal"
            @click.prevent="showTaxModal = true">
            稅金試算
          </a>
          <teleport to='body'>
            <TaxModal :show="showTaxModal"
              @close="showTaxModal = false" />
          </teleport>
        </li>
      </ul>
    </div>

    <!-- 中間（Logo） -->
    <div class="nav-list nav-center">
      <router-link :to="{ name: 'home' }" class="logo" >
        Rolling
      </router-link>
    </div>

    <!-- 右側（搜尋、深色模式、購物車） -->
    <div class="nav-list nav-right">
      <ul>
        <li>
          <router-link :to="{ name: '搜尋' }">
            搜尋
          </router-link>
        </li>
        <li>
          <div class="mode-toggle"
            @click.prevent="modeToggle">
            <div class="toggle">
              <div class="dark-mode" type="checkbox"></div>
            </div>
          </div>
        </li>
        <li>
          <router-link :to="{ name: '購物車' }" class="cart">
            <span>購物車</span>
            <span v-if="cartProductsData.length > 0">
              ({{ cartsNum }})
            </span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>

  <!-- RWD導覽列按鈕 -->
  <button class="nav-button bg-dark-color text-white"
    type="button"
    @click.prevent="toggleMenu"
    v-if="showNav">
    <i class="bi bi-list" v-if="isMenuOpen === false"></i>
    <i class="bi bi-x-lg" v-if="isMenuOpen === true"></i>
    <span class="text-white" v-if="isMenuOpen === false">
      導覽列
    </span>
    <span class="text-white" v-if="isMenuOpen === true">
      關 閉
    </span>
  </button>

  <!-- RWD導覽列以及篩選按鈕 -->
  <div class="button-ground bg-dark-color text-white"
    v-if="productsNavbar">
    <button @click.prevent="toggleFilter"
      type="button"
      >
      <span class="text-white" v-if="isFilterOpen === false">
        篩選
      </span>
      <span class="text-white" v-if="isFilterOpen === true">
        關 閉
      </span>
    </button>
    <button class="text-white" @click.prevent="toggleMenu"
      type="button">
      <i class="bi bi-list" v-if="isMenuOpen === false"></i>
      <i class="bi bi-x-lg" v-if="isMenuOpen === true"></i>
      <span class="text-white" v-if="isMenuOpen === false">
        導覽列
      </span>
      <span class="text-white" v-if="isMenuOpen === true">
        關 閉
      </span>
    </button>
  </div>

  <!-- 手機導覽列頁面 -->
  <div class="nav-page bg-color" v-if="isMenuOpen">
    <div class="nav-list">
      <ul>
        <li>
          <div class="mode-toggle"
            @click.prevent="modeToggle">
            <div class="toggle">
              <div class="dark-mode" type="checkbox"></div>
            </div>
          </div>
        </li>
        <li>
          <router-link :to="{ name: '所有產品' }">
            車款總覽
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: '車款比較' }">
            車款比較
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: '文章總覽' }">
            文章總覽
          </router-link>
        </li>
        <li>
          <a href="#" id="show-modal" @click.prevent="showTaxModal = true">
            稅金試算
          </a>
          <teleport to='body'>
            <TaxModal :show="showTaxModal"
              @close="closeModal" />
          </teleport>
        </li>
        <li>
          <router-link :to="{ name: '搜尋' }" class="search">
            搜尋商品
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';
import { mapActions, mapState } from 'pinia';
import cartStore from '@/stores/cartStore';
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
      isMenuOpen: false,
      isFilterOpen: false,
      productsNavbar: false,
      productsCategory: [],
      showNav: true,
      routesWithoutNav: ['單一產品', '所有產品'],
      taxStatus: false,
    };
  },

  computed: {
    ...mapState(cartStore, ['cartProductsData']),

    cartsNum() {
      let cartNum = 0;
      this.cartProductsData.forEach((e) => {
        cartNum += e.qty;
      });
      return cartNum;
    },
  },

  methods: {
    ...mapActions(cartStore, ['getCartProducts']),

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

    toggleMenu() {
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
