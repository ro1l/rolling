<template>
  <PageTitle
  :title="'購物車'"/>

  <div class="cart-box">
    <div class="cart"
    v-if="cartProducts.total !== 0">
      <div class="cart-box">
        <div class="coupon">
          <label for="coupon" class="text-deep">優惠代碼</label>
          <input type="text" name="" id="coupon"
          placeholder="請輸入優惠券代碼"
          v-model="coupon_code"
          @change="addCouponCode">
        </div>
        <div class="cart-item"
        v-for="item in cartProducts.carts"
        :key="item.id">
          <div class="price-sm text-deep">
            <a href="" class="text-deep"
            @click.prevent="delProduct(item.id)"
            :disabled="item.id === this.status.loadingItem">移除購物車</a>
          </div>
          <div class="img-box">
            <img :src="item.product.imageUrl" alt="  ">
          </div>
          <div class="content text-deep">
            <p>{{ item.product.category }}</p>
            <p>{{ item.product.title }}</p>
            <div class="control">
              <button
              @click.prevent="updateCart(item, item.qty - 1)"
              :disabled="item.qty === 1"><i class="bi bi-dash"></i></button>
              <input type="number" name="" id="qty"
              min="1"
              v-model.number="item.qty"
              @change="updateCart(item, item.qty)"
              :disabled="item.id === status.loadingItem">
              <button
              @click.prevent="updateCart(item, item.qty + 1)"><i class="bi bi-plus"></i></button>
            </div>
            <small
            v-if="item.coupon"><em>已套用{{ item.coupon.code }}優惠券</em></small>
            </div>
          <div class="price text-deep">
            <a href="" class="text-deep"
            @click.prevent="delProduct(item.id)"
            :disabled="item.id === this.status.loadingItem">移除購物車</a>
            <p>NT${{ $filters.currency(item.final_total) }}</p>
          </div>
        </div>
        <div class="total">
          <p>總金額<span>NT${{ $filters.currency(cartProducts.total) }}</span></p>
          <p v-if="cartProducts.total !== cartProducts.final_total">折扣
            <span><i class="bi bi-dash"></i>NT${{ $filters.currency
              (cartProducts.total - cartProducts.final_total) }}</span></p>
          <p v-if="cartProducts.total !== cartProducts.final_total">最終金額
            <span>NT${{ $filters.currency(cartProducts.final_total) }}</span></p>
        </div>
    </div>
      <div class="checkout">
        <div class="coupon">
          <label for="coupon" class="text-deep">優惠代碼</label>
          <input type="text" name="" id="coupon"
          placeholder="請輸入優惠券代碼"
          v-model="coupon_code"
          @change="addCouponCode">
        </div>
        <router-link class="border-btn text-deep" :to="{ name: '訂單填寫' }">訪客結帳</router-link>
      </div>
    </div>

    <div class="cart-no-data"
    v-else>
      <h2>購物車暫無商品</h2>
      <router-link class="border-btn text-deep" :to="{ name: '所有產品' }">前往選購</router-link>
    </div>

    <div class="check-box bg-color"
    v-if="cartProducts.total !== 0">
      <router-link class="border-btn text-deep" :to="{ name: '訂單填寫' }">訪客結帳</router-link>
    </div>
  </div>

  <Loading
  :active="isLoading"/>
</template>

<script>
import emitter from '@/methods/emitter';
import PageTitle from '@/components/frontend/PageTitle.vue';

export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      cartProducts: {},
      isLoading: false,
      status: {
        loadingItem: '',
      },
      coupon_code: '',
      min: 1,
      max: 10,
    };
  },
  methods: {
    getCartProducts() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false;
          this.cartProducts = res.data.data;
        });
    },
    updateCart(item, qty) {
      this.isLoading = true;
      this.status.loadingItem = item.id;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      const cart = {
        product_id: item.product_id,
        qty,
      };
      this.$http.put(api, { data: cart })
        .then((res) => {
          this.isLoading = false;
          this.status.loadingItem = '';
          console.log(res);
          this.getCartProducts();
          this.pushMessageState(res);
          emitter.emit('updateCart');
        });
    },
    delProduct(id) {
      this.status.loadingItem = id;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.$http.delete(api)
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          this.getCartProducts();
          this.status.loadingItem = '';
          this.pushMessageState(res);
          emitter.emit('updateCart');
        });
    },
    addCouponCode() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
      const coupon = {
        code: this.coupon_code,
      };
      this.$http.post(api, { data: coupon })
        .then((res) => {
          console.log(res);
          this.getCartProducts();
        });
    },
  },
  created() {
    this.getCartProducts();
  },
  inject: ['emitter', 'pushMessageState'],
};
</script>
