<template>
  <div id="carouselExampleDark" class="carousel carousel-dark slide">
    <div class="carousel-indicators">
      <button
        v-for="(item, index) in mergedImagesUrl"
        :key="index"
        type="button"
        :data-bs-target="'#carouselExampleDark'"
        :data-bs-slide-to="index"
        :class="{ active: index === 0 }"
        :aria-current="index === 0 ? 'true' : 'false'"
        :aria-label="'Slide ' + (index + 1)"
      ></button>
    </div>
    <div class="carousel-inner">
      <div
        v-for="(item, index) in mergedImagesUrl"
        :key="index"
        :class="{ 'carousel-item': true, active: index === 0 }"
        :data-bs-interval="10000"
      >
        <img :src="item" class="d-block w-100">
      </div>
    </div>
    <!-- <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleDark"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleDark"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button> -->
  </div>
</template>

<script>
export default {
  props: {
    mergedImagesUrl: {
      typeof: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
.carousel {
  display: none;
}

@media (max-width: 768px) {
  .carousel {
    display: block;
    .carousel-indicators {
      margin-bottom: -20px !important;
    }
  }
}
</style>
