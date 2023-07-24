<template>
  <Navbar
  v-if="!$route.meta.hideComponent"/>
  <routerView/>
  <Footer
  v-if="!$route.meta.hideComponent"/>
  <ToastList/>
</template>

<style lang="scss">
body{
  margin-top: 80px;
}
</style>

<script>
import Navbar from '@/components/frontend/Navbar.vue';
import emitter from '@/methods/emitter';
import pushMessageState from '@/methods/pushMessageState';
import ToastList from '@/components/ToastList.vue';
import Footer from '@/components/frontend/Footer.vue';

export default {
  provide() {
    return {
      emitter,
      pushMessageState,
    };
  },
  components: {
    Navbar,
    ToastList,
    Footer,
  },
};
</script>
