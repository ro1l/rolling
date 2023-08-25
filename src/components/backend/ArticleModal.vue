<template>
  <div class="modal fade" id="exampleModal" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true"
    data-bs-focus="false"
    ref="modal">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-fullscreen-md-down">
      <div class="modal-content bg-gray-white rounded-0 p-0 border-0">
        <div class="modal-header border-bottom border-black p-4 ">
          <h1 class="modal-title fs-5 font-family-taipei fw-normal"
            id="exampleModalLabel">新增/編輯文章</h1>
          <button type="button" class="btn-close"
            data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-0">
          <div class="container-fluid">
            <div class="row p-0">

              <!-- 文章內容編輯 -->
              <div class="col-12">
                <div class="card border-lg border-bottom border-black px-2 py-4">
                  <div class="card-header pb-2 mb-0
                    d-flex justify-content-between align-items-center">
                    <h6 class="mb-0 fs-5 font-family-taipei">文章內容編輯
                      <small class="text-danger font-family-taipei text-xxs">(必填)</small>
                    </h6>
                    <a href="#" class="pe-2"
                      @click.prevent="getArticle(article.id)">
                      <ins>前往觀看文章</ins>
                    </a>
                  </div>
                  <div class="card-body w-100">
                    <Editor api-key="v9qd6mo7pj1ij6ci3z7691b9kd3fjj2bc9km9xgru539dsyt"
                      :init="{
                      menubar: 'insert',
                      plugins: [
                        'table', 'link', 'autolink'
                      ],
                      auto_focus: true,
                      anchor_top: false,
                      anchor_bottom: false,
                      table_default_attributes: {
                        border: '0',
                      },
                      relative_urls: true,
                      toolbar_mode: 'wrap',
                      toolbar:
                        'undo redo | blocks formatselect fontsize | \
                        bold italic backcolor underline | \
                        alignleft aligncenter alignright alignjustify | \
                        fontsizeselect bullist numlist outdent indent | \
                        removeformat | table tabledelete | link '}"
                      v-model="tempArticle.content" />
                  </div>
                </div>
              </div>
            </div>
            <div class="row">

              <!-- 文章圖片 -->
              <div class="col-lg-6 col-sm-12">
                <div class="card border-lg border-bottom border-black px-2 py-4">
                  <div class="card-header pb-2 mb-0">
                    <h6 class="mb-0 fs-5 font-family-taipei">文章圖片</h6>
                  </div>
                  <div class="card-body px-sm-4 d-flex justify-content-center align-items-center">
                    <label class="cursor-pointer preview" for="customFile">
                      <input class="d-none" type="file" id="customFile"
                        @change="uploadFile"
                        ref="fileInput">
                      <div class="w-100 h-100 border border-black p-3
                        d-flex justify-content-center align-items-center
                        position-relative"
                        v-if="tempArticle.image !== undefined">
                        <img class="w-100" :src="tempArticle.image" :alt="tempArticle.title">
                        <div class="position-absolute bg-opacity-50 bg-black p-2
                        w-100 bottom-0 start-0 text-center text-white">編輯</div>
                      </div>
                      <div class="w-100 h-100 border border-black
                      d-flex justify-content-center align-items-center"
                      v-else>
                        <p class="m-0 p-0">請選擇圖片</p>
                      </div>
                    </label>
                  </div>
                </div>

                <!-- 是否公開 -->
                <div class="card border-lg px-2 py-4">
                  <div class="card-header pb-2 mb-0">
                    <h6 class="mb-0 fs-5 font-family-taipei">是否公開</h6>
                  </div>
                  <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center
                      px-5 pt-5">
                      <input class="d-none input-true" type="radio" name="select" id="true" checked
                        :value="true"
                        v-model="tempArticle.isPublic">
                      <label for="true" class="true px-lg-5 py-lg-2 px-4 py-1 cursor-pointer
                        border-2 rounded-5 fs-5">
                        <span>是</span>
                      </label>
                      <input class="d-none input-false" type="radio" name="select" id="false"
                        :value="false"
                        v-model="tempArticle.isPublic">
                      <label for="false" class="false px-lg-5 py-lg-2 px-4 py-1 cursor-pointer
                        border-2 rounded-5 fs-5">
                        <span>否</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 文章資訊 -->
              <div class="col-lg-6 col-sm-12">
                <div class="card border-lg border-start border-black px-2 py-4">
                  <div class="card-header pb-2 mb-0">
                    <h6 class="mb-0 fs-5 font-family-taipei">文章資訊
                      <small class="text-danger font-family-taipei text-xxs">(必填)</small>
                    </h6>
                  </div>
                  <div class="card-body">
                    <div class="mb-4">
                      <p class="mb-2 text-black">標題</p>
                      <input class="form-control border-dark rounded-0
                        border-1 bg-transparent p-3" type="text"
                        placeholder="請輸入標題" aria-label="example"
                        v-model="tempArticle.title">
                    </div>
                    <div class="mb-4">
                      <p class="mb-2 text-black">描述</p>
                      <input class="form-control border-dark rounded-0
                        border-1 bg-transparent p-3" type="text"
                        placeholder="請輸入描述" aria-label="example"
                        v-model="tempArticle.description">
                    </div>
                    <div class="mb-4">
                      <p class="mb-2 text-black">作者</p>
                      <input class="form-control border-dark rounded-0
                        border-1 bg-transparent p-3" type="text"
                        placeholder="請輸入作者" aria-label="example"
                        v-model="tempArticle.author">
                    </div>
                    <div class="mb-4">
                      <p class="mb-2 text-black">標籤</p>
                      <input class="form-control border-dark rounded-0
                        border-1 bg-transparent p-3" type="text"
                        placeholder="請輸入標籤" aria-label="example"
                        v-model="tempArticle.tag">
                    </div>
                    <div class="mb-4">
                      <p class="mb-2 text-black">創建時間</p>
                      <input class="form-control border-dark rounded-0
                        border-1 bg-transparent p-3" type="date" aria-label="example"
                        v-model="create_at">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- modal-footer -->
        <div class="modal-footer d-flex justify-content-between
          p-lg-5 border-top border-black p-3 bg-sm-color">
          <button type="button" class="btn btn-outline-dark rounded-5
            me-3 mb-0 px-lg-5 py-lg-3 px-4 py-2" v-if="isNew === false"
            @click.prevent="$emit('del-article', tempArticle)">刪除</button>
          <p></p>
          <button type="button" class="btn btn-dark rounded-5
          me-3 mb-0 px-lg-5 py-lg-3 px-4 py-2"
          @click.prevent="$emit('update-article', tempArticle)">確認</button>
        </div>
      </div>
    </div>

    <Loading :active="isLoading" />
  </div>
</template>

<script>
import axios from 'axios';
import modalMixin from '@/mixins/modalMixin';
import Editor from '@tinymce/tinymce-vue';

export default {
  components: {
    Editor,
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

  data() {
    return {
      isLoading: false,
      modal: {},
      tempArticle: {},
      create_at: '',
    };
  },

  methods: {
    async uploadFile() {
      try {
        this.isLoading = true;
        const uploadFile = this.$refs.fileInput.files[0];
        const formData = new FormData();
        formData.append('file-to-upload', uploadFile);
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
        const res = await axios.post(api, formData);

        if (res.data.success) {
          this.tempArticle.image = res.data.imageUrl;
          this.isLoading = false;
        }
      } catch (error) {
        console.error('Error', error);
      }
      this.isLoading = false;
    },

    getArticle(id) {
      const routeUrl = this.$router.resolve({
        path: `/article/${id}`,
      });
      window.open(routeUrl.href, '_blank');
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

  emits: ['update-article', 'del-article'],
  mixins: [modalMixin],
};
</script>
