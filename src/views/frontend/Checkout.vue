<template>

  <LogoNavVue />

  <PageTitle :title="'結帳頁面'" />

  <div class="checkbox-box">
    <div class="order-information">
      <p>訂購人資訊</p>
      <Form class="text-deep"
        v-slot="{ errors }"
        @submit="createOrder">
        <div class="name-phone">
          <div class="name">
            <label for="name" class="form-label">姓名</label>
            <Field autocomplete="off" id="name" name="姓名" type="name" rules="required"
              :class="{ 'is-invalid': errors['姓名'] }" placeholder="請輸入姓名"
              v-model="form.user.name"></Field>
            <error-message name="姓名" class="invalid-feedback"></error-message>
          </div>
          <div class="phone">
            <label for="tel" class="form-label">手機</label>
            <Field autocomplete="off" id="tel" name="手機" type="tel" :rules="isPhone"
              :class="{ 'is-invalid': errors['手機'] }" placeholder="請輸入手機"
              v-model="form.user.tel"></Field>
            <error-message name="手機" class="invalid-feedback"></error-message>
          </div>
        </div>

        <div class="address">
          <label for="address" class="form-label">寄送地址</label>
          <Field autocomplete="off" id="address" name="地址" type="address" :rules="isAddress"
            :class="{ 'is-invalid': errors['地址'] }" placeholder="請輸入寄送地址"
            v-model="form.user.address"></Field>
          <error-message name="地址" class="invalid-feedback"></error-message>
        </div>

        <div class="mail">
          <label for="email" class="form-label">電子郵件</label>
          <Field autocomplete="off" id="email" name="email" type="email" rules="email|required"
            :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入電子郵件"
            v-model="form.user.email"></Field>
          <error-message name="email" class="invalid-feedback"></error-message>
        </div>

        <div class="message">
          <label for="message" class="form-label">備註(選填)</label>
          <textarea name="" id="message" cols="10" rows="1" maxlength="20" placeholder="請輸入備註（限20字）"
            v-model="form.message"></textarea>
        </div>

        <div class="step bg-color">
          <router-link :to="{ name: '購物車' }" class="border-btn text-deep">
            上一步
          </router-link>
          <button class="fill-btn">結帳去</button>
        </div>
      </Form>
    </div>

    <div class="products-information">
      <p>訂單資訊</p>
      <div class="product-box item-underline">
        <div class="product-item"
          v-for="item in cartProducts.carts" :key="item.id">
          <div class="img-box">
            <img :src="item.product.imageUrl" :alt="item.product.title">
          </div>
          <div class="content">
            <p>{{ item.product.category }}</p>
            <p>{{ item.product.title }}</p>
            <p>數量：{{ item.qty }}{{ item.product.unit }}</p>
          </div>
          <div class="price">
            <p>NT${{ $filters.currency(item.final_total) }}</p>
          </div>
        </div>
      </div>
      <div class="total-box">
        <p>
          商品總計
          <span>NT${{ $filters.currency(cartProducts.final_total) }}</span>
        </p>
        <p>
          運費
          <span>免運費</span>
        </p>
        <p class="item-top-line ">
          總計
          <span>NT${{ $filters.currency(cartProducts.final_total) }}</span>
        </p>
      </div>
    </div>
  </div>

  <Loading :active="isLoadingForStore" />
</template>

<script>
import LogoNavVue from '@/components/frontend/LogoNav.vue';
import PageTitle from '@/components/frontend/PageTitle.vue';
import axios from 'axios';
import { mapActions, mapState } from 'pinia';
import cartStore from '@/stores/cartStore';
import statusStore from '@/stores/statusStore';

export default {
  components: {
    LogoNavVue,
    PageTitle,
  },

  data() {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },

  computed: {
    ...mapState(cartStore, ['cartProducts']),
    ...mapState(statusStore, ['isLoadingForStore']),
  },

  methods: {
    ...mapActions(cartStore, ['getCartProducts']),

    async createOrder() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;

      const order = this.form;

      try {
        const res = await axios.post(api, { data: order });

        if (res.data.success) {
          this.$router.push(`/order/${res.data.orderId}`);
        }
      } catch (error) {
        console.error('Error 找不到資料', error);
      }
    },

    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '需要正確的電話號碼';
    },

    isAddress(value) {
      const addressRegex = /(?:(?<city>[^市縣]+[市縣])(?<district>[^市區鄉鎮鄉鎮市區]+[市區鄉鎮鄉鎮市區])?(?<neighborhood>[^村里]+[村里])?(?<lin>[0-9]+[鄰])?(?<street>[^路段]+[路段])?(?<section>[^段]*段)?(?<alley>[0-9]+巷)?(?<lane>[0-9]+弄)?(?<number>[0-9]+號)?(?:-(?<number2>[0-9]+號))?(?<floor>[0-9]+樓)?(?<other>.+)?)/;
      return addressRegex.test(value) ? true : '需要正確的地址';
    },
  },

  created() {
    this.getCartProducts();
  },
};
</script>
