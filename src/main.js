import { createApp } from 'vue';
// axios
import axios from 'axios';
import VueAxios from 'vue-axios';
// 讀取效果
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { currency, date } from './methods/filters';

import App from './App.vue';
import router from './router';

const app = createApp(App);
app.config.globalProperties.$filters = {
  currency, date,
};
app.component('Loading', Loading);
app.use(VueAxios, axios);
app.use(router);
app.mount('#app');
