"use strict";(self.webpackChunkparasola=self.webpackChunkparasola||[]).push([[5694],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>y});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},s=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),u=p(n),g=i,y=u["".concat(c,".").concat(g)]||u[g]||d[g]||a;return n?r.createElement(y,o(o({ref:t},s),{},{components:n})):r.createElement(y,o({ref:t},s))}));function y(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=g;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[u]="string"==typeof e?e:i,o[1]=l;for(var p=2;p<a;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}g.displayName="MDXCreateElement"},7102:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>a,metadata:()=>l,toc:()=>p});var r=n(7462),i=(n(7294),n(3905));const a={title:"create"},o="peridio signing-keys create",l={unversionedId:"cli/signing-keys/create",id:"cli/signing-keys/create",title:"create",description:"Create a signing key.",source:"@site/docs/cli/signing-keys/create.md",sourceDirName:"cli/signing-keys",slug:"/cli/signing-keys/create",permalink:"/cli/signing-keys/create",draft:!1,tags:[],version:"current",frontMatter:{title:"create"},sidebar:"cli",previous:{title:"update-user",permalink:"/cli/products/update-user"},next:{title:"delete",permalink:"/cli/signing-keys/delete"}},c={},p=[{value:"Flags",id:"flags",level:2},{value:"Options",id:"options",level:2},{value:"Required",id:"required",level:3}],s={toc:p},u="wrapper";function d(e){let{components:t,...n}=e;return(0,i.kt)(u,(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"peridio-signing-keys-create"},"peridio signing-keys create"),(0,i.kt)("p",null,"Create a signing key."),(0,i.kt)("h2",{id:"flags"},"Flags"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"-h"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"--help")),(0,i.kt)("p",null,"Prints help information."),(0,i.kt)("h2",{id:"options"},"Options"),(0,i.kt)("h3",{id:"required"},"Required"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"--key <key>")),(0,i.kt)("p",null,"The base64 encoding of the raw 32 byte public key."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"--name <name>")),(0,i.kt)("p",null,"The name of the key."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"--organization-name <organization-name>")),(0,i.kt)("p",null,"The organization to interact with."))}d.isMDXComponent=!0}}]);