"use strict";(self["webpackChunkrolling"]=self["webpackChunkrolling"]||[]).push([[208],{7208:function(e,l,s){s.r(l),s.d(l,{default:function(){return qe}});var r=s(6252),a=s(9963),t=s(3577);const d={class:"container-fluid"},o={class:"row"},i=(0,r._)("div",{class:"col-12 border-bottom border-black"},[(0,r._)("div",{class:"container-fluid d-flex justify-content-between align-items-center p-4"},[(0,r._)("h1",{class:"page-title"},"Orders")])],-1),c={class:"col-12"},n={class:"card mb-4"},p={class:"card-body pt-lg-4 mt-lg-3 py-0 px-lg-5"},m={class:"table-responsive p-0 d-flex"},_={class:"table lh-lg mb-0 table-hover"},g=(0,r._)("thead",null,[(0,r._)("tr",null,[(0,r._)("th",{class:"text-secondary text-xxs fw-normal pb-lg-4 pt-sm-0"},"購買時間"),(0,r._)("th",{class:"text-secondary text-xxs fw-normal pb-lg-4 pt-sm-0"},"Email"),(0,r._)("th",{class:"text-secondary text-xxs fw-normal pb-lg-4 pt-sm-0"},"應付金額"),(0,r._)("th",{class:"text-secondary text-xxs fw-normal pb-lg-4 pt-sm-0 text-center"}," 付款 ")])],-1),u=["onClick"],b={class:"text-center"},w={key:0},v=(0,r._)("i",{class:"bi bi-check-lg fs-5"},null,-1),f=[v],h={key:1};function x(e,l,s,v,x,y){const O=(0,r.up)("DashboardSkeleton"),k=(0,r.up)("Pagination"),D=(0,r.up)("Loading"),M=(0,r.up)("OrderModal"),z=(0,r.up)("DelModal");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r._)("div",d,[(0,r._)("div",o,[i,x.isLoadingForSkeleton?((0,r.wg)(),(0,r.j4)(O,{key:0})):(0,r.kq)("",!0),(0,r._)("div",c,[(0,r._)("div",n,[(0,r._)("div",p,[(0,r._)("div",m,[(0,r._)("table",_,[g,(0,r._)("tbody",null,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(x.orders,(l=>((0,r.wg)(),(0,r.iD)("tr",{class:"cursor-pointer",onClick:(0,a.iM)((e=>y.openOrderModal(l)),["prevent"]),key:l.id},[(0,r._)("td",null,(0,t.zw)(e.$filters.date(l.create_at)),1),(0,r._)("td",null,(0,t.zw)(l.user.email),1),(0,r._)("td",null,"NT$"+(0,t.zw)(e.$filters.currency(l.total))+"元",1),(0,r._)("td",b,[!0===l.is_paid?((0,r.wg)(),(0,r.iD)("span",w,f)):((0,r.wg)(),(0,r.iD)("span",h))])],8,u)))),128))])])])]),(0,r.Wm)(k,{pages:x.pagination,onEmitPages:y.getOrders},null,8,["pages","onEmitPages"])])])])]),(0,r.Wm)(D,{active:x.isLoading,zIndex:1e4},null,8,["active"]),(0,r.Wm)(M,{ref:"orderModal",order:x.tempOrder,onDelOrder:l[0]||(l[0]=e=>y.openDelModal(x.tempOrder))},null,8,["order"]),(0,r.Wm)(z,{ref:"delModal",item:x.tempOrder,onDelItem:y.delOrder},null,8,["item","onDelItem"])],64)}var y=s(6154);const O={class:"modal fade",id:"exampleModal",tabindex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"modal"},k={class:"modal-dialog modal-xl modal-dialog-centered modal-fullscreen-md-down"},D={class:"modal-content bg-gray-white rounded-0 p-0 border-0"},M={class:"modal-header border-bottom border-black p-4"},z={class:"modal-title fs-5 font-family-taipei fw-normal",id:"exampleModalLabel"},$=(0,r._)("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),L={class:"modal-body p-0"},S={class:"container-fluid"},Z={class:"row"},j={class:"col-lg-6 col-sm-12"},q={key:0,class:"card border-lg border-end border-black px-2 py-4"},C={class:"card-body px-4"},E={class:"row"},T=(0,r._)("div",{class:"col-lg-12"},[(0,r._)("h6",{class:"fs-5 font-family-taipei mb-4"},"訂購人資訊")],-1),F=(0,r._)("div",{class:"col-lg-2"},[(0,r._)("p",{class:"fw-bolder"},"姓名")],-1),N={class:"col-lg-10"},P=(0,r._)("div",{class:"col-lg-2"},[(0,r._)("p",{class:"fw-bolder"},"email")],-1),W={class:"col-lg-10"},H=(0,r._)("div",{class:"col-lg-2"},[(0,r._)("p",{class:"fw-bolder"},"手機")],-1),I={class:"col-lg-10"},Y=(0,r._)("div",{class:"col-lg-2"},[(0,r._)("p",{class:"fw-bolder"},"地址")],-1),K={class:"col-lg-10"},A=(0,r._)("div",{class:"col-lg-2"},[(0,r._)("p",{class:"fw-bolder"},"備註")],-1),B={class:"col-lg-10"},G={key:0},J={key:1},Q={class:"col-lg-6 col-sm-12"},R={key:0,class:"card border-lg px-2 py-4"},U={class:"card-body px-4"},V={class:"row"},X=(0,r._)("div",{class:"col-lg-12"},[(0,r._)("h6",{class:"fs-5 font-family-taipei mb-4"},"訂單資訊")],-1),ee=(0,r._)("div",{class:"col-lg-3"},[(0,r._)("p",{class:"fw-bolder"},"訂單編號")],-1),le={class:"col-lg-9"},se=(0,r._)("div",{class:"col-lg-3"},[(0,r._)("p",{class:"fw-bolder"},"下單時間")],-1),re={class:"col-lg-9"},ae=(0,r._)("div",{class:"col-lg-3"},[(0,r._)("p",{class:"fw-bolder"},"付款時間")],-1),te={class:"col-lg-9"},de=(0,r._)("div",{class:"col-lg-3"},[(0,r._)("p",{class:"fw-bolder"},"付款狀態")],-1),oe={class:"col-lg-9"},ie={key:0},ce={key:1},ne=(0,r._)("div",{class:"col-lg-3"},[(0,r._)("p",{class:"fw-bolder"},"總金額")],-1),pe={class:"col-lg-9"},me={class:"col-lg-12"},_e={key:0,class:"card border-lg border-top border-bottom border-black px-2 py-4"},ge={class:"card-body ps-4 pe-4"},ue={class:"row"},be=(0,r._)("div",{class:"col-lg-12"},[(0,r._)("h6",{class:"fs-5 font-family-taipei mb-4"},"訂單資訊")],-1),we={class:"col-lg-12"},ve={class:"table-responsive p-0"},fe={class:"table lh-lg"},he=(0,r._)("tr",{class:"mb-5 fw-bolder"},[(0,r._)("th",{class:"text-secondary text-xxs fw-normal pb-2"},"品項"),(0,r._)("th",{class:"text-secondary text-xxs fw-normal pb-2"},"數量"),(0,r._)("th",{class:"text-secondary text-xxs fw-normal pb-2"},"單價"),(0,r._)("th",{class:"text-secondary text-xxs fw-normal pb-2"},"金額")],-1),xe={class:"modal-footer d-flex justify-content-between p-lg-5 p-3 bg-sm-color"};function ye(e,l,s,a,d,o){return(0,r.wg)(),(0,r.iD)("div",O,[(0,r._)("div",k,[(0,r._)("div",D,[(0,r._)("div",M,[(0,r._)("h1",z,"訂單 #"+(0,t.zw)(d.tempOrder.id),1),$]),(0,r._)("div",L,[(0,r._)("div",S,[(0,r._)("div",Z,[(0,r._)("div",j,[d.tempOrder.user?((0,r.wg)(),(0,r.iD)("div",q,[(0,r._)("div",C,[(0,r._)("div",E,[T,F,(0,r._)("div",N,[(0,r._)("p",null,(0,t.zw)(d.tempOrder.user.name),1)]),P,(0,r._)("div",W,[(0,r._)("p",null,(0,t.zw)(d.tempOrder.user.email),1)]),H,(0,r._)("div",I,[(0,r._)("p",null,(0,t.zw)(d.tempOrder.user.tel),1)]),Y,(0,r._)("div",K,[(0,r._)("p",null,(0,t.zw)(d.tempOrder.user.address),1)]),A,(0,r._)("div",B,[d.tempOrder.message?((0,r.wg)(),(0,r.iD)("p",G,(0,t.zw)(d.tempOrder.message),1)):((0,r.wg)(),(0,r.iD)("p",J,"無備註"))])])])])):(0,r.kq)("",!0)]),(0,r._)("div",Q,[d.tempOrder.user?((0,r.wg)(),(0,r.iD)("div",R,[(0,r._)("div",U,[(0,r._)("div",V,[X,ee,(0,r._)("div",le,[(0,r._)("p",null,(0,t.zw)(d.tempOrder.id),1)]),se,(0,r._)("div",re,[(0,r._)("p",null,(0,t.zw)(e.$filters.date(d.tempOrder.create_at)),1)]),ae,(0,r._)("div",te,[(0,r._)("p",null,(0,t.zw)(e.$filters.date(d.tempOrder.paid_date)),1)]),de,(0,r._)("div",oe,[!0===d.tempOrder.is_paid?((0,r.wg)(),(0,r.iD)("p",ie,"已付款")):((0,r.wg)(),(0,r.iD)("p",ce,"未付款"))]),ne,(0,r._)("div",pe,[(0,r._)("p",null,"NT$"+(0,t.zw)(e.$filters.currency(d.tempOrder.total)),1)])])])])):(0,r.kq)("",!0)]),(0,r._)("div",me,[d.tempOrder.user?((0,r.wg)(),(0,r.iD)("div",_e,[(0,r._)("div",ge,[(0,r._)("div",ue,[be,(0,r._)("div",we,[(0,r._)("div",ve,[(0,r._)("table",fe,[he,((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(d.tempOrder.products,(l=>((0,r.wg)(),(0,r.iD)("tr",{key:l.id},[(0,r._)("td",null,(0,t.zw)(l.product.title),1),(0,r._)("td",null,(0,t.zw)(l.qty)+"/"+(0,t.zw)(l.product.unit),1),(0,r._)("td",null,"NT$"+(0,t.zw)(e.$filters.currency(l.total/l.qty)),1),(0,r._)("td",null,"NT$"+(0,t.zw)(e.$filters.currency(l.total)),1)])))),128))])])])])])])):(0,r.kq)("",!0)])])])]),(0,r._)("div",xe,[(0,r._)("button",{type:"button",class:"btn btn-outline-dark rounded-5 me-3 mb-0 px-lg-5 py-lg-3 px-4 py-2",onClick:l[0]||(l[0]=l=>e.$emit("del-order",d.tempOrder))},"刪除")])])])],512)}var Oe=s(1339),ke={props:{order:{type:Object,default(){return{}}}},data(){return{modal:{},tempOrder:{}}},watch:{order(){this.tempOrder=this.order}},mixins:[Oe.Z]},De=s(3744);const Me=(0,De.Z)(ke,[["render",ye]]);var ze=Me,$e=s(6463),Le=s(7130),Se=s(552),Ze={components:{OrderModal:ze,DelModal:$e.Z,Pagination:Le.Z,DashboardSkeleton:Se.Z},data(){return{orders:[],tempOrder:{},pagination:{},isLoading:!1,isLoadingForSkeleton:!1}},methods:{async getOrders(e=1){window.scrollTo({top:0,behavior:"smooth"});try{this.isLoadingForSkeleton=!0;const l=`https://vue3-course-api.hexschool.io/api/je-api/admin/orders/?page=${e}`,s=await y.Z.get(l);this.orders=s.data.orders,this.pagination=s.data.pagination,this.isLoadingForSkeleton=!1}catch(l){console.error("Error 找不到資料",l)}},openOrderModal(e){this.tempOrder={...e},this.$refs.orderModal.showModal()},openDelModal(e){this.tempOrder={...e},this.$refs.delModal.showModal()},async delOrder(){try{this.isLoading=!0;const e=`https://vue3-course-api.hexschool.io/api/je-api/admin/order/${this.tempOrder.id}`,l=await y.Z["delete"](e);l.data.success&&(this.$refs.delModal.hideModal(),this.$refs.orderModal.hideModal(),this.isLoading=!1,this.getOrders(),this.pushMessageState(l))}catch(e){console.error("Error 找不到資料",e)}}},created(){this.getOrders()},inject:["emitter","pushMessageState"]};const je=(0,De.Z)(Ze,[["render",x]]);var qe=je}}]);
//# sourceMappingURL=208.275e8935.js.map