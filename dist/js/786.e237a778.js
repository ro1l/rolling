"use strict";(self["webpackChunkrolling"]=self["webpackChunkrolling"]||[]).push([[786],{5679:function(t,r,e){function o(t){return{all:t=t||new Map,on:function(r,e){var o=t.get(r);o?o.push(e):t.set(r,[e])},off:function(r,e){var o=t.get(r);o&&(e?o.splice(o.indexOf(e)>>>0,1):t.set(r,[]))},emit:function(r,e){var o=t.get(r);o&&o.slice().map((function(t){t(e)})),(o=t.get("*"))&&o.slice().map((function(t){t(r,e)}))}}}e.d(r,{Z:function(){return a}});const s=o();var a=s},7587:function(t,r,e){e.d(r,{Z:function(){return s}});var o=e(5679);function s(t,r="更新"){const e="string"===typeof t.data.message?[t.data.message]:t.data.message;t.data.success?o.Z.emit("push-message",{style:"success",title:`${r}成功`,content:e.toString()}):o.Z.emit("push-message",{style:"danger",title:`${r}失敗`,content:e.join("、")})}},9334:function(t,r,e){var o=e(6154),s=e(9876),a=e(6294);const c=(0,a.Z)();r.Z=(0,s.Q_)("articleStore",{state:()=>({articles:[],article:{},pagination:{}}),actions:{async getArticles(t=1){this.scrollToTop(),c.isLoadingForStore=!0;const r=`https://vue3-course-api.hexschool.io/api/je-api/articles/?page=${t}`;try{const t=await o.Z.get(r);c.isLoadingForStore=!1,this.articles=t.data.articles,this.pagination=t.data.pagination}catch(e){console.error("Error 找不到資料",e)}},async getArticle(t){this.scrollToTop();const r=`https://vue3-course-api.hexschool.io/api/je-api/article/${t}`;c.isLoadingForStore=!0;try{c.isLoadingForStore=!1;const t=await o.Z.get(r);this.article=t.data.article}catch(e){console.error("Error 找不到資料",e)}},scrollToTop(){window.scrollTo({top:0,behavior:"smooth"})}}})},4677:function(t,r,e){var o=e(7587),s=e(5679),a=e(6154),c=e(9876),i=e(6294);const l=(0,i.Z)();r.Z=(0,c.Q_)("cartStore",{state:()=>({cartProducts:{},cartProductsData:[],status:{loadingItem:""}}),actions:{async addCart(t){l.cartLoadingItem=t;const r="https://vue3-course-api.hexschool.io/api/je-api/cart",e={product_id:t,qty:1};try{const t=await a.Z.post(r,{data:e});l.cartLoadingItem="",(0,o.Z)(t),s.Z.emit("updateCart")}catch(c){console.error("Error 找不到資料",c)}},async getCartProducts(){const t="https://vue3-course-api.hexschool.io/api/je-api/cart";try{const r=await a.Z.get(t);this.cartProducts=r.data.data,this.cartProductsData=r.data.data.carts}catch(r){console.error("Error 找不到資料",r)}},async updateCart(t,r){l.isLoadingForStore=!0,l.cartLoadingItem=t.id;const e=`https://vue3-course-api.hexschool.io/api/je-api/cart/${t.id}`,c={product_id:t.product_id,qty:r};try{const t=await a.Z.put(e,{data:c});l.isLoadingForStore=!1,l.cartLoadingItem="",this.getCartProducts(),(0,o.Z)(t),s.Z.emit("updateCart")}catch(i){console.error("Error 找不到資料",i)}},async delProduct(t){l.cartLoadingItem=t,l.isLoadingForStore=!0;const r=`https://vue3-course-api.hexschool.io/api/je-api/cart/${t}`;try{const t=await a.Z["delete"](r);l.isLoadingForStore=!1,l.cartLoadingItem="",this.getCartProducts(),(0,o.Z)(t),s.Z.emit("updateCart")}catch(e){console.error("Error 找不到資料",e)}},async addCouponCode(t){l.isLoadingForStore=!0;const r="https://vue3-course-api.hexschool.io/api/je-api/coupon",e={code:t};try{const t=await a.Z.post(r,{data:e});l.isLoadingForStore=!1,this.getCartProducts(),(0,o.Z)(t)}catch(s){console.error("Error 找不到資料",s)}},scrollToTop(){window.scrollTo({top:0,behavior:"smooth"})}}})},4238:function(t,r,e){e(7658);var o=e(6154),s=e(9876),a=e(6294);const c=(0,a.Z)();r.Z=(0,s.Q_)("productStore",{state:()=>({products:[],productsPage:[],pagination:{},productsCategory:[],productsType:[],product:{},imageUrl:"",imagesUrl:[],cc:0,lgCompProd:[],smCompProd:[]}),actions:{async getProducts(){this.scrollToTop(),c.isLoadingForStore=!0;const t="https://vue3-course-api.hexschool.io/api/je-api/products/all";try{const r=await o.Z.get(t);c.isLoadingForStore=!1,this.products=r.data.products,this.updateProductsCategoryAndType()}catch(r){console.error("Error 找不到資料:",r)}},async getProductsPage(t=1){this.scrollToTop(),c.isLoadingForStore=!0;const r=`https://vue3-course-api.hexschool.io/api/je-api/admin/products/?page=${t}`;try{const t=await o.Z.get(r);c.isLoadingForStore=!1,t.data.success&&(this.productsPage=t.data.products,this.pagination=t.data.pagination)}catch(e){console.error("Error fetching paginated products:",e)}},async getProduct(t){this.scrollToTop(),c.isLoadingForStore=!0;const r=`https://vue3-course-api.hexschool.io/api/je-api/product/${t}`;try{const t=await o.Z.get(r);c.isLoadingForStore=!1,this.product=t.data.product,this.imageUrl=t.data.product.imageUrl,this.imagesUrl=t.data.product.imagesUrl,this.cc=t.data.product.content.comparison.cc}catch(e){console.error("Error 找不到資料",e)}this.licenseTax(),this.fuelTax()},licenseTax(t){const r=t;return r<=500?1620:r<=600?2160:r<=1200?4320:r<=1800?7120:11230},fuelTax(t){const r=t;return r<=500?900:r<=600?1200:r<=1200?1800:2010},setLgCompProd(t){this.updateProductArray(this.lgCompProd,t,4)},setSmCompProd(t){this.updateProductArray(this.smCompProd,t,2)},updateProductArray(t,r,e){t.length<e?t.some((t=>t.id===r.id))||t.push(r):t.some((t=>t.id===r.id))||(t.shift(),t.push(r))},updateProductsCategoryAndType(){this.products.forEach((t=>{this.productsCategory.includes(t.category)||this.productsCategory.push(t.category),this.productsType.includes(t.content.comparison.type)||this.productsType.push(t.content.comparison.type)}))},scrollToTop(){window.scrollTo({top:0,behavior:"smooth"})}}})},6294:function(t,r,e){var o=e(9876);r.Z=(0,o.Q_)("statusStore",{state:()=>({isLoadingForStore:!1,cartLoadingItem:""})})},6140:function(t,r,e){e.d(r,{Z:function(){return m}});var o=e(6252),s=e(3577);const a=["onClick"],c=(0,o._)("i",{class:"bi bi-arrow-right"},null,-1);function i(t,r,e,i,l,n){return(0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(n.reversedArticles,(t=>((0,o.wg)(),(0,o.iD)("div",{class:"reversed-articles-box",key:t.id},[(0,o._)("a",{href:"#",onClick:r=>n.getArticle(t.id)},[(0,o.Uk)((0,s.zw)(t.title)+" ",1),c],8,a)])))),128)}e(7658);var l=e(9876),n=e(9334),d=e(6294),u={computed:{...(0,l.rn)(n.Z,["articles","pagination"]),...(0,l.rn)(d.Z,["isLoadingForStore"]),reversedArticles(){return this.articles.slice(0,5)}},methods:{...(0,l.nv)(n.Z,["getArticles"]),getArticle(t){setTimeout((()=>{this.$router.push(`/article/${t}`)}))}},created(){this.getArticles()}},p=e(3744);const g=(0,p.Z)(u,[["render",i]]);var m=g},7786:function(t,r,e){e.r(r),e.d(r,{default:function(){return Pt}});var o=e(6252),s=e(3577),a=e(9963);const c={key:0,class:"product-box product-box-skeleton"},i=(0,o.uE)('<div class="breadcrumb-box item-underline"><ul><li class="load"></li><li class="load"></li><li class="load"></li></ul></div><div class="product"><div class="sidebar information"><h1 class="load"></h1><div class="content load"></div></div><div class="img-box"><div class="img-item load"></div></div><div class="sidebar"><div class="content load"></div></div></div>',2),l=[i],n={class:"product-box"},d={class:"breadcrumb-box item-underline"},u={class:"product"},p={class:"text-deep"},g={class:"img-boz-sm"},m={key:0,class:"sidebar information"},h={class:"text-deep"},_={class:"content"},v=(0,o._)("tr",null,[(0,o._)("th",{class:"text-deep"},"種類")],-1),y=(0,o._)("tr",null,[(0,o._)("th",{class:"text-deep"},"引擎")],-1),w=(0,o._)("tr",null,[(0,o._)("th",{class:"text-deep"},"排氣量")],-1),b=(0,o._)("tr",null,[(0,o._)("th",{class:"text-deep"},"馬力")],-1),f=(0,o._)("tr",null,[(0,o._)("th",{class:"text-deep"},"扭力")],-1),x=(0,o._)("input",{type:"checkbox",id:"see-more"},null,-1),k={class:"more"},C=(0,o._)("tr",null,[(0,o._)("th",{class:"text-deep"},"座高")],-1),Z=(0,o._)("tr",null,[(0,o._)("th",{class:"text-deep"},"重量")],-1),L=(0,o._)("tr",null,[(0,o._)("th",{class:"text-deep"},"平均油耗")],-1),T=(0,o._)("tr",null,[(0,o._)("th",{class:"text-deep"},"油箱容量")],-1),P=(0,o._)("label",{for:"see-more"},"收合",-1),S=(0,o._)("label",{for:"see-more"},"查看更多",-1),U={class:"img-box"},I={class:"img-item"},z=["src"],D=["src"],$={class:"buy sidebar"},F={class:"content"},A=(0,o._)("tr",null,[(0,o._)("th",{class:"text-deep"},"廠牌")],-1),E=(0,o._)("tr",null,[(0,o._)("th",{class:"text-deep"},"車款")],-1),j=(0,o._)("tr",null,[(0,o._)("th",{class:"text-deep"},"售價")],-1),q=(0,o._)("br",null,null,-1),M=(0,o._)("tr",null,[(0,o._)("th",{class:"text-deep"},"稅金")],-1),H=(0,o._)("br",null,null,-1),Y={class:"text-shallow"},K={class:"display-td"},Q=["disabled"],W={key:0,class:"fill-btn-text"},B={key:1,class:"fill-btn-text"},N={class:"display-td"},R={class:"related-articles"},O=(0,o._)("p",null,"最新文章",-1),G={class:"media-scroll"},J=(0,o._)("p",null,"你可能會喜歡",-1),V={class:"buy-control bg-color text-deep"},X=["disabled"],tt={key:0,class:"fill-btn-text"},rt={key:1,class:"fill-btn-text"};function et(t,r,e,i,et,ot){const st=(0,o.up)("router-link"),at=(0,o.up)("Swiper"),ct=(0,o.up)("RelatedArticles"),it=(0,o.up)("MediaScroll");return(0,o.wg)(),(0,o.iD)(o.HY,null,[t.isLoadingForStore?((0,o.wg)(),(0,o.iD)("div",c,l)):(0,o.kq)("",!0),(0,o._)("div",n,[(0,o._)("div",d,[(0,o._)("ul",null,[(0,o._)("li",null,[(0,o.Wm)(st,{to:{name:"所有產品"}},{default:(0,o.w5)((()=>[(0,o.Uk)(" 所有產品 ")])),_:1})]),(0,o._)("li",null,[(0,o._)("a",null,(0,s.zw)(t.product.category),1)]),(0,o._)("li",null,[(0,o._)("a",null,(0,s.zw)(t.product.title),1)])])]),(0,o._)("div",u,[(0,o._)("h1",p,(0,s.zw)(t.product.title),1),(0,o._)("div",g,[(0,o.Wm)(at,{mergedImagesUrl:ot.mergedImagesUrl},null,8,["mergedImagesUrl"]),(0,o._)("button",{class:"add-comparison text-deep",onClick:r[0]||(r[0]=(0,a.iM)(((...t)=>ot.addComparison&&ot.addComparison(...t)),["prevent"]))}," 加入比較 ")]),t.product.content?((0,o.wg)(),(0,o.iD)("div",m,[(0,o._)("h1",h,(0,s.zw)(t.product.title),1),(0,o._)("div",_,[(0,o._)("table",null,[v,(0,o._)("tr",null,[(0,o._)("td",null,(0,s.zw)(t.product.content.comparison.type),1)]),y,(0,o._)("tr",null,[(0,o._)("td",null,(0,s.zw)(t.product.content.comparison.engine),1)]),w,(0,o._)("tr",null,[(0,o._)("td",null,(0,s.zw)(t.product.content.comparison.cc)+"cc",1)]),b,(0,o._)("tr",null,[(0,o._)("td",null,(0,s.zw)(t.product.content.comparison.hp),1)]),f,(0,o._)("tr",null,[(0,o._)("td",null,(0,s.zw)(t.product.content.comparison.torque),1)]),x,(0,o._)("div",k,[C,(0,o._)("tr",null,[(0,o._)("td",null,(0,s.zw)(t.product.content.comparison.ht)+"mm",1)]),Z,(0,o._)("tr",null,[(0,o._)("td",null,(0,s.zw)(t.product.content.comparison.wt)+"kg",1)]),L,(0,o._)("tr",null,[(0,o._)("td",null,(0,s.zw)(t.product.content.comparison.afc)+"公升",1)]),T,(0,o._)("tr",null,[(0,o._)("td",null,(0,s.zw)(t.product.content.comparison.tank)+"公升",1)]),P]),S])])])):(0,o.kq)("",!0),(0,o._)("div",U,[(0,o._)("div",I,[(0,o._)("img",{src:t.product.imageUrl,alt:""},null,8,z),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(t.product.imagesUrl,((t,r)=>((0,o.wg)(),(0,o.iD)("div",{class:"attached",key:r+1},[(0,o._)("img",{src:t,alt:""},null,8,D)])))),128))])]),(0,o._)("div",$,[(0,o._)("div",F,[(0,o._)("table",null,[A,(0,o._)("tr",null,[(0,o._)("td",null,(0,s.zw)(t.product.category),1)]),E,(0,o._)("tr",null,[(0,o._)("td",null,(0,s.zw)(t.product.title),1)]),j,(0,o._)("tr",null,[(0,o._)("td",null,[(0,o.Uk)("NT$ "+(0,s.zw)(t.$filters.currency(t.product.price))+" ",1),q])]),M,(0,o._)("tr",null,[(0,o._)("td",null,[(0,o.Uk)("NT$ "+(0,s.zw)(t.$filters.currency(t.licenseTax(t.cc)+t.fuelTax(t.cc)))+" ",1),H,(0,o._)("small",Y," (牌照稅$"+(0,s.zw)(t.$filters.currency(t.licenseTax(t.cc)))+" + 燃料稅$"+(0,s.zw)(t.$filters.currency(t.fuelTax(t.cc)))+") ",1)])]),(0,o._)("tr",null,[(0,o._)("td",K,[(0,o._)("button",{class:"add-cart fill-btn",onClick:r[1]||(r[1]=(0,a.iM)((r=>t.addCart(t.product.id)),["prevent"])),disabled:t.cartLoadingItem===t.product.id},[t.cartLoadingItem!==t.product.id?((0,o.wg)(),(0,o.iD)("span",W," 加入購物車 ")):(0,o.kq)("",!0),t.cartLoadingItem===t.product.id?((0,o.wg)(),(0,o.iD)("span",B," 加入中。。。 ")):(0,o.kq)("",!0)],8,Q)])]),(0,o._)("tr",null,[(0,o._)("td",N,[(0,o._)("button",{class:"add-comparison text-deep",onClick:r[2]||(r[2]=(0,a.iM)(((...t)=>ot.addComparison&&ot.addComparison(...t)),["prevent"]))}," 加入比較 ")])])])])])]),(0,o._)("div",R,[O,(0,o.Wm)(ct)]),(0,o._)("div",G,[J,(0,o.Wm)(it,{products:t.products},null,8,["products"])]),(0,o._)("div",V,[(0,o._)("button",{class:"pre-page text-deep",onClick:r[3]||(r[3]=(...t)=>ot.goBack&&ot.goBack(...t))}," 上一頁 "),(0,o._)("button",{class:"add-cart fill-btn",onClick:r[4]||(r[4]=(0,a.iM)((r=>t.addCart(t.product.id)),["prevent"])),disabled:t.cartLoadingItem===t.product.id},[t.cartLoadingItem!==t.product.id?((0,o.wg)(),(0,o.iD)("span",tt," 加入購物車 ")):(0,o.kq)("",!0),t.cartLoadingItem===t.product.id?((0,o.wg)(),(0,o.iD)("span",rt," 加入中。。。 ")):(0,o.kq)("",!0)],8,X)])])],64)}e(7658);const ot={class:"media-scrolled"},st=["onClick"],at={class:"img-box"},ct=["src"];function it(t,r,e,a,c,i){return(0,o.wg)(),(0,o.iD)("div",ot,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(i.reversedProducts,(t=>((0,o.wg)(),(0,o.iD)("div",{class:"media-element",key:t.id},[(0,o._)("a",{href:"#",onClick:r=>i.getProduct(t.id)},[(0,o._)("div",at,[(0,o._)("img",{src:t.imageUrl,alt:""},null,8,ct)]),(0,o._)("h5",null,(0,s.zw)(t.category),1),(0,o._)("p",null,(0,s.zw)(t.title),1)],8,st)])))),128))])}var lt={props:{products:Array},computed:{reversedProducts(){return this.products.slice(-5).reverse()}},methods:{getProduct(t){setTimeout((()=>{this.$router.push(`/product/${t}`)}))}}},nt=e(3744);const dt=(0,nt.Z)(lt,[["render",it]]);var ut=dt,pt=e(6140);const gt={id:"carouselExampleDark",class:"carousel carousel-dark slide"},mt={class:"carousel-indicators"},ht=["data-bs-slide-to","aria-current","aria-label"],_t={class:"carousel-inner"},vt=["src"];function yt(t,r,e,a,c,i){return(0,o.wg)(),(0,o.iD)("div",gt,[(0,o._)("div",mt,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(e.mergedImagesUrl,((t,r)=>((0,o.wg)(),(0,o.iD)("button",{key:r,type:"button","data-bs-target":"#carouselExampleDark","data-bs-slide-to":r,class:(0,s.C_)({active:0===r}),"aria-current":0===r?"true":"false","aria-label":"Slide "+(r+1)},null,10,ht)))),128))]),(0,o._)("div",_t,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(e.mergedImagesUrl,((t,r)=>((0,o.wg)(),(0,o.iD)("div",{key:r,class:(0,s.C_)({"carousel-item":!0,active:0===r}),"data-bs-interval":1e4},[(0,o._)("img",{src:t,class:"d-block w-100"},null,8,vt)],2)))),128))])])}var wt={props:{mergedImagesUrl:{typeof:Array}}};const bt=(0,nt.Z)(wt,[["render",yt]]);var ft=bt,xt=e(9876),kt=e(4238),Ct=e(6294),Zt=e(4677),Lt={components:{MediaScroll:ut,RelatedArticles:pt.Z,Swiper:ft},data(){return{id:"",isLoading:!1,status:{loadingItem:""},route:"所有產品",isFirstLoad:!0}},computed:{...(0,xt.rn)(kt.Z,["products","product","imageUrl","imagesUrl","cc"]),...(0,xt.rn)(Ct.Z,["isLoadingForStore","cartLoadingItem"]),mergedImagesUrl(){return this.imagesUrl&&this.imagesUrl.length>0?[this.imageUrl,...this.imagesUrl]:[this.imageUrl]}},methods:{...(0,xt.nv)(kt.Z,["getProducts","getProduct","licenseTax","fuelTax"]),...(0,xt.nv)(Zt.Z,["addCart"]),addComparison(){const t=(0,kt.Z)();t.setLgCompProd(this.product),t.setSmCompProd(this.product),this.$router.push("/comparison")},goBack(){return this.$router.go(-1)}},created(){const t=this.$route.params.productId;this.getProduct(t),this.getProducts()},inject:["emitter","pushMessageState"]};const Tt=(0,nt.Z)(Lt,[["render",et]]);var Pt=Tt}}]);
//# sourceMappingURL=786.e237a778.js.map