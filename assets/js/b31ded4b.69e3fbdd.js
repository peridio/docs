"use strict";(self.webpackChunkparasola=self.webpackChunkparasola||[]).push([[3538],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>f});var i=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function n(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,i)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?n(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,i,r=function(e,t){if(null==e)return{};var a,i,r={},n=Object.keys(e);for(i=0;i<n.length;i++)a=n[i],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(i=0;i<n.length;i++)a=n[i],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=i.createContext({}),m=function(e){var t=i.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},p=function(e){var t=m(e.components);return i.createElement(s.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},c=i.forwardRef((function(e,t){var a=e.components,r=e.mdxType,n=e.originalType,s=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),u=m(a),c=r,f=u["".concat(s,".").concat(c)]||u[c]||d[c]||n;return a?i.createElement(f,l(l({ref:t},p),{},{components:a})):i.createElement(f,l({ref:t},p))}));function f(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var n=a.length,l=new Array(n);l[0]=c;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[u]="string"==typeof e?e:r,l[1]=o;for(var m=2;m<n;m++)l[m]=a[m];return i.createElement.apply(null,l)}return i.createElement.apply(null,a)}c.displayName="MDXCreateElement"},6246:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>d,frontMatter:()=>n,metadata:()=>o,toc:()=>m});var i=a(7462),r=(a(7294),a(3905));const n={title:"Firmwares"},l=void 0,o={unversionedId:"reference/firmwares",id:"reference/firmwares",title:"Firmwares",description:"Firmwares are the data you wish to distribute to devices.",source:"@site/docs/reference/firmwares.md",sourceDirName:"reference",slug:"/reference/firmwares",permalink:"/reference/firmwares",draft:!1,tags:[],version:"current",frontMatter:{title:"Firmwares"},sidebar:"reference",previous:{title:"Firmware Signing Keys",permalink:"/reference/firmware-signing-keys"},next:{title:"Just in Time Provisioning",permalink:"/reference/just-in-time-provisioning"}},s={},m=[{value:"Firmware Installation",id:"firmware-installation",level:2},{value:"Self-Managed",id:"self-managed",level:3},{value:"Peridio Managed",id:"peridio-managed",level:3},{value:"Firmware File Requirements",id:"firmware-file-requirements",level:2},{value:"Time to Live (TTL)",id:"time-to-live-ttl",level:2},{value:"Example",id:"example",level:3},{value:"Delta Updates",id:"delta-updates",level:2},{value:"Self-Managed",id:"self-managed-1",level:3},{value:"Peridio-Managed",id:"peridio-managed-1",level:3}],p={toc:m},u="wrapper";function d(e){let{components:t,...a}=e;return(0,r.kt)(u,(0,i.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Firmwares are the data you wish to distribute to devices."),(0,r.kt)("p",null,"Peridio requires the use of ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/fwup-home/fwup"},"fwup")," archives as the packaging format for firmwares. This means the binaries you upload to Peridio and the binaries your devices will download from Peridio are fwup archives. The contents of an archive are up to you; ranging from no files, to 1 file, to ",(0,r.kt)("inlineCode",{parentName:"p"},"n")," files. They are capable of packaging an arbitrary stringy metadata payload. Note that fwup archives themselves are ZIP archives and can be interacted with as such."),(0,r.kt)("p",null,"To learn more about how to use firmware, see the ",(0,r.kt)("a",{parentName:"p",href:"/guides/creating-firmware"},"creating firmware")," guide."),(0,r.kt)("h2",{id:"firmware-installation"},"Firmware Installation"),(0,r.kt)("p",null,"It is possible to perform firmware installation with Peridio in a self-managed or Peridio-managed fashion."),(0,r.kt)("h3",{id:"self-managed"},"Self-Managed"),(0,r.kt)("p",null,"This approach means you are responsible for all device-side interactions with Peridio as well as executing any device-side operation thereafter. This buys absolute flexibility at the cost of owning the complexity yourself."),(0,r.kt)("h3",{id:"peridio-managed"},"Peridio Managed"),(0,r.kt)("p",null,"The ",(0,r.kt)("a",{parentName:"p",href:"/agent"},"Peridio Agent")," can be used to check for updates, stream their download (including automated delta updates), verify their signature, and install their contents. This buys efficient simplicity at the cost of flexibility."),(0,r.kt)("h2",{id:"firmware-file-requirements"},"Firmware File Requirements"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Firmware files are signed fwup archives."),(0,r.kt)("li",{parentName:"ul"},"The following ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/fwup-home/fwup#global-scope"},"global scope")," options must be specified:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"meta-architecture")," must have a value. Informational."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"meta-platform")," must have a value. Informational."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"meta-product")," must exactly match the name of a ",(0,r.kt)("a",{parentName:"li",href:"/reference/products"},"product")," in your ",(0,r.kt)("a",{parentName:"li",href:"/reference/organizations"},"organization"),". Defines the product within which the firmware will be scoped."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"meta-version")," must be a valid ",(0,r.kt)("a",{parentName:"li",href:"https://semver.org/spec/v2.0.0.html"},"semantic version"),". Defines the version of the firmware.")))),(0,r.kt)("h2",{id:"time-to-live-ttl"},"Time to Live (TTL)"),(0,r.kt)("p",null,"Firmwares can be configured on a per-firmware basis to be deleted automatically after a set amount of seconds by configuring their ",(0,r.kt)("inlineCode",{parentName:"p"},"ttl")," field. Firmware associated with a deployment will never be automatically deleted. Dissassociating a firmware with a configured TTL from all deployments will cause the TTL to begin counting down again from its maximum value."),(0,r.kt)("h3",{id:"example"},"Example"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Firmware (A) is created with ",(0,r.kt)("inlineCode",{parentName:"li"},"ttl: 60")," and is associated with zero deployments.",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Firmware (A)'s TTL begins counting down and it will be automatically deleted once it runs out."))),(0,r.kt)("li",{parentName:"ol"},"Firmware (A) is associated with deployment (B).",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Firmware (A)'s TTL is ignored and it will not be automatically deleted."))),(0,r.kt)("li",{parentName:"ol"},"Firmware (A) is associated with deployment (C).",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Firmware (A) is now associated with two deployments, its TTL continues to be ignored and it still will not be automatically deleted."))),(0,r.kt)("li",{parentName:"ol"},"Deployment (B) is deleted.",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Firmware (A) is still associated with at least one deployment, its TTL continues to be ignored and it still will not be automatically deleted."))),(0,r.kt)("li",{parentName:"ol"},"Deployment (C) is deleted.",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Firmware (A) is associated with zero deployments, its TTL begins counting down from its maximum value of ",(0,r.kt)("inlineCode",{parentName:"li"},"60")," and it will be automatically deleted once it runs out.")))),(0,r.kt)("h2",{id:"delta-updates"},"Delta Updates"),(0,r.kt)("p",null,"It is possible to ship delta updates with Peridio in a self-managed or Peridio-managed fashion."),(0,r.kt)("h3",{id:"self-managed-1"},"Self-Managed"),(0,r.kt)("p",null,"This approach yields the greatest flexibility, but comes at the cost of complexity. It would mean you would be responsible for:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Generating patch files yourself before submitting them as firmware to Peridio."),(0,r.kt)("li",{parentName:"ol"},"Ensuring you orchestrate your deployments in such a manner as to serve patch files to the correct devices."),(0,r.kt)("li",{parentName:"ol"},"Write the device code to apply the patch files.")),(0,r.kt)("p",null,"Note that with this approach you would not actually enable delta updates features in Peridio (check boxes in the Web Console nor fields in the API/CLI), as that is used only in the Peridio-Managed case."),(0,r.kt)("h3",{id:"peridio-managed-1"},"Peridio-Managed"),(0,r.kt)("p",null,"This approach has Peridio automatically generate, serve, and apply patch files for you, but comes at the cost of flexibility and customization. In particular, the following requirements are imposed:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Delta updates are enabled on a per deployment basis.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"fwup must be used to apply updates, and it must be version 1.6.0 or greater.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"While your fwup conf and archives may include arbitrary contents, only a file-resource named ",(0,r.kt)("inlineCode",{parentName:"p"},"rootfs.img")," will be diffed/patched.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Your fwup conf's tasks to write the ",(0,r.kt)("inlineCode",{parentName:"p"},"rootfs.img")," must use the ",(0,r.kt)("inlineCode",{parentName:"p"},"delta-source-raw-offset"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"delta-source-raw-count"),", and ",(0,r.kt)("inlineCode",{parentName:"p"},"raw_write")," settings."),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"If you wish to also use an A/B update scheme, the tasks may for example resemble the following:"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"task upgrade.a {\n    on-resource rootfs.img {\n        delta-source-raw-offset=${ROOTFS_B_PART_OFFSET}\n        delta-source-raw-count=${ROOTFS_B_PART_COUNT}\n        raw_write(${ROOTFS_A_PART_OFFSET})\n    }\n}\ntask upgrade.b {\n    on-resource rootfs.img {\n        delta-source-raw-offset=${ROOTFS_A_PART_OFFSET}\n        delta-source-raw-count=${ROOTFS_A_PART_COUNT}\n        raw_write(${ROOTFS_B_PART_OFFSET})\n    }\n}\n")))))))}d.isMDXComponent=!0}}]);