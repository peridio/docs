"use strict";(self.webpackChunkparasola=self.webpackChunkparasola||[]).push([[9784],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>f});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),u=p(n),h=i,f=u["".concat(s,".").concat(h)]||u[h]||c[h]||r;return n?a.createElement(f,o(o({ref:t},d),{},{components:n})):a.createElement(f,o({ref:t},d))}));function f(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,o=new Array(r);o[0]=h;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:i,o[1]=l;for(var p=2;p<r;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},2547:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>c,frontMatter:()=>r,metadata:()=>l,toc:()=>p});var a=n(7462),i=(n(7294),n(3905));const r={},o="Webhooks",l={unversionedId:"reference/webhooks",id:"reference/webhooks",title:"Webhooks",description:"Webhooks egress events from Peridio to an HTTPS endpoint.",source:"@site/docs/reference/webhooks.md",sourceDirName:"reference",slug:"/reference/webhooks",permalink:"/reference/webhooks",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"reference",previous:{title:"Firmware",permalink:"/reference/firmware"},next:{title:"CA Certificates",permalink:"/reference/ca-certificates"}},s={},p=[{value:"Security",id:"security",level:2},{value:"Secrets",id:"secrets",level:3},{value:"Signature verification",id:"signature-verification",level:3},{value:"Replay attacks",id:"replay-attacks",level:3},{value:"Timing attacks",id:"timing-attacks",level:3},{value:"URL verification",id:"url-verification",level:2},{value:"Deduplication",id:"deduplication",level:2},{value:"Client endpoint requirements",id:"client-endpoint-requirements",level:2},{value:"Retries",id:"retries",level:2},{value:"Event filtering",id:"event-filtering",level:2},{value:"Supported events",id:"supported-events",level:2},{value:"device",id:"device",level:3},{value:"release_changed",id:"release_changed",level:4},{value:"webhook",id:"webhook",level:3},{value:"test_fire",id:"test_fire",level:4}],d={toc:p},u="wrapper";function c(e){let{components:t,...n}=e;return(0,i.kt)(u,(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"webhooks"},"Webhooks"),(0,i.kt)("p",null,"Webhooks egress events from Peridio to an HTTPS endpoint."),(0,i.kt)("h2",{id:"security"},"Security"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Require TLS to enforce encrypted communications."),(0,i.kt)("li",{parentName:"ul"},"Provide HMAC-SHA256 request signatures."),(0,i.kt)("li",{parentName:"ul"},"Provide published at data to prevent replay attacks.")),(0,i.kt)("h3",{id:"secrets"},"Secrets"),(0,i.kt)("p",null,"Webhook secrets are the upcased hex-encoding of 128-bit secrets. They are rollable with a client-configurable transition window where dual signatures are provided temporarily."),(0,i.kt)("h3",{id:"signature-verification"},"Signature verification"),(0,i.kt)("p",null,"Webhook requests are signed via HMAC-SHA256."),(0,i.kt)("p",null,"To verify this signature you will need to calculate an expected signature and compare it. If they match, the signature has been verified to be correct."),(0,i.kt)("p",null,"To calculate the signature, you need the following data:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The webhook's secret."),(0,i.kt)("li",{parentName:"ul"},"The webhook request's:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"peridio-signature")," header."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"peridio-published-at")," header."),(0,i.kt)("li",{parentName:"ul"},"body.")))),(0,i.kt)("admonition",{title:"sensitive operations",type:"caution"},(0,i.kt)("p",{parentName:"admonition"},"It is critical that your own code as well as any tools you use do not alter the headers or body in any way prior to signature verification as doing so will cause it to fail.")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Verification process")),(0,i.kt)("admonition",{title:"dual signatures",type:"info"},(0,i.kt)("p",{parentName:"admonition"},"When you roll a webhook's secret, depending on whether you provide a TTL or not and what the value is, there may be up to two active secrets at once. When this happens, the value of the signature header will include two signatures seperated by a comma like ",(0,i.kt)("inlineCode",{parentName:"p"},"<sig1>,<sig2>")," instead of just one like ",(0,i.kt)("inlineCode",{parentName:"p"},"<sig1>"),".")),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Obtain value of ",(0,i.kt)("inlineCode",{parentName:"li"},"peridio-signature")," header.",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Keep in mind their may be two values here if you rolling secrets with a transition window. If your expected computed signature matches either signature, the request is valid."))),(0,i.kt)("li",{parentName:"ol"},"Obtain value of ",(0,i.kt)("inlineCode",{parentName:"li"},"peridio-published-at")," header."),(0,i.kt)("li",{parentName:"ol"},"Obtain request body."),(0,i.kt)("li",{parentName:"ol"},"Prepare the to-be-signed payload by concatentating:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"The published at value."),(0,i.kt)("li",{parentName:"ul"},"The request body."))),(0,i.kt)("li",{parentName:"ol"},"Compute the HMAC-SHA256 over the to-be-signed payload using the webhook's secret.")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Verification example")),(0,i.kt)("p",null,"You can use the following example values to validate your signature verification logic."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Webhook secret: ",(0,i.kt)("inlineCode",{parentName:"li"},"B284A51B143841695B2D7BF3B8554731"),"."),(0,i.kt)("li",{parentName:"ul"},"Published at: ",(0,i.kt)("inlineCode",{parentName:"li"},"2000-01-01T00:00:00Z"),"."),(0,i.kt)("li",{parentName:"ul"},"Body:",(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{"version":1,"prn":"prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:event:a727838c-0195-4ccf-8258-cebf4608db8e","type":"device","inserted_at":"2023-09-14T20:23:30Z","data":{"type":"release_changed","data":{"device":{"identifier":"SN1337","prn":"prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:device:a2edbb76-5f44-4202-860d-74a8c17d65aa"},"from_release":{"prn":"prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:release:499b64fb-1420-4f58-8c73-e5497e1f531e","version":"1.0.0"},"to_release":{"prn":"prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:release:f456986f-1a2f-4d73-8f70-96ff05a6bce7","version":"2.0.0"}}}}\n')))),(0,i.kt)("p",null,"Give the above, the to-be-signed payload would be:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-text"},'2000-01-01T00:00:00Z{"version":1,"prn":"prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:event:a727838c-0195-4ccf-8258-cebf4608db8e","type":"device","inserted_at":"2023-09-14T20:23:30Z","data":{"type":"release_changed","data":{"device":{"identifier":"SN1337","prn":"prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:device:a2edbb76-5f44-4202-860d-74a8c17d65aa"},"from_release":{"prn":"prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:release:499b64fb-1420-4f58-8c73-e5497e1f531e","version":"1.0.0"},"to_release":{"prn":"prn:1:4e33149b-637d-4679-b64f-4905e7a0cf8c:release:f456986f-1a2f-4d73-8f70-96ff05a6bce7","version":"2.0.0"}}}}\n')),(0,i.kt)("p",null,"Compute the HMAC-SHA256 over the to-be-signed payload using the webhook's secret."),(0,i.kt)("p",null,"The expected computed value is:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-text"},"FC825FCAA2E4C2688F075144105B75C2943D8B88AC4B5FAB134F2676A63FB6EF\n")),(0,i.kt)("p",null,"For valid requests, that should match the value provided by the ",(0,i.kt)("inlineCode",{parentName:"p"},"peridio-signature")," header."),(0,i.kt)("h3",{id:"replay-attacks"},"Replay attacks"),(0,i.kt)("p",null,"To protect against replay attacks, the published at header should be checked for staleness. Reject webhook requests whose published at value is sufficiently old given the current time and your security posture. We recommend a tolerance of 5 minutes. Ensure your servers performing this verification have accurate time via NTP or other means."),(0,i.kt)("h3",{id:"timing-attacks"},"Timing attacks"),(0,i.kt)("p",null,"To protect against timing attacks, use a constant-time string comparison to compare the expected signature to each of the received signatures."),(0,i.kt)("h2",{id:"url-verification"},"URL verification"),(0,i.kt)("p",null,"Peridio performs URL verification to help prevent misconfiguration of webhooks. When enabling a webhook, and when updating the ",(0,i.kt)("inlineCode",{parentName:"p"},"url")," field of an enabled webhook, the operation will only succeed if URL verification succeeds."),(0,i.kt)("p",null,"During URL verification, Peridio will execute a webhook request that publishes a ",(0,i.kt)("a",{parentName:"p",href:"#test_fire"},"webhook.test_fire event"),". For verification to succeed, a timely 200 must be returned."),(0,i.kt)("h2",{id:"deduplication"},"Deduplication"),(0,i.kt)("p",null,"The events that webhooks publish have a ",(0,i.kt)("a",{parentName:"p",href:"/reference/peridio-resource-names"},"PRN")," field that can be used for deduplication."),(0,i.kt)("h2",{id:"client-endpoint-requirements"},"Client endpoint requirements"),(0,i.kt)("p",null,"The client endpoint in this context is a webhook's ",(0,i.kt)("inlineCode",{parentName:"p"},"url")," field."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Must be prefixed with ",(0,i.kt)("inlineCode",{parentName:"li"},"https://"),"."),(0,i.kt)("li",{parentName:"ul"},"Must immediately return a ",(0,i.kt)("inlineCode",{parentName:"li"},"200")," upon receipt and signature verification. For example, you must return a ",(0,i.kt)("inlineCode",{parentName:"li"},"200")," response before updating a record in your system."),(0,i.kt)("li",{parentName:"ul"},"Must be operational at the time of enabling a webhook, or at the time of the update if updating the ",(0,i.kt)("inlineCode",{parentName:"li"},"url")," of an enabled webhook."),(0,i.kt)("li",{parentName:"ul"},"HTTP method:  ",(0,i.kt)("inlineCode",{parentName:"li"},"POST"),"."),(0,i.kt)("li",{parentName:"ul"},"Max ",(0,i.kt)("inlineCode",{parentName:"li"},"url")," length: ",(0,i.kt)("inlineCode",{parentName:"li"},"1028"),".")),(0,i.kt)("h2",{id:"retries"},"Retries"),(0,i.kt)("p",null,"Peridio will retry webhook delivery for up to 3 days with a jittered backoff."),(0,i.kt)("h2",{id:"event-filtering"},"Event filtering"),(0,i.kt)("p",null,"Peridio supports Peridio-side event filtering. This means that only the events that you are interested in are published. Leverage the enabled events options in the API and CLI to control this."),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},(0,i.kt)("inlineCode",{parentName:"p"},"webhook.test_fire")," events created as part of URL verification are published regardless of the webhook's ",(0,i.kt)("inlineCode",{parentName:"p"},"state")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"enabled_events"),". Test fire events created with the Peridio API ",(0,i.kt)("a",{parentName:"p",href:"/admin-api#webhooks/operation/test-fire-webhook"},"test-fire-webhook")," endpoint are published regardless of the webhook's state, but they require the webhook's ",(0,i.kt)("inlineCode",{parentName:"p"},"state")," to be ",(0,i.kt)("inlineCode",{parentName:"p"},"enabled"),".")),(0,i.kt)("h2",{id:"supported-events"},"Supported events"),(0,i.kt)("p",null,"All events have the following top level structure:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "version": 1,\n  "prn": "<prn of the event>",\n  "type": "<type of the event",\n  "data": <data structure depends on the type>,\n  "inserted_at": "2023-09-14T20:23:30Z"\n}\n')),(0,i.kt)("p",null,"The possible values for ",(0,i.kt)("inlineCode",{parentName:"p"},"type")," and the associated structure for their ",(0,i.kt)("inlineCode",{parentName:"p"},"data")," fields are documented below."),(0,i.kt)("h3",{id:"device"},"device"),(0,i.kt)("p",null,"Events with a ",(0,i.kt)("inlineCode",{parentName:"p"},"type")," of ",(0,i.kt)("inlineCode",{parentName:"p"},"device")," have the following ",(0,i.kt)("inlineCode",{parentName:"p"},"data")," structure:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "type": "<subtype of the event>",\n  "data": <data structure depends on the type>,\n}\n')),(0,i.kt)("p",null,"The possible values for ",(0,i.kt)("inlineCode",{parentName:"p"},"type")," and the associated structure for their ",(0,i.kt)("inlineCode",{parentName:"p"},"data")," fields are documented below."),(0,i.kt)("h4",{id:"release_changed"},"release_changed"),(0,i.kt)("p",null,"This event is created when a device informs Peridio of its current release, and that release is different than the one Peridio currently had on record. For example, if Peridio thought the device was on release 1, but then the device informed Peridio it was on release 2, then this event would be created going from 1 to 2."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"device")," events with a ",(0,i.kt)("inlineCode",{parentName:"p"},"type")," of ",(0,i.kt)("inlineCode",{parentName:"p"},"release_changed")," have the following ",(0,i.kt)("inlineCode",{parentName:"p"},"data")," structure:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "device": {\n    "identifier": "<identifier of the device>",\n    "prn": "<prn of the device>",\n  },\n  "from_release": {\n    "prn": "<prn of the release the device is udpating off of>",\n    "version": "<semver of the release>",\n  },\n  "to_release": {\n    "prn": "<prn of the release the device is updating to>",\n    "version": "<semver of the release>",\n  }\n}\n')),(0,i.kt)("h3",{id:"webhook"},"webhook"),(0,i.kt)("p",null,"Events with a ",(0,i.kt)("inlineCode",{parentName:"p"},"type")," of ",(0,i.kt)("inlineCode",{parentName:"p"},"webhook")," have the following ",(0,i.kt)("inlineCode",{parentName:"p"},"data")," structure:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "type": "<subtype of the event>",\n  "data": <data structure depends on the type>,\n}\n')),(0,i.kt)("h4",{id:"test_fire"},"test_fire"),(0,i.kt)("p",null,"This event is created by the Peridio API ",(0,i.kt)("a",{parentName:"p",href:"/admin-api#webhooks/operation/test-fire-webhook"},"test-fire-webhook")," endpoint as well as during ",(0,i.kt)("a",{parentName:"p",href:"/reference/webhooks#url-verification"},"URL verification"),"."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"webhook")," events with a ",(0,i.kt)("inlineCode",{parentName:"p"},"type")," of ",(0,i.kt)("inlineCode",{parentName:"p"},"test_fire")," have the following ",(0,i.kt)("inlineCode",{parentName:"p"},"data")," structure:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "webhook_prn": "<prn of the webhook>"\n}\n')))}c.isMDXComponent=!0}}]);