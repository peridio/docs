"use strict";(self.webpackChunkparasola=self.webpackChunkparasola||[]).push([[9009],{3905:(e,r,t)=>{t.d(r,{Zo:()=>c,kt:()=>m});var a=t(7294);function i(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function n(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,a)}return t}function o(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?n(Object(t),!0).forEach((function(r){i(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):n(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function p(e,r){if(null==e)return{};var t,a,i=function(e,r){if(null==e)return{};var t,a,i={},n=Object.keys(e);for(a=0;a<n.length;a++)t=n[a],r.indexOf(t)>=0||(i[t]=e[t]);return i}(e,r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(a=0;a<n.length;a++)t=n[a],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var l=a.createContext({}),u=function(e){var r=a.useContext(l),t=r;return e&&(t="function"==typeof e?e(r):o(o({},r),e)),t},c=function(e){var r=u(e.components);return a.createElement(l.Provider,{value:r},e.children)},s={inlineCode:"code",wrapper:function(e){var r=e.children;return a.createElement(a.Fragment,{},r)}},f=a.forwardRef((function(e,r){var t=e.components,i=e.mdxType,n=e.originalType,l=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),f=u(t),m=i,d=f["".concat(l,".").concat(m)]||f[m]||s[m]||n;return t?a.createElement(d,o(o({ref:r},c),{},{components:t})):a.createElement(d,o({ref:r},c))}));function m(e,r){var t=arguments,i=r&&r.mdxType;if("string"==typeof e||i){var n=t.length,o=new Array(n);o[0]=f;var p={};for(var l in r)hasOwnProperty.call(r,l)&&(p[l]=r[l]);p.originalType=e,p.mdxType="string"==typeof e?e:i,o[1]=p;for(var u=2;u<n;u++)o[u]=t[u];return a.createElement.apply(null,o)}return a.createElement.apply(null,t)}f.displayName="MDXCreateElement"},8757:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>l,contentTitle:()=>o,default:()=>s,frontMatter:()=>n,metadata:()=>p,toc:()=>u});var a=t(7462),i=(t(7294),t(3905));t(8209);const n={},o="Creating Firmware",p={unversionedId:"guides/creating-firmware",id:"guides/creating-firmware",title:"Creating Firmware",description:"This guide describes how to create firmware.",source:"@site/docs/guides/creating-firmware.md",sourceDirName:"guides",slug:"/guides/creating-firmware",permalink:"/guides/creating-firmware",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"guides",previous:{title:"Creating Deployments",permalink:"/guides/creating-deployments"},next:{title:"Creating Firmware Signing Keys",permalink:"/guides/creating-firmware-signing-keys"}},l={},u=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"fwup Archive Creation",id:"fwup-archive-creation",level:2},{value:"Create a Dummy Asset",id:"create-a-dummy-asset",level:3},{value:"Create a fwup conf",id:"create-a-fwup-conf",level:3},{value:"Create a fwup Archive",id:"create-a-fwup-archive",level:3},{value:"Sign the fwup Archive",id:"sign-the-fwup-archive",level:3},{value:"Verify the fwup Archive is Signed",id:"verify-the-fwup-archive-is-signed",level:3},{value:"Submission to Peridio",id:"submission-to-peridio",level:2},{value:"Web Console",id:"web-console",level:3},{value:"CLI",id:"cli",level:3},{value:"API",id:"api",level:3}],c={toc:u};function s(e){let{components:r,...t}=e;return(0,i.kt)("wrapper",(0,a.Z)({},c,t,{components:r,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"creating-firmware"},"Creating Firmware"),(0,i.kt)("p",null,"This guide describes how to create firmware."),(0,i.kt)("p",null,"To learn more about Peridio firmware in general, see the ",(0,i.kt)("a",{parentName:"p",href:"/reference/firmwares"},"firmwares")," reference."),(0,i.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/fwup-home/fwup"},"fwup"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Last tested with version 1.9.1."))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/peridio/morel/releases"},"peridio"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Last tested with version 0.3.0.")))),(0,i.kt)("p",null,"In order to create a firmware it must be associated with a preexisting product. To learn how to create a product, see the ",(0,i.kt)("a",{parentName:"p",href:"/guides/creating-products"},"creating products")," guide."),(0,i.kt)("h2",{id:"fwup-archive-creation"},"fwup Archive Creation"),(0,i.kt)("h3",{id:"create-a-dummy-asset"},"Create a Dummy Asset"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'echo "russet" > tuber.txt\n')),(0,i.kt)("h3",{id:"create-a-fwup-conf"},"Create a fwup conf"),(0,i.kt)("p",null,"Create ",(0,i.kt)("inlineCode",{parentName:"p"},"fwup.conf")," containing:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'meta-architecture = "arm"\nmeta-misc = "{\\"foo\\":\\"bar\\",\\"baz\\":12}"\nmeta-platform = "Jetson Nano"\nmeta-product = "Smart Potato"\nmeta-vcs-identifier = "23758867219c8d84c8363316e6dd2f9fd7ae3049"\nmeta-version = "1.0.0"\n\nfile-resource tuber.txt {\n  host-path = "vegetables/tuber.txt"\n}\n')),(0,i.kt)("h3",{id:"create-a-fwup-archive"},"Create a fwup Archive"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-text"},"fwup \\\n  -c \\\n  -f fwup.conf \\\n  -o demo.fw\n")),(0,i.kt)("h3",{id:"sign-the-fwup-archive"},"Sign the fwup Archive"),(0,i.kt)("p",null,"See ",(0,i.kt)("a",{parentName:"p",href:"/reference/firmware-signing-keys"},"firmware signing keys"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-text"},"fwup \\\n  -S \\\n  -s fwup-key.priv \\\n  -i demo.fw \\\n  -o signed-demo.fw\n")),(0,i.kt)("h3",{id:"verify-the-fwup-archive-is-signed"},"Verify the fwup Archive is Signed"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-text"},"fwup \\\n  -m \\\n  -p fwup-key.pub \\\n  -i signed-demo.fw\n")),(0,i.kt)("p",null,"A failure would print an error like:"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"fwup: Firmware archive's meta.conf fails digital signature verification.")),(0,i.kt)("h2",{id:"submission-to-peridio"},"Submission to Peridio"),(0,i.kt)("h3",{id:"web-console"},"Web Console"),(0,i.kt)("p",null,"See the ",(0,i.kt)("a",{parentName:"p",href:"https://console.cremini.peridio.com"},"Peridio Web Console"),"."),(0,i.kt)("h3",{id:"cli"},"CLI"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'peridio firmwares create \\\n  --firmware-path signed-demo.fw \\\n  --product-name "Smart Potato"\n')),(0,i.kt)("h3",{id:"api"},"API"),(0,i.kt)("p",null,"Use the Peridio Admin API ",(0,i.kt)("a",{parentName:"p",href:"/admin-api#tag/Firmwares/paths/~1orgs~1%7Borganization_name%7D~1products~1%7Bproduct_name%7D~1firmwares/post"},"create firmware")," endpoint."))}s.isMDXComponent=!0},8209:(e,r,t)=>{t(7294)}}]);