<template>
  <div class="modal fade " id="exampleModal" tabindex="-1"
  aria-labelledby="exampleModalLabel" aria-hidden="true"
    ref="modal">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-fullscreen-md-down">
      <div class="modal-content bg-gray-white rounded-0 p-0 border-0">
        <div class="modal-header border-bottom border-black p-4">
          <h1 class="modal-title fs-5 font-family-taipei fw-normal"
          id="exampleModalLabel">新增 / 編輯商品</h1>
          <button type="button" class="btn-close"
          data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-0">
          <div class="container-fluid">
            <div class="row p-0">
              <!-- 商品主圖 -->
              <div class="col-lg-6 col-sm-12">
                <div class="card border-lg border-bottom border-black px-2 py-4">
                  <div class="card-header pb-2 mb-0">
                    <h6 class="mb-0 fs-5 font-family-taipei">商品主圖</h6>
                  </div>
                  <div class="card-body px-sm-4
                  d-flex justify-content-center align-items-center">
                    <label class="cursor-pointer preview" for="customFile">
                      <input class="d-none" type="file" id="customFile"
                      @change="uploadFile" ref="fileInput">
                      <div class="w-100 h-100 border border-black p-3 d-flex justify-content-center
                      align-items-center position-relative"
                      v-if="tempProduct.imageUrl !== undefined">
                        <img class="w-100" :src="tempProduct.imageUrl" alt="">
                        <div class="position-absolute
                        bg-opacity-50 bg-black p-2
                        w-100 bottom-0 start-0 text-center text-white">編輯</div>
                      </div>
                      <div v-else class="w-100 h-100
                      border border-black d-flex justify-content-center
                      align-items-center">
                        <p class="m-0 p-0">請選擇主圖</p>
                      </div>
                    </label>
                  </div>
                </div>

                <!-- / 商品資訊 -->
                <div class="card border-lg border-bottom border-black px-2 py-4">
                  <div class="card-header pb-2 mb-0">
                    <h6 class="mb-0 fs-5 font-family-taipei">商品資訊
                      <small class="text-danger font-family-taipei text-xxs">(必填)</small>
                    </h6>
                  </div>
                  <div class="card-body">
                    <div class="mb-4">
                      <p class="mb-2 text-black">廠牌</p>
                      <select class="form-select border-dark rounded-0 bg-transparent
                      border-1 p-3" aria-label="Default select example"
                      v-model="tempProduct.category">
                        <option selected value="" disabled>請選擇廠牌</option>
                        <option value="YAMAHA">YAMAHA</option>
                        <option value="KAWASAKI">KAWASAKI</option>
                        <option value="HONDA">HONDA</option>
                        <option value="Harley-Davidson">Harley-Davidson</option>
                        <option value="IndianMotorcycle">Indian Motorcycle</option>
                        <option value="Ducati">Ducati</option>
                        <option value="KTM">KTM</option>
                        <option value="BMW">BMW</option>
                        <option value="Triumph">Triumph</option>
                      </select>
                    </div>
                    <div class="mb-4">
                      <p class="mb-2 text-black">商品名稱</p>
                      <input class="form-control border-dark rounded-0
                    border-1 bg-transparent p-3" type="text"
                    placeholder="請輸入商品名稱" aria-label="example"
                        v-model="tempProduct.title">
                    </div>
                    <div class="mb-4">
                      <p class="mb-2 text-black">原價</p>
                      <input class="form-control border-dark rounded-0
                    border-1 bg-transparent p-3" type="number"
                    placeholder="請輸入原價" aria-label="example"
                        v-model="tempProduct.origin_price">
                    </div>
                    <div class="mb-4">
                      <p class="mb-2 text-black">售價</p>
                      <input class="form-control border-dark rounded-0
                    border-1 bg-transparent p-3" type="number"
                    placeholder="請輸入售價" aria-label="example"
                        v-model="tempProduct.price">
                    </div>
                  </div>
                </div>
                <!-- / 是否啟用 -->
                <div class="card border-lg px-2 py-4 border-black">
                  <div class="card-header pb-2 mb-0">
                    <h6 class="mb-0 fs-5 font-family-taipei">是否啟用</h6>
                  </div>
                  <div class="card-body">
                    <div class="d-flex
                    justify-content-between
                    align-items-center
                    px-5 pt-5">
                      <input class="d-none input-true" type="radio"
                      name="select" id="true" checked :value="1"
                        v-model="tempProduct.is_enabled">
                      <label for="true" class="true px-lg-5 py-lg-2 px-4 py-1 cursor-pointer
                      border-2 rounded-5 fs-5">
                        <span>是</span>
                      </label>
                      <input class="d-none input-false" type="radio"
                      name="select" id="false" :value="0"
                        v-model="tempProduct.is_enabled">
                      <label for="false" class="false px-lg-5 py-lg-2 px-4 py-1 cursor-pointer
                      border-2 rounded-5 fs-5">
                        <span>否</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 車款資訊 -->
              <div class="col-lg-6 col-sm-12">
                <div class="card border-lg border-start border-black px-2 py-4">
                  <div class="card-header pb-2 mb-0">
                    <h6 class="mb-0 fs-5 font-family-taipei">車款資訊</h6>
                  </div>
                  <div class="card-body">
                    <div class="mb-4">
                      <p class="mb-2 text-black">車種</p>
                      <input class="form-control border-dark rounded-0
                      border-1 bg-transparent p-3" type="text"
                      placeholder="請輸入車種" aria-label="example"
                        v-model="tempProduct.content.comparison.type">
                    </div>
                    <div class="mb-4">
                      <p class="mb-2 text-black">引擎</p>
                      <input class="form-control border-dark rounded-0
                    border-1 bg-transparent p-3" type="text"
                    placeholder="請輸入引擎" aria-label="example"
                        v-model="tempProduct.content.comparison.engine">
                    </div>
                    <div class="mb-4">
                      <p class="mb-2 text-black">排氣量</p>
                      <input class="form-control border-dark rounded-0
                    border-1 bg-transparent p-3" type="text"
                    placeholder="請輸入排氣量" aria-label="example"
                        v-model="tempProduct.content.comparison.cc">
                    </div>
                    <div class="mb-4">
                      <p class="mb-2 text-black">馬力</p>
                      <input class="form-control border-dark rounded-0
                    border-1 bg-transparent p-3" type="text"
                    placeholder="請輸入馬力" aria-label="example"
                        v-model="tempProduct.content.comparison.hp">
                    </div>
                    <div class="mb-4">
                      <p class="mb-2 text-black">扭力</p>
                      <input class="form-control border-dark rounded-0
                    border-1 bg-transparent p-3" type="text"
                    placeholder="請輸入扭力" aria-label="example"
                        v-model="tempProduct.content.comparison.torque">
                    </div>
                    <div class="mb-4">
                      <p class="mb-2 text-black">座高</p>
                      <input class="form-control border-dark rounded-0
                    border-1 bg-transparent p-3" type="text"
                    placeholder="請輸入座高" aria-label="example"
                        v-model="tempProduct.content.comparison.ht">
                    </div>
                    <div class="mb-4">
                      <p class="mb-2 text-black">車重</p>
                      <input class="form-control border-dark rounded-0
                    border-1 bg-transparent p-3" type="text"
                    placeholder="請輸入車重" aria-label="example"
                        v-model="tempProduct.content.comparison.wt">
                    </div>
                    <div class="mb-4">
                      <p class="mb-2 text-black">油箱容量</p>
                      <input class="form-control border-dark rounded-0
                    border-1 bg-transparent p-3" type="text"
                    placeholder="請輸入油箱容量" aria-label="example"
                        v-model="tempProduct.content.comparison.tank">
                    </div>
                    <div class="mb-4">
                      <p class="mb-2 text-black">平均油耗</p>
                      <input class="form-control border-dark rounded-0
                    border-1 bg-transparent p-3" type="text"
                    placeholder="請輸入平均油耗" aria-label="example"
                        v-model="tempProduct.content.comparison.afc">
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 副圖 -->
            <div class="row">
              <div class="col-12">
                <div class="card border-lg border-top border-bottom border-black px-2 py-4">
                  <div class="card-header pb-2 mb-0">
                    <h6 class="mb-0 fs-5 font-family-taipei">副圖</h6>
                  </div>
                  <div class="card-body ps-5 pe-4
                  d-flex justify-content-start align-items-center flex-sm-column flex-lg-row
                  flex-wrap flex-lg-nowrap
