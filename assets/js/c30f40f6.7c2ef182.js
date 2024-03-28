"use strict";(self.webpackChunkperidio_docs=self.webpackChunkperidio_docs||[]).push([[9803],{70124:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>o,contentTitle:()=>i,default:()=>h,frontMatter:()=>a,metadata:()=>l,toc:()=>d});var t=r(74848),s=r(28453);const a={},i="Introduction to Release Management",l={id:"platform/guides/introduction-to-release-management",title:"Introduction to Release Management",description:"This guide serves as a comprehensive introduction to release management that will cover bundles and releases.",source:"@site/docs/platform/guides/introduction-to-release-management.md",sourceDirName:"platform/guides",slug:"/platform/guides/introduction-to-release-management",permalink:"/platform/guides/introduction-to-release-management",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"platform",previous:{title:"Creating X.509 Certificates with OpenSSL",permalink:"/platform/guides/creating-x509-certificates-with-openssl"},next:{title:"Creating Bundles",permalink:"/platform/guides/creating-bundles"}},o={},d=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Release Management Resources",id:"release-management-resources",level:2},{value:"Getting Started",id:"getting-started",level:2},{value:"Creating a Bundle",id:"creating-a-bundle",level:2},{value:"Creating a Release",id:"creating-a-release",level:2}];function c(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"introduction-to-release-management",children:"Introduction to Release Management"}),"\n",(0,t.jsx)(n.p,{children:"This guide serves as a comprehensive introduction to release management that will cover bundles and releases."}),"\n",(0,t.jsx)(n.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://github.com/peridio/morel/releases",children:"Peridio CLI"}),".","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Last tested with version 0.8.0."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"release-management-resources",children:"Release Management Resources"}),"\n",(0,t.jsx)(n.p,{children:"Release management comprises the following resources:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"/platform/reference/bundles",children:"Bundles"})," - define ordered sets of ",(0,t.jsx)(n.a,{href:"/platform/reference/binaries",children:"binaries"})," that can be distributed to ",(0,t.jsx)(n.a,{href:"/platform/reference/devices",children:"devices"})," via ",(0,t.jsx)(n.a,{href:"/platform/reference/releases",children:"releases"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"/platform/reference/releases",children:"Releases"})," - publish bundles to devices and form the ",(0,t.jsx)(n.a,{href:"/platform/reference/releases#graph-traversal",children:"release graph"}),"."]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"getting-started",children:"Getting Started"}),"\n",(0,t.jsx)(n.p,{children:"The goal of this guide is to create a release for a signed binary."}),"\n",(0,t.jsxs)(n.p,{children:["Creating a signed binary is outside the scope of this guide, see ",(0,t.jsx)(n.a,{href:"introduction-to-binary-management",children:"Introduction to Binary Management"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"creating-a-bundle",children:"Creating a Bundle"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.a,{href:"creating-bundles",children:"Create a bundle"})," so that we have something to distribute."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"peridio bundles create \\\n  --organization-prn $PERIDIO_ORGANIZATION_PRN \\\n  --artifact-version-prns $PERIDIO_ARTIFACT_VERSION_PRNS\n"})}),"\n",(0,t.jsx)(n.h2,{id:"creating-a-release",children:"Creating a Release"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.a,{href:"creating-releases",children:"Create a release"})," to distribute the bundle to devices."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"peridio releases create \\\n  --organization-prn $PERIDIO_ORGANIZATION_PRN \\\n  --bundle-prn $PERIDIO_BUNDLE_PRN\n"})}),"\n",(0,t.jsxs)(n.p,{children:["By not controlling the exact placement of the release with the ",(0,t.jsx)(n.code,{children:"--next-release-prn"})," and ",(0,t.jsx)(n.code,{children:"--prev-release-prn"})," options, the release is automatically created as the head of the release graph."]}),"\n",(0,t.jsxs)(n.p,{children:["Similarly, because we did not specify a ",(0,t.jsx)(n.code,{children:"--phase-value"})," nor a ",(0,t.jsx)(n.code,{children:"--schedule-date"}),", the release is immediately available."]})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},28453:(e,n,r)=>{r.d(n,{R:()=>i,x:()=>l});var t=r(96540);const s={},a=t.createContext(s);function i(e){const n=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),t.createElement(a.Provider,{value:n},e.children)}}}]);