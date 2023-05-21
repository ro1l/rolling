<template>
  <div class="h3 bg-info">優惠券</div>
  <div class="text-end">
    <button class="btn btn-info"
    @click="openModal(true)">
      新增優惠券
    </button>
  </div>
  <table class="table">
    <thead>
      <tr>
        <th>名稱</th>
        <th>code</th>
        <th>百分比</th>
        <th>期限</th>
        <th>啟用狀態</th>
        <th>狀態</th>
      </tr>
    </thead>
    <tbody>
      <tr
      v-for="coupon in coupons"
      :key="coupon.id">
        <td>{{ coupon.title }}</td>
        <td>{{ coupon.code }}</td>
        <td>{{ coupon.percent }}</td>
        <td>{{ $filters.date(coupon.due_date) }}</td>
        <td>
          <span
          v-if="coupon.is_enabled === 1"
          class="text-success">啟用</span>
          <span v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-success"
            @click="openModal(false, coupon)">編輯</button>
            <button class="btn btn-outline-danger"
            @click="openDelModal(coupon)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <CouponModal
  ref="couponModal"
  :coupon="tempCoupon"
  @update-coupon="updateCoupon"/>
  <DelModal
  ref="delModal"
  :item="tempCoupon"
  @del-item="delCoupon"/>
  <Pagination
  :pages="pagination"
  @emit-pages="getCoupons"/>
  <Loading
  :active="isLoading"/>
</template>

<script>
import CouponModal from '@/components/backend/CouponModal.vue';
import DelModal from '@/components/backend/DelModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  inject: ['emitter', 'pushMessageState'],
  data() {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: '',
      },
      isNew: false,
      pagination: {},
      isLoading: false,
    };
  },
  components: {
    CouponModal,
    DelModal,
    Pagination,
  },
  methods: {
    getCoupons(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons/?page=${page}`;
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false;
          this.coupons = res.data.coupons;
          this.pagination = res.data.pagination;
        });
    },
    openModal(isNew, item) {
      this.isLoading = true;
      this.isNew = isNew;
      if (this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
          is_enabled: 0,
        };
      } else {
        this.tempCoupon = { ...item };
      }
      this.isLoading = false;
      this.$refs.couponModal.showModal();
    },
    updateCoupon(tempCoupon) {
      this.isLoading = true;
      if (this.isNew) {
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
        this.$http.post(api, { data: tempCoupon })
          .then((res) => {
            this.pushMessageState(res);
          });
      } else {
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
        this.$http.put(api, { data: this.tempCoupon })
          .then((res) => {
            this.pushMessageState(res);
          });
      }
      this.isLoading = false;
      this.$refs.couponModal.hideModal();
      this.getCoupons();
    },
    openDelModal(item) {
      this.tempCoupon = { ...item };
      this.$refs.delModal.showModal();
    },
    delCoupon() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
      this.$http.delete(api)
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          this.isLoading = false;
          this.$refs.delModal.hideModal();
          this.getCoupons();
          this.pushMessageState(res);
          console.log(res);
        });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
