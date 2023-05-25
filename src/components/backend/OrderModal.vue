<template>
  <div class="modal" tabindex="-1"
  ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">訂單內容</h5>
          <button type="button" class="btn-close"
          data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-6">
              <h4>用戶資料</h4>
              <table class="table">
                <tbody v-if="tempOrder.user">
                  <tr>
                    <th>姓名</th>
                    <td>{{ tempOrder.user.name }}</td>
                  </tr>
                  <tr>
                    <th>email</th>
                    <td>{{ tempOrder.user.email }}</td>
                  </tr>
                  <tr>
                    <th>手機</th>
                    <td>{{ tempOrder.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>{{ tempOrder.user.address }}</td>
                  </tr>
                  <tr>
                    <th>備註</th>
                    <td>
                      <span v-if="tempOrder.message">{{ tempOrder.message }}</span>
                      <span v-else>無備註</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-6">
              <h4>訂單細節</h4>
              <table class="table">
                <tbody>
                  <tr>
                    <th>訂單編號</th>
                    <td>{{ tempOrder.id }}</td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td>{{ $filters.date(tempOrder.create_at) }}</td>
                  </tr>
                  <tr v-if="tempOrder.paid_date">
                    <th>付款時間</th>
                    <td>{{ $filters.date(tempOrder.paid_date) }}</td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <span v-if="tempOrder.is_paid === true" class="text-success">已付款</span>
                      <span v-else>未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td>{{ tempOrder.total }}</td>
                  </tr>
                </tbody>
              </table>

              <h4>選購商品</h4>
              <table class="table">
                <tbody>
                  <tr
                  v-for="item in tempOrder.products"
                  :key="item.id">
                    <th>{{ item.product.title }}</th>
                    <td>{{ item.qty }}/{{ item.product.unit }}</td>
                    <td>NT${{ $filters.currency(item.total) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
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
      tempOrder: {},
    };
  },
  props: {
    order: {
      type: Object,
      default() { return {}; },
    },
  },
  mixins: [modalMixin],
  watch: {
    order() {
      this.tempOrder = this.order;
    },
  },
};
</script>
