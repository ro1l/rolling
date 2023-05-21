<template>
  <form
  @submit.prevent="LogIn()">
    <label for="inputEmail">email</label>
      <input
      type="email"
      id="inputEmail"
      required
      autofocus
      placeholder="請輸入email"
      autocomplete="current-password"
      v-model="user.username" />
      <hr>
      <label for="inputPassword">密碼</label>
      <input
      type="password"
      id="inputPassword"
      required
      autocomplete="current-password"
      placeholder="請輸入密碼"
      v-model="user.password" />
    <button class="btn btn-info">登入</button>
  </form>
  <Loading
  :active="isLoading"/>
</template>

<script>

export default {
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
    LogIn() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}admin/signin`;
      this.$http.post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            this.isLoading = false;
            const { token, expired } = res.data;
            document.cookie = `rollingToken=${token}; expires=${new Date(expired)}`;
            this.$router.push('/dashboard/products');
          }
        });
    },
  },
};
</script>
