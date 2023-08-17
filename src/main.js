import { createApp } from 'vue';
// Pinia
import { createPinia } from 'pinia';
// axios
import axios from 'axios';
import VueAxios from 'vue-axios';
// 讀取效果
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// 匯入 vee-validate 主套件
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
// 匯入 vee-validate 相關規則
import { required, email, min } from '@vee-validate/rules';
// 匯入多國語系的功能
import { localize, setLocale } from '@vee-validate/i18n';
// 匯入繁體中文語系檔案
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import { currency, date } from './methods/filters';
import App from './App.vue';
import router from './router';

// 定義驗證規則
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
// 設定 vee-validate 全域規則
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});
// 設定預設語系
setLocale('zh_TW');

const pinia = createPinia();
const app = createApp(App);

app.config.globalProperties.$filters = {
  currency, date,
};

// axios 全域設定
// 使用方式 this.$axios
// app.config.globalProperties.$axios = axios;

app.component('Loading', Loading);
app.use(VueAxios, axios);
// 註冊 vee-validate 三個全域元件
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);
app.use(pinia);
app.use(router);
app.mount('#app');
