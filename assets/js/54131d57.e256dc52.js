"use strict";(self.webpackChunkparasola=self.webpackChunkparasola||[]).push([[9852],{3905:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>m});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},c=Object.keys(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var l=n.createContext({}),p=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},s=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},f="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,c=e.originalType,l=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),f=p(r),d=i,m=f["".concat(l,".").concat(d)]||f[d]||u[d]||c;return r?n.createElement(m,a(a({ref:t},s),{},{components:r})):n.createElement(m,a({ref:t},s))}));function m(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var c=r.length,a=new Array(c);a[0]=d;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o[f]="string"==typeof e?e:i,a[1]=o;for(var p=2;p<c;p++)a[p]=r[p];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},622:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>u,frontMatter:()=>c,metadata:()=>o,toc:()=>p});var n=r(7462),i=(r(7294),r(3905));const c={},a=void 0,o={unversionedId:"cli/device-certificates/delete",id:"cli/device-certificates/delete",title:"delete",description:"",source:"@site/docs/cli/device-certificates/delete.md",sourceDirName:"cli/device-certificates",slug:"/cli/device-certificates/delete",permalink:"/cli/device-certificates/delete",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"cli",previous:{title:"create",permalink:"/cli/device-certificates/create"},next:{title:"get",permalink:"/cli/device-certificates/get"}},l={},p=[],s={toc:p},f="wrapper";function u(e){let{components:t,...r}=e;return(0,i.kt)(f,(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"Usage: peridio device-certificates delete --device-identifier <DEVICE_IDENTIFIER> --product-name <PRODUCT_NAME> --certificate-serial <CERTIFICATE_SERIAL>\n\nOptions:\n      --device-identifier <DEVICE_IDENTIFIER>    \n      --product-name <PRODUCT_NAME>              \n      --certificate-serial <CERTIFICATE_SERIAL>  \n  -h, --help                                     Print help\n\n")))}u.isMDXComponent=!0}}]);