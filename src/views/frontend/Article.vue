<template>
    <div class="h3 bg-info">單一文章列表</div>
    {{ article.title }} <br>
    {{ article.content }} <br>
    {{ $filters.date(article.create_at) }} <br>
    {{ article.description }} <br>
    {{ article.author }} <br>
    <img style="width : 400px ; height : 200px ; object-fit : cover; flex : 1 ;"
    class="card-img-top p-2"
    :src="article.image">
</template>

<script>
export default {
  data() {
    return {
      id: '',
      article: {},
    };
  },
  methods: {
    getArticle() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/article/${this.id}`;
      this.$http.get(api)
        .then((res) => {
          this.article = res.data.article;
        });
    },
  },
  created() {
    this.id = this.$route.params.articleId;
    this.getArticle();
  },
};
</script>
