"use strict";(self.webpackChunkparasola=self.webpackChunkparasola||[]).push([[9009],{3905:(e,r,t)=>{t.d(r,{Zo:()=>c,kt:()=>d});var i=t(7294);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function n(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);r&&(i=i.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,i)}return t}function o(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?n(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):n(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function u(e,r){if(null==e)return{};var t,i,a=function(e,r){if(null==e)return{};var t,i,a={},n=Object.keys(e);for(i=0;i<n.length;i++)t=n[i],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(i=0;i<n.length;i++)t=n[i],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=i.createContext({}),p=function(e){var r=i.useContext(l),t=r;return e&&(t="function"==typeof e?e(r):o(o({},r),e)),t},c=function(e){var r=p(e.components);return i.createElement(l.Provider,{value:r},e.children)},s="mdxType",f={inlineCode:"code",wrapper:function(e){var r=e.children;return i.createElement(i.Fragment,{},r)}},m=i.forwardRef((function(e,r){var t=e.components,a=e.mdxType,n=e.originalType,l=e.parentName,c=u(e,["components","mdxType","originalType","parentName"]),s=p(t),m=a,d=s["".concat(l,".").concat(m)]||s[m]||f[m]||n;return t?i.createElement(d,o(o({ref:r},c),{},{components:t})):i.createElement(d,o({ref:r},c))}));function d(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var n=t.length,o=new Array(n);o[0]=m;var u={};for(var l in r)hasOwnProperty.call(r,l)&&(u[l]=r[l]);u.originalType=e,u[s]="string"==typeof e?e:a,o[1]=u;for(var p=2;p<n;p++)o[p]=t[p];return i.createElement.apply(null,o)}return i.createElement.apply(null,t)}m.displayName="MDXCreateElement"},8757:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>l,contentTitle:()=>o,default:()=>f,frontMatter:()=>n,metadata:()=>u,toc:()=>p});var i=t(7462),a=(t(7294),t(3905));const n={},o="Creating Firmware",u={unversionedId:"guides/creating-firmware",id:"guides/creating-firmware",title:"Creating Firmware",description:"This guide describes how to create firmware.",source:"@site/docs/guides/creating-firmware.md",sourceDirName:"guides",slug:"/guides/creating-firmware",permalink:"/guides/creating-firmware",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"guides",previous:{title:"Creating Binary Signatures",permalink:"/guides/creating-binary-signatures"},next:{title:"Creating Signing Keys",permalink:"/guides/creating-signing-keys"}},l={},p=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"fwup Archive Creation",id:"fwup-archive-creation",level:2},{value:"Create a Dummy Asset",id:"create-a-dummy-asset",level:3},{value:"Create a fwup conf",id:"create-a-fwup-conf",level:3},{value:"Create a fwup Archive",id:"create-a-fwup-archive",level:3},{value:"Sign the fwup Archive",id:"sign-the-fwup-archive",level:3},{value:"Verify the fwup Archive is Signed",id:"verify-the-fwup-archive-is-signed",level:3},{value:"Submission to Peridio",id:"submission-to-peridio",level:2},{value:"Web Console",id:"web-console",level:3},{value:"CLI",id:"cli",level:3},{value:"API",id:"api",level:3}],c={toc:p},s="wrapper";function f(e){let{components:r,...t}=e;return(0,a.kt)(s,(0,i.Z)({},c,t,{components:r,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"creating-firmware"},"Creating Firmware"),(0,a.kt)("p",null,"This guide describes how to create firmware."),(0,a.kt)("p",null,"To learn more about Peridio firmware in general, see the ",(0,a.kt)("a",{parentName:"p",href:"/reference/firmware"},"firmware")," reference."),(0,a.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/fwup-home/fwup"},"fwup CLI"),".",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"Last tested with version 1.9.1."))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/peridio/morel/releases"},"Peridio CLI"),".",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"Last tested with version 0.8.0.")))),(0,a.kt)("p",null,"In order to create a firmware it must be associated with a preexisting product. To learn how to create a product, see the ",(0,a.kt)("a",{parentName:"p",href:"/guides/creating-products"},"creating products")," guide."),(0,a.kt)("h2",{id:"fwup-archive-creation"},"fwup Archive Creation"),(0,a.kt)("h3",{id:"create-a-dummy-asset"},"Create a Dummy Asset"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'echo "russet" > tuber.txt\n')),(0,a.kt)("h3",{id:"create-a-fwup-conf"},"Create a fwup conf"),(0,a.kt)("p",null,"Create ",(0,a.kt)("inlineCode",{parentName:"p"},"fwup.conf")," containing:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'meta-architecture = "arm"\nmeta-misc = "{\\"foo\\":\\"bar\\",\\"baz\\":12}"\nmeta-platform = "Jetson Nano"\nmeta-product = "Smart Potato"\nmeta-vcs-identifier = "23758867219c8d84c8363316e6dd2f9fd7ae3049"\nmeta-version = "1.0.0"\n\nfile-resource tuber.txt {\n  host-path = "tuber.txt"\n}\n')),(0,a.kt)("h3",{id:"create-a-fwup-archive"},"Create a fwup Archive"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-text"},"fwup \\\n  -c \\\n  -f fwup.conf \\\n  -o demo.fw\n")),(0,a.kt)("h3",{id:"sign-the-fwup-archive"},"Sign the fwup Archive"),(0,a.kt)("p",null,"See ",(0,a.kt)("a",{parentName:"p",href:"/reference/signing-keys"},"signing keys"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-text"},"fwup \\\n  -S \\\n  -s fwup-key.priv \\\n  -i demo.fw \\\n  -o signed-demo.fw\n")),(0,a.kt)("h3",{id:"verify-the-fwup-archive-is-signed"},"Verify the fwup Archive is Signed"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-text"},"fwup \\\n  -m \\\n  -p fwup-key.pub \\\n  -i signed-demo.fw\n")),(0,a.kt)("p",null,"A failure would print an error like:"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"fwup: Firmware archive's meta.conf fails digital signature verification.")),(0,a.kt)("h2",{id:"submission-to-peridio"},"Submission to Peridio"),(0,a.kt)("h3",{id:"web-console"},"Web Console"),(0,a.kt)("p",null,"See the ",(0,a.kt)("a",{parentName:"p",href:"https://console.cremini.peridio.com"},"Peridio Web Console"),"."),(0,a.kt)("h3",{id:"cli"},"CLI"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'peridio firmwares create \\\n  --firmware-path signed-demo.fw \\\n  --product-name "Smart Potato"\n')),(0,a.kt)("h3",{id:"api"},"API"),(0,a.kt)("p",null,"Use the Peridio Admin API ",(0,a.kt)("a",{parentName:"p",href:"/admin-api#firmware/operation/create-a-firmware"},"create a firmware")," endpoint."))}f.isMDXComponent=!0}}]);