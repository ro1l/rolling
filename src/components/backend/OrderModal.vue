<template>
  <div class="modal fade " id="exampleModal" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true"
    ref="modal">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-fullscreen-md-down">
      <div class="modal-content bg-gray-white rounded-0 p-0 border-0">
        <div class="modal-header border-bottom border-black p-4">
          <h1 class="modal-title fs-5 font-family-taipei fw-normal"
            id="exampleModalLabel">訂單 #{{ tempOrder.id }}</h1>
          <button type="button" class="btn-close"
            data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-0">
          <div class="container-fluid">
            <div class="row">

              <!-- 訂購人資訊 -->
              <div class="col-lg-6 col-sm-12">
                <div class="card border-lg border-end border-black px-2 py-4"
                  v-if="tempOrder.user">
                  <div class="card-body px-4">
                    <div class="row">
                      <div class="col-lg-12">
                        <h6 class="fs-5 font-family-taipei mb-4">訂購人資訊</h6>
                      </div>
                      <div class="col-2">
                        <p class="fw-bolder">姓名</p>
                      </div>
                      <div class="col-10">
                        <p>{{ tempOrder.user.name }}</p>
                      </div>
                      <div class="col-2">
                        <p class="fw-bolder">email</p>
                      </div>
                      <div class="col-10">
                        <p>{{ tempOrder.user.email }}</p>
                      </div>
                      <div class="col-2">
                        <p class="fw-bolder">手機</p>
                      </div>
                      <div class="col-10">
                        <p>{{ tempOrder.user.tel }}</p>
                      </div>
                      <div class="col-2">
                        <p class="fw-bolder">地址</p>
                      </div>
                      <div class="col-10">
                        <p>{{ tempOrder.user.address }}</p>
                      </div>
                      <div class="col-2">
                        <p class="fw-bolder">備註</p>
                      </div>
                      <div class="col-10">
                        <p v-if="tempOrder.message">{{ tempOrder.message }}</p>
                        <p v-else>無備註</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 訂單資訊 -->
              <div class="col-lg-6 col-sm-12">
                <div class="card border-lg px-2 py-4"
                  v-if="tempOrder.user">
                  <div class="card-body px-4">
                    <div class="row">
                      <div class="col-lg-12">
                        <h6 class="fs-5 font-family-taipei mb-4">訂單資訊</h6>
                      </div>
                      <div class="col-3">
                        <p class="fw-bolder">訂單編號</p>
                      </div>
                      <div class="col-9">
                        <p>{{ tempOrder.id }}</p>
                      </div>
                      <div class="col-3">
                        <p class="fw-bolder">下單時間</p>
                      </div>
                      <div class="col-9">
                        <p>{{ $filters.date(tempOrder.create_at) }}</p>
                      </div>
                      <div class="col-3">
                        <p class="fw-bolder">付款時間</p>
                      </div>
                      <div class="col-9">
                        <p>{{ $filters.date(tempOrder.paid_date) }}</p>
                      </div>
                      <div class="col-3">
                        <p class="fw-bolder">付款狀態</p>
                      </div>
                      <div class="col-9">
                        <p v-if="tempOrder.is_paid === true">已付款</p>
                        <p v-else>未付款</p>
                      </div>
                      <div class="col-3">
                        <p class="fw-bolder">總金額</p>
                      </div>
                      <div class="col-9">
                        <p>NT${{ $filters.currency(tempOrder.total) }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 訂購商品細項 -->
              <div class="col-lg-12">
                <div class="card border-lg border-top border-bottom border-black px-2 py-4"
                  v-if="tempOrder.user">
                  <div class="card-body ps-4 pe-4">
                    <div class="row">
                      <div class="col-lg-12">
                        <h6 class="fs-5 font-family-taipei mb-4">訂單資訊</h6>
                      </div>
                      <div class="col-lg-12">
                        <div class="table-responsive p-0">
                          <table class="table lh-lg">
                            <tr class="mb-5 fw-bolder">
                              <th class="text-secondary text-xxs fw-normal pb-2">品項</th>
                              <th class="text-secondary text-xxs fw-normal pb-2">數量</th>
                              <th class="text-secondary text-xxs fw-normal pb-2">單價</th>
                              <th class="text-secondary text-xxs fw-normal pb-2">金額</th>
                            </tr>
                            <tr v-for="item in tempOrder.products" :key="item.id">
                              <td>{{ item.product.title }}</td>
                              <td>{{ item.qty }}/{{ item.product.unit }}</td>
                              <td>NT${{ $filters.currency(item.total / item.qty) }}</td>
                              <td>NT${{ $filters.currency(item.total) }}</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- modal-footer -->
        <div class="modal-footer d-flex justify-content-between p-lg-5 p-3 bg-sm-color">
          <button type="button" class="btn btn-outline-dark rounded-5
            me-3 mb-0 px-lg-5 py-lg-3 px-4 py-2"
            @click.prevent="$emit('del-order', tempOrder)">刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  props: {
    order: {
      type: Object,
      default() { return {}; },
    },
  },

  data() {
    return {
      modal: {},
      tempOrder: {},
    };
  },

  watch: {
    order() {
      this.tempOrder = this.order;
    },
  },

  mixins: [modalMixin],
};
</script>
