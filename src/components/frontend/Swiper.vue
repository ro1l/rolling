<template>
  <div id="carouselExampleDark" class="carousel carousel-dark slide"
  data-bs-ride="carousel"  data-bs-touch="true" data-bs-interval="5000"
  ref="carousel">
    <div class="carousel-indicators">
      <button v-for="(item, index) in mergedImagesUrl" :key="index" type="button"
        :data-bs-target="'#carouselExampleDark'"
        :data-bs-slide-to="index"
        :class="{ active: index === 0 }"
        :aria-current="index === 0 ? 'true' : 'false'"
        :aria-label="'Slide ' + (index + 1)">
      </button>
    </div>
    <div class="carousel-inner">
      <div v-for="(item, index) in mergedImagesUrl"
        :key="index"
        :class="{ 'carousel-item': true, active: index === 0 }"
        :data-bs-interval="10000">
        <img :src="item" class="d-block w-100">
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from 'bootstrap/js/dist/carousel';

export default {
  // name: carousel,

  data() {
    return {
      carousel: {},
    };
  },

  props: {
    mergedImagesUrl: {
      typeof: Array,
    },
  },

  mounted() {
    this.carousel = new Carousel(this.$refs.carousel);
  },
};
</script>
