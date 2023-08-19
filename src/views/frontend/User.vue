<template>
  <div class="h-80"></div>

  <Navbar v-if="!$route.meta.hideComponent" />

  <routerView />

  <Footer v-if="!$route.meta.hideComponent && !$route.meta.hideFooter" />

  <ToastList />
</template>

<script>
import emitter from '@/methods/emitter';
import pushMessageState from '@/methods/pushMessageState';
import ToastList from '@/components/ToastList.vue';
import Navbar from '@/components/frontend/Navbar.vue';
import Footer from '@/components/frontend/Footer.vue';

export default {
  components: {
    Navbar,
    ToastList,
    Footer,
  },

  provide() {
    return {
      emitter,
      pushMessageState,
    };
  },
};
</script>
