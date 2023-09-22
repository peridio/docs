"use strict";(self.webpackChunkparasola=self.webpackChunkparasola||[]).push([[4957],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>y});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),s=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},c=function(e){var t=s(e.components);return n.createElement(p.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=s(r),m=a,y=u["".concat(p,".").concat(m)]||u[m]||d[m]||i;return r?n.createElement(y,o(o({ref:t},c),{},{components:r})):n.createElement(y,o({ref:t},c))}));function y(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=m;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[u]="string"==typeof e?e:a,o[1]=l;for(var s=2;s<i;s++)o[s]=r[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},6494:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var n=r(7462),a=(r(7294),r(3905));const i={},o="Creating Deployments",l={unversionedId:"guides/creating-deployments",id:"guides/creating-deployments",title:"Creating Deployments",description:"This guide describes how to create deployments.",source:"@site/docs/guides/creating-deployments.md",sourceDirName:"guides",slug:"/guides/creating-deployments",permalink:"/guides/creating-deployments",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"guides",previous:{title:"Creating Bundles",permalink:"/guides/creating-bundles"},next:{title:"Creating Releases",permalink:"/guides/creating-releases"}},p={},s=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Create Deployment",id:"create-deployment",level:2},{value:"Web Console",id:"web-console",level:3},{value:"CLI",id:"cli",level:3},{value:"API",id:"api",level:3}],c={toc:s},u="wrapper";function d(e){let{components:t,...r}=e;return(0,a.kt)(u,(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"creating-deployments"},"Creating Deployments"),(0,a.kt)("p",null,"This guide describes how to create deployments."),(0,a.kt)("p",null,"To learn more about Peridio deployments in general, see the ",(0,a.kt)("a",{parentName:"p",href:"/reference/deployments"},"deployments")," reference."),(0,a.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/peridio/morel/releases"},"Peridio CLI"),".",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"Last tested with version 0.8.0.")))),(0,a.kt)("p",null,"In order to create a deployment it must be associated with a preexisting product and firmware. To learn how to create a product, see the ",(0,a.kt)("a",{parentName:"p",href:"/guides/creating-products"},"creating products")," guide. To learn how to create firmware, see the ",(0,a.kt)("a",{parentName:"p",href:"/guides/creating-firmware"},"creating firmware")," guide."),(0,a.kt)("h2",{id:"create-deployment"},"Create Deployment"),(0,a.kt)("h3",{id:"web-console"},"Web Console"),(0,a.kt)("p",null,"See the ",(0,a.kt)("a",{parentName:"p",href:"https://console.cremini.peridio.com"},"Peridio Web Console"),"."),(0,a.kt)("h3",{id:"cli"},"CLI"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'peridio deployments create \\\n  --firmware-uuid abc \\\n  --name "My Deployment" \\\n  --product-name "My Product" \\\n  --tags tag1,tag2\n')),(0,a.kt)("h3",{id:"api"},"API"),(0,a.kt)("p",null,"Use the Peridio Admin API ",(0,a.kt)("a",{parentName:"p",href:"/admin-api#deployments/operation/create-a-deployment"},"create-a-deployment")," endpoint."))}d.isMDXComponent=!0}}]);