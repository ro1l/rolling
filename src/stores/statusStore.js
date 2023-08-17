import { defineStore } from 'pinia';

export default defineStore('statusStore', {
  state: () => ({
    isLoadingForStore: false,
    cartLoadingItem: '',
  }),
});
