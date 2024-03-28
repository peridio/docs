"use strict";(self.webpackChunkperidio_docs=self.webpackChunkperidio_docs||[]).push([[9349],{47669:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>o,contentTitle:()=>s,default:()=>h,frontMatter:()=>a,metadata:()=>l,toc:()=>d});var t=n(74848),r=n(28453);const a={title:"Firmware"},s=void 0,l={id:"platform/reference/firmware",title:"Firmware",description:"Firmware are the data you wish to distribute to devices.",source:"@site/docs/platform/reference/firmware.md",sourceDirName:"platform/reference",slug:"/platform/reference/firmware",permalink:"/platform/reference/firmware",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"Firmware"},sidebar:"platform",previous:{title:"Signing Keys",permalink:"/platform/reference/signing-keys"},next:{title:"Agent",permalink:"/platform/reference/agent"}},o={},d=[{value:"Format",id:"format",level:2},{value:"Requirements",id:"requirements",level:3},{value:"Installation",id:"installation",level:2},{value:"Time to Live (TTL)",id:"time-to-live-ttl",level:2},{value:"Example",id:"example",level:3},{value:"Delta Updates",id:"delta-updates",level:2},{value:"Self-Managed",id:"self-managed",level:3},{value:"Peridio-Managed",id:"peridio-managed",level:3}];function c(e){const i={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.p,{children:"Firmware are the data you wish to distribute to devices."}),"\n",(0,t.jsx)(i.admonition,{type:"legacy",children:(0,t.jsxs)(i.p,{children:["Superceded by ",(0,t.jsx)(i.a,{href:"artifacts",children:"artifacts"}),", ",(0,t.jsx)(i.a,{href:"artifact-versions",children:"artifact versions"}),", and ",(0,t.jsx)(i.a,{href:"binaries",children:"binaries"}),"."]})}),"\n",(0,t.jsxs)(i.p,{children:["Find additional information in the Admin API ",(0,t.jsx)(i.a,{href:"/admin-api#firmware",children:"firmware section"})," and the ",(0,t.jsx)(i.a,{href:"/platform/guides/creating-firmware",children:"creating firmware"})," guide."]}),"\n",(0,t.jsx)(i.h2,{id:"format",children:"Format"}),"\n",(0,t.jsxs)(i.p,{children:["Firmware require the use of ",(0,t.jsx)(i.a,{href:"https://github.com/fwup-home/fwup",children:"fwup"})," archives as their packaging format. This means the data you upload to Peridio and the data your devices will download from Peridio are fwup archives. They are capable of packaging an arbitrary stringy metadata payload alongside the primary contents. Note that fwup archives themselves are ZIP archives and their contents can be extracted as such."]}),"\n",(0,t.jsx)(i.h3,{id:"requirements",children:"Requirements"}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsx)(i.li,{children:"Firmware files are signed fwup archives."}),"\n",(0,t.jsxs)(i.li,{children:["The following ",(0,t.jsx)(i.a,{href:"https://github.com/fwup-home/fwup#global-scope",children:"global scope"})," options must be specified:","\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.code,{children:"meta-architecture"})," must have a value. Informational."]}),"\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.code,{children:"meta-platform"})," must have a value. Informational."]}),"\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.code,{children:"meta-product"})," must exactly match the name of a ",(0,t.jsx)(i.a,{href:"/platform/reference/products",children:"product"})," in your ",(0,t.jsx)(i.a,{href:"/platform/reference/organizations",children:"organization"}),". Defines the product within which the firmware will be scoped."]}),"\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.code,{children:"meta-version"})," must be a valid ",(0,t.jsx)(i.a,{href:"https://semver.org/spec/v2.0.0.html",children:"semantic version"}),". Defines the version of the firmware."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(i.h2,{id:"installation",children:"Installation"}),"\n",(0,t.jsxs)(i.p,{children:["When a device downloads a firmware it may extract from it like a ZIP, or apply a fwup task, or do whatever it sees fit to install or process the firmware. The code responsible for this functionality is the ",(0,t.jsx)(i.a,{href:"/integration/introduction#agent",children:"agent"}),"."]}),"\n",(0,t.jsx)(i.h2,{id:"time-to-live-ttl",children:"Time to Live (TTL)"}),"\n",(0,t.jsxs)(i.p,{children:["All firmware will be deleted automatically after a set amount of seconds by configuring their ",(0,t.jsx)(i.code,{children:"ttl"})," field. Firmware associated with a deployment will never be automatically deleted. Dissassociating a firmware with a configured TTL from all deployments will cause the TTL to begin counting down again from its maximum value."]}),"\n",(0,t.jsx)(i.h3,{id:"example",children:"Example"}),"\n",(0,t.jsxs)(i.ol,{children:["\n",(0,t.jsxs)(i.li,{children:["Firmware (A) is created with ",(0,t.jsx)(i.code,{children:"ttl: 60"})," and is associated with zero deployments.","\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsx)(i.li,{children:"Firmware (A)'s TTL begins counting down and it will be automatically deleted once it runs out."}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(i.li,{children:["Firmware (A) is associated with deployment (B).","\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsx)(i.li,{children:"Firmware (A)'s TTL is ignored and it will not be automatically deleted."}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(i.li,{children:["Firmware (A) is associated with deployment (C).","\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsx)(i.li,{children:"Firmware (A) is now associated with two deployments, its TTL continues to be ignored and it still will not be automatically deleted."}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(i.li,{children:["Deployment (B) is deleted.","\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsx)(i.li,{children:"Firmware (A) is still associated with at least one deployment, its TTL continues to be ignored and it still will not be automatically deleted."}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(i.li,{children:["Deployment (C) is deleted.","\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsxs)(i.li,{children:["Firmware (A) is associated with zero deployments, its TTL begins counting down from its maximum value of ",(0,t.jsx)(i.code,{children:"60"})," and it will be automatically deleted once it runs out."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(i.h2,{id:"delta-updates",children:"Delta Updates"}),"\n",(0,t.jsx)(i.p,{children:"It is possible to ship delta updates with Peridio in a self-managed or Peridio-managed fashion."}),"\n",(0,t.jsx)(i.h3,{id:"self-managed",children:"Self-Managed"}),"\n",(0,t.jsx)(i.p,{children:"This approach yields the greatest flexibility, but comes at the cost of complexity. It would mean you would be responsible for:"}),"\n",(0,t.jsxs)(i.ol,{children:["\n",(0,t.jsx)(i.li,{children:"Generating patch files yourself before submitting them as firmware to Peridio."}),"\n",(0,t.jsx)(i.li,{children:"Ensuring you orchestrate your deployments in such a manner as to serve patch files to the correct devices."}),"\n",(0,t.jsx)(i.li,{children:"Write the device code to apply the patch files."}),"\n"]}),"\n",(0,t.jsx)(i.p,{children:"Note that with this approach you would not actually enable delta updates features in Peridio (check boxes in the Web Console nor fields in the API/CLI), as that is used only in the Peridio-Managed case."}),"\n",(0,t.jsx)(i.h3,{id:"peridio-managed",children:"Peridio-Managed"}),"\n",(0,t.jsx)(i.p,{children:"This approach has Peridio automatically generate, serve, and apply patch files for you, but comes at the cost of flexibility and customization. In particular, the following requirements are imposed:"}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsx)(i.li,{children:"Delta updates are enabled on a per deployment basis."}),"\n",(0,t.jsx)(i.li,{children:"fwup must be used to apply updates, and it must be version 1.6.0 or greater."}),"\n",(0,t.jsxs)(i.li,{children:["While your fwup conf and archives may include arbitrary contents, only a file-resource named ",(0,t.jsx)(i.code,{children:"rootfs.img"})," will be diffed/patched."]}),"\n",(0,t.jsxs)(i.li,{children:["Your fwup conf's tasks to write the ",(0,t.jsx)(i.code,{children:"rootfs.img"})," must use the ",(0,t.jsx)(i.code,{children:"delta-source-raw-offset"}),", ",(0,t.jsx)(i.code,{children:"delta-source-raw-count"}),", and ",(0,t.jsx)(i.code,{children:"raw_write"})," settings.","\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsxs)(i.li,{children:["\n",(0,t.jsx)(i.p,{children:"If you wish to also use an A/B update scheme, the tasks may for example resemble the following:"}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{children:"task upgrade.a {\n    on-resource rootfs.img {\n        delta-source-raw-offset=${ROOTFS_B_PART_OFFSET}\n        delta-source-raw-count=${ROOTFS_B_PART_COUNT}\n        raw_write(${ROOTFS_A_PART_OFFSET})\n    }\n}\ntask upgrade.b {\n    on-resource rootfs.img {\n        delta-source-raw-offset=${ROOTFS_A_PART_OFFSET}\n        delta-source-raw-count=${ROOTFS_A_PART_COUNT}\n        raw_write(${ROOTFS_B_PART_OFFSET})\n    }\n}\n"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:i}={...(0,r.R)(),...e.components};return i?(0,t.jsx)(i,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},28453:(e,i,n)=>{n.d(i,{R:()=>s,x:()=>l});var t=n(96540);const r={},a=t.createContext(r);function s(e){const i=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function l(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),t.createElement(a.Provider,{value:i},e.children)}}}]);