" v-if="tempProduct.imagesUrl">
                    <div class="preview-more rounded-0 d-flex cursor-pointer justify-content-center
                    position-relative
                    align-items-center border border-1 border-black p-2 me-lg-4"
                    v-for="item in tempProduct.imagesUrl"
                      :key="item" @click.prevent="delImages(item)">
                      <img :src="item" alt="" class="w-100">
                      <div class="position-absolute
                        bg-opacity-50 bg-danger p-1 text-xxs
                        w-100 bottom-0 start-0 text-center">移除</div>
                    </div>
                    <label for="customFiles" class="cursor-pointer"
                    v-if="tempProduct.imagesUrl.length < 5">
                      <input class="d-none" type="file" name="" id="customFiles"
                      @change="uploadFiles" multiple
                        ref="filesInput">
                      <div class="preview-more border border-black
                      d-flex justify-content-center
                      align-items-center">
                        <p class="m-0 p-0">請選擇副圖</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer d-flex justify-content-between p-lg-5 p-3 bg-sm-color">
          <button type="button" class="btn btn-outline-dark rounded-5
          me-3 mb-0 px-lg-5 py-lg-3 px-4 py-2" v-if="isNew === false"
            @click="$emit('del-product', tempProduct)">刪除</button>
          <p></p>
          <button type="button" class="btn btn-dark rounded-5
          me-3 mb-0 px-lg-5 py-lg-3 px-4 py-2"
          @click="$emit('update-product', tempProduct)">確認</button>
        </div>
      </div>
    </div>
    <Loading :active="isLoading" />
    <DelModal ref="delModal" @del-item="delImages" />
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';
import DelModal from './DelModal.vue';

