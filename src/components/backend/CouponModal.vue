<template>
  <div class="modal fade " id="exampleModal"
  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
  ref="modal">
    <div class="modal-dialog modal-xl  modal-dialog-centered modal-fullscreen-md-down">
      <div class="modal-content bg-black rounded-5 pt-3 ps-4 pe-4 pb-4" >
        <div class="modal-header ">
          <h1 class="modal-title fs-5 text-white" id="exampleModalLabel">新增/編輯優惠券</h1>
          <button type="button"
          class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-6 col-sm-12">
                <div class="card mb-4  bg-green pb-4">
                  <div class="card-header pe-4 ps-4 pt-4 pb-2   mb-0">
                    <h6 class="mb-0 fs-5">/Coupon</h6>
                  </div>
                  <div class="card-body ps-4 pe-4">
                    <div class="mb-4">
                      <p class="mb-2 text-black">名稱</p>
                      <input class="form-control form-control-l bg-white bg-opacity-25
                      border-dark
                      border-2 rounded-4 p-3"
                      type="text" placeholder="請輸入名稱" aria-label="example"
                      v-model="tempCoupon.title">
                    </div>
                    <div class="mb-4">
                      <p class="mb-2 text-black">code</p>
                      <input class="form-control form-control-l bg-white bg-opacity-25 border-dark
                    border-2 rounded-4 p-3"
                      type="text" placeholder="請輸入code" aria-label="example"
                      v-model="tempCoupon.code">
                    </div>
                    <div class="mb-4">
                      <p class="mb-2 text-black">百分比</p>
                      <input class="form-control form-control-l bg-white bg-opacity-25 border-dark
                    border-2 rounded-4 p-3"
                      type="number" placeholder="請輸入百分比" aria-label="example"
                      v-model="tempCoupon.percent">
                    </div>
                    <div class="mb-4">
                      <p class="mb-2 text-black">期限</p>
                      <input class="form-control form-control-l bg-white bg-opacity-25 border-dark
                    border-2 rounded-4 p-3"
                      type="date" placeholder="請輸入期限" aria-label="example"
                      v-model="due_date">
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-sm-12">
                <div class="card mb-4 bg-base">
                  <div class="card-header pe-4 ps-4 pt-4 pb-2 mb-0">
                    <h6 class="mb-0 fs-5">是否啟用</h6>
                  </div>
                  <div class="card-body px-lg-4 pb-4 px-2">
                    <div class="d-flex
                  justify-content-between
                  align-items-center
                  ps-5 pe-5">
                      <input class="d-none input-true" type="radio" name="select" id="true"
                      :value="1"
                      v-model="tempCoupon.is_enabled"
                      checked>
                      <label for="true" class="true px-lg-5 py-lg-2 px-4 py-1 cursor-pointer
                      border-2 rounded-5 fs-4">
                        <span>是</span>
                      </label>
                      <input class="d-none input-false" type="radio" name="select" id="false"
                      :value="0"
                      v-model="tempCoupon.is_enabled">
                      <label for="false" class="false px-lg-5 py-lg-2 px-4 py-1 cursor-pointer
                      border-2 rounded-5 fs-4">
                        <span>否</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer  d-flex justify-content-between p-lg-4">
          <button type="button" class="btn  btn-outline-light border-2 rounded-5
          me-3 mb-0 px-lg-5 py-lg-3 px-4 py-2"
          v-if="isNew === false"
          @click="$emit('del-coupon', tempCoupon)"
          >刪除</button>
          <p></p>
          <button type="button" class="btn  btn-base border-2 rounded-5
          me-3 mb-0 px-lg-5 py-lg-3 px-4 py-2"
          @click="$emit('update-coupon', tempCoupon)">確認</button>
        </div>
      </div>
    </div>
    <!-- <Loading
    :active="isLoading"/> -->
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  data() {
    return {
      modal: {},
      tempCoupon: {},
      due_date: '',
    };
  },
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
  emits: ['update-coupon', 'del-coupon'],
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
  mixins: [modalMixin],
};
</script>
