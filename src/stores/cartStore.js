import pushMessageState from '@/methods/pushMessageState';
import emitter from '@/methods/emitter';
import axios from 'axios';
import { defineStore } from 'pinia';
import statusStore from './statusStore';

const status = statusStore();

export default defineStore('cartStore', {
  state: () => ({

    cartProducts: {},
    cartProductsData: [],
    status: {
      loadingItem: '',
    },

  }),

  actions: {

    async addCart(id) {
      status.cartLoadingItem = id;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;

      const cart = {
        product_id: id,
        qty: 1,
      };

      try {
        const res = await axios.post(api, { data: cart });
        status.cartLoadingItem = '';

        pushMessageState(res);
        emitter.emit('updateCart');
      } catch (error) {
        console.error('Error 找不到資料', error);
      }
    },

    async getCartProducts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;

      try {
        const res = await axios.get(api);

        this.cartProducts = res.data.data;
        this.cartProductsData = res.data.data.carts;
      } catch (error) {
        console.error('Error 找不到資料', error);
      }
    },

    async updateCart(item, qty) {
      status.isLoadingForStore = true;
      status.cartLoadingItem = item.id;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;

      const cart = {
        product_id: item.product_id,
        qty,
      };

      try {
        const res = await axios.put(api, { data: cart });
        status.isLoadingForStore = false;
        status.cartLoadingItem = '';

        this.getCartProducts();
        pushMessageState(res);
        emitter.emit('updateCart');
      } catch (error) {
        console.error('Error 找不到資料', error);
      }
    },

    async delProduct(id) {
      status.cartLoadingItem = id;
      status.isLoadingForStore = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;

      try {
        const res = await axios.delete(api);
        status.isLoadingForStore = false;
        status.cartLoadingItem = '';

        this.getCartProducts();
        pushMessageState(res);
        emitter.emit('updateCart');
      } catch (error) {
        console.error('Error 找不到資料', error);
      }
    },

    async addCouponCode(couponCode) {
      status.isLoadingForStore = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;

      const coupon = {
        code: couponCode,
      };

      let res;

      try {
        res = await axios.post(api, { data: coupon });
        status.isLoadingForStore = false;

        this.getCartProducts();
      } catch (error) {
        console.error('Error 找不到資料', error);
      } finally {
        pushMessageState(res);
      }
    },

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
});
