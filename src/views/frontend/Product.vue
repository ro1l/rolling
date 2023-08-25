<template>
  <!-- skeleton -->
  <div class="product-box product-box-skeleton"
    v-if="isLoadingForStore">
    <div class="breadcrumb-box item-underline">
      <ul>
        <li class="load"></li>
        <li class="load"></li>
        <li class="load"></li>
      </ul>
    </div>
    <div class="product">
      <div class="sidebar information">
        <h1 class="load"></h1>
        <div class="content load"></div>
      </div>
      <div class="img-box">
        <div class="img-item load"></div>
      </div>
      <div class="sidebar">
        <div class="content load"></div>
      </div>
    </div>
  </div>

  <!-- product-box -->
  <div class="product-box">
    <!-- breadcrumb -->
    <div class="breadcrumb-box item-underline">
      <ul>
        <li>
          <router-link :to="{ name: '所有產品' }">
          所有產品
          </router-link>
        </li>
        <li><a>{{ product.category }}</a></li>
        <li><a>{{ product.title }}</a></li>
      </ul>
    </div>

    <!-- product -->
    <div class="product">
      <h1 class="text-deep">{{ product.title }}</h1>
      <div class="img-box-sm">

        <Swiper :mergedImagesUrl="mergedImagesUrl" />

        <button class="add-comparison text-deep"
          type="button"
          @click.prevent="addComparison">
          加入比較
        </button>
      </div>

      <!-- information -->
      <div class="sidebar information"
        v-if="product.content">
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
                <th class="text-deep">平均油耗</th>
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
          <img :src="product.imageUrl" :alt="product.title">
          <div class="imgs-item"
            v-for="(item, key) in product.imagesUrl" :key="key + 1">
            <img :src="item" :alt="product.title">
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
              <td>NT$ {{ $filters.currency(product.price) }}
              </td>
            </tr>
            <tr>
              <th class="text-deep">稅金</th>
            </tr>
            <tr>
              <td>NT$ {{ $filters.currency(licenseTax(cc) + fuelTax(cc)) }} <br>
                <small class="text-shallow">
                  (牌照稅${{ $filters.currency(licenseTax(cc)) }} +
                  燃料稅${{ $filters.currency(fuelTax(cc)) }})
                </small>
              </td>
            </tr>
            <tr>
              <td class="display-sm-td">
                <button class="add-cart fill-btn"
                  @click.prevent="addCart(product.id)"
                  type="button"
                  :disabled="cartLoadingItem === product.id">
                  <span class="fill-btn-text"
                    v-if="cartLoadingItem !== product.id">
                    加入購物車
                  </span>
                  <span class="fill-btn-text"
                    v-if="cartLoadingItem === product.id">
                    加入中。。。
                  </span>
                </button>
              </td>
            </tr>
            <tr>
              <td class="display-sm-td">
                <button class="add-comparison text-deep"
                  @click.prevent="addComparison"
                  type="button">
                  加入比較
                </button>
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

    <div class="buy-sm-control bg-color text-deep">
      <button class="pre-page text-deep"
        @click.prevent="goBack">
        上一頁
      </button>
      <button class="add-cart fill-btn"
        @click.prevent="addCart(product.id)"
        :disabled="cartLoadingItem === product.id">
        <span class="fill-btn-text"
          v-if="cartLoadingItem !== product.id">
          加入購物車
        </span>
        <span class="fill-btn-text"
          v-if="cartLoadingItem === product.id">
          加入中。。。
        </span>
      </button>
    </div>

  </div>

</template>

<script>
import MediaScroll from '@/components/frontend/MediaScroll.vue';
import RelatedArticles from '@/components/frontend/RelatedArticles.vue';
import Swiper from '@/components/frontend/Swiper.vue';
import { mapState, mapActions } from 'pinia';
import productStore from '@/stores/productStore';
import statusStore from '@/stores/statusStore';
import cartStore from '@/stores/cartStore';

export default {
  components: {
    MediaScroll,
    RelatedArticles,
    Swiper,
  },

  data() {
    return {
      id: '',
      isLoading: false,
      status: {
        loadingItem: '',
      },
      route: '所有產品',
      isFirstLoad: true,
    };
  },

  computed: {
    ...mapState(productStore, ['products', 'product', 'imageUrl', 'imagesUrl', 'cc']),

    ...mapState(statusStore, ['isLoadingForStore', 'cartLoadingItem']),

    mergedImagesUrl() {
      return this.imagesUrl
        && this.imagesUrl.length > 0 ? [this.imageUrl, ...this.imagesUrl] : [this.imageUrl];
    },
  },

  methods: {
    ...mapActions(productStore, ['getProducts', 'getProduct', 'licenseTax', 'fuelTax']),

    ...mapActions(cartStore, ['addCart']),

    addComparison() {
      const product = productStore();

      product.setLgCompProd(this.product);
      product.setSmCompProd(this.product);

      this.$router.push('/comparison');
    },

    goBack() {
      return this.$router.go(-1);
    },
  },

  created() {
    const id = this.$route.params.productId;
    this.getProduct(id);
    this.getProducts();
  },

  inject: ['emitter', 'pushMessageState'],
};
</script>
