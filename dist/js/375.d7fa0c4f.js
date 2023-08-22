"use strict";(self["webpackChunkrolling"]=self["webpackChunkrolling"]||[]).push([[375],{4238:function(t,o,r){r(7658);var c=r(6154),e=r(9876),a=r(6294);const s=(0,a.Z)();o.Z=(0,e.Q_)("productStore",{state:()=>({products:[],productsPage:[],pagination:{},productsCategory:[],productsType:[],product:{},imageUrl:"",imagesUrl:[],cc:0,lgCompProd:[],smCompProd:[]}),actions:{async getProducts(){this.scrollToTop(),s.isLoadingForStore=!0;const t="https://vue3-course-api.hexschool.io/api/je-api/products/all";try{const o=await c.Z.get(t);s.isLoadingForStore=!1,this.products=o.data.products,this.updateProductsCategoryAndType()}catch(o){console.error("Error 找不到資料:",o)}},async getProductsPage(t=1){this.scrollToTop(),s.isLoadingForStore=!0;const o=`https://vue3-course-api.hexschool.io/api/je-api/admin/products/?page=${t}`;try{const t=await c.Z.get(o);s.isLoadingForStore=!1,t.data.success&&(this.productsPage=t.data.products,this.pagination=t.data.pagination)}catch(r){console.error("Error fetching paginated products:",r)}},async getProduct(t){this.scrollToTop(),s.isLoadingForStore=!0;const o=`https://vue3-course-api.hexschool.io/api/je-api/product/${t}`;try{const t=await c.Z.get(o);s.isLoadingForStore=!1,this.product=t.data.product,this.imageUrl=t.data.product.imageUrl,this.imagesUrl=t.data.product.imagesUrl,this.cc=t.data.product.content.comparison.cc}catch(r){console.error("Error 找不到資料",r)}this.licenseTax(),this.fuelTax()},licenseTax(t){const o=t;return o<=500?1620:o<=600?2160:o<=1200?4320:o<=1800?7120:11230},fuelTax(t){const o=t;return o<=500?900:o<=600?1200:o<=1200?1800:2010},setLgCompProd(t){this.updateProductArray(this.lgCompProd,t,4)},setSmCompProd(t){this.updateProductArray(this.smCompProd,t,2)},updateProductArray(t,o,r){t.length<r?t.some((t=>t.id===o.id))||t.push(o):t.some((t=>t.id===o.id))||(t.shift(),t.push(o))},updateProductsCategoryAndType(){this.products.forEach((t=>{this.productsCategory.includes(t.category)||this.productsCategory.push(t.category),this.productsType.includes(t.content.comparison.type)||this.productsType.push(t.content.comparison.type)}))},scrollToTop(){window.scrollTo({top:0,behavior:"smooth"})}}})},6294:function(t,o,r){var c=r(9876);o.Z=(0,c.Q_)("statusStore",{state:()=>({isLoadingForStore:!1,cartLoadingItem:""})})},7375:function(t,o,r){r.r(o),r.d(o,{default:function(){return T}});var c=r(6252),e=r(9963),a=r(3577);const s={class:"search-box"},i={class:"title"},d=(0,c._)("h1",null,"搜尋",-1),u=(0,c._)("i",{class:"bi bi-x text-deep"},null,-1),n=[u],h={class:"search border-box"},p={class:"search-bar"},l={key:0},g=["checked","onClick"],P={key:1};function y(t,o,r,u,y,m){return(0,c.wg)(),(0,c.iD)("div",s,[(0,c._)("div",i,[d,(0,c._)("button",{onClick:o[0]||(o[0]=(...t)=>m.goBack&&m.goBack(...t))},n)]),(0,c._)("div",h,[(0,c._)("div",p,[(0,c.wy)((0,c._)("input",{class:"border-box",type:"text",id:"search",placeholder:"請輸入車款","onUpdate:modelValue":o[1]||(o[1]=t=>y.cacheProductsSearch=t)},null,512),[[e.nr,y.cacheProductsSearch]]),!y.cacheProductsSearch.length<1?((0,c.wg)(),(0,c.iD)("button",{key:0,class:"text-deep",onClick:o[2]||(o[2]=(...t)=>m.delCacheProductSearch&&m.delCacheProductSearch(...t))}," 移除 ")):(0,c.kq)("",!0)]),y.cacheProductsSearch?((0,c.wg)(),(0,c.iD)("div",l,[((0,c.wg)(!0),(0,c.iD)(c.HY,null,(0,c.Ko)(m.filterProductsSearch.splice(0,3),((t,o)=>((0,c.wg)(),(0,c.iD)("label",{key:t+o},[(0,c._)("p",null,(0,a.zw)(t.title),1),(0,c._)("input",{type:"radio",checked:y.cacheProductArea.title===t.title,onClick:o=>m.getProduct(t.id)},null,8,g)])))),128))])):(0,c.kq)("",!0),y.notFoundData?((0,c.wg)(),(0,c.iD)("p",P,"未找到符合的項目")):(0,c.kq)("",!0)])])}r(7658);var m=r(9876),S=r(4238),k={data(){return{cacheProductsSearch:"",cacheProductArea:"",notFoundData:!1}},computed:{...(0,m.rn)(S.Z,["products"]),filterProductsSearch(){const t=new RegExp(this.cacheProductsSearch,"i");return this.products.filter((o=>o.title.match(t)))}},methods:{...(0,m.nv)(S.Z,["getProducts"]),removeFilterSearch(t){this.cacheProductArea=t,this.cacheProductsSearch=""},delCacheProductSearch(){this.cacheProductsSearch=""},getProduct(t){this.$router.push(`/product/${t}`)},goBack(){return this.$router.go(-1)},updateNotFoundData(){const t=new RegExp(this.cacheProductsSearch,"i");this.notFoundData=0===this.products.filter((o=>o.title.match(t))).length}},watch:{cacheProductsSearch:"updateNotFoundData"},created(){this.getProducts()}},C=r(3744);const w=(0,C.Z)(k,[["render",y]]);var T=w}}]);
//# sourceMappingURL=375.d7fa0c4f.js.map