<template>
  <div class="modal" tabindex="-1"
  ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">新增/修改文章</h5>
          <button type="button" class="btn-close"
          data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col-6">
                <label for="customFile">上傳圖片</label>
                <input type="file" id="customFile"
                ref="fileInput"
                @change="uploadFile">
                <div class="mb-2">
                  <img
                  :src="tempArticle.image" alt=""
                  v-if="tempArticle.image">
                  <span v-else>沒有圖片</span>
                </div>
              </div>
              <div class="col-6">
                <div class="mb-3">
                  <label for="title">標題</label>
                  <input type="text" id="title"
                  v-model="tempArticle.title" placeholder="請輸入標題">
                </div>
                <div class="mb-2">
                  <label for="description">描述</label>
                  <input type="text" id="description"
                  placeholder="請輸入描述"
                  v-model="tempArticle.description">
                  <div class="mb-3">
                    <label for="author">作者</label>
                    <input type="text" id="author"
                    v-model="tempArticle.author" placeholder="請輸入作者">
                  </div>
                  <div class="mb-3">
                    <label for="tag">標籤</label>
                    <input type="text" id="tag"
                    v-model="tempArticle.tag" placeholder="請輸入標籤">
                  </div>
                  <div class="mb-3">
                    <label for="create_at">創建時間</label>
                    <input type="date" id="create_at"
                    v-model="create_at">
                  </div>
                  <div class="mb-3">
                    <label for="isPublic">是否公開</label>
                    <input type="checkbox" id="isPublic"
                    :true-value="true"
                    :false-value="false"
                    v-model="tempArticle.isPublic">
                  </div>
                </div>
              </div>
            </div>
          </div>
            <!-- <CKEditor
            :editor="editor"
            :config="editorConfig"
            v-model="tempArticle.content"/> -->
            <Editor
            api-key="v9qd6mo7pj1ij6ci3z7691b9kd3fjj2bc9km9xgru539dsyt"
            :init="{
              // height: 500,
              menubar: false,
              plugins: [
                // 'advlist autolink lists link image charmap print preview anchor',
                // 'searchreplace visualblocks code fullscreen',
                // 'insertdatetime media table paste code help wordcount'
              ],
              toolbar_mode: 'wrap',
              toolbar:
                'undo redo | blocks formatselect fontsize fontfamily | \
                bold italic backcolor underline | \
                alignleft aligncenter alignright alignjustify | \
                fontsizeselect bullist numlist outdent indent | removeformat'
            }"
            v-model="tempArticle.content"/>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary"
          @click="$emit('update-article', tempArticle)">確定</button>
        </div>
      </div>
    </div>
    <Loading
    :active="isLoading"/>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';
// import CKEditor from '@ckeditor/ckeditor5-vue';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Editor from '@tinymce/tinymce-vue';

export default {
  data() {
    return {
      isLoading: false,
      modal: {},
      tempArticle: {},
      create_at: '',
      // editor: ClassicEditor,
      // editorConfig: {
      //   toolbar: ['heading', '|', 'bold', 'italic',
      // 'blockQuote', '|', 'link', 'insertTable', '|', 'undo', 'redo'],
      //   heading: {
      //     options: [
      //       { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
      //       {
      //         model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2',
      //       },
      //       {
      //         model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3',
      //       },
      //       {
      //         model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4',
      //       },
      //     ],
      //   },
      // },
    };
  },
  props: {
    article: {
      type: Object,
      default() { return {}; },
    },
  },
  components: {
    // CKEditor: CKEditor.component,
    Editor,
  },
  emits: ['update-article'],
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
