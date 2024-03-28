"use strict";(self.webpackChunkperidio_docs=self.webpackChunkperidio_docs||[]).push([[7748],{7724:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>s,default:()=>h,frontMatter:()=>a,metadata:()=>o,toc:()=>l});var r=i(74848),t=i(28453);const a={},s="Introduction to Binary Management",o={id:"platform/guides/introduction-to-binary-management",title:"Introduction to Binary Management",description:"This guide serves as a comprehensive introduction to binary management that will cover artifacts, artifact versions, binaries, binary parts, binary signatures, and signing keys.",source:"@site/docs/platform/guides/introduction-to-binary-management.md",sourceDirName:"platform/guides",slug:"/platform/guides/introduction-to-binary-management",permalink:"/platform/guides/introduction-to-binary-management",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"platform",previous:{title:"Tunnels",permalink:"/platform/reference/tunnels"},next:{title:"Multipart Uploads With Binary Parts",permalink:"/platform/guides/multipart-uploads-with-binary-parts"}},c={},l=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Binary Management Resources",id:"binary-management-resources",level:2},{value:"Getting Started",id:"getting-started",level:2},{value:"Create an Artifact",id:"create-an-artifact",level:3},{value:"Create an Artifact Version",id:"create-an-artifact-version",level:3},{value:"Create Signing Keys",id:"create-signing-keys",level:3},{value:"Create a Binary",id:"create-a-binary",level:3}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"introduction-to-binary-management",children:"Introduction to Binary Management"}),"\n",(0,r.jsx)(n.p,{children:"This guide serves as a comprehensive introduction to binary management that will cover artifacts, artifact versions, binaries, binary parts, binary signatures, and signing keys."}),"\n",(0,r.jsx)(n.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://github.com/peridio/morel/releases",children:"Peridio CLI"}),".","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Last tested with version 0.8.0."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"binary-management-resources",children:"Binary Management Resources"}),"\n",(0,r.jsx)(n.p,{children:"Binary management comprises the following resources:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"/platform/reference/artifacts",children:"Artifacts"})," - define a type for your binaries."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"/platform/reference/artifact-versions",children:"Artifact Versions"})," - define a version for your binaries."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"/platform/reference/binaries",children:"Binaries"})," - record the content you wish to disitribute to devices."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"/platform/reference/binary-parts",children:"Binary Parts"})," - multipart uploads for binaries."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"/platform/reference/binary-signatures",children:"Binary Signatures"})," - represent signatures."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"/platform/reference/signing-keys",children:"Signing Keys"})," - verify signatures."]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"getting-started",children:"Getting Started"}),"\n",(0,r.jsx)(n.p,{children:"We need to create an artifact so that our binary can have a type and be reasoned about categorically. We need to create artifact versions so that the binaries we create can be versioned. Artifacts and artifact versions are seperate resources so that versions can be tracked across artifacts. Binaries record the content you wish to disitribute to devices. Binary parts, binary signatures, and signing keys will help us upload and sign our binary so that Peridio and downstream consumers of the binary can verify that you created it."}),"\n",(0,r.jsx)(n.h3,{id:"create-an-artifact",children:"Create an Artifact"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{href:"creating-artifacts",children:"Create an artifact"})," so that we have a type for our binary."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'peridio artifacts create \\\n  --organization-prn $PERIDIO_ORGANIZATION_PRN \\\n  --name "ML-Model"\n'})}),"\n",(0,r.jsx)(n.h3,{id:"create-an-artifact-version",children:"Create an Artifact Version"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{href:"creating-artifact-versions",children:"Create an artifact version"})," for that artifact."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'peridio artifact-versions create \\\n  --artifact-prn $PERIDIO_ARTIFACT_PRN \\\n  --version "1.0.0"\n'})}),"\n",(0,r.jsx)(n.h3,{id:"create-signing-keys",children:"Create Signing Keys"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{href:"creating-signing-keys",children:"Create a signing key"})," if you don't have one already."]}),"\n",(0,r.jsx)(n.p,{children:"Create a private signing key. We will use this key to sign hashes of our binaries."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"openssl genpkey -algorithm Ed25519 -out private.pem\n"})}),"\n",(0,r.jsx)(n.p,{children:"Derive a public signing key. We will register this key with Peridio so that it can verify that only binaries you specify are allowed in your organization."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"openssl pkey -in private.pem -pubout -out public.pem\n"})}),"\n",(0,r.jsx)(n.p,{children:"Convert the public key from PEM to RAW."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"openssl pkey -outform DER -pubin -in public.pem -pubout \\\n  | tail -c +13 \\\n  | base64 > public.raw\n"})}),"\n",(0,r.jsx)(n.admonition,{title:"signing-keys-create pem via --path",type:"info",children:(0,r.jsxs)(n.p,{children:["This conversion will not be necessary for long. It is planned for the Peridio CLI's ",(0,r.jsx)(n.a,{href:"/cli/signing-keys/create",children:"create-signing-key"})," command to support a ",(0,r.jsx)(n.code,{children:"--path"})," option soon that would work with PEM files."]})}),"\n",(0,r.jsx)(n.p,{children:"Register the public key with Peridio."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"peridio signing-keys create \\\n  --value $(cat public.raw) \\\n  --name prod\n"})}),"\n",(0,r.jsx)(n.h3,{id:"create-a-binary",children:"Create a Binary"}),"\n",(0,r.jsx)(n.p,{children:"Create a binary for that version."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"peridio binaries create \\\n  --artifact-version-prn $PERIDIO_ARTIFACT_VERSION \\\n  --content-path binary-content.dat \\\n  --signing-key-pair prod \\\n  --target aarch64-unknonw-linux\n"})}),"\n",(0,r.jsx)(n.admonition,{title:"test file generation",type:"tip",children:(0,r.jsxs)(n.p,{children:["One way to quickly generate files of a particular byte size with random content (in this case 100 bytes) is: ",(0,r.jsx)(n.code,{children:"cat /dev/urandom | head -c 100 > binary-content.dat"}),". On modern systems this is fast even for multi-GB files."]})}),"\n",(0,r.jsx)(n.p,{children:"The above command will:"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:"Ensure a binary with the provided target exists for the given artifact version."}),"\n",(0,r.jsx)(n.li,{children:"Perform a resumable multipart upload of the binary content."}),"\n",(0,r.jsx)(n.li,{children:"Sign the binary using the given signing key pair."}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["At this point you will have a signed binary that is ready to be included in ",(0,r.jsx)(n.a,{href:"/platform/reference/bundles",children:"bundles"})," and distributed via ",(0,r.jsx)(n.a,{href:"/platform/reference/releases",children:"releases"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["To get started on that, checkout the ",(0,r.jsx)(n.a,{href:"introduction-to-release-management",children:"Introduction to Release\nManagement"})," guide."]})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},28453:(e,n,i)=>{i.d(n,{R:()=>s,x:()=>o});var r=i(96540);const t={},a=r.createContext(t);function s(e){const n=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:s(e.components),r.createElement(a.Provider,{value:n},e.children)}}}]);