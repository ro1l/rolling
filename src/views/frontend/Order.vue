<template>
  <div class="order-box">
    <header class="order-bg">
      <p class="logo">Rolling</p>
      <div class="title">
        <h1>訂單明細</h1>
      </div>
    </header>

    <div class="order">
      <Form @submit="payOrder">
        <table class="products order-bg">
          <caption class="text-shallow">商品明細</caption>
          <thead>
            <tr class="order-bg">
              <th class="order-bg">品名</th>
              <th class="order-bg">數量</th>
              <th class="order-bg">金額</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id" class="item-underline">
              <td >{{ item.product.title }}</td>
              <td >{{ item.qty }}{{ item.product.unit }}</td>
              <td >NT${{ $filters.currency(item.product.price) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th class="bg-color"></th>
              <th class="bg-color">總計</th>
              <th class="bg-color">NT${{ $filters.currency(order.total) }}</th>
            </tr>
          </tfoot>
        </table>
        <table class="user">
          <caption class="text-shallow">訂購人資訊</caption>
          <tbody>
            <tr class="item-underline">
              <th>姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr class="item-underline">
              <th>手機</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr class="item-underline">
              <th>姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr class="item-underline">
              <th>電子郵件</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr class="item-underline">
              <th>寄送地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr class="item-underline">
              <th>備註</th>
              <td v-if="order.message > 0">{{ order.message }}</td>
              <td v-else>無備註</td>
            </tr>
            <tr class="item-underline"
              v-if="order.is_paid === true" >
              <th>付款狀態</th>
              <td>付款完成</td>
            </tr>
          </tbody>
        </table>
        <div class="button-box"
          v-if="order.is_paid === false">
          <button class="pay fill-btn">確認付款</button>
        </div>
        <div class="button-box"
          v-else>
          <button type="button" class="home">
            <router-link :to="{ name: 'home' }" class="border-btn" >
              回首頁
            </router-link>
          </button>
        </div>
      </Form>
    </div>
  </div>

  <Loading :active="isLoading" />
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      order: {
        user: {
        },
      },
      orderId: '',
      isLoading: false,
    };
  },

  methods: {
    async getOrder() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`;

      try {
        const res = await axios.get(api);
        this.isLoading = false;

        this.order = res.data.order;
      } catch (error) {
        console.error('Error 找不到資料', error);
      }
    },

    async payOrder() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`;

      try {
        const res = await axios.post(api);
        this.isLoading = false;

        if (res.data.success) {
          this.getOrder();
          this.pushMessageState(res);
        }
      } catch (error) {
        console.error('Error 找不到資料', error);
      }
    },
  },

  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  },

  inject: ['pushMessageState'],
};
</script>
