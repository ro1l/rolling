<template>
  <div class="page-title-sm">
    <p>{{ title }}</p>
    <p v-if="content">
      /{{ content }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    content: String,
  },
};
</script>
