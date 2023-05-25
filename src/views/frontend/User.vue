<template>
  <Navbar/>
  <routerView/>
  <ToastList/>
</template>

<script>
import Navbar from '@/components/frontend/Navbar.vue';
import emitter from '@/methods/emitter';
import pushMessageState from '@/methods/pushMessageState';
import ToastList from '@/components/ToastList.vue';

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
  },
};
</script>
