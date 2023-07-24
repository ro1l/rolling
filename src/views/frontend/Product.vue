<template>
  <div class="product-box">
    <!-- breadcrumb -->
    <div class="breadcrumb-box item-underline">
      <ul>
        <li><router-link :to="{ name: '所有產品' }">所有產品</router-link></li>
        <li><a>{{ product.category }}</a></li>
        <li><a>{{ product.title }}</a></li>
      </ul>
    </div>
    <!-- product -->
    <div class="product">
      <!-- information -->
      <div class="sidebar information" v-if="product.content">
        <h1 class="text-deep">{{ product.title }}</h1>
        <div class="content">
          <table>
            <tr>
              <th class="text-deep">種類</th>
            </tr>
            <tr>
              <td>{{ product.content.comparison.type }}</td>
            </tr>
            <tr>
              <th class="text-deep">引擎</th>
            </tr>
            <tr>
              <td>{{ product.content.comparison.engine }}</td>
            </tr>
            <tr>
              <th class="text-deep">排氣量</th>
            </tr>
            <tr>
              <td>{{ product.content.comparison.cc }}cc</td>
            </tr>
            <tr>
              <th class="text-deep">馬力</th>
            </tr>
            <tr>
              <td>{{ product.content.comparison.hp }}</td>
            </tr>
            <tr>
              <th class="text-deep">扭力</th>
            </tr>
            <tr>
              <td>{{ product.content.comparison.torque }}</td>
            </tr>
            <input type="checkbox" id="see-more">
            <div class="more">
              <tr>
                <th class="text-deep">座高</th>
              </tr>
              <tr>
                <td>{{ product.content.comparison.ht }}mm</td>
              </tr>
              <tr>
                <th class="text-deep">重量</th>
              </tr>
              <tr>
                <td>{{ product.content.comparison.wt }}kg</td>
              </tr>
              <tr>
                <th class="text-deep">年耗油量</th>
              </tr>
              <tr>
                <td>{{ product.content.comparison.afc }}公升</td>
              </tr>
              <tr>
                <th class="text-deep">油箱容量</th>
              </tr>
              <tr>
                <td>{{ product.content.comparison.tank }}公升</td>
              </tr>
              <label for="see-more">收合</label>
            </div>
            <label for="see-more">查看更多</label>
          </table>
        </div>
      </div>
      <!-- img -->
      <div class="img-box">
        <div class="img-item">
          <img :src="product.imageUrl" alt="">
          <div class="attached" v-for="(attached, key) in product.imagesUrl" :key="key + 1">
            <img :src="attached" alt="">
          </div>
        </div>
      </div>
      <!-- buy -->
      <div class="buy sidebar">
        <div class="content">
          <table>
            <tr>
              <th class="text-deep">廠牌</th>
            </tr>
            <tr>
              <td>{{ product.category }}</td>
            </tr>
            <tr>
              <th class="text-deep">車款</th>
            </tr>
            <tr>
              <td>{{ product.title }}</td>
            </tr>
            <tr>
              <th class="text-deep">售價</th>
            </tr>
            <tr>
              <td>NT$ {{ $filters.currency(product.price) }} <br>
              </td>
            </tr>
            <tr>
              <th class="text-deep">稅金</th>
            </tr>
            <tr>
              <td>NT$ {{ $filters.currency(totalTax) }} <br>
                <small class="text-shallow">(牌照稅${{ $filters.currency(licenseTax) }} +
                燃料稅${{ $filters.currency(fuelTax) }})</small></td>
            </tr>
            <tr>
              <td>
                <button class="add-cart fill-btn" @click="addCart(product.id)"
                  :disabled="this.status.loadingItem === product.id">
                  <span class="fill-btn-text" v-if="this.status.loadingItem !== product.id">
                    加入購物車 </span>
                  <span class="fill-btn-text" v-if="this.status.loadingItem === product.id">
                    加入中。。。</span></button>
              </td>
            </tr>
            <tr>
              <td>
                <button class="add-comparison text-deep" @click.prevent="addComparison">
                  加入比較</button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <div class="related-articles">
      <p>最新文章</p>
      <RelatedArticles />
    </div>

    <div class="media-scroll">
      <p>你可能會喜歡</p>
      <MediaScroll :products="products" />
    </div>

  </div>
  <Loading :active="isLoading" />
</template>

<script>
import emitter from '@/methods/emitter';
import productStore from '@/stores/productStore';
import { mapState, mapActions } from 'pinia';
import MediaScroll from '@/components/frontend/MediaScroll.vue';
import RelatedArticles from '@/components/frontend/RelatedArticles.vue';

export default {
  data() {
    return {
      product: {},
      id: '',
      isLoading: false,
      status: {
        loadingItem: '',
      },
      route: '所有產品',
      isFirstLoad: true,
      cc: 0,
    };
  },
  components: {
    MediaScroll,
    RelatedArticles,
  },
  inject: ['emitter', 'pushMessageState'],
  methods: {
    ...mapActions(productStore, ['getProducts']),
    getProduct() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`;
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false;
          this.product = res.data.product;
          this.cc = res.data.product.content.comparison.cc;
        });
    },
    addCart(id) {
      this.isLoading = true;
      this.status.loadingItem = id;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      const cart = {
        product_id: id,
        qty: 1,
      };
      this.$http.post(api, { data: cart })
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          this.isLoading = false;
          this.status.loadingItem = '';
          this.pushMessageState(res);
          emitter.emit('updateCart');
        });
    },
    addComparison() {
      const product = productStore();
      product.setProduct(this.product);
      this.$router.push('/comparison');
    },
  },
  computed: {
    ...mapState(productStore, ['products']),
    licenseTax() {
      const license = this.cc;
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
      const fuel = this.cc;
      if (fuel <= 500) {
        return 900;
      }
      if (fuel <= 600) {
        return 1200;
      }
      if (fuel <= 1200) {
        return 1800;
      }
      return 2010;
    },
    totalTax() {
      const total = this.licenseTax + this.fuelTax;
      return total;
    },
  },
  created() {
    this.id = this.$route.params.productId;
    this.getProduct();
    this.getProducts();
  },
};
</script>
