<template>
  <div class="h3 bg-info">結帳頁面</div>
  <div class="container">
    <div class="row mb-5">
      <div class="col-6">
        <Form
        v-slot="{ errors }"
        @submit="createOrder">

          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <Field
            id="email"
            name="email"
            type="email"
            rules="email|required"
            class="form-control"
            :class="{ 'is-invalid': errors['email']}"
            placeholder="請輸入email"
            v-model="form.user.email"
            ></Field>
            <error-message
            name="email"
            class="invalid-feedback"></error-message>
          </div>

          <div class="mb-3">
            <label for="name" class="form-label">收件人姓名</label>
            <Field
            id="name"
            name="姓名"
            type="name"
            rules="required"
            class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入收件人姓名"
            v-model="form.user.name"
            ></Field>
            <error-message
            name="姓名"
            class="invalid-feedback"></error-message>
          </div>

          <div class="mb-3">
            <label for="tel" class="form-label">收件人手機</label>
            <Field
            id="tel"
            name="手機"
            type="tel"
            :rules="isPhone"
            class="form-control"
            :class="{ 'is-invalid': errors['手機'] }"
            placeholder="請輸入收件人手機"
            v-model="form.user.tel"
            ></Field>
            <error-message
            name="手機"
            class="invalid-feedback"></error-message>
          </div>

          <div class="mb-3">
            <label for="address" class="form-label">收件人地址</label>
            <Field
            id="address"
            name="地址"
            type="address"
            :rules="isAddress"
            class="form-control"
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入收件人地址"
            v-model="form.user.address"
            ></Field>
            <error-message
            name="地址"
            class="invalid-feedback"></error-message>
          </div>

          <div class="mb-3">
            <label for="message" class="form-label">備註(選填)</label>
            <textarea name="" id="message" class="form-control" cols="30" rows="6"
            maxlength="100"
            placeholder="請輸入備註（限100字）"
            v-model="form.message"
            ></textarea>
          </div>

          <div class="position-fixed end-0 bottom-0">
            <button class="btn btn-danger">訂單確認</button>
          </div>

        </Form>
      </div>
      <div class="col-6  position-relative">
        <div class="p">訂單資訊</div>
        <template
        v-for="item in cartProducts.carts"
        :key="item.id">
        <table class="table table-borderless">
            <tr>
              <td rowspan="0" style="width: 150px">
                <div style="height: 100px;">
                  <img :src="item.product.imageUrl" alt="">
                </div>
              </td>
              <td>{{ item.product.category }}</td>
              <td></td>
            </tr>
            <tr>
              <td>{{ item.product.title }}</td>
              <td></td>
            </tr>
            <tr>
              <td>顏色（尚未設定）</td>
              <td></td>
            </tr>
            <tr>
              <td>數量：{{ item.qty }}{{ item.product.unit }}</td>
              <td>NT${{ $filters.currency(item.final_total) }}</td>
            </tr>
          </table>
        </template>
        <table class="table table-borderless">
          <tfoot>
            <tr class="border-top">
              <td class="text-end">商品總計</td>
              <td class="text-end">NT${{ $filters.currency(cartProducts.final_total) }}</td>
            </tr>
            <tr  class="border-bottom">
              <td class="text-end">運費</td>
              <td class="text-end text-success">免運費</td>
            </tr>
            <tr  class="border-bottom">
              <td class="text-end">總計</td>
              <td class="text-end">NT${{ $filters.currency(cartProducts.final_total) }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartProducts: {},
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
  methods: {
    getCartProducts() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false;
          this.cartProducts = res.data.data;
        });
    },
    createOrder() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
      const order = this.form;
      this.$http.post(api, { data: order })
        .then((res) => {
          if (res.data.success) {
            this.$router.push(`/order/${res.data.orderId}`);
          }
        });
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
