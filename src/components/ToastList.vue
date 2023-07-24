<template>
  <div class="toast-container">
    <Toast v-for="(msg, key) in messages" :key="key" :msg="msg"/>
  </div>
</template>

<script>
import Toast from './Toast.vue';

export default {
  data() {
    return {
      messages: [],
    };
  },
  components: {
    Toast,
  },
  inject: ['emitter'],
  mounted() {
    this.emitter.on('push-message', (message) => {
      const { style = 'success', title, content } = message;
      this.messages.push({ style, title, content });
    });
  },
};
</script>
