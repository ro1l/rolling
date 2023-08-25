<template>
  <!-- skeleton -->
  <div class="col-12">
    <div class="card mb-4">
      <div class="card-body card-body pt-lg-4 mt-lg-3 py-0 px-lg-5">
        <p class="card-text placeholder-glow mb-6"
          v-for="(item, key) in skeletonNum" :key="key">
          <span class="placeholder col-4 me-lg-4 me-2 h-2"></span>
          <span class="placeholder col-3 me-lg-4 me-2 h-2"></span>
          <span class="placeholder col-2 me-lg-4 me-2 h-2"></span>
          <span class="placeholder col-2 h-2"></span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      skeletonNum: 15,
    };
  },
};
</script>
