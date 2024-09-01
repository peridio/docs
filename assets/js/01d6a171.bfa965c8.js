"use strict";(self.webpackChunkperidio_docs=self.webpackChunkperidio_docs||[]).push([[2694],{95335:(e,i,t)=>{t.r(i),t.d(i,{assets:()=>d,contentTitle:()=>a,default:()=>h,frontMatter:()=>c,metadata:()=>s,toc:()=>o});var n=t(74848),r=t(28453);const c={},a="Creating X.509 Certificates with Peridio",s={id:"platform/guides/creating-x509-certificates-with-peridio",title:"Creating X.509 Certificates with Peridio",description:"This guide describes how to create X.509 certificates with the Peridio CLI.",source:"@site/docs/platform/guides/creating-x509-certificates-with-peridio.md",sourceDirName:"platform/guides",slug:"/platform/guides/creating-x509-certificates-with-peridio",permalink:"/platform/guides/creating-x509-certificates-with-peridio",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"platform",previous:{title:"Creating X.509 Certificates with OpenSSL",permalink:"/platform/guides/creating-x509-certificates-with-openssl"},next:{title:"Introduction to Release Management",permalink:"/platform/guides/introduction-to-release-management"}},d={},o=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Create Certificates",id:"create-certificates",level:2},{value:"Root",id:"root",level:3},{value:"Intermediate",id:"intermediate",level:3},{value:"End-Entity Certificate",id:"end-entity-certificate",level:3}];function l(e){const i={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i.h1,{id:"creating-x509-certificates-with-peridio",children:"Creating X.509 Certificates with Peridio"}),"\n",(0,n.jsx)(i.p,{children:"This guide describes how to create X.509 certificates with the Peridio CLI."}),"\n",(0,n.jsx)(i.admonition,{title:"less speed more flexibility",type:"tip",children:(0,n.jsxs)(i.p,{children:["For more control over key and certificate details, see ",(0,n.jsx)(i.a,{href:"/platform/guides/creating-x509-certificates-with-openssl",children:"creating X.509 certificates with OpenSSL"}),"."]})}),"\n",(0,n.jsx)(i.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,n.jsxs)(i.ul,{children:["\n",(0,n.jsxs)(i.li,{children:[(0,n.jsx)(i.a,{href:"/cli",children:"Peridio CLI"}),".","\n",(0,n.jsxs)(i.ul,{children:["\n",(0,n.jsx)(i.li,{children:"Last tested with version 0.24.0."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(i.h2,{id:"create-certificates",children:"Create Certificates"}),"\n",(0,n.jsx)(i.admonition,{title:"sensitive private keys",type:"warning",children:(0,n.jsx)(i.p,{children:"Private keys are sensitive components of a public key infrastructure. If they are leaked the entire downstream chain of trust is compromised."})}),"\n",(0,n.jsxs)(i.admonition,{title:"certificate validity period",type:"warning",children:[(0,n.jsxs)(i.p,{children:["The ",(0,n.jsx)(i.code,{children:"--start-date"})," and ",(0,n.jsx)(i.code,{children:"--end-date"})," options should be specified cautiously as they dictate when the certificate will be valid for. The impact of a certificate not being valid yet or having already expired is dependent on the parties interacting with it."]}),(0,n.jsxs)(i.p,{children:["For information regarding how Peridio interacts with certificates reference ",(0,n.jsx)(i.a,{href:"/platform/reference/ca-certificates",children:"CA Certificates"})," and ",(0,n.jsx)(i.a,{href:"/platform/reference/device-certificates",children:"Device Certificates"}),"."]})]}),"\n",(0,n.jsx)(i.admonition,{title:"sign by name",type:"tip",children:(0,n.jsxs)(i.p,{children:["The ",(0,n.jsx)(i.code,{children:"--signer-key PATH"})," and ",(0,n.jsx)(i.code,{children:"--signer-cert PATH"})," option pair can be replaced by a single ",(0,n.jsx)(i.code,{children:"--signer NAME"})," option. For context, see ",(0,n.jsx)(i.a,{href:"/cli#configjson",children:"Peridio CLI config"}),"."]})}),"\n",(0,n.jsx)(i.h3,{id:"root",children:"Root"}),"\n",(0,n.jsxs)(i.p,{children:["For context, reference ",(0,n.jsx)(i.a,{href:"/platform/reference/x509#root",children:"X.509"}),"."]}),"\n",(0,n.jsxs)(i.p,{children:["You must fill in the ",(0,n.jsx)(i.code,{children:"--start-date"})," and ",(0,n.jsx)(i.code,{children:"--end-date"})," values."]}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{className:"language-console",children:"peridio x509 create \\\n  --common-name root-ca \\\n  --is-ca \\\n  --start-date YYYY-MM-DD \\\n  --end-date YYYY-MM-DD\n"})}),"\n",(0,n.jsx)(i.h3,{id:"intermediate",children:"Intermediate"}),"\n",(0,n.jsxs)(i.p,{children:["For context, reference ",(0,n.jsx)(i.a,{href:"/platform/reference/x509#intermediate",children:"X.509 intermediate"}),"."]}),"\n",(0,n.jsxs)(i.p,{children:["You must fill in the ",(0,n.jsx)(i.code,{children:"--start-date"})," and ",(0,n.jsx)(i.code,{children:"--end-date"})," values."]}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{className:"language-console",children:"peridio x509 create \\\n  --common-name intermediate-ca \\\n  --is-ca \\\n  --start-date YYYY-MM-DD \\\n  --end-date YYYY-MM-DD\n  --signer-key root-ca-private-key.pem \\\n  --signer-cert root-ca-certificate.pem\n"})}),"\n",(0,n.jsx)(i.h3,{id:"end-entity-certificate",children:"End-Entity Certificate"}),"\n",(0,n.jsxs)(i.p,{children:["For context, reference ",(0,n.jsx)(i.a,{href:"/platform/reference/x509#end-entity",children:"X.509 end entity"}),"."]}),"\n",(0,n.jsxs)(i.p,{children:["You must fill in the ",(0,n.jsx)(i.code,{children:"--start-date"})," and ",(0,n.jsx)(i.code,{children:"--end-date"})," values."]}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{className:"language-console",children:"peridio x509 create \\\n  --common-name end-entity \\\n  --start-date YYYY-MM-DD \\\n  --end-date YYYY-MM-DD\n  --signer-key intermediate-ca-private-key.pem \\\n  --signer-cert intermediate-ca-certificate.pem\n"})})]})}function h(e={}){const{wrapper:i}={...(0,r.R)(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},28453:(e,i,t)=>{t.d(i,{R:()=>a,x:()=>s});var n=t(96540);const r={},c=n.createContext(r);function a(e){const i=n.useContext(c);return n.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function s(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),n.createElement(c.Provider,{value:i},e.children)}}}]);