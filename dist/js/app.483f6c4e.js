(function(){"use strict";var e={8267:function(e,n,t){var o=t(9963),r=t(9876),a=t(6154),i=t(2346),c=t(5476),u=(t(8877),t(2954)),d=t(2387),l=t(6391),s=t(2389);function p(e){const n=parseInt(e,10);return`${n.toFixed(0).replace(/./g,((e,n,t)=>n&&"."!==e&&(t.length-n)%3===0?`, ${e}`.replace(/\s/g,""):e))}`}function f(e){const n=new Date(1e3*e);return n.toLocaleDateString()}var m=t(6252);function h(e,n){const t=(0,m.up)("router-view");return(0,m.wg)(),(0,m.j4)(t)}var b=t(3744);const v={},g=(0,b.Z)(v,[["render",h]]);var y=g,P=t(2201);const w=[{path:"/",component:()=>Promise.all([t.e(658),t.e(906),t.e(608)]).then(t.bind(t,3608)),children:[{path:"",name:"home",component:()=>t.e(829).then(t.bind(t,401)),meta:{hideFooter:!0}},{path:"products",name:"所有產品",component:()=>Promise.all([t.e(658),t.e(439)]).then(t.bind(t,3439))},{path:"product/:productId",name:"單一產品",component:()=>Promise.all([t.e(658),t.e(786)]).then(t.bind(t,7786))},{path:"comparison",name:"車款比較",component:()=>Promise.all([t.e(658),t.e(479)]).then(t.bind(t,8982))},{path:"articles",name:"文章總覽",component:()=>Promise.all([t.e(658),t.e(266)]).then(t.bind(t,9266))},{path:"article/:articleId",name:"單一文章",component:()=>Promise.all([t.e(658),t.e(806)]).then(t.bind(t,3806))},{path:"search",name:"搜尋",component:()=>Promise.all([t.e(658),t.e(375)]).then(t.bind(t,7375)),meta:{hideComponent:!0}},{path:"cart",name:"購物車",component:()=>t.e(39).then(t.bind(t,9039))},{path:"checkout",name:"訂單填寫",component:()=>Promise.all([t.e(658),t.e(554)]).then(t.bind(t,2554)),meta:{hideComponent:!0}},{path:"order/:orderId",name:"訂單確認",component:()=>t.e(580).then(t.bind(t,5580)),meta:{hideComponent:!0}},{path:"/:pathMath(.*)*",name:"404",component:()=>Promise.all([t.e(658),t.e(264)]).then(t.bind(t,6264))}]},{path:"/r",name:"登入",component:()=>Promise.all([t.e(658),t.e(906),t.e(540)]).then(t.bind(t,7540))},{path:"/dashboard",name:"後台",component:()=>Promise.all([t.e(658),t.e(906),t.e(185)]).then(t.bind(t,3185)),children:[{path:"products",name:"產品",component:()=>Promise.all([t.e(658),t.e(906),t.e(820),t.e(824)]).then(t.bind(t,5824))},{path:"orders",name:"訂單",component:()=>Promise.all([t.e(906),t.e(820),t.e(208)]).then(t.bind(t,7208))},{path:"coupons",name:"優惠券",component:()=>Promise.all([t.e(906),t.e(820),t.e(144)]).then(t.bind(t,4144))},{path:"articles",name:"文章",component:()=>Promise.all([t.e(906),t.e(820),t.e(627)]).then(t.bind(t,6627))}]}],O=(0,P.p7)({history:(0,P.r5)(),routes:w});O.beforeEach(((e,n,t)=>{e.path.startsWith("/dashboard")?(document.body.style.backgroundColor="#e7e6e6",O.options.linkActiveClass="active-nav-item"):"/r"===e.path?document.body.style.backgroundColor="#e7e6e6":document.body.style.backgroundColor="",window.scrollTo({top:0,behavior:"smooth"}),t()}));var k=O;(0,u.aH)("required",d.C1),(0,u.aH)("email",d.Do),(0,u.aH)("min",d.VV),(0,u.jQ)({generateMessage:(0,l.NC)({zh_TW:s}),validateOnInput:!0}),(0,l.i_)("zh_TW");const j=(0,r.WB)(),C=(0,o.ri)(y);C.config.globalProperties.$filters={currency:p,date:f},C.component("Loading",c.Z),C.use(i.Z,a.Z),C.component("Form",u.l0),C.component("Field",u.gN),C.component("ErrorMessage",u.Bc),C.use(j),C.use(k),C.mount("#app")}},n={};function t(o){var r=n[o];if(void 0!==r)return r.exports;var a=n[o]={id:o,loaded:!1,exports:{}};return e[o].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}t.m=e,function(){t.amdO={}}(),function(){var e=[];t.O=function(n,o,r,a){if(!o){var i=1/0;for(l=0;l<e.length;l++){o=e[l][0],r=e[l][1],a=e[l][2];for(var c=!0,u=0;u<o.length;u++)(!1&a||i>=a)&&Object.keys(t.O).every((function(e){return t.O[e](o[u])}))?o.splice(u--,1):(c=!1,a<i&&(i=a));if(c){e.splice(l--,1);var d=r();void 0!==d&&(n=d)}}return n}a=a||0;for(var l=e.length;l>0&&e[l-1][2]>a;l--)e[l]=e[l-1];e[l]=[o,r,a]}}(),function(){t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,{a:n}),n}}(),function(){t.d=function(e,n){for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})}}(),function(){t.f={},t.e=function(e){return Promise.all(Object.keys(t.f).reduce((function(n,o){return t.f[o](e,n),n}),[]))}}(),function(){t.u=function(e){return"js/"+e+"."+{39:"180f1657",144:"ba3b4d0c",185:"c8720aa6",208:"275e8935",264:"b14bd973",266:"3df6dd49",375:"d7fa0c4f",439:"06d388f8",479:"9fc58c5f",540:"d6248f4f",554:"5432b2f6",580:"7b1261f8",608:"e593b1e5",627:"6685d5b7",658:"e14f0f74",786:"e237a778",806:"3480b48a",820:"fbb50245",824:"d5de8d61",829:"4781c082",906:"130cd105"}[e]+".js"}}(),function(){t.miniCssF=function(e){}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.hmd=function(e){return e=Object.create(e),e.children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:function(){throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e}}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){var e={},n="rolling:";t.l=function(o,r,a,i){if(e[o])e[o].push(r);else{var c,u;if(void 0!==a)for(var d=document.getElementsByTagName("script"),l=0;l<d.length;l++){var s=d[l];if(s.getAttribute("src")==o||s.getAttribute("data-webpack")==n+a){c=s;break}}c||(u=!0,c=document.createElement("script"),c.charset="utf-8",c.timeout=120,t.nc&&c.setAttribute("nonce",t.nc),c.setAttribute("data-webpack",n+a),c.src=o),e[o]=[r];var p=function(n,t){c.onerror=c.onload=null,clearTimeout(f);var r=e[o];if(delete e[o],c.parentNode&&c.parentNode.removeChild(c),r&&r.forEach((function(e){return e(t)})),n)return n(t)},f=setTimeout(p.bind(null,void 0,{type:"timeout",target:c}),12e4);c.onerror=p.bind(null,c.onerror),c.onload=p.bind(null,c.onload),u&&document.head.appendChild(c)}}}(),function(){t.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){t.p="/rolling/"}(),function(){var e={143:0};t.f.j=function(n,o){var r=t.o(e,n)?e[n]:void 0;if(0!==r)if(r)o.push(r[2]);else{var a=new Promise((function(t,o){r=e[n]=[t,o]}));o.push(r[2]=a);var i=t.p+t.u(n),c=new Error,u=function(o){if(t.o(e,n)&&(r=e[n],0!==r&&(e[n]=void 0),r)){var a=o&&("load"===o.type?"missing":o.type),i=o&&o.target&&o.target.src;c.message="Loading chunk "+n+" failed.\n("+a+": "+i+")",c.name="ChunkLoadError",c.type=a,c.request=i,r[1](c)}};t.l(i,u,"chunk-"+n,n)}},t.O.j=function(n){return 0===e[n]};var n=function(n,o){var r,a,i=o[0],c=o[1],u=o[2],d=0;if(i.some((function(n){return 0!==e[n]}))){for(r in c)t.o(c,r)&&(t.m[r]=c[r]);if(u)var l=u(t)}for(n&&n(o);d<i.length;d++)a=i[d],t.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return t.O(l)},o=self["webpackChunkrolling"]=self["webpackChunkrolling"]||[];o.forEach(n.bind(null,0)),o.push=n.bind(null,o.push.bind(o))}();var o=t.O(void 0,[998],(function(){return t(8267)}));o=t.O(o)})();
//# sourceMappingURL=app.483f6c4e.js.map