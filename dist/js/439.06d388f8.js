"use strict";(self["webpackChunkrolling"]=self["webpackChunkrolling"]||[]).push([[439],{5679:function(t,e,o){function s(t){return{all:t=t||new Map,on:function(e,o){var s=t.get(e);s?s.push(o):t.set(e,[o])},off:function(e,o){var s=t.get(e);s&&(o?s.splice(s.indexOf(o)>>>0,1):t.set(e,[]))},emit:function(e,o){var s=t.get(e);s&&s.slice().map((function(t){t(o)})),(s=t.get("*"))&&s.slice().map((function(t){t(e,o)}))}}}o.d(e,{Z:function(){return r}});const i=s();var r=i},4238:function(t,e,o){o(7658);var s=o(6154),i=o(9876),r=o(6294);const a=(0,r.Z)();e.Z=(0,i.Q_)("productStore",{state:()=>({products:[],productsPage:[],pagination:{},productsCategory:[],productsType:[],product:{},imageUrl:"",imagesUrl:[],cc:0,lgCompProd:[],smCompProd:[]}),actions:{async getProducts(){this.scrollToTop(),a.isLoadingForStore=!0;const t="https://vue3-course-api.hexschool.io/api/je-api/products/all";try{const e=await s.Z.get(t);a.isLoadingForStore=!1,this.products=e.data.products,this.updateProductsCategoryAndType()}catch(e){console.error("Error 找不到資料:",e)}},async getProductsPage(t=1){this.scrollToTop(),a.isLoadingForStore=!0;const e=`https://vue3-course-api.hexschool.io/api/je-api/admin/products/?page=${t}`;try{const t=await s.Z.get(e);a.isLoadingForStore=!1,t.data.success&&(this.productsPage=t.data.products,this.pagination=t.data.pagination)}catch(o){console.error("Error fetching paginated products:",o)}},async getProduct(t){this.scrollToTop(),a.isLoadingForStore=!0;const e=`https://vue3-course-api.hexschool.io/api/je-api/product/${t}`;try{const t=await s.Z.get(e);a.isLoadingForStore=!1,this.product=t.data.product,this.imageUrl=t.data.product.imageUrl,this.imagesUrl=t.data.product.imagesUrl,this.cc=t.data.product.content.comparison.cc}catch(o){console.error("Error 找不到資料",o)}this.licenseTax(),this.fuelTax()},licenseTax(t){const e=t;return e<=500?1620:e<=600?2160:e<=1200?4320:e<=1800?7120:11230},fuelTax(t){const e=t;return e<=500?900:e<=600?1200:e<=1200?1800:2010},setLgCompProd(t){this.updateProductArray(this.lgCompProd,t,4)},setSmCompProd(t){this.updateProductArray(this.smCompProd,t,2)},updateProductArray(t,e,o){t.length<o?t.some((t=>t.id===e.id))||t.push(e):t.some((t=>t.id===e.id))||(t.shift(),t.push(e))},updateProductsCategoryAndType(){this.products.forEach((t=>{this.productsCategory.includes(t.category)||this.productsCategory.push(t.category),this.productsType.includes(t.content.comparison.type)||this.productsType.push(t.content.comparison.type)}))},scrollToTop(){window.scrollTo({top:0,behavior:"smooth"})}}})},6294:function(t,e,o){var s=o(9876);e.Z=(0,s.Q_)("statusStore",{state:()=>({isLoadingForStore:!1,cartLoadingItem:""})})},7130:function(t,e,o){o.d(e,{Z:function(){return v}});var s=o(6252),i=o(9963),r=o(3577);const a={class:"pagination-box","aria-label":"Page navigation example"},c={key:0,class:"pre"},l=(0,s._)("span",{"aria-hidden":"true"},"上一頁",-1),n=[l],u=["onClick"],d={key:1,class:"next"},p=(0,s._)("span",{"aria-hidden":"true"},"下一頁",-1),g=[p];function h(t,e,o,l,p,h){return(0,s.wg)(),(0,s.iD)("nav",a,[(0,s._)("ul",null,[!0===o.pages.has_pre?((0,s.wg)(),(0,s.iD)("li",c,[(0,s._)("a",{href:"#","aria-label":"Previous",onClick:e[0]||(e[0]=(0,i.iM)((t=>h.updatePage(o.pages.current_page-1)),["prevent"])),class:(0,r.C_)({disabled:!1===o.pages.has_pre})},n,2)])):(0,s.kq)("",!0),((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(o.pages.total_pages,(t=>((0,s.wg)(),(0,s.iD)("li",{class:(0,r.C_)(["page",{"active-page":t===o.pages.current_page}]),key:t},[(0,s._)("a",{href:"#",onClick:(0,i.iM)((e=>h.updatePage(t)),["prevent"])},(0,r.zw)(t),9,u)],2)))),128)),!0===o.pages.has_next?((0,s.wg)(),(0,s.iD)("li",d,[(0,s._)("a",{href:"#","aria-label":"Next",onClick:e[1]||(e[1]=(0,i.iM)((t=>h.updatePage(o.pages.current_page+1)),["prevent"])),class:(0,r.C_)({disabled:!1===o.pages.has_next})},g,2)])):(0,s.kq)("",!0)])])}var m={props:["pages"],methods:{updatePage(t){this.$emit("emit-pages",t)}}},y=o(3744);const _=(0,y.Z)(m,[["render",h]]);var v=_},7707:function(t,e,o){o.d(e,{Z:function(){return d}});var s=o(6252),i=o(3577);const r={class:"page-title-sm"},a={key:0};function c(t,e,o,c,l,n){return(0,s.wg)(),(0,s.iD)("div",r,[(0,s._)("p",null,(0,i.zw)(o.title),1),o.content?((0,s.wg)(),(0,s.iD)("p",a," /"+(0,i.zw)(o.content),1)):(0,s.kq)("",!0)])}var l={props:{title:String,content:String}},n=o(3744);const u=(0,n.Z)(l,[["render",c]]);var d=u},3439:function(t,e,o){o.r(e),o.d(e,{default:function(){return pt}});var s=o(6252),i=o(9963),r=o(3577);const a={class:"products-box"},c={class:"category sidebar"},l=(0,s._)("input",{type:"checkbox",name:"",id:"collapsible-title",checked:""},null,-1),n=(0,s._)("label",{for:"collapsible-title",class:"text-shallow"},[(0,s._)("i",{class:"bi bi-chevron-right"}),(0,s._)("h5",null,"車款廠牌")],-1),u={class:"collapsible-item"},d=["onClick"],p={class:"products"},g={key:1,class:"products-box"},h={key:2,class:"products-box",id:"infinite-list"},m={key:3},y={key:0,class:"filter sidebar bg-color"},_=(0,s._)("h4",{class:"text-deep"},"篩選",-1),v={class:"category"},w=(0,s._)("input",{type:"checkbox",name:"",id:"collapsible-title2",checked:""},null,-1),k=(0,s._)("label",{for:"collapsible-title2",class:"text-shallow title"},[(0,s._)("i",{class:"bi bi-chevron-right"}),(0,s._)("h5",null,"車款廠牌")],-1),f={class:"collapsible-item"},C=["onClick"],b=(0,s._)("li",{class:"text-deep filter-title"},"篩選",-1),x=(0,s._)("input",{type:"checkbox",name:"",id:"cc",checked:""},null,-1),P=(0,s._)("label",{for:"cc",class:"text-shallow title"},[(0,s._)("i",{class:"bi bi-chevron-right"}),(0,s._)("h5",null,"排氣量")],-1),T={class:"collapsible-item"},D=["id","value"],S=["for"],Z=(0,s._)("input",{type:"checkbox",name:"",id:"type",checked:""},null,-1),F=(0,s._)("label",{for:"type",class:"text-shallow title"},[(0,s._)("i",{class:"bi bi-chevron-right"}),(0,s._)("h5",null,"種類")],-1),L={class:"collapsible-item"},$=["id","value"],q=["for"];function z(t,e,o,z,U,M){const O=(0,s.up)("PageTitleSm"),H=(0,s.up)("router-link"),Y=(0,s.up)("Breadcrumb"),K=(0,s.up)("ProductsSkeleton"),W=(0,s.up)("ProductsCard"),j=(0,s.up)("Pagination");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s.Wm)(O,{title:U.title,content:`${M.filteredProductsLength}項商品`},null,8,["title","content"]),(0,s._)("div",a,[(0,s._)("div",c,[(0,s._)("li",null,[(0,s.Wm)(H,{to:{name:"所有產品"},class:"text-deep"},{default:(0,s.w5)((()=>[(0,s.Uk)(" 所有商品 ")])),_:1})]),(0,s._)("li",null,[l,n,(0,s._)("div",u,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(t.productsCategory,((t,e)=>((0,s.wg)(),(0,s.iD)("li",{key:e},[(0,s._)("a",{class:"text-deep",href:"#",onClick:(0,i.iM)((e=>M.changeCategory(t)),["prevent"])},(0,r.zw)(t),9,d)])))),128))])])]),(0,s._)("div",p,[t.isLoadingForStore?(0,s.kq)("",!0):((0,s.wg)(),(0,s.j4)(Y,{key:0,title:U.title,content:`${M.filteredProductsLength}項商品`},null,8,["title","content"])),t.isLoadingForStore?((0,s.wg)(),(0,s.iD)("div",g,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(U.skeletonNum,((t,e)=>((0,s.wg)(),(0,s.iD)("div",{class:"products-item",key:e},[(0,s.Wm)(K,{skeleton:t},null,8,["skeleton"])])))),128))])):(0,s.kq)("",!0),U.productByCategory.length>0?((0,s.wg)(),(0,s.iD)("div",h,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(U.productByCategory,(t=>((0,s.wg)(),(0,s.iD)("div",{class:"products-item",key:t.id},[(0,s.Wm)(W,{product:t,onClick:(0,i.iM)((e=>M.getProduct(t.id)),["prevent"])},null,8,["product","onClick"])])))),128))])):((0,s.wg)(),(0,s.iD)("h4",m,"暫無商品"))]),U.isFilterOpen?((0,s.wg)(),(0,s.iD)("div",y,[_,(0,s._)("div",v,[(0,s._)("li",null,[(0,s.Wm)(H,{to:{name:"所有產品"},class:"text-deep"},{default:(0,s.w5)((()=>[(0,s.Uk)(" 所有商品 ")])),_:1})]),(0,s._)("li",null,[w,k,(0,s._)("div",f,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(t.productsCategory,((t,e)=>((0,s.wg)(),(0,s.iD)("li",{key:e},[(0,s._)("a",{class:"text-deep",href:"#",onClick:(0,i.iM)((e=>M.changeCategory(t)),["prevent"])},(0,r.zw)(t),9,C)])))),128))])])]),b,(0,s._)("li",null,[x,P,(0,s._)("div",T,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(U.selectCc,((t,o)=>((0,s.wg)(),(0,s.iD)("div",{class:"box",key:"item"+o},[(0,s.wy)((0,s._)("input",{class:"text-deep",type:"checkbox",id:"cc_"+t.min+"_"+t.max,"onUpdate:modelValue":e[0]||(e[0]=t=>U.selectedCc=t),value:t},null,8,D),[[i.e8,U.selectedCc]]),(0,s._)("label",{for:"cc_"+t.min+"_"+t.max},(0,r.zw)(M.formatRange(t)),9,S)])))),128))])]),(0,s._)("li",null,[Z,F,(0,s._)("div",L,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(t.productsType,((t,o)=>((0,s.wg)(),(0,s.iD)("div",{class:"box",key:"item"+o},[(0,s.wy)((0,s._)("input",{class:"text-deep",type:"checkbox",id:t,"onUpdate:modelValue":e[1]||(e[1]=t=>U.selectedProductsType=t),value:t},null,8,$),[[i.e8,U.selectedProductsType]]),(0,s._)("label",{for:t},(0,r.zw)(t),9,q)])))),128))])])])):(0,s.kq)("",!0)]),(0,s.Wm)(j,{pages:U.pagination,onEmitPages:M.showCategory},null,8,["pages","onEmitPages"])],64)}o(7658);var U=o(5679);const M={class:"product-card"},O={class:"img-box"},H=["src"],Y={class:"text"};function K(t,e,o,i,a,c){return(0,s.wg)(),(0,s.iD)("div",M,[(0,s._)("div",O,[(0,s._)("img",{src:o.product.imageUrl,alt:""},null,8,H)]),(0,s._)("div",Y,[(0,s._)("h5",null,(0,r.zw)(o.product.category),1),(0,s._)("p",null,(0,r.zw)(o.product.title),1)])])}var W={props:{product:Object}},j=o(3744);const B=(0,j.Z)(W,[["render",K]]);var E=B,A=o(7130),R=o(7707);const N={class:"breadcrumb"},I={key:0};function Q(t,e,o,i,a,c){return(0,s.wg)(),(0,s.iD)("div",N,[(0,s._)("p",null,(0,r.zw)(o.title),1),o.content?((0,s.wg)(),(0,s.iD)("p",I,"/ "+(0,r.zw)(o.content),1)):(0,s.kq)("",!0)])}var V={props:{title:String,content:String}};const G=(0,j.Z)(V,[["render",Q]]);var J=G;const X={class:"product-skeleton"},tt=(0,s._)("div",{class:"img-box load"},null,-1),et=(0,s._)("div",{class:"text"},[(0,s._)("h5",{class:"load"}),(0,s._)("p",{class:"load"})],-1),ot=[tt,et];function st(t,e,o,i,r,a){return(0,s.wg)(),(0,s.iD)("div",X,ot)}var it={props:{skeleton:Number}};const rt=(0,j.Z)(it,[["render",st]]);var at=rt,ct=o(9876),lt=o(4238),nt=o(6294),ut={components:{ProductsCard:E,Pagination:A.Z,PageTitleSm:R.Z,Breadcrumb:J,ProductsSkeleton:at},data(){return{productByCategory:[],nowCategory:"",selectCategory:"",pagination:{current_page:1,has_next:!0,has_pre:!1,total_pages:1},title:"",selectCc:[{min:251,max:550},{min:501,max:600},{min:601,max:1200},{min:1201,max:1800},{min:1800,max:2500}],selectedCc:[],selectedProductsType:[],isFilterOpen:!1,skeletonNum:9}},computed:{...(0,ct.rn)(lt.Z,["products","productsCategory","productsType"]),...(0,ct.rn)(nt.Z,["isLoadingForStore"]),categoryProduct(){let t=this.products.filter((t=>t.category?.match(this.selectCategory)));return this.selectedCc.length>0&&(t=t.filter((t=>{const e=parseInt(t.content.comparison.cc,10);return this.selectedCc.some((t=>e>=t.min&&e<=t.max))}))),this.selectedProductsType.length>0&&(t=t.filter((t=>t.content.comparison.type?.match(this.selectedProductsType)))),t},filteredProductsLength(){return this.categoryProduct.length}},methods:{...(0,ct.nv)(lt.Z,["getProducts"]),getProduct(t){setTimeout((()=>{this.$router.push(`/product/${t}`)}))},changeCategory(t){setTimeout((()=>{this.$router.push({name:"所有產品",query:{category:t}})})),this.nowCategory=t},showCategory(t=1){const e=[...this.categoryProduct],o=Math.ceil(e.length/9);this.nowCategory=""===this.selectCategory?"所有產品":this.selectCategory,this.pagination={current_page:t,total_pages:o,has_pre:t>1,has_next:t<o},this.productByCategory=e.splice(9*(t-1),9*t),window.scrollTo({top:0,behavior:"smooth"})},checkRoute(){const t=this.$route;"所有產品"===t.name&&(this.title="所有產品",this.isFilterOpen=!1),t.query.category&&(this.title=t.query.category,this.isFilterOpen=!1),window.innerWidth>=768?this.isFilterOpen=!0:this.isFilterOpen=!1},formatRange(t){return`${t.min}~${t.max}cc`}},watch:{$route(){this.selectCategory=this.$route.query.category||"",this.checkRoute()},categoryProduct(){this.showCategory()}},created(){U.Z.emit("sendCategory",this.productsCategory),U.Z.on("sendToggleFilter",(t=>{this.isFilterOpen=t})),this.getProducts()},mounted(){this.getProducts(),this.checkRoute()},inject:["emitter","pushMessageState"]};const dt=(0,j.Z)(ut,[["render",z]]);var pt=dt}}]);
//# sourceMappingURL=439.06d388f8.js.map