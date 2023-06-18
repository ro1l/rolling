import { defineStore } from 'pinia';

export default defineStore('product', {
  state: () => ({
    product: [],
  }),
  actions: {
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
  },
});
