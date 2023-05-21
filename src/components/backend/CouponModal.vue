<template>
  <div class="modal" tabindex="-1"
  ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">優惠券</h5>
          <button type="button" class="btn-close"
          data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="title">名稱</label>
            <input type="text" id="title" placeholder="請輸入名稱"
            v-model="tempCoupon.title">
          </div>
          <div class="mb-3">
            <label for="code">code</label>
            <input type="text" id="code" placeholder="請輸入code"
            v-model="tempCoupon.code">
          </div>
          <div class="mb-3">
            <label for="percent">百分比</label>
            <input type="number" id="percent" placeholder="請輸入百分比"
            v-model="tempCoupon.percent">
          </div>
          <div class="mb-3">
            <label for="due_date">期限</label>
            <input type="date" id="due_date" placeholder="請輸入期限"
            v-model="due_date">
          </div>
          <div class="mb-3">
            <input type="checkbox" id="is_enabled"
            v-model="tempCoupon.is_enabled"
            :true-value="1"
            :false-value="0">
            <label for="is_enabled">是否啟用
              <!-- <span v-if="tempCoupon.is_enabled === 1">啟用</span>
              <span v-else>未啟用</span> -->
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary"
          @click="$emit('update-coupon', tempCoupon)">確定</button>
        </div>
      </div>
    </div>
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
  // name: 'couponModal',
  props: {
    coupon: {},
  },
  emits: ['update-coupon'],
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
