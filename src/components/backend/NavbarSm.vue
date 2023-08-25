<template>
  <div class="d-lg-none">
    <div class="row">

      <!-- RWD 導覽列按鈕 -->
      <div class="col-12 py-3 fixed-bottom d-flex justify-content-end z-4">
        <button class="btn btn-dark rounded-0 me-4 me-1"
          type="button" data-bs-toggle="collapse"
          data-bs-target="#collapseExample" aria-expanded="false"
          aria-controls="collapseExample"
          @click.prevent="toggleMenu">
          <i class="bi bi-list fs-2" v-if="isMenuOpen === false"></i>
          <i class="bi bi-x-lg fs-2" v-if="isMenuOpen === true"></i>
        </button>
      </div>
    </div>

      <!-- RWD 導覽列頁面 -->
      <div class="collapse z-1 fixed-top" id="collapseExample"
      :class="{ show: isMenuOpen }">
      <div class="container vh-100 w-100 p-5 bg-dark">
        <ul class="navbar-nav text-black">
          <li class="nav-item mb-4">
            <router-link :to="{ name: 'home' }"
              class="logo text-white border-white">
              Rolling
            </router-link>
          </li>
          <li class="nav-item mb-4">
            <router-link :to="{ name: '產品' }"
              class="nav-link text-white d-flex align-items-center fs-5 p-0 m-0 font-family-taipei">
              產品
            </router-link>
          </li>
          <li class="nav-item mb-4">
            <router-link :to="{ name: '訂單' }"
              class="nav-link text-white d-flex align-items-center fs-5 p-0 m-0 font-family-taipei">
              訂單
            </router-link>
          </li>
          <li class="nav-item mb-4">
            <router-link :to="{ name: '優惠券' }"
              class="nav-link text-white d-flex align-items-center fs-5 p-0 m-0 font-family-taipei">
              優惠券
            </router-link>
          </li>
          <li class="nav-item mb-4">
            <router-link :to="{ name: '文章' }"
              class="nav-link text-white d-flex align-items-center fs-5 p-0 m-0 font-family-taipei">
              文章
            </router-link>
          </li>
          <li class="nav-item mb-4">
            <a class="nav-link text-white d-flex align-items-center fs-5 p-0 m-0 font-family-taipei"
              href="#"
              @click.prevent="LogOut">
              登出
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
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

    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },

  watch: {
    $route() {
      this.isMenuOpen = false;
      document.body.style.overflow = 'auto';
    },
  },
};
</script>
