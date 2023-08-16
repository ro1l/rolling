<template>

  <div class="d-lg-none">
    <div class="row">
      <div class="col-12 px-4 py-2 fixed-bottom d-flex justify-content-end z-4">
        <button class="btn btn-base rounded-3
        me-1" type="button" data-bs-toggle="collapse"
        data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"
        @click="toggleOffcanvas">
          <i class="bi bi-list fs-2"
          v-if="isMenuOpen === false"></i>
          <i class="bi bi-x-lg fs-2"
          v-if="isMenuOpen === true"></i>
        </button>
      </div>
    </div>
    <div class="collapse z-1 fixed-top" id="collapseExample"
    :class="{ show: isMenuOpen }">
      <div class="container vh-100 w-100 p-5">
        <ul class="navbar-nav text-black">
          <li class="nav-item nav-item-das mb-4">
            <router-link :to="{ name: 'home' }" class="logo text-deep
            border-dark">Rolling</router-link>
          </li>
          <li class="nav-item nav-item-das mb-4">
            <router-link class="nav-link d-flex align-items-center
          fs-5 p-0 m-0 font-family-taipei"
            :to="{ name: '產品' }"
            >
            產品</router-link>
          </li>
          <li class="nav-item nav-item-das mb-4">
            <router-link class="nav-link d-flex align-items-center
          fs-5 p-0 m-0 font-family-taipei" :to="{ name: '訂單' }">
            訂單</router-link>
          </li>
          <li class="nav-item nav-item-das mb-4">
            <router-link class="nav-link d-flex align-items-center
          fs-5 p-0 m-0 font-family-taipei" :to="{ name: '優惠券' }">
            優惠券</router-link>
          </li>
          <li class="nav-item nav-item-das mb-4">
            <router-link class="nav-link d-flex align-items-center
          fs-5 p-0 m-0 font-family-taipei" :to="{ name: '文章' }">
            文章</router-link>
          </li>
          <li class="nav-item nav-item-das mb-4">
            <a class="nav-link d-flex align-items-center
          fs-5 p-0 m-0 font-family-taipei" href="#" @click.prevent="LogOut">
            登出</a>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="container-fluid text-black">
    <div class="row p-0">
      <div class="col-lg-3 d-none d-lg-block m-0 p-0">
        <div class="container w-100 sticky-top vh-100 m-0 px-0">
          <div class="card border-0 border-end border-black h-75 ps-2">
            <div class="card-header px-4 pt-4 pb-2 bg-transparent border-0 mb-0">
              <h5 class="offcanvas-title" id="offcanvasExampleLabel">
              <router-link :to="{ name: 'home' }" class="logo text-deep
              border-dark">Rolling</router-link></h5>
            </div>
            <div class="card-body ps-4 pe-5">
              <ul class="navbar-nav mt-1">
                <li class="nav-item mb-4">
                  <router-link class="nav-link d-flex align-items-center
                fs-5 p-0 m-0 font-family-taipei"
                  :to="{ name: '產品' }"
                  >
                  產品</router-link>
                </li>
                <li class="nav-item mb-4">
                  <router-link class="nav-link d-flex align-items-center
                fs-5 p-0 m-0 font-family-taipei" :to="{ name: '訂單' }">
                  訂單</router-link>
                </li>
                <li class="nav-item mb-4">
                  <router-link class="nav-link d-flex align-items-center
                fs-5 p-0 m-0 font-family-taipei" :to="{ name: '優惠券' }">
                  優惠券</router-link>
                </li>
                <li class="nav-item mb-4">
                  <router-link class="nav-link d-flex align-items-center
                fs-5 p-0 m-0 font-family-taipei" :to="{ name: '文章' }">
                  文章</router-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="card border-0 border-end border-black h-25 ps-2">
            <div class="card-body ps-4 pe-5 align-items-end d-flex">
              <ul class="navbar-nav mt-1">
                <li class="nav-item mb-4">
                  <a class="nav-link d-flex align-items-center
              fs-5 p-0 m-0 router-link" href="#" @click.prevent="LogOut">
                  Log out</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-9">
        <ToastList />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';
import pushMessageState from '@/methods/pushMessageState';
import ToastList from '@/components/ToastList.vue';

export default {
  components: {
    ToastList,
  },
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
    toggleOffcanvas() {
      this.isMenuOpen = !this.isMenuOpen;
      this.isOffcanvasOpen = !this.isOffcanvasOpen;
      if (this.isOffcanvasOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    },
  },
  watch: {
    $route() {
      this.isMenuOpen = false;
      document.body.style.overflow = 'auto';
    },
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)rollingToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = token;

    const api = `${process.env.VUE_APP_API}api/user/check`;
    this.$http.post(api, this.user)
      .then((res) => {
        if (!res.data.success) {
          this.$router.push('/r');
        }
      });
  },
  provide() {
    return {
      emitter,
      pushMessageState,
    };
  },
};
</script>
