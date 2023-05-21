<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <h1 class="logo">Rolling</h1>
    <ul>
      <li>
        <router-link class="router-link" :to="{ name: '產品' }">產品</router-link>
      </li>
      <li>
        <router-link class="router-link" :to="{ name: '訂單' }">訂單</router-link>
      </li>
      <li>
        <router-link class="router-link" :to="{ name: '優惠券' }">優惠券</router-link>
      </li>
      <li>
        <router-link class="router-link" :to="{ name: '文章' }">文章</router-link>
      </li>
      <li>
        <a href="#"
        @click.prevent="LogOut()">登出</a>
      </li>
    </ul>
  </nav>
  <Loading
  :active="isLoading"/>
</template>

<style lang="scss" scoped>
nav {
  display: flex;
  width: 100%;
  height: 60px;
  background: #00000061;
  ul {
    list-style-type: none;
    padding-left: 0;
    display: flex;
    width: 60%;
    height: 100%;
    li {
      text-align: center;
      width: 100%;
      a {
        text-decoration: none;
        color: black;
        display: inline-block;
        width: 100%;
        height: 100%;
        &:hover {
          background: black;
          color: white;
        }
      }
    }
  }
}
</style>

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
