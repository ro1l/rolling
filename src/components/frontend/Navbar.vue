<template>
  <nav class="navbar navbar-expand-lg">
    <h1 class="logo"><router-link :to="{ name: 'home' }">Rolling</router-link></h1>
    <ul>
      <li>
        <router-link class="router-link" :to="{ name: '所有產品' }">所有產品</router-link>
      </li>
      <li>
        <router-link class="router-link" :to="{ name: '車款比較' }">車款比較</router-link>
      </li>
      <li>
        <router-link class="router-link" :to="{ name: '文章總覽' }">文章總覽</router-link>
      </li>
      <li>
        <router-link class="router-link" :to="{ name: '購物車' }">購物車</router-link>
      </li>
    </ul>
  </nav>
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
</script>
