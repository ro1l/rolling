<template>
  <div class="h3 bg-info">所有產品</div>
  <div class="container">
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
              <td>{{ item.product.title }}</td>
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
                <button type="button" class="btn">
                  <i class="fs-4 text-danger bi bi-x-circle-fill"></i>
                </button>
              </td>
            </tr>
            <tr>
              <td colspan="5">
                <label for="coupon">優惠券
                </label>
                  <input type="text" id="coupon" placeholder="請輸入優惠券code">
                <button class="btn btn-info">使用</button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colspan="1">
                總金額
              </th>
              <td colspan="4">
                {{ $filters.currency(cartProducts.final_total) }}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
  <Loading
  :active="isLoading"/>
</template>

<script>
export default {
  data() {
    return {
      cartProducts: {},
      isLoading: false,
      status: {
        loadingItem: '',
      },
    };
  },
  methods: {
    getCartProducts() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false;
          console.log(res);
          this.cartProducts = res.data.data;
          console.log(this.cartProducts);
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
        });
    },
  },
  created() {
    this.getCartProducts();
  },
};
</script>
