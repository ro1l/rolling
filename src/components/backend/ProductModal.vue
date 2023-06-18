<template>
  <!-- Modal -->
  <div class="modal fade modal-xl" id="exampleModal"
  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
  ref="modal">
    <div class="modal-dialog   col-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">新增商品</h1>
          <button type="button"
          class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- 內容 -->
          <div class="container">
            <div class="row">
              <div class="col-6">

                <!-- 主圖 -->
                <div class="mb-2">
                  <label for="customFile">主圖</label>
                  <input type="file" id="customFile"
                  @change="uploadFile"
                  ref="fileInput">
                </div>
                <div class="mb-2">
                  <div class="position-relative"
                  v-if="tempProduct.imageUrl !== undefined">
                    <img
                    :src="tempProduct.imageUrl" alt="">
                    <!-- <button class="btn btn-outline-danger position-absolute top-0 end-0"
                    @click="delImage()">移除</button> -->
                  </div>
                  <span v-else>沒有圖片</span>
                </div>

                <!-- 副圖 -->
                <div class="mb-2">
                  <label for="customFile">副圖</label>
                  <input type="file" name="" id="customFile"
                  @change="uploadFiles"
                  multiple
                  ref="filesInput"
                  :disabled="tempProduct.imagesUrl.length >= 5">
                </div>
                <div class="mb-2">
                  <div
                  v-if="tempProduct.imagesUrl">
                  <template
                  v-for="item in tempProduct.imagesUrl" :key="item">
                  <div class="position-relative">
                    <img class="img-fluid mb-3"
                    :src="item" alt="">
                    <button class="btn btn-outline-danger position-absolute top-0 end-0"
                    @click="delImages(item)"
                    >移除</button>
                  </div>
                  </template>
                  </div>
                  <span v-else>沒有圖片</span>
                </div>

              </div>
              <div class="col-6">
                <div class="mb-2">
                  <label for="category">分類</label>
                  <input type="text" id="category" placeholder="請輸入分類"
                  v-model="tempProduct.category">
                </div>
                <div class="mb-2">
                  <label for="title">標題</label>
                  <input type="text" id="title" placeholder="請輸入標題"
                  v-model="tempProduct.title">
                </div>
                <div class="mb-2">
                  <label for="unit">單位</label>
                  <input type="text" id="unit" placeholder="請輸入單位"
                  v-model="tempProduct.unit">
                </div>
                <div class="mb-2">
                  <label for="origin_price">原價</label>
                  <input type="number" id="origin_price" placeholder="請輸入原價"
                  v-model="tempProduct.origin_price">
                </div>
                <div class="mb-2">
                  <label for="price">售價</label>
                  <input type="number" id="price" placeholder="請輸入售價"
                  v-model="tempProduct.price">
                </div>
                <h5>比較</h5>
                <div class="mb-2">
                  <label for="type">種類</label>
                  <input type="text" id="type" placeholder="請輸入種類"
                  v-model="tempProduct.content.comparison.type">
                </div>
                <div class="mb-2">
                  <label for="engine">引擎</label>
                  <input type="text" id="engine" placeholder="請輸入引擎"
                  v-model="tempProduct.content.comparison.engine">
                </div>
                <div class="mb-2">
                  <label for="cc">排氣量</label>
                  <input type="number" id="cc" placeholder="請輸入排氣量"
                  v-model="tempProduct.content.comparison.cc">
                </div>
                <div class="mb-2">
                  <label for="hp">馬力</label>
                  <input type="text" id="hp" placeholder="請輸入馬力"
                  v-model="tempProduct.content.comparison.hp">
                </div>
                <div class="mb-2">
                  <label for="torque">扭力</label>
                  <input type="text" id="torque" placeholder="請輸入扭力"
                  v-model="tempProduct.content.comparison.torque">
                </div>
                <div class="mb-2">
                  <label for="ht">座高</label>
                  <input type="number" id="ht" placeholder="請輸入座高"
                  v-model="tempProduct.content.comparison.ht">
                </div>
                <div class="mb-2">
                  <label for="wt">車重</label>
                  <input type="number" id="wt" placeholder="請輸入車重"
                  v-model="tempProduct.content.comparison.wt">
                </div>
                <div class="mb-2">
                  <label for="tank">油箱容量</label>
                  <input type="number" id="tank" placeholder="請輸入油箱容量"
                  v-model="tempProduct.content.comparison.tank">
                </div>
                <div class="mb-2">
                  <label for="afc">年耗油量</label>
                  <input type="number" id="afc" placeholder="請輸入年耗油量"
                  v-model="tempProduct.content.comparison.afc">
                </div>
                <div class="mb-2">
                  <label for="is_enabled">是否啟用
                  <input type="checkbox" id="is_enabled"
                  :true-value="1"
                  :false-value="0"
                  v-model="tempProduct.is_enabled">
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary"
          @click="$emit('update-product', tempProduct)">確認</button>
        </div>
      </div>
    </div>
    <Loading
    :active="isLoading"/>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  mixins: [modalMixin],
  props: {
    product: {
      type: Object,
      default() { return {}; },
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
            console.log(res);
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
              console.log(res);
            }
          });
        });
      }
    },
    delImage() {
      this.tempProduct.imageUrl = '';
      this.tempProduct.imageUrl = undefined;
    },
    delImages(item) {
      const index = this.tempProduct.imagesUrl.indexOf(item);
      this.tempProduct.imagesUrl.splice(index, 1);
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
};
</script>
