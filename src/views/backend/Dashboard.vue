<template>
  <NavbarSm />

  <div class="container-fluid text-black">
    <div class="row p-0">
      <NavbarLg />
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
import NavbarSm from '@/components/backend/NavbarSm.vue';
import NavbarLg from '@/components/backend/NavbarLg.vue';

export default {
  components: {
    ToastList,
    NavbarSm,
    NavbarLg,
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
