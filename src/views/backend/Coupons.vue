<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 border-bottom border-black">
        <div class="container-fluid d-flex justify-content-between
          align-items-center p-4">
          <h1 class="page-title">Coupons</h1>
          <button class="btn btn-outline-dark border-1 rounded-0
            me-lg-3 mb-0 px-lg-5 py-lg-2"
            type="button"
            @click.prevent="openModal(true)">
            <i class="bi bi-plus-lg"></i>
            新增優惠券
          </button>
        </div>
      </div>

      <DashboardSkeleton
        v-if="isLoadingForSkeleton"/>

      <div class="col-12">
        <div class="card mb-4 bg-gray-white">
          <div class="card-body pt-lg-4 mt-lg-3 py-0 px-lg-5">
            <div class="table-responsive p-0 d-flex">
              <table class="table lh-lg mb-0 table-hover">
                <thead>
                  <tr>
                    <th class="text-secondary text-xxs fw-normal pb-lg-4 pt-sm-0">名稱</th>
                    <th class="text-secondary text-xxs fw-normal pb-lg-4 pt-sm-0">code</th>
                    <th class="text-secondary text-xxs fw-normal pb-lg-4 pt-sm-0">百分比</th>
                    <th class="text-secondary text-xxs fw-normal pb-lg-4 pt-sm-0">期限</th>
                    <th class="text-secondary text-xxs fw-normal pb-lg-4 pt-sm-0 text-center">
                      啟用
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="cursor-pointer"
                    @click.prevent="openModal(false, coupon)"
                    v-for="coupon in coupons" :key="coupon.id">
                    <td>{{ coupon.title }}</td>
                    <td>{{ coupon.code }}</td>
                    <td>{{ coupon.percent }}</td>
                    <td>{{ $filters.date(coupon.due_date) }}</td>
                    <td class="text-center">
                      <span v-if="coupon.is_enabled === 1">
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
            @emit-pages="getCoupons" />
        </div>
      </div>
    </div>
  </div>

  <CouponModal ref="couponModal"
    :coupon="tempCoupon"
    :isNew="isNew"
    @update-coupon="updateCoupon"
    @del-coupon="openDelModal(tempCoupon)" />

  <DelModal ref="delModal"
    :item="tempCoupon"
    @del-item="delCoupon" />

  <Loading :active="isLoading"
    :zIndex="10000"/>
</template>

<script>
import axios from 'axios';
import CouponModal from '@/components/backend/CouponModal.vue';
import DelModal from '@/components/backend/DelModal.vue';
import Pagination from '@/components/Pagination.vue';
import DashboardSkeleton from '@/components/backend/DashboardSkeleton.vue';

export default {
  components: {
    CouponModal,
    DelModal,
    Pagination,
    DashboardSkeleton,
  },

  data() {
    return {
      coupons: {},
      tempCoupon: {},
      isNew: false,
      pagination: {},
      isLoading: false,
      isLoadingForSkeleton: false,
    };
  },

  methods: {
    async getCoupons(page = 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      try {
        this.isLoadingForSkeleton = true;
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons/?page=${page}`;
        const response = await axios.get(api);
        this.coupons = response.data.coupons;
        this.pagination = response.data.pagination;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        console.error('Error 找不到資料', error);
      }
      this.isLoadingForSkeleton = false;
    },

    openModal(isNew, item) {
      this.isLoading = true;
      if (isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
          is_enabled: 1,
        };
      } else {
        this.tempCoupon = { ...item };
      }
      this.isNew = isNew;
      this.isLoading = false;
      this.$refs.couponModal.showModal();
    },

    async updateCoupon(item) {
      try {
        this.isLoadingForSkeleton = true;
        this.tempCoupon = item;
        let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
        let httpMethod = 'post';
        this.$refs.couponModal.hideModal();
        this.getCoupons();

        if (!this.isNew) {
          api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`;
          httpMethod = 'put';
        }
        const res = await axios[httpMethod](api, { data: this.tempCoupon });
        this.pushMessageState(res);
        this.isLoadingForSkeleton = false;
        this.$refs.couponModal.hideModal();
        this.getCoupons();
      } catch (error) {
        console.error('Error 找不到資料:', error);
      }
    },

    openDelModal(item) {
      this.isLoading = true;
      this.tempCoupon = { ...item };
      this.isLoading = false;
      this.$refs.delModal.showModal();
    },

    async delCoupon() {
      try {
        this.isLoading = true;
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
        const res = await axios.delete(api);
        this.isLoading = false;
        this.$refs.delModal.hideModal();
        this.getCoupons();
        this.pushMessageState(res);
        this.$refs.couponModal.hideModal();
      } catch (error) {
        console.error('Error 找不到資料:', error);
      }
    },
  },

  created() {
    this.getCoupons();
  },

  inject: ['emitter', 'pushMessageState'],
};
</script>
