"use strict";(self.webpackChunkparasola=self.webpackChunkparasola||[]).push([[9506],{3905:(e,r,t)=>{t.d(r,{Zo:()=>p,kt:()=>f});var n=t(7294);function i(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function o(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){i(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function l(e,r){if(null==e)return{};var t,n,i=function(e,r){if(null==e)return{};var t,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(i[t]=e[t]);return i}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var s=n.createContext({}),c=function(e){var r=n.useContext(s),t=r;return e&&(t="function"==typeof e?e(r):o(o({},r),e)),t},p=function(e){var r=c(e.components);return n.createElement(s.Provider,{value:r},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},b=n.forwardRef((function(e,r){var t=e.components,i=e.mdxType,a=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(t),b=i,f=u["".concat(s,".").concat(b)]||u[b]||d[b]||a;return t?n.createElement(f,o(o({ref:r},p),{},{components:t})):n.createElement(f,o({ref:r},p))}));function f(e,r){var t=arguments,i=r&&r.mdxType;if("string"==typeof e||i){var a=t.length,o=new Array(a);o[0]=b;var l={};for(var s in r)hasOwnProperty.call(r,s)&&(l[s]=r[s]);l.originalType=e,l[u]="string"==typeof e?e:i,o[1]=l;for(var c=2;c<a;c++)o[c]=t[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,t)}b.displayName="MDXCreateElement"},832:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>s,contentTitle:()=>o,default:()=>d,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var n=t(7462),i=(t(7294),t(3905));const a={},o="Creating Binaries",l={unversionedId:"guides/creating-binaries",id:"guides/creating-binaries",title:"Creating Binaries",description:"This guide describes how to create binaries.",source:"@site/docs/guides/creating-binaries.md",sourceDirName:"guides",slug:"/guides/creating-binaries",permalink:"/guides/creating-binaries",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"guides",previous:{title:"Creating Artifacts",permalink:"/guides/creating-artifact-versions"},next:{title:"Creating Bundles",permalink:"/guides/creating-bundles"}},s={},c=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Create Binary",id:"create-binary",level:2},{value:"CLI",id:"cli",level:3},{value:"API",id:"api",level:3},{value:"Web Console",id:"web-console",level:3}],p={toc:c},u="wrapper";function d(e){let{components:r,...t}=e;return(0,i.kt)(u,(0,n.Z)({},p,t,{components:r,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"creating-binaries"},"Creating Binaries"),(0,i.kt)("p",null,"This guide describes how to create binaries."),(0,i.kt)("p",null,"To learn more about Peridio binaries in general, see the ",(0,i.kt)("a",{parentName:"p",href:"/reference/binaries"},"binaries"),"\nreference."),(0,i.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/peridio/morel/releases"},"Peridio CLI"),".",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Last tested with version 0.4.0.")))),(0,i.kt)("h2",{id:"create-binary"},"Create Binary"),(0,i.kt)("h3",{id:"cli"},"CLI"),(0,i.kt)("p",null,"Create the binary's record."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-console"},"peridio binaries create \\\n  --artifact-version-id uuid \\\n  --version 0.1.0\n")),(0,i.kt)("p",null,"Upload the binary's content."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-console"},"peridio binaries upload \\\n  --binary-id uuid \\\n  --path /tmp/my-binary\n")),(0,i.kt)("h3",{id:"api"},"API"),(0,i.kt)("p",null,"Use the Peridio Admin API\n",(0,i.kt)("a",{parentName:"p",href:"/admin-api#tag/artifacts/operations/create-a-binary"},"Create a binary")," endpoint."),(0,i.kt)("h3",{id:"web-console"},"Web Console"),(0,i.kt)("p",null,"See the ",(0,i.kt)("a",{parentName:"p",href:"https://console.cremini.peridio.com"},"Peridio Web Console"),"."))}d.isMDXComponent=!0}}]);