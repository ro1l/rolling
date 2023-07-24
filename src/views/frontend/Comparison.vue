<template>
  <PageTitle
  :title="'車款比較'"/>

  <!-- comparison -->
  <div class="comparison-box">
    <div class="table-box" v-if="product.length > 0">
      <!-- comparison-title -->
      <table>
        <tr class="car-model table-bg">
          <th>車款</th>
        </tr>
        <tr>
          <th>種類</th>
        </tr>
        <tr>
          <th>引擎</th>
        </tr>
        <tr>
          <th>排氣量</th>
        </tr>
        <tr>
          <th>馬力</th>
        </tr>
        <tr>
          <th>扭力</th>
        </tr>
        <tr>
          <th>座高</th>
        </tr>
        <tr>
          <th>重量</th>
        </tr>
        <tr>
          <th>年耗油量</th>
        </tr>
        <tr>
          <th>油箱容量</th>
        </tr>
        <tr>
          <th>稅金</th>
        </tr>
      </table>
      <!-- comparison-car -->
      <table v-for="item in product" :key="item.id" class="text-deep">
        <tr class="img-box table-bg">
          <td>
            <div class="remove">
              <button class="text-deep" @click="delProduct(item.id)">移除</button>
              <img :src="item.imageUrl" alt="">
              <a href="#" class="text-deep"
              @click.prevent="getProduct(item.id)"> <strong>{{ item.category }}</strong>
                <br> {{ item.title }}
              </a>
            </div>
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
            <p>NT${{ $filters.currency(totalTax(item)) }}</p>
            <small class="text-shallow">(牌照稅：NT$
              {{ $filters.currency(licenseTax(item)) }} + 燃料稅：NT$
              {{ $filters.currency(fuelTax(item)) }})
            </small>
          </td>
        </tr>
      </table>
      <!-- add-data -->
      <div class="add-data" v-if="product.length < 4">
        <router-link class="text-deep" :to="{ name: '所有產品' }">+ 加入車款</router-link>
      </div>
    </div>
    <!-- no-data -->
    <div class="no-data" v-else>
      <router-link :to="{ name: '所有產品' }">
        <p>暫無車款比較資料，新增方式：</p>
        <div class="methods">
          <div class="item">
            <div class="example-box">
              <p>車款總覽</p>
            </div>
            <p>1. 點擊導覽列“車款總覽”</p>
          </div>
          <div class="item">
            <div class="example-box">
              <img src="@/assets/methods-2.png" alt="">
              <p><strong>YAMAHA</strong><br>MT-07</p>
              </div>
            <p>2. 選擇要比較的車款</p>
          </div>
          <div class="item">
            <div class="example-box">
              <p> ＋ 加入比較</p>
            </div>
            <p>3. <ins>商品頁右側</ins>點擊  <strong> ＋加入比較 </strong></p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import productStore from '@/stores/productStore';
import PageTitle from '@/components/frontend/PageTitle.vue';

export default {
  data() {
    return {
      tempProduct: {},
    };
  },
  components: {
    PageTitle,
  },
  inject: ['emitter'],
  computed: {
    ...mapState(productStore, ['product']),
  },
  created() {
  },
  methods: {
    delProduct(id) {
      this.product.splice(this.product.indexOf(id), 1);
    },
    getProduct(id) {
      this.$router.push(`/product/${id}`);
    },
    licenseTax(item) {
      const license = item.content.comparison.cc;
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
    fuelTax(item) {
      const fuel = item.content.comparison.cc;
      if (fuel <= 500) {
        return 900;
      }
      if (fuel <= 600) {
        return 1200;
      }
      if (fuel <= 1200) {
        return 1800;
      }
      if (fuel <= 500) {
        return 900;
      }
      return 2010;
    },
    totalTax(item) {
      const total = this.licenseTax(item) + this.fuelTax(item);
      return total;
    },
  },
};
</script>
