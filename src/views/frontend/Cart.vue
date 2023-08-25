<template>
  <PageTitle :title="'購物車'" />

  <div class="cart-box">
    <div class="cart"
      v-if="cartProducts.total !== 0">
      <div class="cart-box">
        <div class="coupon">
          <label for="coupon" class="text-deep">優惠代碼</label>
          <small class="text-danger py-2">
            新人禮：輸入rolling打99折
          </small>
          <input type="text" name="" id="coupon" placeholder="請輸入優惠券代碼"
            v-model="couponCode"
            @change="addCouponCode(couponCode)">
        </div>
        <div class="cart-item"
          v-for="item in cartProducts.carts" :key="item.id">
          <div class="price-sm text-deep">
            <a href="#" class="text-deep"
              @click.prevent="delProduct(item.id)"
              :disabled="item.id === cartLoadingItem.loadingItem">
              <ins>移除購物車</ins>
            </a>
          </div>
          <div class="img-box">
            <img :src="item.product.imageUrl" :alt="item.product.title">
          </div>
          <div class="content text-deep">
            <p>{{ item.product.category }}</p>
            <p>{{ item.product.title }}</p>
            <div class="control">
              <button type="button"
                @click.prevent="updateCart(item, item.qty - 1)"
                :disabled="item.qty === 1 && item.id === cartLoadingItem.loadingItem">
                <i class="bi bi-dash text-deep"></i>
              </button>
              <input type="number" name="" id="qty" min="1"
                v-model.number="item.qty"
                @change="updateCart(item, item.qty)"
                :disabled="item.id === cartLoadingItem.loadingItem">
              <button type="button"
                @click.prevent="updateCart(item, item.qty + 1)">
                <i class="bi bi-plus text-deep"></i>
              </button>
            </div>
            <small v-if="item.coupon">
              <em>已套用{{ item.coupon.code }}優惠券</em>
            </small>
          </div>
          <div class="price text-deep">
            <a href="#" class="text-deep"
              @click.prevent="delProduct(item.id)"
              :disabled="item.id === cartLoadingItem.loadingItem">
              <ins>移除購物車</ins>
            </a>
            <p>
              <span v-if="!item.coupon">NT${{ $filters.currency(item.total) }}</span>
              <span v-else>
                <del>NT${{ $filters.currency(item.total) }}</del>
                <h5>NT${{ $filters.currency(item.final_total) }}</h5>
              </span>
            </p>
          </div>
        </div>
        <div class="total-box">
          <p>
            總金額
            <span>NT${{ $filters.currency(cartProducts.total) }}</span>
          </p>
          <p v-if="cartProducts.total !== cartProducts.final_total">
            折扣
            <span>
              <i class="bi bi-dash"></i>
              NT${{ $filters.currency(cartProducts.total - cartProducts.final_total) }}
            </span>
          </p>
          <p v-if="cartProducts.total !== cartProducts.final_total">
            最終金額
            <span>
              NT${{ $filters.currency(cartProducts.final_total) }}
            </span>
          </p>
        </div>
      </div>
      <div class="checkout">
        <div class="coupon">
          <label for="coupon" class="text-deep">優惠代碼</label>
          <small class="text-danger py-2">
            新人禮：輸入rolling打99折
          </small>
          <input type="text" name="" id="coupon" placeholder="請輸入優惠券代碼"
            v-model="couponCode"
            @change="addCouponCode(couponCode)">
        </div>
        <router-link :to="{ name: '訂單填寫' }" class="border-btn text-deep">
          訪客結帳
        </router-link>
      </div>
    </div>

    <div class="cart-no-data" v-else>
      <h2>購物車暫無商品</h2>
      <router-link :to="{ name: '所有產品' }" class="border-btn text-deep">
        前往選購
      </router-link>
    </div>

    <div class="check-box bg-color"
      v-if="cartProducts.total !== 0">
      <router-link :to="{ name: '訂單填寫' }" class="border-btn text-deep">
        訪客結帳
      </router-link>
    </div>
  </div>

  <Loading :active="isLoadingForStore" />
</template>

<script>
import PageTitle from '@/components/frontend/PageTitle.vue';
import { mapActions, mapState } from 'pinia';
import cartStore from '@/stores/cartStore';
import statusStore from '@/stores/statusStore';

export default {
  components: {
    PageTitle,
  },

  data() {
    return {
      min: 1,
      max: 10,
      couponCode: '',
    };
  },

  computed: {
    ...mapState(cartStore, ['cartProducts']),
    ...mapState(statusStore, ['isLoadingForStore', 'cartLoadingItem']),
  },

  methods: {
    ...mapActions(cartStore, ['getCartProducts', 'updateCart', 'delProduct', 'addCouponCode']),
  },

  created() {
    this.getCartProducts();
  },

  inject: ['emitter', 'pushMessageState'],
};
</script>
