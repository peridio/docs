"use strict";(self.webpackChunkparasola=self.webpackChunkparasola||[]).push([[1146],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>m});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var p=n.createContext({}),c=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},u=function(e){var t=c(e.components);return n.createElement(p.Provider,{value:t},e.children)},s="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,i=e.originalType,p=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),s=c(r),f=o,m=s["".concat(p,".").concat(f)]||s[f]||d[f]||i;return r?n.createElement(m,a(a({ref:t},u),{},{components:r})):n.createElement(m,a({ref:t},u))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=r.length,a=new Array(i);a[0]=f;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[s]="string"==typeof e?e:o,a[1]=l;for(var c=2;c<i;c++)a[c]=r[c];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},9064:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>a,default:()=>d,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var n=r(7462),o=(r(7294),r(3905));const i={title:"update"},a="peridio cohorts update",l={unversionedId:"cli/cohorts/update",id:"cli/cohorts/update",title:"update",description:"Update an cohort.",source:"@site/docs/cli/cohorts/update.md",sourceDirName:"cli/cohorts",slug:"/cli/cohorts/update",permalink:"/cli/cohorts/update",draft:!1,tags:[],version:"current",frontMatter:{title:"update"},sidebar:"cli",previous:{title:"retreive",permalink:"/cli/cohorts/retrieve"}},p={},c=[{value:"Flags",id:"flags",level:2},{value:"Options",id:"options",level:3},{value:"Required",id:"required",level:3}],u={toc:c},s="wrapper";function d(e){let{components:t,...r}=e;return(0,o.kt)(s,(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"peridio-cohorts-update"},"peridio cohorts update"),(0,o.kt)("p",null,"Update an cohort."),(0,o.kt)("h2",{id:"flags"},"Flags"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"-h"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"--help")),(0,o.kt)("p",null,"Prints help information."),(0,o.kt)("h3",{id:"options"},"Options"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"--description <description>")),(0,o.kt)("p",null,"The cohort description."),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"--name <name>")),(0,o.kt)("p",null,"The name of the cohort."),(0,o.kt)("h3",{id:"required"},"Required"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"--cohort_prn <cohort_prn>")),(0,o.kt)("p",null,"The Peridio Resource Name (PRN) of the cohort."))}d.isMDXComponent=!0}}]);