export default {
  components: {
    DelModal,
  },
  props: {
    product: {
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
      isLoading: false,
      modal: {},
      tempProduct: {
        imagesUrl: [],
        unit: '輛',
        is_enabled: 1,
        content: {
          comparison: {
            type: '', // 種類
            engine: '', // 引擎
            cc: '', // 排氣量
            hp: '', // 馬力
            torque: '', // 扭力
            ht: '', // 座高
            wt: '', // 車重
            afc: '', // 年耗油量
            tank: '', // 油箱
          },
        },
      },
    };
  },
  methods: {
    uploadFile() {
      this.isLoading = true;
      const uploadFile = this.$refs.fileInput.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', uploadFile);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.$http.post(url, formData)
        .then((res) => {
          if (res.data.success) {
            this.tempProduct.imageUrl = res.data.imageUrl;
            this.isLoading = false;
          }
        });
    },
    uploadFiles() {
      const files = Array.from(this.$refs.filesInput.files);
      if (files.length + this.tempProduct.imagesUrl.length > 5) {
        console.log('最多只能選擇五張圖片');
      } else {
        files.forEach((file) => {
          this.isLoading = true;
          const formData = new FormData();
          formData.append('file-to-upload', file);
          const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
          this.$http.post(api, formData).then((res) => {
            if (res.data.success) {
              this.tempProduct.imagesUrl.push(res.data.imageUrl);
              this.isLoading = false;
              console.log(this.tempProduct.imagesUrl);
            }
          });
        });
      }
    },
    delImage() {
      this.tempProduct.imageUrl = '';
      this.tempProduct.imageUrl = undefined;
    },
    openDelImagesModal() {
      // this.$refs.delModal.showModal();
    },
    delImages(item) {
      const index = this.tempProduct.imagesUrl.indexOf(item);
      this.tempProduct.imagesUrl.splice(index, 1);
      // this.$refs.delModal.hideModal();
    },
  },
  watch: {
    product() {
      this.tempProduct = this.product;
      if (!this.tempProduct.imagesUrl) {
        this.tempProduct.imagesUrl = [];
      }
    },
  },
  mixins: [modalMixin],
};
</script>
