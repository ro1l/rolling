<template>
  <div class="modal fade " id="exampleModal" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true"
    ref="modal">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-fullscreen-md-down">
      <div class="modal-content bg-gray-white rounded-0 p-0 border-0">
        <div class="modal-header border-bottom border-black p-4">
          <h1 class="modal-title fs-5 font-family-taipei fw-normal"
            id="exampleModalLabel">新增/編輯優惠券</h1>
          <button type="button" class="btn-close"
            data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-0">
          <div class="container-fluid">
            <div class="row p-0">

              <!-- 優惠券編輯 -->
              <div class="col-lg-6 col-sm-12">
                <div class="card border-lg border-end border-black px-2 py-4">
                  <div class="card-header pb-2 mb-0">
                    <h6 class="mb-0 fs-5 font-family-taipei">Coupon</h6>
                  </div>
                  <div class="card-body">
                    <div class="mb-4">
                      <p class="mb-2 text-black">名稱</p>
                      <input class="form-control border-dark rounded-0 border-1 bg-transparent p-3"
                        type="text" placeholder="請輸入名稱" aria-label="example"
                        v-model="tempCoupon.title">
                    </div>
                    <div class="mb-4">
                      <p class="mb-2 text-black">code</p>
                      <input class="form-control border-dark rounded-0 border-1 bg-transparent p-3"
                        type="text" placeholder="請輸入code" aria-label="example"
                        v-model="tempCoupon.code">
                    </div>
                    <div class="mb-4">
                      <p class="mb-2 text-black">百分比</p>
                      <input class="form-control border-dark rounded-0 border-1 bg-transparent p-3"
                        type="number" placeholder="請輸入百分比" aria-label="example"
                        v-model="tempCoupon.percent">
                    </div>
                    <div class="mb-4">
                      <p class="mb-2 text-black">期限</p>
                      <input class="form-control border-dark rounded-0 border-1 bg-transparent p-3"
                        type="date" placeholder="請輸入期限" aria-label="example"
                        v-model="due_date">
                    </div>
                  </div>
                </div>
              </div>

              <!-- 啟用 -->
              <div class="col-lg-6 col-sm-12">
                <div class="card border-lg px-2 py-4">
                  <div class="card-header pb-2 mb-0">
                    <h6 class="mb-0 fs-5 font-family-taipei">是否啟用</h6>
                  </div>
                  <div class="card-body">
                    <div class="px-5 pt-5
                      d-flex justify-content-between align-items-center">
                      <input class="d-none input-true" type="radio"
                        name="select" id="true"
                        :value="1"
                        v-model="tempCoupon.is_enabled" checked>
                      <label for="true" class="true px-lg-5 py-lg-2 px-4 py-1 cursor-pointer
                        border-2 rounded-5 fs-5">
                        <span>是</span>
                      </label>
                      <input class="d-none input-false" type="radio"
                        name="select" id="false"
                        :value="0"
                        v-model="tempCoupon.is_enabled">
                      <label for="false" class="false px-lg-5 py-lg-2 px-4 py-1 cursor-pointer
                      border-2 rounded-5 fs-5">
                        <span>否</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- modal-footer -->
        <div class="modal-footer d-flex justify-content-between p-lg-5
          border-top border-black p-3 bg-sm-color">
          <button type="button" class="btn btn-outline-dark rounded-5
            me-3 mb-0 px-lg-5 py-lg-3 px-4 py-2"
            v-if="isNew === false"
            @click.prevent="$emit('del-coupon', tempCoupon)">刪除</button>
          <p></p>
          <button type="button" class="btn btn-dark rounded-5 me-3 mb-0 px-lg-5 py-lg-3 px-4 py-2"
            @click.prevent="$emit('update-coupon', tempCoupon)">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  props: {
    coupon: {
      type: Object,
      default() { return {}; },
    },

    isNew: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      modal: {},
      tempCoupon: {},
      due_date: '',
    };
  },

  watch: {
    coupon() {
      this.tempCoupon = this.coupon;
      const changeDate = new Date(this.tempCoupon.due_date * 1000)
        .toISOString().split('T');
      [this.due_date] = changeDate;
    },

    due_date() {
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000);
    },
  },

  emits: ['update-coupon', 'del-coupon'],

  mixins: [modalMixin],
};
</script>
