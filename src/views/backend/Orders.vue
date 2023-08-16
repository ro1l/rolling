<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 border-bottom border-black">
        <div class="container-fluid d-flex justify-content-between
      align-items-center p-4">
          <h1 class="page-title">Orders</h1>
        </div>
      </div>
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-body pt-4 mt-lg-3 py-0 px-lg-5">
            <div class="table-responsive p-0 d-flex">
              <table class="table lh-lg mb-0 table-hover">
                <thead>
                  <tr>
                    <th class="text-secondary text-xxs fw-normal pb-lg-4 pt-sm-0">購買時間</th>
                    <th class="text-secondary text-xxs fw-normal pb-lg-4 pt-sm-0">Email</th>
                    <th class="text-secondary text-xxs fw-normal pb-lg-4 pt-sm-0">應付金額</th>
                    <th class="text-secondary text-xxs
                    fw-normal pb-lg-4 pt-sm-0 text-center">付款</th>
                  </tr>
                </thead>
                <tbody >
                  <tr @click.prevent="openOrderModal(order)" class="cursor-pointer"
                  v-for="order in orders"
                  :key="order.id">
                    <td>{{ $filters.date(order.create_at) }}</td>
                    <td>{{ order.user.email }}</td>
                    <td>NT${{ $filters.currency(order.total) }}元</td>
                    <td class="text-center">
                      <span
                      v-if="order.is_paid === true"><i class="bi bi-check-lg fs-5"></i></span>
                      <span v-else></span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <Pagination
          :pages="pagination"
          @emit-pages="getOrders"/>
        </div>
      </div>
    </div>
  </div>

  <Loading
  :active="isLoading"/>
  <OrderModal
  ref="orderModal"
  :order="tempOrder"
  @del-order="openDelModal(tempOrder)"/>
  <DelModal
  ref="delModal"
  :item="tempOrder"
  @del-item="delOrder"/>
</template>

<script>
import OrderModal from '@/components/backend/OrderModal.vue';
import DelModal from '@/components/backend/DelModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    OrderModal,
    DelModal,
    Pagination,
  },
  data() {
    return {
      orders: [],
      pagination: {},
      isLoading: false,
      tempOrder: {},
    };
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
            this.$refs.orderModal.hideModal();
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
  inject: ['emitter', 'pushMessageState'],
};
</script>
