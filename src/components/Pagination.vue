<template>
  <nav class="pagination-box" aria-label="Page navigation example">
    <ul>

      <!-- 上一頁 -->
      <li class="pre" v-if="pages.has_pre === true">
        <a href="#" aria-label="Previous"
          @click.prevent="updatePage(pages.current_page - 1)"
          :class="{ 'disabled': pages.has_pre === false }">
          <span aria-hidden="true">上一頁</span>
        </a>
      </li>

      <!-- 總頁數 -->
      <li class="page" v-for="page in pages.total_pages" :key="page"
        :class="{ 'active-page': page === pages.current_page }">
        <a href="#" @click.prevent="updatePage(page)">
          {{ page }}
        </a>
      </li>

      <!-- 下一頁 -->
      <li class="next" v-if="pages.has_next === true">
        <a href="#" aria-label="Next"
          @click.prevent="updatePage(pages.current_page + 1)"
          :class="{ 'disabled': pages.has_next === false }">
          <span aria-hidden="true">下一頁</span>
        </a>
      </li>

    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pages'],

  methods: {
    updatePage(page) {
      this.$emit('emit-pages', page);
      setTimeout(() => {
        window.scrollTo(0, 0);
      });
    },
  },
};
</script>
