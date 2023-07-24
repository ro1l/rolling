<template>
  <Navbar
  :isHomePage="isHomePage"/>

  <div class="scroll-container" id="scroll-container">
    <!-- banner -->
    <div class="scroll-area special-div" id="banner">
      <div class="home-banner">
        <video autoplay loop muted plays-inline class="black-video">
          <source src="@/assets/moto.mp4" type="video/mp4">
        </video>
        <div class="box">
          <router-link :to="{ name: '所有產品' }">
            所有車款 <i class="bi bi-arrow-right"></i>
          </router-link>
          <div class="scroll-icon">
            <span class="wheel"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- introduce -->
    <div class="scroll-area">
      <div class="home-introduce">
        <div class="img-box"></div>
        <div class="text">
          <p>
            Ride with power, <br> live with freedom
          </p>
          <p>
            Get <span>rolling</span> <br> on your <br> motorcycle
          </p>
        </div>
      </div>
    </div>

    <!-- activity -->
    <div class="scroll-area"
    id="activity">
      <div class="home-activity">
        <div class="text">
          <h3>2023 全球 H.O.G. 大會師</h3>
          <p>H.O.G. 活動是關於騎到目的地、騎回家，以及路途中的所有事物。</p>
          <a href="#">瞭解更多</a>
        </div>
      </div>
    </div>

    <!-- look -->
    <!-- <div class="scroll-area">
      <div class="home-look">
        <div class="box">
          <h3>Z 650RS</h3>
        </div>
        <div class="img-box">
          <div class="img-item img-item1"></div>
          <div class="img-item img-item2"></div>
          <div class="img-item img-item3"></div>
        </div>
        <div class="img-look"></div>
      </div>
    </div> -->

    <!-- product -->
    <div class="scroll-area">
      <div class="home-product">
        <div class="img-box">
          <div class="img"></div>
        </div>
        <div class="text">
          <div class="name">
            <h5 class="text-deep">YAMAHA</h5>
            <p>MT-07</p>
          </div>
          <p>兼具輕量與高扭力，搭載689c.c. 水冷雙缸引擎符合最新環保標準，輕量化車身讓敏捷度零受限。 加寬加高的把手設計，更讓騎士享受優異騎姿，盡情體驗純粹的扭力樂趣。</p>
          <a href="#" class="border-btn">了解更多</a>
        </div>
      </div>
    </div>

    <!-- hot -->
    <div class="scroll-area">
      <div class="home-hot">
        <h5>熱門車款</h5>
        <div class="hot-products">
          <MediaScroll
          :products="products"/>
        </div>
        <h5>配件</h5>
        <MediaScroll
        :products="products"/>
      </div>
    </div>

    <!-- footer -->
    <div class="scroll-area">
      <Footer/>
    </div>
  </div>

</template>

<script>
import MediaScroll from '@/components/frontend/MediaScroll.vue';
import Navbar from '@/components/frontend/Navbar.vue';
import Footer from '@/components/frontend/Footer.vue';

export default {
  data() {
    return {
      products: [],
      isHomePage: true,
    };
  },
  components: {
    MediaScroll,
    Navbar,
    Footer,
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http.get(api)
        .then((res) => {
          this.products = res.data.products;
        });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
