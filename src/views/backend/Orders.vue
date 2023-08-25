<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 border-bottom border-black">
        <div class="container-fluid d-flex justify-content-between
          align-items-center p-4">
          <h1 class="page-title">Orders</h1>
        </div>
      </div>

      <DashboardSkeleton
        v-if="isLoadingForSkeleton"/>

      <div class="col-12">
        <div class="card mb-4">
          <div class="card-body pt-lg-4 mt-lg-3 py-0 px-lg-5">
            <div class="table-responsive p-0 d-flex">
              <table class="table lh-lg mb-0 table-hover">
                <thead>
                  <tr>
                    <th class="text-secondary text-xxs fw-normal pb-lg-4 pt-sm-0">購買時間</th>
                    <th class="text-secondary text-xxs fw-normal pb-lg-4 pt-sm-0">Email</th>
                    <th class="text-secondary text-xxs fw-normal pb-lg-4 pt-sm-0">應付金額</th>
                    <th class="text-secondary text-xxs fw-normal pb-lg-4 pt-sm-0 text-center">
                      付款
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="cursor-pointer"
                    @click.prevent="openOrderModal(order)"
                    v-for="order in orders"
                    :key="order.id">
                    <td>{{ $filters.date(order.create_at) }}</td>
                    <td>{{ order.user.email }}</td>
                    <td>NT${{ $filters.currency(order.total) }}元</td>
                    <td class="text-center">
                      <span v-if="order.is_paid === true">
                        <i class="bi bi-check-lg fs-5"></i>
                      </span>
                      <span v-else></span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <Pagination :pages="pagination"
            @emit-pages="getOrders" />
        </div>
      </div>
    </div>
  </div>

  <Loading :active="isLoading"
    :zIndex="10000"/>

  <OrderModal ref="orderModal"
    :order="tempOrder"
    @del-order="openDelModal(tempOrder)" />

  <DelModal ref="delModal"
    :item="tempOrder"
    @del-item="delOrder" />
</template>

<script>
import axios from 'axios';
import OrderModal from '@/components/backend/OrderModal.vue';
import DelModal from '@/components/backend/DelModal.vue';
import Pagination from '@/components/Pagination.vue';
import DashboardSkeleton from '@/components/backend/DashboardSkeleton.vue';

export default {
  components: {
    OrderModal,
    DelModal,
    Pagination,
    DashboardSkeleton,
  },

  data() {
    return {
      orders: [],
      tempOrder: {},
      pagination: {},
      isLoading: false,
      isLoadingForSkeleton: false,
    };
  },

  methods: {
    async getOrders(page = 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      try {
        this.isLoadingForSkeleton = true;
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders/?page=${page}`;
        const res = await axios.get(api);
        this.orders = res.data.orders;
        this.pagination = res.data.pagination;
        this.isLoadingForSkeleton = false;
      } catch (error) {
        console.error('Error 找不到資料', error);
      }
    },

    openOrderModal(item) {
      this.tempOrder = { ...item };
      this.$refs.orderModal.showModal();
    },

    openDelModal(item) {
      this.tempOrder = { ...item };
      this.$refs.delModal.showModal();
    },

    async delOrder() {
      try {
        this.isLoading = true;
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`;
        const res = await axios.delete(api);
        if (res.data.success) {
          this.$refs.delModal.hideModal();
          this.$refs.orderModal.hideModal();
          this.isLoading = false;
          this.getOrders();
          this.pushMessageState(res);
        }
      } catch (error) {
        console.error('Error 找不到資料', error);
      }
    },
  },

  created() {
    this.getOrders();
  },

  inject: ['emitter', 'pushMessageState'],
};
</script>
