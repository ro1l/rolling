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
    lgProducts: [],
    smProducts: [],

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
        }
        this.scrollToTop();
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
        this.scrollToTop();
      } catch (error) {
        console.error('Error 找不到資料', error);
      }

      this.licenseTax();
      this.fuelTax();
    },

    licenseTax(cc) {
      const license = cc;
      if (license <= 500) {
        return 1620;
      }
      if (license <= 600) {
        return 2160;
      }
      if (license <= 1200) {
        return 4320;
      }
      if (license <= 1800) {
        return 7120;
      }
      return 11230;
    },

    fuelTax(cc) {
      const fuel = cc;
      if (fuel <= 500) {
        return 900;
      }
      if (fuel <= 600) {
        return 1200;
      }
      if (fuel <= 1200) {
        return 1800;
      }
      return 2010;
    },

    setLgCompProd(product) {
      this.updateProductArray(this.lgProducts, product, 4);
    },

    setSmCompProd(product) {
      this.updateProductArray(this.smProducts, product, 2);
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
