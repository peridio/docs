"use strict";(self.webpackChunkparasola=self.webpackChunkparasola||[]).push([[4468],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>f});var i=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=i.createContext({}),s=function(e){var t=i.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=s(e.components);return i.createElement(p.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},m=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=s(n),m=a,f=d["".concat(p,".").concat(m)]||d[m]||u[m]||r;return n?i.createElement(f,o(o({ref:t},c),{},{components:n})):i.createElement(f,o({ref:t},c))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,o=new Array(r);o[0]=m;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[d]="string"==typeof e?e:a,o[1]=l;for(var s=2;s<r;s++)o[s]=n[s];return i.createElement.apply(null,o)}return i.createElement.apply(null,n)}m.displayName="MDXCreateElement"},7905:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>u,frontMatter:()=>r,metadata:()=>l,toc:()=>s});var i=n(7462),a=(n(7294),n(3905));const r={title:"Getting started"},o="Peridio Command Line Interface Overview",l={unversionedId:"cli",id:"cli",title:"Getting started",description:"Peridio CLI, or peridio, is a command-line interface to Peridio for use in your terminal or your scripts.",source:"@site/docs/cli.md",sourceDirName:".",slug:"/cli",permalink:"/cli",draft:!1,tags:[],version:"current",frontMatter:{title:"Getting started"},sidebar:"cli",next:{title:"create",permalink:"/cli/artifact-versions/create"}},p={},s=[{value:"Installation",id:"installation",level:2},{value:"Upgrade",id:"upgrade",level:3},{value:"Precedence of Supplied Values",id:"precedence-of-supplied-values",level:2},{value:"Configuration Files",id:"configuration-files",level:2},{value:"config.json",id:"configjson",level:3},{value:"credentials.json",id:"credentialsjson",level:3},{value:"Global Options",id:"global-options",level:2},{value:"API Key",id:"api-key",level:3},{value:"Base URL",id:"base-url",level:3},{value:"CA Path",id:"ca-path",level:3},{value:"Config Directory",id:"config-directory",level:3},{value:"Organization Name",id:"organization-name",level:3},{value:"Profile",id:"profile",level:3}],c={toc:s},d="wrapper";function u(e){let{components:t,...n}=e;return(0,a.kt)(d,(0,i.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"peridio-command-line-interface-overview"},"Peridio Command Line Interface Overview"),(0,a.kt)("p",null,"Peridio CLI, or ",(0,a.kt)("inlineCode",{parentName:"p"},"peridio"),", is a command-line interface to Peridio for use in your terminal or your scripts."),(0,a.kt)("p",null,"It aims to have complete support for the ",(0,a.kt)("a",{parentName:"p",href:"/admin-api"},"Peridio Admin API"),"."),(0,a.kt)("h2",{id:"installation"},"Installation"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"peridio")," is available as a downloadable binary from the ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/peridio/morel/releases"},"releases page"),"."),(0,a.kt)("h3",{id:"upgrade"},"Upgrade"),(0,a.kt)("p",null,"The CLI can upgrade itself in place via ",(0,a.kt)("inlineCode",{parentName:"p"},"peridio upgrade"),"."),(0,a.kt)("h2",{id:"precedence-of-supplied-values"},"Precedence of Supplied Values"),(0,a.kt)("p",null,"Options can be supplied in up to three ways, from highest to lowest precedence:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"CLI arguments"),(0,a.kt)("li",{parentName:"ol"},"Environment variables"),(0,a.kt)("li",{parentName:"ol"},"Configuration files")),(0,a.kt)("h2",{id:"configuration-files"},"Configuration Files"),(0,a.kt)("p",null,"The Peridio CLI supports profile based configuration files as a means of supplying options that are relevant to many subcommands. A particular profile can be choosen explicitly via ",(0,a.kt)("a",{parentName:"p",href:"#profile"},"--profile"),". To use this functionality you must specify at least a ",(0,a.kt)("inlineCode",{parentName:"p"},"config.json")," file and optionally, if you wish to specify API keys via this method, a ",(0,a.kt)("inlineCode",{parentName:"p"},"credentials.json")," in the same directory."),(0,a.kt)("p",null,"By default, the directory searched for these files is:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Linux: ",(0,a.kt)("inlineCode",{parentName:"li"},"$HOME/.config/peridio")),(0,a.kt)("li",{parentName:"ul"},"Windows: ",(0,a.kt)("inlineCode",{parentName:"li"},"{FOLDERID_RoamingAppData}/peridio/config")),(0,a.kt)("li",{parentName:"ul"},"macOS: ",(0,a.kt)("inlineCode",{parentName:"li"},"$HOME/Library/Application\\ Support/peridio"))),(0,a.kt)("p",null,"To override this directory, see ",(0,a.kt)("a",{parentName:"p",href:"#config-directory"},"--config-directory"),"."),(0,a.kt)("h3",{id:"configjson"},"config.json"),(0,a.kt)("p",null,"Contains a single object of the format:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="Example"',title:'"Example"'},'{\n  "my-first-profile": {\n    "organization_name": "my-organizations-name"\n  }\n}\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="Schema"',title:'"Schema"'},'{\n  PROFILE_NAME: {\n    "base_url": BASE_URL,\n    "ca_path": CA_PATH,\n    "organization_name": ORGANIZATION_NAME\n  },\n  ...\n}\n')),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},(0,a.kt)("em",{parentName:"strong"},"BASE_URL"))),(0,a.kt)("p",null,"Optional. String. See ",(0,a.kt)("a",{parentName:"p",href:"#base-url"},"--base-url"),"."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},(0,a.kt)("em",{parentName:"strong"},"CA_PATH"))),(0,a.kt)("p",null,"Optional. String. See ",(0,a.kt)("a",{parentName:"p",href:"#ca-path"},"--ca-path"),"."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},(0,a.kt)("em",{parentName:"strong"},"ORGANIZATION_NAME"))),(0,a.kt)("p",null,"Optional. String. See ",(0,a.kt)("a",{parentName:"p",href:"#organization-name"},"--organization-name"),"."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},(0,a.kt)("em",{parentName:"strong"},"PROFILE_NAME"))),(0,a.kt)("p",null,"The name of a profile. Can correspond to an entry in credentials.json. A particular profile can be choosen explicitly via ",(0,a.kt)("a",{parentName:"p",href:"#profile"},"--profile"),"."),(0,a.kt)("h3",{id:"credentialsjson"},"credentials.json"),(0,a.kt)("p",null,"Contains a single object of the format:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="Example"',title:'"Example"'},'{\n  "my-first-profile": {\n    "api_key": "my-api-key"\n  }\n}\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="Schema"',title:'"Schema"'},'{\n  PROFILE_NAME: {\n    "api_key": API_KEY\n  },\n  ...\n}\n')),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},(0,a.kt)("em",{parentName:"strong"},"API_KEY"))),(0,a.kt)("p",null,"Optional. String. See ",(0,a.kt)("a",{parentName:"p",href:"#api-key"},"--api-key"),"."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},(0,a.kt)("em",{parentName:"strong"},"PROFILE_NAME"))),(0,a.kt)("p",null,"The name of a profile. Must correspond to an entry in ",(0,a.kt)("inlineCode",{parentName:"p"},"config.json"),". A particular profile can be choosen explicitly via ",(0,a.kt)("a",{parentName:"p",href:"#profile"},"--profile"),"."),(0,a.kt)("h2",{id:"global-options"},"Global Options"),(0,a.kt)("p",null,"Global options are options that are relevant to many commands. They are supplied after ",(0,a.kt)("inlineCode",{parentName:"p"},"peridio")," but before a command, e.g., ",(0,a.kt)("inlineCode",{parentName:"p"},"peridio --profile foo products list"),"."),(0,a.kt)("h3",{id:"api-key"},"API Key"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"-a"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"--api-key <api-key>"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"$PERIDIO_API_KEY")),(0,a.kt)("p",null,"The API key used to authenticate and authorize requests against the Peridio Admin API."),(0,a.kt)("p",null,"Can be provided via configuration files."),(0,a.kt)("h3",{id:"base-url"},"Base URL"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"-b"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"--base-url <base-url>"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"$PERIDIO_BASE_URL")),(0,a.kt)("p",null,"Defaults to ",(0,a.kt)("inlineCode",{parentName:"p"},"https://api.cremini.peridio.com"),"."),(0,a.kt)("p",null,"The base URL of the Peridio Admin API."),(0,a.kt)("p",null,"Can be provided via configuration files."),(0,a.kt)("h3",{id:"ca-path"},"CA Path"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"-c"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"--ca-path <ca-path>"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"$PERIDIO_CA_PATH")),(0,a.kt)("p",null,"A path identifying a file containing PEM encoded CA certificates to additionally trust when making API requests."),(0,a.kt)("p",null,"Can be provided via configuration files."),(0,a.kt)("h3",{id:"config-directory"},"Config Directory"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"-d"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"--config-directory <config-directory>"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"$PERIDIO_CONFIG_DIRECTORY")),(0,a.kt)("p",null,"Defaults to ",(0,a.kt)("inlineCode",{parentName:"p"},"$HOME/Library/Application\\ Support/peridio")," on macOS."),(0,a.kt)("p",null,"A path identifying the directory the CLI should look within to find Peridio CLI configuration files."),(0,a.kt)("h3",{id:"organization-name"},"Organization Name"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"-o"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"--organization-name <organization-name>"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"$PERIDIO_ORGANIZATION_NAME")),(0,a.kt)("p",null,"If applicable, the case-sensitive name of the organization against which Peridio Admin API requests will be executed."),(0,a.kt)("p",null,"Can be provided via configuration files."),(0,a.kt)("h3",{id:"profile"},"Profile"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"-p"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"--profile <profile>"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"$PERIDIO_PROFILE")),(0,a.kt)("p",null,"Explicitly chooses a profile within a ",(0,a.kt)("inlineCode",{parentName:"p"},"config.json")," to use. See ",(0,a.kt)("a",{parentName:"p",href:"#configuration-files"},"configuration files"),"."))}u.isMDXComponent=!0}}]);