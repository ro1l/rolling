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
                <div class="mb-2">
                  <label for="customFile">上傳圖片</label>
                  <input type="file" id="customFile"
                  @change="uploadFile"
                  ref="fileInput">
                </div>
                <div class="mb-2">
                  <img
                  :src="tempProduct.imageUrl" alt=""
                  v-if="tempProduct.imageUrl">
                  <span v-else>沒有圖片</span>
                </div>
              </div>
              <div class="col-6">
                <div class="mb-2">
                  <label for="title">標題</label>
                  <input type="text" id="title" placeholder="請輸入標題"
                  v-model="tempProduct.title">
                </div>
                <div class="mb-2">
                  <label for="category">分類</label>
                  <input type="text" id="category" placeholder="請輸入分類"
                  v-model="tempProduct.category">
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
      modal: {},
      tempProduct: {},
    };
  },
  methods: {
    uploadFile() {
      const uploadFile = this.$refs.fileInput.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', uploadFile);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.$http.post(url, formData)
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            this.tempProduct.imageUrl = res.data.imageUrl;
          }
        });
    },
  },
  watch: {
    product() {
      this.tempProduct = this.product;
    },
  },
};
</script>
