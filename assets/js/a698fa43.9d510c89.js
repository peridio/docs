"use strict";(self.webpackChunkperidio_docs=self.webpackChunkperidio_docs||[]).push([[1901],{15262:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>c,default:()=>u,frontMatter:()=>o,metadata:()=>a,toc:()=>d});var i=r(74848),n=r(28453);const o={},c=void 0,a={id:"cli/x509/create",title:"create",description:"",source:"@site/docs/cli/x509/create.md",sourceDirName:"cli/x509",slug:"/cli/x509/create",permalink:"/cli/x509/create",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"cli",previous:{title:"update",permalink:"/cli/webhooks/update"}},s={},d=[];function f(e){const t={code:"code",pre:"pre",...(0,n.R)(),...e.components};return(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{children:"Usage: peridio x509 create [OPTIONS] --common-name <COMMON_NAME> --start-date <START_DATE> --end-date <END_DATE>\n\nOptions:\n      --common-name <COMMON_NAME>  The Common Name (CN) for the certificate\n      --is-ca                      Whether this certificate is a Certificate Authority (CA)\n      --start-date <START_DATE>    The start date of the certificate's validity period (format: YYYY-MM-DD)\n      --end-date <END_DATE>        The end date of the certificate's validity period (format: YYYY-MM-DD)\n      --signer-key <SIGNER_KEY>    Path to the private key file of the signer (required if signer_cert is provided)\n      --signer-cert <SIGNER_CERT>  Path to the certificate file of the signer (required if signer_key is provided)\n      --out <OUT>                  Directory to save the created certificate and private key to (defaults to current working directory)\n      --signer <SIGNER>            The name of a certificate authority in your Peridio CLI config\n  -h, --help                       Print help\n\n"})})}function u(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(f,{...e})}):f(e)}},28453:(e,t,r)=>{r.d(t,{R:()=>c,x:()=>a});var i=r(96540);const n={},o=i.createContext(n);function c(e){const t=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:c(e.components),i.createElement(o.Provider,{value:t},e.children)}}}]);