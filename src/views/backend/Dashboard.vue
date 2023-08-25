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
import axios from 'axios';
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

  methods: {
    async LogOut() {
      try {
        this.isLoading = true;
        const api = `${process.env.VUE_APP_API}logout`;
        const res = await axios.post(api, this.user);

        if (res.data.success) {
          this.isLoading = false;
          this.$router.push('/r');
        }
      } catch (error) {
        console.error('Logout Error:', error);
        this.isLoading = false;
      }
      this.isLoading = false;
    },
  },

  async created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)rollingToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = token;

    const api = `${process.env.VUE_APP_API}api/user/check`;
    try {
      const res = await axios.post(api, this.user);

      if (!res.data.success) {
        this.$router.push('/r');
      }
    } catch (error) {
      console.error('Error:', error);
      this.$router.push('/r');
    }
  },

  provide() {
    return {
      emitter,

      pushMessageState,
    };
  },

};
</script>
