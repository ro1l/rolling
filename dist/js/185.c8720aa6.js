(self["webpackChunkrolling"]=self["webpackChunkrolling"]||[]).push([[185],{2776:function(e,t,s){
/*!
  * Bootstrap toast.js v5.3.0-alpha3 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function(t,i){e.exports=i(s(5695),s(9286),s(1127),s(4072))})(0,(function(e,t,s,i){"use strict";const n="toast",a="bs.toast",o=`.${a}`,l=`mouseover${o}`,r=`mouseout${o}`,c=`focusin${o}`,u=`focusout${o}`,d=`hide${o}`,h=`hidden${o}`,m=`show${o}`,f=`shown${o}`,p="fade",g="hide",v="show",_="showing",b={animation:"boolean",autohide:"boolean",delay:"number"},w={animation:!0,autohide:!0,delay:5e3};class y extends e{constructor(e,t){super(e,t),this._timeout=null,this._hasMouseInteraction=!1,this._hasKeyboardInteraction=!1,this._setListeners()}static get Default(){return w}static get DefaultType(){return b}static get NAME(){return n}show(){const e=t.trigger(this._element,m);if(e.defaultPrevented)return;this._clearTimeout(),this._config.animation&&this._element.classList.add(p);const s=()=>{this._element.classList.remove(_),t.trigger(this._element,f),this._maybeScheduleHide()};this._element.classList.remove(g),i.reflow(this._element),this._element.classList.add(v,_),this._queueCallback(s,this._element,this._config.animation)}hide(){if(!this.isShown())return;const e=t.trigger(this._element,d);if(e.defaultPrevented)return;const s=()=>{this._element.classList.add(g),this._element.classList.remove(_,v),t.trigger(this._element,h)};this._element.classList.add(_),this._queueCallback(s,this._element,this._config.animation)}dispose(){this._clearTimeout(),this.isShown()&&this._element.classList.remove(v),super.dispose()}isShown(){return this._element.classList.contains(v)}_maybeScheduleHide(){this._config.autohide&&(this._hasMouseInteraction||this._hasKeyboardInteraction||(this._timeout=setTimeout((()=>{this.hide()}),this._config.delay)))}_onInteraction(e,t){switch(e.type){case"mouseover":case"mouseout":this._hasMouseInteraction=t;break;case"focusin":case"focusout":this._hasKeyboardInteraction=t;break}if(t)return void this._clearTimeout();const s=e.relatedTarget;this._element===s||this._element.contains(s)||this._maybeScheduleHide()}_setListeners(){t.on(this._element,l,(e=>this._onInteraction(e,!0))),t.on(this._element,r,(e=>this._onInteraction(e,!1))),t.on(this._element,c,(e=>this._onInteraction(e,!0))),t.on(this._element,u,(e=>this._onInteraction(e,!1)))}_clearTimeout(){clearTimeout(this._timeout),this._timeout=null}static jQueryInterface(e){return this.each((function(){const t=y.getOrCreateInstance(this,e);if("string"===typeof e){if("undefined"===typeof t[e])throw new TypeError(`No method named "${e}"`);t[e](this)}}))}}return s.enableDismissTrigger(y),i.defineJQueryPlugin(y),y}))},5679:function(e,t,s){"use strict";function i(e){return{all:e=e||new Map,on:function(t,s){var i=e.get(t);i?i.push(s):e.set(t,[s])},off:function(t,s){var i=e.get(t);i&&(s?i.splice(i.indexOf(s)>>>0,1):e.set(t,[]))},emit:function(t,s){var i=e.get(t);i&&i.slice().map((function(e){e(s)})),(i=e.get("*"))&&i.slice().map((function(e){e(t,s)}))}}}s.d(t,{Z:function(){return a}});const n=i();var a=n},7587:function(e,t,s){"use strict";s.d(t,{Z:function(){return n}});var i=s(5679);function n(e,t="更新"){const s="string"===typeof e.data.message?[e.data.message]:e.data.message;e.data.success?i.Z.emit("push-message",{style:"success",title:`${t}成功`,content:s.toString()}):i.Z.emit("push-message",{style:"danger",title:`${t}失敗`,content:s.join("、")})}},2888:function(e,t,s){"use strict";s.d(t,{Z:function(){return _}});var i=s(6252);const n={class:"toast-container"};function a(e,t,s,a,o,l){const r=(0,i.up)("Toast");return(0,i.wg)(),(0,i.iD)("div",n,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(o.messages,((e,t)=>((0,i.wg)(),(0,i.j4)(r,{key:t,msg:e},null,8,["msg"])))),128))])}s(7658);var o=s(3577);const l={class:"toast",role:"alert","aria-live":"assertive","aria-atomic":"true",ref:"toast"},r={key:0,class:"toast-body"};function c(e,t,s,n,a,c){return(0,i.wg)(),(0,i.iD)("div",l,[s.msg.content?((0,i.wg)(),(0,i.iD)("div",r,(0,o.zw)(s.msg.content),1)):(0,i.kq)("",!0)],512)}var u=s(2776),d=s.n(u),h={name:"Toast",props:["msg"],mounted(){const e=this.$refs.toast,t=new(d())(e,{delay:3e3});t.show()}},m=s(3744);const f=(0,m.Z)(h,[["render",c]]);var p=f,g={components:{Toast:p},data(){return{messages:[]}},mounted(){this.emitter.on("push-message",(e=>{const{style:t="success",title:s,content:i}=e;this.messages.push({style:t,title:s,content:i})}))},inject:["emitter"]};const v=(0,m.Z)(g,[["render",a]]);var _=v},3185:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return X}});var i=s(6252);const n={class:"container-fluid text-black"},a={class:"row p-0"},o={class:"col-lg-9"};function l(e,t,s,l,r,c){const u=(0,i.up)("NavbarSm"),d=(0,i.up)("NavbarLg"),h=(0,i.up)("ToastList"),m=(0,i.up)("router-view");return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i.Wm)(u),(0,i._)("div",n,[(0,i._)("div",a,[(0,i.Wm)(d),(0,i._)("div",o,[(0,i.Wm)(h),(0,i.Wm)(m)])])])],64)}s(7658);var r=s(6154),c=s(5679),u=s(7587),d=s(2888),h=s(3577),m=s(9963);const f={class:"d-lg-none"},p={class:"row"},g={class:"col-12 py-3 fixed-bottom d-flex justify-content-end z-4"},v={key:0,class:"bi bi-list fs-2"},_={key:1,class:"bi bi-x-lg fs-2"},b={class:"container vh-100 w-100 p-5 bg-dark"},w={class:"navbar-nav text-black"},y={class:"nav-item mb-4"},k={class:"nav-item mb-4"},O={class:"nav-item mb-4"},x={class:"nav-item mb-4"},L={class:"nav-item mb-4"},$={class:"nav-item mb-4"};function M(e,t,s,n,a,o){const l=(0,i.up)("router-link");return(0,i.wg)(),(0,i.iD)("div",f,[(0,i._)("div",p,[(0,i._)("div",g,[(0,i._)("button",{class:"btn btn-dark rounded-0 me-4 me-1",type:"button","data-bs-toggle":"collapse","data-bs-target":"#collapseExample","aria-expanded":"false","aria-controls":"collapseExample",onClick:t[0]||(t[0]=(...e)=>o.toggleOffcanvas&&o.toggleOffcanvas(...e))},[!1===a.isMenuOpen?((0,i.wg)(),(0,i.iD)("i",v)):(0,i.kq)("",!0),!0===a.isMenuOpen?((0,i.wg)(),(0,i.iD)("i",_)):(0,i.kq)("",!0)])])]),(0,i._)("div",{class:(0,h.C_)(["collapse z-1 fixed-top",{show:a.isMenuOpen}]),id:"collapseExample"},[(0,i._)("div",b,[(0,i._)("ul",w,[(0,i._)("li",y,[(0,i.Wm)(l,{to:{name:"home"},class:"logo text-white border-white"},{default:(0,i.w5)((()=>[(0,i.Uk)(" Rolling ")])),_:1})]),(0,i._)("li",k,[(0,i.Wm)(l,{to:{name:"產品"},class:"nav-link text-white d-flex align-items-center fs-5 p-0 m-0 font-family-taipei"},{default:(0,i.w5)((()=>[(0,i.Uk)(" 產品 ")])),_:1})]),(0,i._)("li",O,[(0,i.Wm)(l,{to:{name:"訂單"},class:"nav-link text-white d-flex align-items-center fs-5 p-0 m-0 font-family-taipei"},{default:(0,i.w5)((()=>[(0,i.Uk)(" 訂單 ")])),_:1})]),(0,i._)("li",x,[(0,i.Wm)(l,{to:{name:"優惠券"},class:"nav-link text-white d-flex align-items-center fs-5 p-0 m-0 font-family-taipei"},{default:(0,i.w5)((()=>[(0,i.Uk)(" 優惠券 ")])),_:1})]),(0,i._)("li",L,[(0,i.Wm)(l,{to:{name:"文章"},class:"nav-link text-white d-flex align-items-center fs-5 p-0 m-0 font-family-taipei"},{default:(0,i.w5)((()=>[(0,i.Uk)(" 文章 ")])),_:1})]),(0,i._)("li",$,[(0,i._)("a",{class:"nav-link text-white d-flex align-items-center fs-5 p-0 m-0 font-family-taipei",href:"#",onClick:t[1]||(t[1]=(0,m.iM)(((...e)=>o.LogOut&&o.LogOut(...e)),["prevent"]))}," 登出 ")])])])],2)])}var T={data(){return{isMenuOpen:!1}},methods:{LogOut(){this.isLoading=!0;const e="https://vue3-course-api.hexschool.io/logout";this.$http.post(e,this.user).then((e=>{e.data.success&&(this.isLoading=!1,this.$router.push("/r"))}))},toggleOffcanvas(){this.isMenuOpen=!this.isMenuOpen,this.isOffcanvasOpen=!this.isOffcanvasOpen,this.isOffcanvasOpen?document.body.style.overflow="hidden":document.body.style.overflow="auto"}},watch:{$route(){this.isMenuOpen=!1,document.body.style.overflow="auto"}}},Z=s(3744);const W=(0,Z.Z)(T,[["render",M]]);var I=W;const D={class:"col-lg-3 d-none d-lg-block m-0 p-0"},S={class:"container w-100 sticky-top vh-100 m-0 px-0"},U={class:"card border-0 border-end border-black h-75 ps-2"},C={class:"card-header px-4 pt-4 pb-2 bg-transparent border-0 mb-0"},E={class:"offcanvas-title",id:"offcanvasExampleLabel"},N={class:"card-body ps-4 pe-5"},j={class:"navbar-nav mt-1"},q={class:"nav-item mb-4"},H={class:"nav-item mb-4"},z={class:"nav-item mb-4"},K={class:"nav-item mb-4"},P={class:"card border-0 border-end border-black h-25 ps-2"},A={class:"card-body ps-4 pe-5 align-items-end d-flex"},Q={class:"navbar-nav mt-1"},R={class:"nav-item mb-4"};function Y(e,t,s,n,a,o){const l=(0,i.up)("router-link");return(0,i.wg)(),(0,i.iD)("div",D,[(0,i._)("div",S,[(0,i._)("div",U,[(0,i._)("div",C,[(0,i._)("h5",E,[(0,i.Wm)(l,{to:{name:"home"},class:"logo text-deep border-dark"},{default:(0,i.w5)((()=>[(0,i.Uk)(" Rolling ")])),_:1})])]),(0,i._)("div",N,[(0,i._)("ul",j,[(0,i._)("li",q,[(0,i.Wm)(l,{to:{name:"產品"},class:"nav-link d-flex align-items-center fs-5 p-0 m-0 font-family-taipei"},{default:(0,i.w5)((()=>[(0,i.Uk)(" 產品")])),_:1})]),(0,i._)("li",H,[(0,i.Wm)(l,{to:{name:"訂單"},class:"nav-link d-flex align-items-center fs-5 p-0 m-0 font-family-taipei"},{default:(0,i.w5)((()=>[(0,i.Uk)(" 訂單 ")])),_:1})]),(0,i._)("li",z,[(0,i.Wm)(l,{to:{name:"優惠券"},class:"nav-link d-flex align-items-center fs-5 p-0 m-0 font-family-taipei"},{default:(0,i.w5)((()=>[(0,i.Uk)(" 優惠券 ")])),_:1})]),(0,i._)("li",K,[(0,i.Wm)(l,{to:{name:"文章"},class:"nav-link d-flex align-items-center fs-5 p-0 m-0 font-family-taipei"},{default:(0,i.w5)((()=>[(0,i.Uk)(" 文章 ")])),_:1})])])])]),(0,i._)("div",P,[(0,i._)("div",A,[(0,i._)("ul",Q,[(0,i._)("li",R,[(0,i._)("a",{class:"nav-link d-flex align-items-center fs-5 p-0 m-0 router-link",href:"#",onClick:t[0]||(t[0]=(0,m.iM)(((...e)=>o.LogOut&&o.LogOut(...e)),["prevent"]))}," Log out ")])])])])])])}var J={data(){return{isMenuOpen:!1}},methods:{LogOut(){this.isLoading=!0;const e="https://vue3-course-api.hexschool.io/logout";this.$http.post(e,this.user).then((e=>{e.data.success&&(this.isLoading=!1,this.$router.push("/r"))}))},toggleOffcanvas(){this.isMenuOpen=!this.isMenuOpen,this.isOffcanvasOpen=!this.isOffcanvasOpen,this.isOffcanvasOpen?document.body.style.overflow="hidden":document.body.style.overflow="auto"}},watch:{$route(){this.isMenuOpen=!1,document.body.style.overflow="auto"}}};const B=(0,Z.Z)(J,[["render",Y]]);var F=B,G={components:{ToastList:d.Z,NavbarSm:I,NavbarLg:F},data(){return{isMenuOpen:!1}},methods:{async LogOut(){try{this.isLoading=!0;const e="https://vue3-course-api.hexschool.io/logout",t=await r.Z.post(e,this.user);t.data.success&&(this.isLoading=!1,this.$router.push("/r"))}catch(e){console.error("Logout Error:",e),this.isLoading=!1}this.isLoading=!1},toggleOffcanvas(){this.isMenuOpen=!this.isMenuOpen,this.isOffcanvasOpen=!this.isOffcanvasOpen,this.isOffcanvasOpen?document.body.style.overflow="hidden":document.body.style.overflow="auto"}},watch:{$route(){this.isMenuOpen=!1,document.body.style.overflow="auto"}},async created(){const e=document.cookie.replace(/(?:(?:^|.*;\s*)rollingToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=e;const t="https://vue3-course-api.hexschool.io/api/user/check";try{const e=await r.Z.post(t,this.user);e.data.success||this.$router.push("/r")}catch(s){console.error("Error:",s),this.$router.push("/r")}},provide(){return{emitter:c.Z,pushMessageState:u.Z}}};const V=(0,Z.Z)(G,[["render",l]]);var X=V}}]);
//# sourceMappingURL=185.c8720aa6.js.map