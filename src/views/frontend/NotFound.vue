<template>
  <div class="not-found-box">
    <div class="not-found">
      <h1 class="text-deep">404</h1>
      <p>很抱歉，此頁面已消失，將在 <span class="text-deep">{{ countdown }}</span> 秒後導向首頁</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      countdown: 8,
      timer: null,
    };
  },
  mounted() {
    this.startCountdown();
  },
  methods: {
    startCountdown() {
      this.timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown -= 1;
        } else {
          clearInterval(this.timer);
          this.$router.push('/');
        }
      }, 1000);
    },
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>
