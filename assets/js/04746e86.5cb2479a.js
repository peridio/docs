"use strict";(self.webpackChunkparasola=self.webpackChunkparasola||[]).push([[400],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>m});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),s=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=s(e.components);return n.createElement(p.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,l=e.originalType,p=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),c=s(r),h=a,m=c["".concat(p,".").concat(h)]||c[h]||d[h]||l;return r?n.createElement(m,i(i({ref:t},u),{},{components:r})):n.createElement(m,i({ref:t},u))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=r.length,i=new Array(l);i[0]=h;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o[c]="string"==typeof e?e:a,i[1]=o;for(var s=2;s<l;s++)i[s]=r[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}h.displayName="MDXCreateElement"},3584:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>d,frontMatter:()=>l,metadata:()=>o,toc:()=>s});var n=r(7462),a=(r(7294),r(3905));const l={title:"create"},i="peridio releases create",o={unversionedId:"cli/releases/create",id:"cli/releases/create",title:"create",description:"Create a release.",source:"@site/docs/cli/releases/create.md",sourceDirName:"cli/releases",slug:"/cli/releases/create",permalink:"/cli/releases/create",draft:!1,tags:[],version:"current",frontMatter:{title:"create"},sidebar:"cli",previous:{title:"update-user",permalink:"/cli/products/update-user"},next:{title:"list",permalink:"/cli/releases/list"}},p={},s=[{value:"Flags",id:"flags",level:2},{value:"Options",id:"options",level:2},{value:"Required",id:"required",level:3}],u={toc:s},c="wrapper";function d(e){let{components:t,...r}=e;return(0,a.kt)(c,(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"peridio-releases-create"},"peridio releases create"),(0,a.kt)("p",null,"Create a release."),(0,a.kt)("h2",{id:"flags"},"Flags"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"-h"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"--help")),(0,a.kt)("p",null,"Prints help information."),(0,a.kt)("h2",{id:"options"},"Options"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"--description <description>")),(0,a.kt)("p",null,"The artifact description."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"--next_release_prn <next_release_prn>")),(0,a.kt)("p",null,"If omitted, the release will be created as latest within the cohort. If there is already at least one release in the cohort, then the latest release in that cohort would have its ",(0,a.kt)("inlineCode",{parentName:"p"},"next_release_prn")," updated to this created release."),(0,a.kt)("p",null,"If supplied, the release will be created prior to the release identified by ",(0,a.kt)("inlineCode",{parentName:"p"},"next_release_prn"),". If you wish to insert this release between two other releases, you may additionally supply ",(0,a.kt)("inlineCode",{parentName:"p"},"previous_release_prn"),"."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"--previous_release_prn <previous_release_prn>")),(0,a.kt)("p",null,"If omitted, ",(0,a.kt)("inlineCode",{parentName:"p"},"next_release_prn")," will dictate where to create this release within the cohort's release graph."),(0,a.kt)("p",null,"If supplied, ",(0,a.kt)("inlineCode",{parentName:"p"},"next_release_prn")," is required to be supplied as well. Together, these fields allow the caller to insert a release between two other releases."),(0,a.kt)("h3",{id:"required"},"Required"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"--bundle_prn <bundle_prn>")),(0,a.kt)("p",null,"The Peridio Resource Name (PRN) of the bundle."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"--cohort-prn <cohort-prn>")),(0,a.kt)("p",null,"The Peridio Resource Name (PRN) of the cohort."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"--name <name>")),(0,a.kt)("p",null,"The name of the release."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"--organization-prn <organization-prn>")),(0,a.kt)("p",null,"The Peridio Resource Name (PRN) of the organization."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"--phase_value <phase_value>")),(0,a.kt)("p",null,"The phase value controls the distribution of the update to your fleet."),(0,a.kt)("p",null,"Decimals in ",(0,a.kt)("inlineCode",{parentName:"p"},"[0.0, 1.0]")," are treated as percents, e.g., to allow 20% of the cohort to update, you would specifiy ",(0,a.kt)("inlineCode",{parentName:"p"},"0.2"),"."),(0,a.kt)("p",null,"Integers >= 2 are treated as absolute device counts, e.g., to allow 40 of the cohort's devices to update, you would specifiy ",(0,a.kt)("inlineCode",{parentName:"p"},"40"),"."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"NOTE:")," ",(0,a.kt)("inlineCode",{parentName:"p"},"1")," is a special value in that it represents ",(0,a.kt)("inlineCode",{parentName:"p"},"100%")," and  once a release is updated to this value, the phase value can never be changed again."),(0,a.kt)("p",null,"A release with a ",(0,a.kt)("inlineCode",{parentName:"p"},"phase_value")," not equal to ",(0,a.kt)("inlineCode",{parentName:"p"},"1"),' is considered "phased".'),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"NOTE:"),' There can only ever be a single release that is phased at a time within a cohort. Because of this, if there is already a phased release, it must be "completed" by setting the phase to ',(0,a.kt)("inlineCode",{parentName:"p"},"1"),"."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"--required")),(0,a.kt)("p",null,"If this option is included, this release must be passed through if encountered by a device."),(0,a.kt)("p",null,"Otherwise, this release will be skipped over when possible (if there are releases configured after it)."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"--schedule_date <schedule_date>")),(0,a.kt)("p",null,"Before this date-time, the release will not be resolvable when checking for updates. You may use this to schedule a future release."))}d.isMDXComponent=!0}}]);