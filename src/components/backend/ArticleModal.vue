<template>
  <div class="modal fade " id="exampleModal"
  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
  ref="modal">
    <div class="modal-dialog modal-xl  modal-dialog-centered modal-fullscreen-md-down">
      <div class="modal-content bg-black rounded-5 pt-3 ps-4 pe-4 pb-4" >
        <div class="modal-header ">
          <h1 class="modal-title fs-5 text-white" id="exampleModalLabel">新增/編輯文章</h1>
          <button type="button"
          class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
              <!-- 文章內容 -->
            <div class="row">
              <div class="col-12 mb-4">
                <div class="card mb-4 bg-dark-gray pb-4">
                  <div class="card-header px-4 pt-4 pb-2 mb-0">
                    <h6 class="mb-0 fs-5 text-white">文章內容
                    <small class="text-white text-opacity-50 fw-normal fs-6">(必填)</small></h6>
                  </div>
                  <div class="card-body px-lg-4
                  d-flex justify-content-center align-items-center">
                    <Editor
                    api-key="v9qd6mo7pj1ij6ci3z7691b9kd3fjj2bc9km9xgru539dsyt"
                    :init="{
                      skin: 'oxide-dark',
                      content_css: 'dark',
                      menubar: false,
                      plugins: [
                      ],
                      toolbar_mode: 'wrap',
                      toolbar:
                        'undo redo | blocks formatselect fontsize | \
                        bold italic backcolor underline | \
                        alignleft aligncenter alignright alignjustify | \
                        fontsizeselect bullist numlist outdent indent | removeformat'
                    }"
                    v-model="tempArticle.content"/>
                  </div>
              </div>
              </div>
            </div>
            <div class="row">
              <!-- 左側 -->
              <div class="col-lg-6 col-sm-12">
                <!-- / 文章圖片 -->
                <div class="card mb-4  bg-base pb-4">
                  <div class="card-header pe-4 ps-4 pt-4 pb-2   mb-0">
                    <h6 class="mb-0 fs-5">文章圖片</h6>
                  </div>
                  <div class="card-body ps-4 pe-4
                d-flex justify-content-center align-items-center">
                    <label class="cursor-pointer" for="customFile">
                      <input class="d-none" type="file" id="customFile" @change="uploadFile"
                      ref="fileInput">
                      <div class="preview border border-2 border-black p-3
                    rounded-4 d-flex justify-content-center
                    align-items-center position-relative"
                      v-if="tempArticle.image !== undefined">
                        <img class="w-100"
                        :src="tempArticle.image" alt="">
                        <div class="position-absolute
                        bg-opacity-50 bg-white p-2 rounded-4 rounded-top-0
                        w-100 bottom-0 start-0 text-center">編輯</div>
                      </div>
                      <div v-else class="preview bg-black rounded-4 d-flex justify-content-center
                    align-items-center">
                        <p class="m-0 p-0 text-white ">請選擇圖片</p>
                    </div>

                    </label>
                  </div>
                </div>
                <!-- / 是否公開 -->
                <div class="card mb-4  bg-green">
                  <div class="card-header pe-4 ps-4 pt-4 pb-2 mb-0">
                    <h6 class="mb-0 fs-5">是否公開</h6>
                  </div>
                  <div class="card-body px-lg-4 pb-4 px-2">
                    <div class="d-flex
                    justify-content-between
                    align-items-center
                    ps-5 pe-5">
                      <input class="d-none input-true" type="radio" name="select" id="true" checked
                      :value="true"
                      v-model="tempArticle.isPublic">
                      <label for="true" class="true px-lg-5 py-lg-2 px-4 py-1 cursor-pointer
                      border-2 rounded-5 fs-4">
                        <span>是</span>
                      </label>
                      <input class="d-none input-false" type="radio" name="select" id="false"
                      :value="false"
                      v-model="tempArticle.isPublic">
                      <label for="false" class="false px-lg-5 py-lg-2 px-4 py-1 cursor-pointer
                      border-2 rounded-5 fs-4">
                        <span>否</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 右側 -->
              <div class="col-lg-6 col-sm-12">
                <div class="card mb-4  bg-gray-white pb-4">
                  <div class="card-header pe-4 ps-4 pt-4 pb-2   mb-0">
                    <h6 class="mb-0 fs-5">文章資訊</h6>
                  </div>
                  <div class="card-body ps-4 pe-4">
                    <div class="mb-4">
                      <p class="mb-2 text-black">標題</p>
                      <input class="form-control form-control-l
                    bg-dark bg-opacity-10 border-dark
                    border-2 rounded-4 p-3"
                      type="text" placeholder="請輸入標題(必填)" aria-label="example"
                      v-model="tempArticle.title">
                    </div>
                    <div class="mb-4">
                      <p class="mb-2 text-black">描述</p>
                      <input class="form-control form-control-l
                    bg-dark bg-opacity-10 border-dark
                    border-2 rounded-4 p-3"
                      type="text" placeholder="請輸入描述" aria-label="example"
                      v-model="tempArticle.description">
                    </div>
                    <div class="mb-4">
                      <p class="mb-2 text-black">作者</p>
                      <input class="form-control form-control-l
                    bg-dark bg-opacity-10 border-dark
                    border-2 rounded-4 p-3"
                      type="text" placeholder="請輸入作者" aria-label="example"
                      v-model="tempArticle.author">
                    </div>
                    <div class="mb-4">
                      <p class="mb-2 text-black">標籤</p>
                      <input class="form-control form-control-l
                    bg-dark bg-opacity-10 border-dark
                    border-2 rounded-4 p-3"
                      type="text" placeholder="請輸入標籤" aria-label="example"
                      v-model="tempArticle.tag">
                    </div>
                    <div class="mb-4">
                      <p class="mb-2 text-black">創建時間</p>
                      <input class="form-control form-control-l
                    bg-dark bg-opacity-10 border-dark
                    border-2 rounded-4 p-3"
                      type="date" aria-label="example"
                      v-model="create_at">
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
          @click="$emit('del-article', tempArticle)">刪除</button>
          <p></p>
          <button type="button" class="btn  btn-base border-2 rounded-5
          me-3 mb-0 px-lg-5 py-lg-3 px-4 py-2"
          @click="$emit('update-article', tempArticle)">確認</button>
        </div>
      </div>
    </div>
    <Loading
    :active="isLoading"/>
  </div>

  <Loading
  :active="isLoading"/>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';
import Editor from '@tinymce/tinymce-vue';

export default {
  data() {
    return {
      isLoading: false,
      modal: {},
      tempArticle: {},
      create_at: '',
    };
  },
  props: {
    article: {
      type: Object,
      default() { return {}; },
    },
    isNew: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    Editor,
  },
  emits: ['update-article', 'del-article'],
  methods: {
    uploadFile() {
      this.isLoading = true;
      const uploadFile = this.$refs.fileInput.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', uploadFile);
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.$http.post(api, formData)
        .then((res) => {
          if (res.data.success) {
            this.tempArticle.image = res.data.imageUrl;
            this.isLoading = false;
          }
        });
    },
  },
  watch: {
    article() {
      this.tempArticle = this.article;
      const changeDate = new Date(this.tempArticle.create_at * 1000)
        .toISOString().split('T');
      [this.create_at] = changeDate;
    },
    create_at() {
      this.tempArticle.create_at = Math.floor(new Date(this.create_at) / 1000);
    },
  },
  mixins: [modalMixin],
};
</script>
