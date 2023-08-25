<template>
  <div class="col-lg-3 d-none d-lg-block m-0 p-0">
    <div class="container w-100 sticky-top vh-100 m-0 px-0">
      <div class="card border-0 border-end border-black h-75 ps-2">

        <!-- Logo -->
        <div class="card-header px-4 pt-4 pb-2 bg-transparent border-0 mb-0">
          <h5 class="offcanvas-title" id="offcanvasExampleLabel">
            <router-link :to="{ name: 'home' }"
              class="logo text-deep border-dark">
              Rolling
            </router-link>
          </h5>
        </div>

        <!-- 導覽列 -->
        <div class="card-body ps-4 pe-5">
          <ul class="navbar-nav mt-1">
            <li class="nav-item mb-4">
              <router-link :to="{ name: '產品' }"
                class="nav-link d-flex align-items-center fs-5 p-0 m-0 font-family-taipei">
                產品</router-link>
            </li>
            <li class="nav-item mb-4">
              <router-link :to="{ name: '訂單' }"
                class="nav-link d-flex align-items-center fs-5 p-0 m-0 font-family-taipei">
                訂單
              </router-link>
            </li>
            <li class="nav-item mb-4">
              <router-link :to="{ name: '優惠券' }"
                class="nav-link d-flex align-items-center fs-5 p-0 m-0 font-family-taipei">
                優惠券
              </router-link>
            </li>
            <li class="nav-item mb-4">
              <router-link :to="{ name: '文章' }"
                class="nav-link d-flex align-items-center fs-5 p-0 m-0 font-family-taipei">
                文章
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <!-- 登出 -->
      <div class="card border-0 border-end border-black h-25 ps-2">
        <div class="card-body ps-4 pe-5 align-items-end d-flex">
          <ul class="navbar-nav mt-1">
            <li class="nav-item mb-4">
              <a class="nav-link d-flex align-items-center fs-5 p-0 m-0 router-link"
                href="#"
                @click.prevent="LogOut">
                Log out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

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
