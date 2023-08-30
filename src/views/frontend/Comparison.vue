<template>
  <PageTitle :title="'車款比較'" />

  <PageTitleSm :title="'車款比較'"
  :content="'$NT'" />

  <!-- comparison -->
  <div class="comparison-box">
    <div class="table-box"
      v-if="displayedArray.length > 0">

      <!-- comparison-title -->
      <table>
        <tr class="first-tr"><th class="text-shallow"></th></tr>
        <tr class="car-model table-bg">
          <th class="text-shallow">車款</th>
        </tr>
        <tr>
          <th class="text-shallow">售價</th>
        </tr>
        <tr>
          <th class="text-shallow">種類</th>
        </tr>
        <tr>
          <th class="text-shallow">引擎</th>
        </tr>
        <tr>
          <th class="text-shallow">排氣量</th>
        </tr>
        <tr>
          <th class="text-shallow">馬力</th>
        </tr>
        <tr>
          <th class="text-shallow">扭力</th>
        </tr>
        <tr>
          <th class="text-shallow">座高</th>
        </tr>
        <tr>
          <th class="text-shallow">重量</th>
        </tr>
        <tr>
          <th class="text-shallow">平均油耗</th>
        </tr>
        <tr>
          <th class="text-shallow">油箱容量</th>
        </tr>
        <tr>
          <th class="text-shallow">稅金</th>
        </tr>
      </table>

      <!-- comparison-car -->
      <table class="text-deep"
        v-for="item in displayedArray" :key="item.id">
        <tr class="remove">
          <td>
            <div>
              <button class="text-deep"
                @click.prevent="delProduct(item.id)"
                type="button">
                移除
              </button>
            </div>
          </td>
        </tr>
        <a href="#"
          @click.prevent="getProduct(item.id)">
          <tr class="img-box table-bg">
            <td>
              <div class="img">
                <img :src="item.imageUrl" :alt="item.title">
                <p><strong>{{ item.category }}</strong></p>
                <p>{{ item.title }}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td>{{ $filters.currency(item.price) }}
            </td>
          </tr>
          <tr>
            <td>{{ item.content.comparison.type }}</td>
          </tr>
          <tr>
            <td>{{ item.content.comparison.engine }}</td>
          </tr>
          <tr>
            <td>{{ item.content.comparison.cc }}cc</td>
          </tr>
          <tr>
            <td>{{ item.content.comparison.hp }}</td>
          </tr>
          <tr>
            <td>{{ item.content.comparison.torque }}</td>
          </tr>
          <tr>
            <td>{{ item.content.comparison.ht }}mm</td>
          </tr>
          <tr>
            <td>{{ item.content.comparison.wt }}kg</td>
          </tr>
          <tr>
            <td>{{ item.content.comparison.afc }}公升</td>
          </tr>
          <tr>
            <td>{{ item.content.comparison.tank }}公升</td>
          </tr>
          <tr>
            <td>
              <p>
                NT${{ $filters.currency(licenseTax(item.content.comparison.cc) +
                fuelTax(item.content.comparison.cc)) }}
              </p>
              <small class="text-shallow">
                (牌照稅：NT${{ $filters.currency(licenseTax(item.content.comparison.cc)) }}
                + 燃料稅：NT${{ $filters.currency(fuelTax(item.content.comparison.cc)) }})
              </small>
            </td>
          </tr>
        </a>
      </table>

      <!-- add-data -->
      <div class="add-data"
        v-if="(isSmallSize === true
        ? smProducts.length < 2 : lgProducts.length < 4)">
        <router-link :to="{ name: '所有產品' }" class="text-deep" >
          + 加入車款
        </router-link>
      </div>
    </div>

    <!-- no-data -->
    <div class="no-data" v-else>
      <a>
        <h5>暫無車款比較資料，新增方式：</h5>
        <div class="methods">
          <div class="item">
            <div class="example-box">
              <p>車款總覽</p>
            </div>
            <p>
              <strong>1. </strong>
              點擊導覽列 “車款總覽”
            </p>
          </div>
          <div class="item">
            <div class="example-box">
              <img src="@/assets/media/methods-2.png" :alt="'車款比較示意圖'">
              <p>
                <b>YAMAHA</b>
                <br>
                MT-07
              </p>
            </div>
            <p>
              <strong>2. </strong>
              選擇要比較的車款
            </p>
          </div>
          <div class="item">
            <div class="example-box">
              <p> ＋ 加入比較</p>
            </div>
            <p>
              <strong>3. </strong>
              在所選商品頁點擊
              <b> ＋加入比較 </b>
            </p>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import productStore from '@/stores/productStore';
import PageTitle from '@/components/frontend/PageTitle.vue';
import PageTitleSm from '@/components/frontend/PageTitleSm.vue';

export default {
  components: {
    PageTitle,
    PageTitleSm,
  },

  data() {
    return {
      tempProduct: {},
      isSmallSize: false,
      comparisonState: true,
    };
  },

  computed: {
    ...mapState(productStore, ['lgProducts', 'smProducts']),

    displayedArray() {
      return this.isSmallSize ? this.smProducts : this.lgProducts;
    },
  },

  methods: {
    ...mapActions(productStore, ['licenseTax', 'fuelTax']),

    delProduct(id) {
      const lgIndex = this.lgProducts.findIndex((item) => item.id === id);
      const smIndex = this.smProducts.findIndex((item) => item.id === id);

      if (lgIndex !== -1) {
        this.lgProducts.splice(lgIndex, 1);
      }
      if (smIndex !== -1) {
        this.smProducts.splice(smIndex, 1);
      }
    },

    getProduct(id) {
      this.$router.push(`/product/${id}`);
    },
  },

  mounted() {
    if (window.innerWidth <= 768) {
      this.isSmallSize = true;
    }
  },
};
</script>
