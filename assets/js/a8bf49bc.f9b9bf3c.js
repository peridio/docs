"use strict";(self.webpackChunkparasola=self.webpackChunkparasola||[]).push([[7084],{3905:(e,r,t)=>{t.d(r,{Zo:()=>p,kt:()=>y});var n=t(7294);function i(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function o(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){i(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function s(e,r){if(null==e)return{};var t,n,i=function(e,r){if(null==e)return{};var t,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(i[t]=e[t]);return i}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var c=n.createContext({}),l=function(e){var r=n.useContext(c),t=r;return e&&(t="function"==typeof e?e(r):o(o({},r),e)),t},p=function(e){var r=l(e.components);return n.createElement(c.Provider,{value:r},e.children)},f={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},u=n.forwardRef((function(e,r){var t=e.components,i=e.mdxType,a=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=l(t),y=i,m=u["".concat(c,".").concat(y)]||u[y]||f[y]||a;return t?n.createElement(m,o(o({ref:r},p),{},{components:t})):n.createElement(m,o({ref:r},p))}));function y(e,r){var t=arguments,i=r&&r.mdxType;if("string"==typeof e||i){var a=t.length,o=new Array(a);o[0]=u;var s={};for(var c in r)hasOwnProperty.call(r,c)&&(s[c]=r[c]);s.originalType=e,s.mdxType="string"==typeof e?e:i,o[1]=s;for(var l=2;l<a;l++)o[l]=t[l];return n.createElement.apply(null,o)}return n.createElement.apply(null,t)}u.displayName="MDXCreateElement"},9716:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>c,contentTitle:()=>o,default:()=>f,frontMatter:()=>a,metadata:()=>s,toc:()=>l});var n=t(7462),i=(t(7294),t(3905));t(8209);const a={title:"Firmware Signing Keys"},o=void 0,s={unversionedId:"reference/firmware-signing-keys",id:"reference/firmware-signing-keys",title:"Firmware Signing Keys",description:"Firmware signing keys are ED25519 keys which consist of a public/private key pair.",source:"@site/docs/reference/firmware-signing-keys.md",sourceDirName:"reference",slug:"/reference/firmware-signing-keys",permalink:"/reference/firmware-signing-keys",draft:!1,tags:[],version:"current",frontMatter:{title:"Firmware Signing Keys"},sidebar:"reference",previous:{title:"Devices",permalink:"/reference/devices"},next:{title:"Firmwares",permalink:"/reference/firmwares"}},c={},l=[{value:"Format",id:"format",level:2}],p={toc:l};function f(e){let{components:r,...t}=e;return(0,i.kt)("wrapper",(0,n.Z)({},p,t,{components:r,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Firmware signing keys are ED25519 keys which consist of a public/private key pair."),(0,i.kt)("p",null,"The private portion of firmware signing keys are used by users to sign firmwares."),(0,i.kt)("p",null,"The public portion of firmware signing keys are provided to Peridio as well as devices to facilitate the attestation of firmwares' signatures."),(0,i.kt)("p",null,"To learn more about how to use firmware signing keys, see the ",(0,i.kt)("a",{parentName:"p",href:"/guides/creating-firmware-signing-keys"},"creating firmware signing keys")," guide."),(0,i.kt)("h2",{id:"format"},"Format"),(0,i.kt)("p",null,"The public key is the base64 encoding of the raw 32 byte public key. The private key is the base64 encoding of 64 bytes where the first 32 bytes are the raw private key and the last 32 bytes are the raw public key."))}f.isMDXComponent=!0},8209:(e,r,t)=>{t(7294)}}]);