<template>
  <Navbar/>
  <div class="container-fluid">
    <ToastList/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/backend/Navbar.vue';
import emitter from '@/methods/emitter';
import ToastList from '@/components/ToastList.vue';
import pushMessageState from '@/methods/pushMessageState';

export default {
  provide() {
    return {
      emitter,
      pushMessageState,
    };
  },
  components: {
    ToastList,
    Navbar,
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
};
</script>
