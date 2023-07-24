<template>
  <nav
  class="nav-bar"
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
          console.log(this.cartProducts);
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
  },
};
</script>
