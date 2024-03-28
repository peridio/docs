"use strict";(self.webpackChunkperidio_docs=self.webpackChunkperidio_docs||[]).push([[4844],{84331:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>o,contentTitle:()=>s,default:()=>p,frontMatter:()=>r,metadata:()=>l,toc:()=>c});var t=n(74848),a=n(28453);const r={},s="Multipart Uploads With Binary Parts",l={id:"platform/guides/multipart-uploads-with-binary-parts",title:"Multipart Uploads With Binary Parts",description:"This guide describes how to upload a binary by manually orchestrating the binary parts yourself.",source:"@site/docs/platform/guides/multipart-uploads-with-binary-parts.md",sourceDirName:"platform/guides",slug:"/platform/guides/multipart-uploads-with-binary-parts",permalink:"/platform/guides/multipart-uploads-with-binary-parts",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"platform",previous:{title:"Introduction to Binary Management",permalink:"/platform/guides/introduction-to-binary-management"},next:{title:"Creating Artifact Versions",permalink:"/platform/guides/creating-artifact-versions"}},o={},c=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Picking a Target Part Size",id:"picking-a-target-part-size",level:2},{value:"Creating a Part",id:"creating-a-part",level:2},{value:"Uploading a Part",id:"uploading-a-part",level:2},{value:"Listing Parts",id:"listing-parts",level:2}];function d(e){const i={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.h1,{id:"multipart-uploads-with-binary-parts",children:"Multipart Uploads With Binary Parts"}),"\n",(0,t.jsx)(i.p,{children:"This guide describes how to upload a binary by manually orchestrating the binary parts yourself."}),"\n",(0,t.jsx)(i.admonition,{title:"higher level abstractions",type:"info",children:(0,t.jsxs)(i.p,{children:["It is strongly recommend to avoid this complexity whenever possible by using the CLI instead as documented in the ",(0,t.jsx)(i.a,{href:"/platform/guides/introduction-to-binary-management#create-a-binary",children:"creating a binary"})," section of the introduction to binary management."]})}),"\n",(0,t.jsx)(i.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.a,{href:"https://github.com/peridio/morel/releases",children:"Peridio CLI"}),".","\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsx)(i.li,{children:"Last tested with version 0.8.0."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(i.h2,{id:"picking-a-target-part-size",children:"Picking a Target Part Size"}),"\n",(0,t.jsxs)(i.p,{children:["Assuming you have already ",(0,t.jsx)(i.a,{href:"creating-binaries",children:"created a binary"}),", the next step in using binary parts to perform a multipart upload is deciding on a target part size. The target part size is the size that you will try to make all binary parts."]}),"\n",(0,t.jsx)(i.p,{children:"This can be reasoned about with this equation:"}),"\n",(0,t.jsx)(i.p,{children:(0,t.jsx)(i.code,{children:"total_parts = ceil(binary_size / target_size)"})}),"\n",(0,t.jsx)(i.p,{children:"You can use up to 1000 parts and each part must have a size between 5 MB and 1 GB. We recommend balancing around a 10 MB part size."}),"\n",(0,t.jsx)(i.p,{children:"So if your binary was 1 GB:"}),"\n",(0,t.jsx)(i.p,{children:(0,t.jsx)(i.code,{children:"total_parts = ceil(1 GB / 10 MB) = 100 parts"})}),"\n",(0,t.jsxs)(i.admonition,{type:"tip",children:[(0,t.jsx)(i.p,{children:"It is likely that your binary's size is not an exact multiple of your target part size. In this case one of your binary parts, typically the last, will be smaller than the target part size."}),(0,t.jsx)(i.p,{children:(0,t.jsx)(i.code,{children:"total_parts = ceil(1.003 GB / 10 MB = 100.3 parts) = 101"})}),(0,t.jsxs)(i.p,{children:["The 101st part would be ",(0,t.jsx)(i.code,{children:"0.003 GB"})," or ",(0,t.jsx)(i.code,{children:"3 MB"})," in size."]})]}),"\n",(0,t.jsx)(i.h2,{id:"creating-a-part",children:"Creating a Part"}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-console",children:"peridio binary-parts create \\\n  --binary-prn $PERIDIO_BINARY_PRN \\\n  --binary-content-path $PERIDIO_BINARY_CONTENT_PATH \\\n  --size $PERIDIO_PART_SIZE \\\n  --hash $PERIDIO_HASH\n"})}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.code,{children:"--binary-content-path"})," points at the complete bianry, not any given chunk."]}),"\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.code,{children:"--hash"})," value can be calculated as documented in the ",(0,t.jsx)(i.a,{href:"/platform/reference/signing-keys#create-a-hash",children:"create a hash to later be signed"})," section of the signing keys reference.","\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsx)(i.li,{children:"Exercise extreme caution regarding newlines and invisible characters, it is a common source of mistakes."}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.code,{children:"--size"})," is the byte size of the part."]}),"\n"]}),"\n",(0,t.jsx)(i.p,{children:"If successful, this command will return a presigned URL you can use to upload the binary part's content."}),"\n",(0,t.jsx)(i.h2,{id:"uploading-a-part",children:"Uploading a Part"}),"\n",(0,t.jsx)(i.p,{children:"The following is an example curl command for uploading a binary part."}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{children:'curl $PERIDIO_PRESIGNED_URL \\\n  -X PUT \\\n  -H "content-length: $(stat -f%z $PERIDIO_FILE)" \\\n  -H "content-type: application/octet-stream" \\\n  -H "x-amz-checksum-sha256: $(cat $PERIDIO_FILE | sha256sum | grep -o \'^\\S\\+\' | xxd -r -p | base64)" \\\n  --upload-file $PERIDIO_FILE\n'})}),"\n",(0,t.jsx)(i.p,{children:"Every specified header in that example is required."}),"\n",(0,t.jsx)(i.h2,{id:"listing-parts",children:"Listing Parts"}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-console",children:"peridio binary-parts list \\\n  --binary-prn $PERIDIO_BINARY_PRN\n"})})]})}function p(e={}){const{wrapper:i}={...(0,a.R)(),...e.components};return i?(0,t.jsx)(i,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},28453:(e,i,n)=>{n.d(i,{R:()=>s,x:()=>l});var t=n(96540);const a={},r=t.createContext(a);function s(e){const i=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function l(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),t.createElement(r.Provider,{value:i},e.children)}}}]);