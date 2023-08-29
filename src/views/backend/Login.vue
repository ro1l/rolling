<template>
  <div class="vh-100 w-100 m-0 p-0">
    <div class="container d-flex justify-content-center align-items-center vh-100">
      <form class="form-card bg-white"
        @submit="LogIn()">
        <div class="mb-5 text-center">
          <div class="logo">Rolling</div>
        </div>
        <div class="mb-4">
          <input type="email" class="form-control p-3 bg-gray-white"
            placeholder="email"
            v-model="user.username"
            autocomplete="email">
        </div>
        <div class="mb-5">
          <input type="password" class="form-control p-3 bg-gray-white"
            placeholder="password"
            v-model="user.password"
            autocomplete="current-password">
        </div>
        <button type="submit" class="btn btn-dark w-100 mt-5 py-2 rounded-0">登入</button>
      </form>
    </div>
  </div>

  <ToastList />

  <Loading :active="isLoading" />
</template>

<script>
import axios from 'axios';
import pushMessageState from '@/methods/pushMessageState';
import ToastList from '@/components/ToastList.vue';
import emitter from '@/methods/emitter';

export default {
  components: {
    ToastList,
  },

  data() {
    return {
      isLoading: false,
      user: {
        username: '',
        password: '',
      },
    };
  },

  methods: {
    async LogIn() {
      try {
        this.isLoading = true;
        const api = `${process.env.VUE_APP_API}admin/signin`;
        const res = await axios.post(api, this.user);

        if (res.data.success) {
          this.isLoading = false;
          const { token, expired } = res.data;
          const expirationDate = new Date(expired);
          document.cookie = `rollingToken=${token}; expires=${expirationDate}`;
          this.$router.push('/dashboard/products');
          pushMessageState(res);
        }
        pushMessageState(res);
      } catch (error) {
        console.error('Login Error:', error);
        this.isLoading = false;
      }
      this.isLoading = false;
    },
  },

  provide() {
    return {
      emitter,
      pushMessageState,
    };
  },
};
</script>
