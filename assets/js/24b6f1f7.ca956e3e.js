"use strict";(self.webpackChunkparasola=self.webpackChunkparasola||[]).push([[2133],{3905:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>m});var n=r(7294);function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){c(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,c=function(e,t){if(null==e)return{};var r,n,c={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(c[r]=e[r]);return c}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(c[r]=e[r])}return c}var l=n.createContext({}),p=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},s=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},u="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,c=e.mdxType,a=e.originalType,l=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),u=p(r),d=c,m=u["".concat(l,".").concat(d)]||u[d]||f[d]||a;return r?n.createElement(m,i(i({ref:t},s),{},{components:r})):n.createElement(m,i({ref:t},s))}));function m(e,t){var r=arguments,c=t&&t.mdxType;if("string"==typeof e||c){var a=r.length,i=new Array(a);i[0]=d;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o[u]="string"==typeof e?e:c,i[1]=o;for(var p=2;p<a;p++)i[p]=r[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},969:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>f,frontMatter:()=>a,metadata:()=>o,toc:()=>p});var n=r(7462),c=(r(7294),r(3905));const a={},i=void 0,o={unversionedId:"cli/devices/create",id:"cli/devices/create",title:"create",description:"",source:"@site/docs/cli/devices/create.md",sourceDirName:"cli/devices",slug:"/cli/devices/create",permalink:"/cli/devices/create",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"cli",previous:{title:"authenticate",permalink:"/cli/devices/authenticate"},next:{title:"delete",permalink:"/cli/devices/delete"}},l={},p=[],s={toc:p},u="wrapper";function f(e){let{components:t,...r}=e;return(0,c.kt)(u,(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre"},"Usage: peridio devices create [OPTIONS] --identifier <IDENTIFIER> --product-name <PRODUCT_NAME>\n\nOptions:\n      --description <DESCRIPTION>                \n      --healthy <HEALTHY>                        [possible values: true, false]\n      --identifier <IDENTIFIER>                  \n      --last-communication <LAST_COMMUNICATION>  \n      --product-name <PRODUCT_NAME>              \n      --tags <TAGS>                              \n      --target <TARGET>                          \n  -h, --help                                     Print help\n\n")))}f.isMDXComponent=!0}}]);