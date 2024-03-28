"use strict";(self.webpackChunkperidio_docs=self.webpackChunkperidio_docs||[]).push([[7956],{40448:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>t,metadata:()=>c,toc:()=>o});var r=n(74848),s=n(28453);const t={},a="Creating Signing Keys",c={id:"platform/guides/creating-signing-keys",title:"Creating Signing Keys",description:"This guide describes how to create signing keys.",source:"@site/docs/platform/guides/creating-signing-keys.md",sourceDirName:"platform/guides",slug:"/platform/guides/creating-signing-keys",permalink:"/platform/guides/creating-signing-keys",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"platform",previous:{title:"Creating Firmware",permalink:"/platform/guides/creating-firmware"},next:{title:"Creating CA Certificates",permalink:"/platform/guides/creating-ca-certificates"}},l={},o=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Create Key Pair",id:"create-key-pair",level:2},{value:"Create Signing Key",id:"create-signing-key",level:2},{value:"Web Console",id:"web-console",level:3},{value:"CLI",id:"cli",level:3},{value:"API",id:"api",level:3}];function d(e){const i={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.h1,{id:"creating-signing-keys",children:"Creating Signing Keys"}),"\n",(0,r.jsx)(i.p,{children:"This guide describes how to create signing keys."}),"\n",(0,r.jsxs)(i.p,{children:["To learn more about Peridio signing keys in general, see the ",(0,r.jsx)(i.a,{href:"/platform/reference/signing-keys",children:"signing keys"})," reference."]}),"\n",(0,r.jsx)(i.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.a,{href:"https://github.com/fwup-home/fwup",children:"fwup CLI"}),".","\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:"Last tested with version 1.9.1."}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.a,{href:"https://github.com/peridio/morel/releases",children:"Peridio CLI"}),".","\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:"Last tested with version 0.4.0."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(i.h2,{id:"create-key-pair",children:"Create Key Pair"}),"\n",(0,r.jsxs)(i.p,{children:["Signing keys can be formatted in the recommended ",(0,r.jsx)(i.a,{href:"/platform/reference/signing-keys#pem",children:"PEM"})," format or the legacy ",(0,r.jsx)(i.a,{href:"/platform/reference/signing-keys#raw",children:"raw"})," format. This guide will create them in the PEM format."]}),"\n",(0,r.jsx)(i.p,{children:"Create a PEM private key:"}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{children:"openssl genpkey -algorithm Ed25519 -out private.pem\n"})}),"\n",(0,r.jsx)(i.p,{children:"Derive a PEM public key from the PEM private key:"}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{children:"openssl pkey -in private.pem -pubout -out public.pem\n"})}),"\n",(0,r.jsx)(i.h2,{id:"create-signing-key",children:"Create Signing Key"}),"\n",(0,r.jsx)(i.p,{children:"You must submit your public key to Peridio so that it can verify binaries as they are uploaded."}),"\n",(0,r.jsx)(i.h3,{id:"web-console",children:"Web Console"}),"\n",(0,r.jsxs)(i.p,{children:["See the ",(0,r.jsx)(i.a,{href:"https://console.peridio.com",children:"Peridio Web Console"}),"."]}),"\n",(0,r.jsx)(i.h3,{id:"cli",children:"CLI"}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{children:"peridio signing-keys create \\\n  --value value \\\n  --name value\n"})}),"\n",(0,r.jsxs)(i.p,{children:["The ",(0,r.jsx)(i.code,{children:"--value"})," option expects your public key in raw format."]}),"\n",(0,r.jsxs)(i.p,{children:["To convert a PEM public key to a raw public key, see the ",(0,r.jsx)(i.a,{href:"/platform/reference/signing-keys#convert-keys",children:"convert keys"})," section of the signing keys reference."]}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{children:"openssl pkey -outform DER -pubin -in public.pem -pubout \\\n  | tail -c +13 \\\n  | base64 > public.raw\n"})}),"\n",(0,r.jsxs)(i.p,{children:["The submitted key may now be used to sign ",(0,r.jsx)(i.a,{href:"/platform/guides/creating-binary-signatures",children:"binaries"})," and ",(0,r.jsx)(i.a,{href:"/platform/guides/creating-firmware#sign-the-fwup-archive",children:"firmware"}),"."]}),"\n",(0,r.jsx)(i.h3,{id:"api",children:"API"}),"\n",(0,r.jsxs)(i.p,{children:["Use the Peridio Admin API ",(0,r.jsx)(i.a,{href:"/admin-api#signing-keys/operation/create-a-signing-key",children:"create-a-signing-key"})," endpoint."]}),"\n",(0,r.jsxs)(i.p,{children:["The submitted key may now be used to sign ",(0,r.jsx)(i.a,{href:"/platform/guides/creating-binary-signatures",children:"binaries"})," and ",(0,r.jsx)(i.a,{href:"/platform/guides/creating-firmware#sign-the-fwup-archive",children:"firmware"}),"."]})]})}function h(e={}){const{wrapper:i}={...(0,s.R)(),...e.components};return i?(0,r.jsx)(i,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},28453:(e,i,n)=>{n.d(i,{R:()=>a,x:()=>c});var r=n(96540);const s={},t=r.createContext(s);function a(e){const i=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function c(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),r.createElement(t.Provider,{value:i},e.children)}}}]);