import axios from 'axios';
import { defineStore } from 'pinia';
import statusStore from './statusStore';

const status = statusStore();

export default defineStore('productStore', {
  state: () => ({
    // products
    products: [],
    productsPage: [],
    pagination: {},
    productsCategory: [],
    productsType: [],

    // product
    product: {},
    imageUrl: '',
    imagesUrl: [],
    cc: 0,

    // comp
    lgCompProd: [],
    smCompProd: [],

  }),

  actions: {
    async getProducts() {
      status.isLoadingForStore = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;

      try {
        const res = await axios.get(api);
        status.isLoadingForStore = false;

        this.products = res.data.products;
        this.updateProductsCategoryAndType();
        this.scrollToTop();
      } catch (error) {
        console.error('Error 找不到資料:', error);
      }
    },

    async getProductsPage(page = 1) {
      status.isLoadingForStore = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`;

      try {
        const res = await axios.get(api);
        status.isLoadingForStore = false;

        if (res.data.success) {
          this.productsPage = res.data.products;
          this.pagination = res.data.pagination;
          this.scrollToTop();
        }
      } catch (error) {
        console.error('Error fetching paginated products:', error);
      }
    },

    async getProduct(id) {
      status.isLoadingForStore = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;

      try {
        const res = await axios.get(api);
        status.isLoadingForStore = false;

        this.product = res.data.product;
        this.imageUrl = res.data.product.imageUrl;
        this.imagesUrl = res.data.product.imagesUrl;
        this.cc = res.data.product.content.comparison.cc;
      } catch (error) {
        console.error('Error 找不到資料', error);
      }
    },

    setLgCompProd(product) {
      this.updateProductArray(this.lgCompProd, product, 4);
    },

    setSmCompProd(product) {
      this.updateProductArray(this.smCompProd, product, 2);
    },

    updateProductArray(array, product, limit) {
      if (array.length < limit) {
        if (!array.some((p) => p.id === product.id)) {
          array.push(product);
        }
      } else if (!array.some((p) => p.id === product.id)) {
        array.shift();
        array.push(product);
      }
    },

    updateProductsCategoryAndType() {
      this.products.forEach((item) => {
        if (!this.productsCategory.includes(item.category)) {
          this.productsCategory.push(item.category);
        }
        if (!this.productsType.includes(item.content.comparison.type)) {
          this.productsType.push(item.content.comparison.type);
        }
      });
    },

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
});
