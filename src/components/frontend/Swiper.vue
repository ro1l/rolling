<template>
  <div id="carouselExampleDark" class="carousel carousel-dark slide"
  data-bs-ride="carousel" data-bs-touch="true" data-bs-interval="5000"
  ref="carousel">
    <div class="carousel-indicators">
      <button v-for="(item, key) in mergedImagesUrl" :key="key" type="button"
        :data-bs-target="'#carouselExampleDark'"
        :data-bs-slide-to="key"
        :class="{ active: key === 0 }"
        :aria-current="key === 0 ? 'true' : 'false'"
        :aria-label="'Slide ' + (key + 1)">
      </button>
    </div>
    <div class="carousel-inner">
      <div v-for="(item, key) in mergedImagesUrl"
        :key="key"
        :class="{ 'carousel-item': true, active: key === 0 }"
        :data-bs-interval="10000">
        <img :src="item" class="d-block w-100" :alt="'副圖'">
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from 'bootstrap/js/dist/carousel';

export default {

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
