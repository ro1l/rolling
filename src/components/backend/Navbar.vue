<template>
  <nav class="navbar bg-dark navbar-expand-lg sticky-top" data-bs-theme="dark">
    <div class="container-fluid">
      <a class="navbar-brand me-5">
        後台管理
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: '產品' }">產品</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: '訂單' }">訂單</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: '優惠券' }">優惠券</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: '文章' }">文章</router-link>
          </li>
          <li class="nav-item">
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="logout">登出</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <Loading
  :active="isLoading"/>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    LogOut() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}logout`;
      this.$http.post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            this.isLoading = false;
            this.$router.push('/r');
          }
        });
    },
  },
};
</script>
