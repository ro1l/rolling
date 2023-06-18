<template>
  <div class="h3 bg-info">購物車</div>
  <div class="container mb-5">
    <div class="row">
      <div class="col-12">
        <table class="table">
          <thead>
            <tr>
              <th>圖片</th>
              <th>商品名稱</th>
              <th>數量</th>
              <th>價格</th>
              <th>狀態</th>
            </tr>
          </thead>
          <tbody>
            <tr
            v-for="item in cartProducts.carts"
            :key="item.id">
              <td style="width: 150px;">
                <div style="height: 100px;">
                  <img :src="item.product.imageUrl" alt="">
                </div>
              </td>
              <td>{{ item.product.title }} <br>
              <span class="text-success"
              v-if="item.coupon">已套用{{ item.coupon.code }}優惠券</span>
              </td>
              <td>
                <div class="input-group input-group-sm">
                  <input type="number" class="form-control" min="1"
                  v-model.number="item.qty"
                  @change="updateCart(item)"
                  :disabled="item.id === status.loadingItem">
                  <div class="input-group-text">
                    /{{ item.product.unit }}
                  </div>
                </div>
              </td>
              <td>{{ $filters.currency(item.final_total) }}</td>
              <td>
                <button type="button" class="btn"
                @click="delProduct(item.id)"
                :disabled="item.id === this.status.loadingItem">
                  <i class="fs-4 text-danger bi bi-x-circle-fill"></i>
                </button>
              </td>
            </tr>
            <tr>
              <td colspan="5">
                <label for="coupon">優惠券
                </label>
                  <input type="text" id="coupon" placeholder="請輸入優惠券code"
                  v-model="coupon_code">
                <button class="btn btn-info"
                @click="addCouponCode">使用</button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colspan="1">總金額</th>
              <td colspan="4">
                {{ $filters.currency(cartProducts.total) }}
              </td>
            </tr>
            <tr
            v-if="cartProducts.total !== cartProducts.final_total">
              <th colspan="1">折扣</th>
              <td colspan="4">-{{ $filters.currency
              (cartProducts.total - cartProducts.final_total) }}</td>
            </tr>
            <tr>
              <th colspan="1">最終金額</th>
              <td colspan="4">{{ $filters.currency(cartProducts.final_total) }}</td>
            </tr>
          </tfoot>
        </table>
        <div class="text-end">
            <router-link class="router-link" :to="{ name: '訂單填寫' }">
              <button class="btn btn-danger">訪客結帳</button>
            </router-link>
        </div>
      </div>
    </div>
  </div>
  <Loading
  :active="isLoading"/>
</template>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: rgb(255, 255, 255);
}
</style>

<script>
export default {
  inject: ['emitter', 'pushMessageState'],
  data() {
    return {
      cartProducts: {},
      isLoading: false,
      status: {
        loadingItem: '',
      },
      coupon_code: '',
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
    updateCart(item) {
      this.isLoading = true;
      this.status.loadingItem = item.id;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      const cart = {
        product_id: item.product_id,
        qty: item.qty,
      };
      this.$http.put(api, { data: cart })
        .then((res) => {
          this.isLoading = false;
          this.status.loadingItem = '';
          console.log(res);
          this.getCartProducts();
          this.pushMessageState(res);
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
};
</script>
