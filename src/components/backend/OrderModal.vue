<template>
  <div class="modal fade " id="exampleModal"
  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
  ref="modal">
    <div class="modal-dialog modal-xl  modal-dialog-centered modal-fullscreen-md-down">
      <div class="modal-content bg-black rounded-5 pt-3 ps-4 pe-4 pb-4" >
        <div class="modal-header ">
          <h1 class="modal-title fs-5 text-white" id="exampleModalLabel">訂單 #{{ tempOrder.id }}</h1>
          <button type="button"
          class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row">
              <!-- 左側 -->
              <div class="col-lg-6 col-sm-12">
                <!-- / 訂購人資訊 -->
                <div class="card mb-4  bg-base"
                v-if="tempOrder.user">
                  <div class="card-header pe-4 ps-4 pt-4 pb-2   mb-0">
                    <h6 class="mb-0 fs-5">/訂購人資訊</h6>
                  </div>
                  <div class="card-body ps-4 pe-4">
                    <div class="row">
                      <div class="col-lg-2">
                        <p class="fw-bolder">姓名</p>
                      </div>
                      <div class="col-lg-10">
                        <p>{{ tempOrder.user.name }}</p>
                      </div>
                      <div class="col-lg-2">
                        <p class="fw-bolder">email</p>
                      </div>
                      <div class="col-lg-10">
                        <p>{{ tempOrder.user.email }}</p>
                      </div>
                      <div class="col-lg-2">
                        <p class="fw-bolder">手機</p>
                      </div>
                      <div class="col-lg-10">
                        <p>{{ tempOrder.user.tel }}</p>
                      </div>
                      <div class="col-lg-2">
                        <p class="fw-bolder">地址</p>
                      </div>
                      <div class="col-lg-10">
                        <p>{{ tempOrder.user.address }}</p>
                      </div>
                      <div class="col-lg-2">
                        <p class="fw-bolder">備註</p>
                      </div>
                      <div class="col-lg-10">
                        <p v-if="tempOrder.message">{{ tempOrder.message }}</p>
                        <p v-else>無備註</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 訂單資訊 -->
              <div class="col-lg-6 col-sm-12">
                <div class="card mb-4  bg-green"
                v-if="tempOrder.user">
                  <div class="card-header pe-4 ps-4 pt-4 pb-2   mb-0">
                    <h6 class="mb-0 fs-5">/訂單資訊</h6>
                  </div>
                  <div class="card-body ps-4 pe-4">
                    <div class="row">
                      <div class="col-lg-3">
                        <p class="fw-bolder">訂單編號</p>
                      </div>
                      <div class="col-lg-9">
                        <p>{{ tempOrder.id }}</p>
                      </div>
                      <div class="col-lg-3">
                        <p class="fw-bolder">下單時間</p>
                      </div>
                      <div class="col-lg-9">
                        <p>{{ $filters.date(tempOrder.create_at) }}</p>
                      </div>
                      <div class="col-lg-3">
                        <p class="fw-bolder">付款時間</p>
                      </div>
                      <div class="col-lg-9">
                        <p>{{ $filters.date(tempOrder.paid_date) }}</p>
                      </div>
                      <div class="col-lg-3">
                        <p class="fw-bolder">付款狀態</p>
                      </div>
                      <div class="col-lg-9">
                        <p v-if="tempOrder.is_paid === true">已付款</p>
                        <p v-else>未付款</p>
                      </div>
                      <div class="col-lg-3">
                        <p class="fw-bolder">總金額</p>
                      </div>
                      <div class="col-lg-9">
                        <p>NT${{ $filters.currency(tempOrder.total) }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 訂購細項 -->
              <div class="col-lg-12">
                <div class="card mb-4  bg-gray-white"
                v-if="tempOrder.user">
                  <div class="card-header pe-4 ps-4 pt-4 pb-2   mb-0">
                    <h6 class="mb-0 fs-5">/訂購細項</h6>
                  </div>
                  <div class="card-body ps-4 pe-4">
                    <div class="table-responsive">
                      <table class="table lh-lg">
                        <tr class="mb-5 fw-bolder">
                          <th class="text-secondary text-xxs fw-normal pb-2">品項</th>
                          <th class="text-secondary text-xxs fw-normal pb-2">數量</th>
                          <th class="text-secondary text-xxs fw-normal pb-2">單價</th>
                          <th class="text-secondary text-xxs fw-normal pb-2">金額</th>
                        </tr>
                        <tr
                        v-for="item in tempOrder.products"
                        :key="item.id">
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

        <div class="modal-footer  d-flex justify-content-between p-lg-4">
          <button type="button" class="btn  btn-outline-light border-2 rounded-5
          me-3 mb-0 px-lg-5 py-lg-3 px-4 py-2"
          @click="$emit('del-order', tempOrder)">刪除</button>
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
  components: {
  },
  watch: {
    order() {
      this.tempOrder = this.order;
    },
  },
  methods: {
  },
};
</script>
