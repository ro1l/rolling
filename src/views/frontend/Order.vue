<template>
  <div class="h3 bg-info">訂單確認</div>
  <div class="container">
    <Form
    @submit="payOrder">
      <table class="table">
        <thead>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
        </thead>
        <tbody>
          <tr
          v-for="item in order.products"
          :key="item.id">
            <td>{{ item.product.title }}</td>
            <td>{{ item.qty }}/{{ item.product.unit }}</td>
            <td>NT${{ $filters.currency(item.product.price) }}</td>
          </tr>
        </tbody>
        <tfoot>
          <td class="tex-end" colspan="2">總計</td>
          <td class="tex-end">NT${{ $filters.currency(order.total) }}</td>
        </tfoot>
      </table>

      <table class="table">
        <tbody>
          <tr>
            <th>email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>手機</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>地址</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>備註</th>
            <td>{{ order.message }}</td>
          </tr>
          <tr
          v-if="order.is_paid === true">
            <th>付款狀態</th>
            <td class="text-success">已付款</td>
          </tr>
        </tbody>
      </table>
      <div class="text-end"
      v-if="order.is_paid === false">
        <button class="btn btn-danger">確認付款去</button>
      </div>
    </Form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {
        user: {
        },
      },
      orderId: '',
    };
  },
  methods: {
    getOrder() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`;
      this.$http.get(api)
        .then((res) => {
          this.order = res.data.order;
          console.log(res);
        });
    },
    payOrder() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`;
      this.$http.post(api)
        .then((res) => {
          if (res.data.success) {
            this.getOrder();
          }
        });
    },
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  },
};
</script>
