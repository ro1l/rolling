<template>
  <div class="h3 bg-info">文章總覽</div>

      <div class="col-md-8 px-5 mb-5">
        <div class="row row-cols-1 row-cols-md-3 g-4">
            <!-- 單一項目 -->
            <div class="col"
            v-for="item in articles"
            :key="item.id">
              <div class="card h-100">
                  <img style="width : 400px ; height : 200px ; object-fit : cover; flex : 1 ;"
                  class="card-img-top p-2"
                  :src="item.image">
                <div class="card-body">
                  <h5 class="card-title">{{ item.title }}</h5>
                  <p class="card-text">{{ item.description }}</p>
                  <button class="btn btn-danger"
                  @click="getArticle(item.id)">查看更多</button>
                </div>
              </div>
            </div>

        </div>
      </div>
  <Loading
  :active="isLoading"/>
</template>

<script>
export default {
  data() {
    return {
      articles: {},
      pagination: {},
      isLoading: false,
    };
  },
  methods: {
    getArticles(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/articles/?page=${page}`;
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false;
          this.articles = res.data.articles;
          this.pagination = res.data.pagination;
        });
    },
    getArticle(id) {
      this.$router.push(`/article/${id}`);
    },
  },
  created() {
    this.getArticles();
  },
};
</script>
