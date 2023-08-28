"use strict";(self.webpackChunkparasola=self.webpackChunkparasola||[]).push([[2999],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>v});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var s=n.createContext({}),l=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},p=function(e){var t=l(e.components);return n.createElement(s.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),u=l(r),v=i,d=u["".concat(s,".").concat(v)]||u[v]||f[v]||o;return r?n.createElement(d,a(a({ref:t},p),{},{components:r})):n.createElement(d,a({ref:t},p))}));function v(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=r.length,a=new Array(o);a[0]=u;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:i,a[1]=c;for(var l=2;l<o;l++)a[l]=r[l];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},2030:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>a,default:()=>f,frontMatter:()=>o,metadata:()=>c,toc:()=>l});var n=r(7462),i=(r(7294),r(3905));r(8209);const o={title:"Just in Time Provisioning"},a=void 0,c={unversionedId:"reference/just-in-time-provisioning",id:"reference/just-in-time-provisioning",title:"Just in Time Provisioning",description:'Configuring just in time provisioning for a CA Certificate enables a device to be automatically provisioned, "just in time", the moment of its first connection to the Peridio Device API. This alleviates the burden of having to take any per device onboarding action.',source:"@site/docs/reference/just-in-time-provisioning.md",sourceDirName:"reference",slug:"/reference/just-in-time-provisioning",permalink:"/reference/just-in-time-provisioning",draft:!1,tags:[],version:"current",frontMatter:{title:"Just in Time Provisioning"},sidebar:"reference",previous:{title:"Firmwares",permalink:"/reference/firmwares"},next:{title:"Organizations",permalink:"/reference/organizations"}},s={},l=[{value:"Provisioning Flow",id:"provisioning-flow",level:2}],p={toc:l};function f(e){let{components:t,...r}=e;return(0,i.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Configuring just in time provisioning for a ",(0,i.kt)("a",{parentName:"p",href:"ca-certificates"},"CA Certificate")," enables a ",(0,i.kt)("a",{parentName:"p",href:"devices"},"device"),' to be automatically provisioned, "just in time", the moment of its first connection to the ',(0,i.kt)("a",{parentName:"p",href:"../device-api"},"Peridio Device API"),". This alleviates the burden of having to take any per device onboarding action."),(0,i.kt)("h2",{id:"provisioning-flow"},"Provisioning Flow"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"An unprovisioned device connects to the Peridio Device API for the first time ever."),(0,i.kt)("li",{parentName:"ol"},"Peridio validates that the device's certificate is signed by a configured and unexpired CA Certificate."),(0,i.kt)("li",{parentName:"ol"},"Peridio provisions the device by creating a record of it as well as its public certificate and automatically assigning the attributes configured against the relevant CA certificate's JITP config (product, cohort, tags, and description).")))}f.isMDXComponent=!0},8209:(e,t,r)=>{r(7294)}}]);