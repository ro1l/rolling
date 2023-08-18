<template>
  <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" ref="toast">
    <div class="toast-body" v-if="msg.content">
      {{ msg.content }}
    </div>
  </div>
</template>

<script>
import Toast from 'bootstrap/js/dist/toast';

export default {
  name: 'Toast',
  props: [
    'msg',
  ],

  mounted() {
    const toastEl = this.$refs.toast;
    const toast = new Toast(toastEl, {
      delay: 3000,
    });
    toast.show();
  },
};
</script>
