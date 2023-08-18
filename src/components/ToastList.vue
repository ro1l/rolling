<template>
  <div class="toast-container">
    <Toast v-for="(msg, key) in messages" :key="key" :msg="msg" />
  </div>
</template>

<script>
import Toast from './Toast.vue';

export default {
  components: {
    Toast,
  },

  data() {
    return {
      messages: [],
    };
  },

  mounted() {
    this.emitter.on('push-message', (message) => {
      const { style = 'success', title, content } = message;
      this.messages.push({ style, title, content });
    });
  },

  inject: ['emitter'],
};
</script>
