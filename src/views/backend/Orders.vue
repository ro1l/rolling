<template>
  <div class="h3 bg-info">訂單</div>
    <table class="table">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>EMAIL</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th>狀態</th>
        </tr>
      </thead>
      <tbody>
        <tr
        v-for="order in orders"
        :key="order.id">
          <td>{{ $filters.date(order.create_at) }}</td>
          <td>{{ order.user.email }}</td>
          <td>
            <ul class="list-unstyled">
              <li
              v-for="(products, i) in order.products"
              :key="i">
              {{ products.product.title }} 數量：{{ products.qty }}
              {{ products.product.unit }}
              </li>
            </ul>
          </td>
          <td>NT${{ $filters.currency(order.total) }}元</td>
          <td>
            <span class="text-success"
            v-if="order.is_paid === true">已付款</span>
            <span v-else>未付款</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-success"
              @click="openOrderModal(order)">檢視</button>
              <button class="btn btn-outline-danger"
              @click="openDelModal(order)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Loading
    :active="isLoading"/>
    <OrderModal
    ref="orderModal"
    :order="tempOrder"/>
    <DelModal
    ref="delModal"
    :item="tempOrder"
    @del-item="delOrder"/>
    <Pagination
    :pages="pagination"
    @emit-pages="getOrders"/>
</template>

<script>
import OrderModal from '@/components/backend/OrderModal.vue';
import DelModal from '@/components/backend/DelModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      orders: {},
      pagination: {},
      isLoading: false,
      tempOrder: {},
    };
  },
  inject: ['emitter', 'pushMessageState'],
  components: {
    OrderModal,
    DelModal,
    Pagination,
  },
  methods: {
    getOrders(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders/?page=${page}`;
      this.$http.get(api)
        .then((res) => {
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        });
    },
    openOrderModal(item) {
      this.tempOrder = { ...item };
      this.$refs.orderModal.showModal();
    },
    openDelModal(item) {
      this.tempOrder = { ...item };
      this.$refs.delModal.showModal();
    },
    delOrder() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`;
      this.$http.delete(api)
        .then((res) => {
          if (res.data.success) {
            this.$refs.delModal.hideModal();
            this.isLoading = false;
            this.getOrders();
            this.pushMessageState(res);
          }
        });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
