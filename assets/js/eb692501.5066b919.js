"use strict";(self.webpackChunkparasola=self.webpackChunkparasola||[]).push([[1337],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>y});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(n),m=a,y=u["".concat(l,".").concat(m)]||u[m]||d[m]||i;return n?r.createElement(y,o(o({ref:t},c),{},{components:n})):r.createElement(y,o({ref:t},c))}));function y(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:a,o[1]=s;for(var p=2;p<i;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},1512:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var r=n(7462),a=(n(7294),n(3905));const i={},o="Introduction to Binary Management",s={unversionedId:"guides/introduction-to-binary-management",id:"guides/introduction-to-binary-management",title:"Introduction to Binary Management",description:"This guide serves as a comprehensive introduction to binary management that will cover artifacts, artifact versions, binaries, binary parts, binary signatures, and signing keys.",source:"@site/docs/guides/introduction-to-binary-management.md",sourceDirName:"guides",slug:"/guides/introduction-to-binary-management",permalink:"/guides/introduction-to-binary-management",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"guides",next:{title:"Multipart Uploads With Binary Parts",permalink:"/guides/multipart-uploads-with-binary-parts"}},l={},p=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Binary Management Resources",id:"binary-management-resources",level:2},{value:"Getting Started",id:"getting-started",level:2},{value:"Create an Artifact",id:"create-an-artifact",level:3},{value:"Create an Artifact Version",id:"create-an-artifact-version",level:3},{value:"Create Signing Keys",id:"create-signing-keys",level:3},{value:"Create a Binary",id:"create-a-binary",level:3}],c={toc:p},u="wrapper";function d(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"introduction-to-binary-management"},"Introduction to Binary Management"),(0,a.kt)("p",null,"This guide serves as a comprehensive introduction to binary management that will cover artifacts, artifact versions, binaries, binary parts, binary signatures, and signing keys."),(0,a.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/peridio/morel/releases"},"Peridio CLI"),".",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"Last tested with version 0.8.0.")))),(0,a.kt)("h2",{id:"binary-management-resources"},"Binary Management Resources"),(0,a.kt)("p",null,"Binary management comprises the following resources:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/reference/artifacts"},"Artifacts")," - define a type for your binaries."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/reference/artifact-versions"},"Artifact Versions")," - define a version for your binaries."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/reference/binaries"},"Binaries")," - record the content you wish to disitribute to devices."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/reference/binary-parts"},"Binary Parts")," - multipart uploads for binaries."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/reference/binary-signatures"},"Binary Signatures")," - represent signatures."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/reference/signing-keys"},"Signing Keys")," - verify signatures.")),(0,a.kt)("h2",{id:"getting-started"},"Getting Started"),(0,a.kt)("p",null,"We need to create an artifact so that our binary can have a type and be reasoned about categorically. We need to create artifact versions so that the binaries we create can be versioned. Artifacts and artifact versions are seperate resources so that versions can be tracked across artifacts. Binaries record the content you wish to disitribute to devices. Binary parts, binary signatures, and signing keys will help us upload and sign our binary so that Peridio and downstream consumers of the binary can verify that you created it."),(0,a.kt)("h3",{id:"create-an-artifact"},"Create an Artifact"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"creating-artifacts"},"Create an artifact")," so that we have a type for our binary."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'peridio artifacts create \\\n  --organization-prn $PERIDIO_ORGANIZATION_PRN \\\n  --name "ML-Model"\n')),(0,a.kt)("h3",{id:"create-an-artifact-version"},"Create an Artifact Version"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"creating-artifact-versions"},"Create an artifact version")," for that artifact."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'peridio artifact-versions create \\\n  --artifact-prn $PERIDIO_ARTIFACT_PRN \\\n  --version "1.0.0"\n')),(0,a.kt)("h3",{id:"create-signing-keys"},"Create Signing Keys"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"creating-signing-keys"},"Create a signing key")," if you don't have one already."),(0,a.kt)("p",null,"Create a private signing key. We will use this key to sign hashes of our binaries."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"openssl genpkey -algorithm Ed25519 -out private.pem\n")),(0,a.kt)("p",null,"Derive a public signing key. We will register this key with Peridio so that it can verify that only binaries you specify are allowed in your organization."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"openssl pkey -in private.pem -pubout -out public.pem\n")),(0,a.kt)("p",null,"Convert the public key from PEM to RAW."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"openssl pkey -outform DER -pubin -in public.pem -pubout \\\n  | tail -c +13 \\\n  | base64 > public.raw\n")),(0,a.kt)("admonition",{title:"signing-keys-create pem via --path",type:"info"},(0,a.kt)("p",{parentName:"admonition"},"This conversion will not be necessary for long. It is planned for the Peridio CLI's ",(0,a.kt)("a",{parentName:"p",href:"/cli/signing-keys/create"},"create-signing-key")," command to support a ",(0,a.kt)("inlineCode",{parentName:"p"},"--path")," option soon that would work with PEM files.")),(0,a.kt)("p",null,"Register the public key with Peridio."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"peridio signing-keys create \\\n  --value $(cat public.raw) \\\n  --name prod\n")),(0,a.kt)("h3",{id:"create-a-binary"},"Create a Binary"),(0,a.kt)("p",null,"Create a binary for that version."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"peridio binaries create \\\n  --artifact-version-prn $PERIDIO_ARTIFACT_VERSION \\\n  --content-path binary-content.dat \\\n  --signing-key-pair prod \\\n  --target aarch64-unknonw-linux\n")),(0,a.kt)("admonition",{title:"test file generation",type:"tip"},(0,a.kt)("p",{parentName:"admonition"},"One way to quickly generate files of a particular byte size with random content (in this case 100 bytes) is: ",(0,a.kt)("inlineCode",{parentName:"p"},"cat /dev/urandom | head -c 100 > binary-content.dat"),". On modern systems this is fast even for multi-GB files.")),(0,a.kt)("p",null,"The above command will:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"Ensure a binary with the provided target exists for the given artifact version."),(0,a.kt)("li",{parentName:"ol"},"Perform a resumable multipart upload of the binary content."),(0,a.kt)("li",{parentName:"ol"},"Sign the binary using the given signing key pair.")),(0,a.kt)("p",null,"At this point you will have a signed binary that is ready to be included in ",(0,a.kt)("a",{parentName:"p",href:"/reference/bundles"},"bundles")," and distributed via ",(0,a.kt)("a",{parentName:"p",href:"/reference/releases"},"releases"),"."),(0,a.kt)("p",null,"To get started on that, checkout the ",(0,a.kt)("a",{parentName:"p",href:"introduction-to-release-management"},"Introduction to Release\nManagement")," guide."))}d.isMDXComponent=!0}}]);