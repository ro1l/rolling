import axios from 'axios';
import { defineStore } from 'pinia';

export default defineStore('product', {
  state: () => ({
    product: [],
    resizeProduct: [],
    products: [],
  }),
  actions: {
    getProducts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      axios.get(api)
        .then((res) => {
          this.products = res.data.products;
        });
    },
    setProduct(product) {
      if (this.product.length < 4) {
        // 檢查新產品是否已存在於 product 陣列中
        if (!this.product.some((p) => p.id === product.id)) {
          this.product.push(product);
        }
      } else if (!this.product.some((p) => p.id === product.id)) {
        // 刪除第一個產品並添加新產品到末尾
        this.product.shift();
        this.product.push(product);
      }
    },
    setProductRWD(product) {
      if (this.resizeProduct.length < 2) {
        // 檢查新產品是否已存在於 product 陣列中
        if (!this.resizeProduct.some((p) => p.id === product.id)) {
          this.resizeProduct.push(product);
        }
      } else if (!this.resizeProduct.some((p) => p.id === product.id)) {
        // 刪除第一個產品並添加新產品到末尾
        this.resizeProduct.shift();
        this.resizeProduct.push(product);
      }
    },
  },
});
