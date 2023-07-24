<template>
  <div class="container mt-5">
    <form class="row justify-content-center" @submit.prevent="LogIn()">
      <div class="col-md-6">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="mb-2">
          <label class="sr-only" for="inputEmail">email</label>
          <input class="form-control" type="email" id="inputEmail"
          required autofocus placeholder="請輸入email" autocomplete="current-password"
            v-model="user.username" />
        </div>
        <div class="mb-2">
          <label class="sr-only" for="inputPassword">密碼</label>
          <input type="password" class="form-control" id="inputPassword" required
          autocomplete="current-password" placeholder="請輸入密碼"
            v-model="user.password" />
        </div>
        <div class="text-end mt-4">
          <button class="btn btn-primary btn-block">登入</button>
        </div>
      </div>
    </form>
  </div>
  <Loading :active="isLoading" />
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
