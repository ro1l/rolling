<template>
  <div class="h-80"></div>
  <Navbar
  v-if="!$route.meta.hideComponent"/>
  <routerView/>
  <Footer
  v-if="!$route.meta.hideComponent && !$route.meta.hideFooter"/>
  <ToastList/>
</template>

<style lang="scss">
.h-80{
  margin-top: 80px;
  background: #fff;
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
