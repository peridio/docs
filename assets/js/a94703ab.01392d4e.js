"use strict";(self.webpackChunkperidio_docs=self.webpackChunkperidio_docs||[]).push([[9048],{94823:(e,t,n)=>{n.r(t),n.d(t,{default:()=>he});var a=n(96540),o=n(34164),s=n(69024),i=n(17559),l=n(81754),r=n(26588),c=n(21312),d=n(23104),u=n(75062);const m={backToTopButton:"backToTopButton_sjWU",backToTopButtonShow:"backToTopButtonShow_xfvO"};var p=n(74848);function h(){const{shown:e,scrollToTop:t}=function(e){let{threshold:t}=e;const[n,o]=(0,a.useState)(!1),s=(0,a.useRef)(!1),{startScroll:i,cancelScroll:l}=(0,d.gk)();return(0,d.Mq)(((e,n)=>{let{scrollY:a}=e;const i=n?.scrollY;i&&(s.current?s.current=!1:a>=i?(l(),o(!1)):a<t?o(!1):a+window.innerHeight<document.documentElement.scrollHeight&&o(!0))})),(0,u.$)((e=>{e.location.hash&&(s.current=!0,o(!1))})),{shown:n,scrollToTop:()=>i(0)}}({threshold:300});return(0,p.jsx)("button",{"aria-label":(0,c.T)({id:"theme.BackToTopButton.buttonAriaLabel",message:"Scroll back to top",description:"The ARIA label for the back to top button"}),className:(0,o.A)("clean-btn",i.G.common.backToTopButton,m.backToTopButton,e&&m.backToTopButtonShow),type:"button",onClick:t})}var b=n(53109),x=n(56347),j=n(24581),g=n(6342),f=n(23465);function v(e){return(0,p.jsx)("svg",{width:"20",height:"20","aria-hidden":"true",...e,children:(0,p.jsxs)("g",{fill:"#7a7a7a",children:[(0,p.jsx)("path",{d:"M9.992 10.023c0 .2-.062.399-.172.547l-4.996 7.492a.982.982 0 01-.828.454H1c-.55 0-1-.453-1-1 0-.2.059-.403.168-.551l4.629-6.942L.168 3.078A.939.939 0 010 2.528c0-.548.45-.997 1-.997h2.996c.352 0 .649.18.828.45L9.82 9.472c.11.148.172.347.172.55zm0 0"}),(0,p.jsx)("path",{d:"M19.98 10.023c0 .2-.058.399-.168.547l-4.996 7.492a.987.987 0 01-.828.454h-3c-.547 0-.996-.453-.996-1 0-.2.059-.403.168-.551l4.625-6.942-4.625-6.945a.939.939 0 01-.168-.55 1 1 0 01.996-.997h3c.348 0 .649.18.828.45l4.996 7.492c.11.148.168.347.168.55zm0 0"})]})})}const A={collapseSidebarButton:"collapseSidebarButton_PEFL",collapseSidebarButtonIcon:"collapseSidebarButtonIcon_kv0_"};function _(e){let{onClick:t}=e;return(0,p.jsx)("button",{type:"button",title:(0,c.T)({id:"theme.docs.sidebar.collapseButtonTitle",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),"aria-label":(0,c.T)({id:"theme.docs.sidebar.collapseButtonAriaLabel",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),className:(0,o.A)("button button--secondary button--outline",A.collapseSidebarButton),onClick:t,children:(0,p.jsx)(v,{className:A.collapseSidebarButtonIcon})})}var k=n(65041),C=n(89532);const S=Symbol("EmptyContext"),N=a.createContext(S);function T(e){let{children:t}=e;const[n,o]=(0,a.useState)(null),s=(0,a.useMemo)((()=>({expandedItem:n,setExpandedItem:o})),[n]);return(0,p.jsx)(N.Provider,{value:s,children:t})}var y=n(72432),w=n(41422),I=n(99169),B=n(28774),L=n(92303);function M(e){let{collapsed:t,categoryLabel:n,onClick:a}=e;return(0,p.jsx)("button",{"aria-label":t?(0,c.T)({id:"theme.DocSidebarItem.expandCategoryAriaLabel",message:"Expand sidebar category '{label}'",description:"The ARIA label to expand the sidebar category"},{label:n}):(0,c.T)({id:"theme.DocSidebarItem.collapseCategoryAriaLabel",message:"Collapse sidebar category '{label}'",description:"The ARIA label to collapse the sidebar category"},{label:n}),"aria-expanded":!t,type:"button",className:"clean-btn menu__caret",onClick:a})}function E(e){let{item:t,onItemClick:n,activePath:s,level:r,index:c,...d}=e;const{items:u,label:m,collapsible:h,className:b,href:x,customProps:j}=t,{docs:{sidebar:{autoCollapseCategories:f}}}=(0,g.p)(),v=function(e){const t=(0,L.A)();return(0,a.useMemo)((()=>e.href&&!e.linkUnlisted?e.href:!t&&e.collapsible?(0,l.Nr)(e):void 0),[e,t])}(t),A=(0,l.w8)(t,s),_=(0,I.ys)(x,s),{collapsed:k,setCollapsed:T}=(0,w.u)({initialState:()=>!!h&&(!A&&t.collapsed)}),{expandedItem:E,setExpandedItem:H}=function(){const e=(0,a.useContext)(N);if(e===S)throw new C.dV("DocSidebarItemsExpandedStateProvider");return e}(),W=function(e){void 0===e&&(e=!k),H(e?null:c),T(e)};return function(e){let{isActive:t,collapsed:n,updateCollapsed:o}=e;const s=(0,C.ZC)(t);(0,a.useEffect)((()=>{t&&!s&&n&&o(!1)}),[t,s,n,o])}({isActive:A,collapsed:k,updateCollapsed:W}),(0,a.useEffect)((()=>{h&&null!=E&&E!==c&&f&&T(!0)}),[h,E,c,T,f]),(0,p.jsxs)("li",{className:(0,o.A)(i.G.docs.docSidebarItemCategory,i.G.docs.docSidebarItemCategoryLevel(r),"menu__list-item",{"menu__list-item--collapsed":k},b),children:[(0,p.jsxs)("div",{className:(0,o.A)("menu__list-item-collapsible",{"menu__list-item-collapsible--active":_}),children:[(0,p.jsxs)(B.A,{className:(0,o.A)("menu__link",{"menu__link--sublist":h,"menu__link--sublist-caret":!x&&h,"menu__link--active":A}),onClick:h?e=>{n?.(t),x?W(!1):(e.preventDefault(),W())}:()=>{n?.(t)},"aria-current":_?"page":void 0,role:h&&!x?"button":void 0,"aria-expanded":h&&!x?!k:void 0,href:h?v??"#":v,...d,children:[m,"\xa0",j&&j.legacy&&(0,p.jsx)(y.A,{type:"legacy"}),j&&j.labs&&(0,p.jsx)(y.A,{type:"labs"})]}),x&&h&&(0,p.jsx)(M,{collapsed:k,categoryLabel:m,onClick:e=>{e.preventDefault(),W()}})]}),(0,p.jsx)(w.N,{lazy:!0,as:"ul",className:"menu__list",collapsed:k,children:(0,p.jsx)(V,{items:u,tabIndex:k?-1:0,onItemClick:n,activePath:s,level:r+1})})]})}var H=n(43186),W=n(16654);const G={menuExternalLink:"menuExternalLink_NnFM",new:"new_YgcK"};function P(e){let{item:t,onItemClick:n,activePath:a,level:s,index:r,...c}=e;const{customProps:d,href:u,label:m,className:h,autoAddBaseUrl:b}=t,x=(0,l.w8)(t,a),j=(0,W.A)(u);return(0,p.jsx)("li",{className:(0,o.A)(i.G.docs.docSidebarItemLink,i.G.docs.docSidebarItemLinkLevel(s),"menu__list-item",h),children:(0,p.jsxs)(B.A,{className:(0,o.A)("menu__link",!j&&G.menuExternalLink,{"menu__link--active":x}),autoAddBaseUrl:b,"aria-current":x?"page":void 0,to:u,...j&&{onClick:n?()=>n(t):void 0},...c,children:[m,!j&&(0,p.jsx)(H.A,{}),"\xa0",d&&d.legacy&&(0,p.jsx)(y.A,{type:"legacy"}),d&&d.labs&&(0,p.jsx)(y.A,{type:"labs"}),d&&d.new&&(0,p.jsx)("span",{className:G.new,children:"New"})]})},m)}const R={menuHtmlItem:"menuHtmlItem_M9Kj"};function D(e){let{item:t,level:n,index:a}=e;const{value:s,defaultStyle:l,className:r}=t;return(0,p.jsx)("li",{className:(0,o.A)(i.G.docs.docSidebarItemLink,i.G.docs.docSidebarItemLinkLevel(n),l&&[R.menuHtmlItem,"menu__list-item"],r),dangerouslySetInnerHTML:{__html:s}},a)}function F(e){let{item:t,...n}=e;switch(t.type){case"category":return(0,p.jsx)(E,{item:t,...n});case"html":return(0,p.jsx)(D,{item:t,...n});default:return(0,p.jsx)(P,{item:t,...n})}}function U(e){let{items:t,...n}=e;const a=(0,l.Y)(t,n.activePath);return(0,p.jsx)(T,{children:a.map(((e,t)=>(0,p.jsx)(F,{item:e,index:t,...n},t)))})}const V=(0,a.memo)(U),Y={menu:"menu_SIkG",menuWithAnnouncementBar:"menuWithAnnouncementBar_GW3s"};function K(e){let{path:t,sidebar:n,className:s}=e;const l=function(){const{isActive:e}=(0,k.Mj)(),[t,n]=(0,a.useState)(e);return(0,d.Mq)((t=>{let{scrollY:a}=t;e&&n(0===a)}),[e]),e&&t}();return(0,p.jsx)("nav",{"aria-label":(0,c.T)({id:"theme.docs.sidebar.navAriaLabel",message:"Docs sidebar",description:"The ARIA label for the sidebar navigation"}),className:(0,o.A)("menu thin-scrollbar",Y.menu,l&&Y.menuWithAnnouncementBar,s),children:(0,p.jsx)("ul",{className:(0,o.A)(i.G.docs.docSidebarMenu,"menu__list"),children:(0,p.jsx)(V,{items:n,activePath:t,level:1})})})}const q="sidebar_njMd",z="sidebarWithHideableNavbar_wUlq",O="sidebarHidden_VK0M",Z="sidebarLogo_isFc";function J(e){let{path:t,sidebar:n,onCollapse:a,isHidden:s}=e;const{navbar:{hideOnScroll:i},docs:{sidebar:{hideable:l}}}=(0,g.p)();return(0,p.jsxs)("div",{className:(0,o.A)(q,i&&z,s&&O),children:[i&&(0,p.jsx)(f.A,{tabIndex:-1,className:Z}),(0,p.jsx)(K,{path:t,sidebar:n}),l&&(0,p.jsx)(_,{onClick:a})]})}const Q=a.memo(J);var X=n(75600),$=n(22069);const ee=e=>{let{sidebar:t,path:n}=e;const a=(0,$.M)();return(0,p.jsx)("ul",{className:(0,o.A)(i.G.docs.docSidebarMenu,"menu__list"),children:(0,p.jsx)(V,{items:t,activePath:n,onItemClick:e=>{"category"===e.type&&e.href&&a.toggle(),"link"===e.type&&a.toggle()},level:1})})};function te(e){return(0,p.jsx)(X.GX,{component:ee,props:e})}const ne=a.memo(te);function ae(e){const t=(0,j.l)(),n="desktop"===t||"ssr"===t,a="mobile"===t;return(0,p.jsxs)(p.Fragment,{children:[n&&(0,p.jsx)(Q,{...e}),a&&(0,p.jsx)(ne,{...e})]})}const oe={expandButton:"expandButton_TmdG",expandButtonIcon:"expandButtonIcon_i1dp"};function se(e){let{toggleSidebar:t}=e;return(0,p.jsx)("div",{className:oe.expandButton,title:(0,c.T)({id:"theme.docs.sidebar.expandButtonTitle",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),"aria-label":(0,c.T)({id:"theme.docs.sidebar.expandButtonAriaLabel",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),tabIndex:0,role:"button",onKeyDown:t,onClick:t,children:(0,p.jsx)(v,{className:oe.expandButtonIcon})})}const ie={docSidebarContainer:"docSidebarContainer_YfHR",docSidebarContainerHidden:"docSidebarContainerHidden_DPk8",sidebarViewport:"sidebarViewport_aRkj"};function le(e){let{children:t}=e;const n=(0,r.t)();return(0,p.jsx)(a.Fragment,{children:t},n?.name??"noSidebar")}function re(e){let{sidebar:t,hiddenSidebarContainer:n,setHiddenSidebarContainer:s}=e;const{pathname:l}=(0,x.zy)(),[r,c]=(0,a.useState)(!1),d=(0,a.useCallback)((()=>{r&&c(!1),!r&&(0,b.O)()&&c(!0),s((e=>!e))}),[s,r]);return(0,p.jsx)("aside",{className:(0,o.A)(i.G.docs.docSidebarContainer,ie.docSidebarContainer,n&&ie.docSidebarContainerHidden),onTransitionEnd:e=>{e.currentTarget.classList.contains(ie.docSidebarContainer)&&n&&c(!0)},children:(0,p.jsx)(le,{children:(0,p.jsxs)("div",{className:(0,o.A)(ie.sidebarViewport,r&&ie.sidebarViewportHidden),children:[(0,p.jsx)(ae,{sidebar:t,path:l,onCollapse:d,isHidden:r}),r&&(0,p.jsx)(se,{toggleSidebar:d})]})})})}const ce={docMainContainer:"docMainContainer_TBSr",docMainContainerEnhanced:"docMainContainerEnhanced_lQrH",docItemWrapperEnhanced:"docItemWrapperEnhanced_JWYK"};function de(e){let{hiddenSidebarContainer:t,children:n}=e;const a=(0,r.t)();return(0,p.jsx)("main",{className:(0,o.A)(ce.docMainContainer,(t||!a)&&ce.docMainContainerEnhanced),children:(0,p.jsx)("div",{className:(0,o.A)("container padding-top--md padding-bottom--lg",ce.docItemWrapper,t&&ce.docItemWrapperEnhanced),children:n})})}const ue={docRoot:"docRoot_UBD9",docsWrapper:"docsWrapper_hBAB"};function me(e){let{children:t}=e;const n=(0,r.t)(),[o,s]=(0,a.useState)(!1);return(0,p.jsxs)("div",{className:ue.docsWrapper,children:[(0,p.jsx)(h,{}),(0,p.jsxs)("div",{className:ue.docRoot,children:[n&&(0,p.jsx)(re,{sidebar:n.items,hiddenSidebarContainer:o,setHiddenSidebarContainer:s}),(0,p.jsx)(de,{hiddenSidebarContainer:o,children:t})]})]})}var pe=n(23363);function he(e){const t=(0,l.B5)(e);if(!t)return(0,p.jsx)(pe.A,{});const{docElement:n,sidebarName:a,sidebarItems:c}=t;return(0,p.jsx)(s.e3,{className:(0,o.A)(i.G.page.docsDocPage),children:(0,p.jsx)(r.V,{name:a,items:c,children:(0,p.jsx)(me,{children:n})})})}},23363:(e,t,n)=>{n.d(t,{A:()=>l});n(96540);var a=n(34164),o=n(21312),s=n(51107),i=n(74848);function l(e){let{className:t}=e;return(0,i.jsx)("main",{className:(0,a.A)("container margin-vert--xl",t),children:(0,i.jsx)("div",{className:"row",children:(0,i.jsxs)("div",{className:"col col--6 col--offset-3",children:[(0,i.jsx)(s.A,{as:"h1",className:"hero__title",children:(0,i.jsx)(o.A,{id:"theme.NotFound.title",description:"The title of the 404 page",children:"Page Not Found"})}),(0,i.jsx)("p",{children:(0,i.jsx)(o.A,{id:"theme.NotFound.p1",description:"The first paragraph of the 404 page",children:"We could not find what you were looking for."})}),(0,i.jsx)("p",{children:(0,i.jsx)(o.A,{id:"theme.NotFound.p2",description:"The 2nd paragraph of the 404 page",children:"Please contact the owner of the site that linked you to the original URL and let them know their link is broken."})})]})})})}},72432:(e,t,n)=>{n.d(t,{A:()=>s});n(96540),n(63427);const a={legacy:"legacy_tSD1",labs:"labs_qdU7"};var o=n(74848);function s(e){let{type:t}=e;return"labs"==t?(0,o.jsx)(i,{}):"legacy"==t?(0,o.jsx)(l,{}):void 0}function i(){return(0,o.jsxs)("span",{className:a.labs,children:[(0,o.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",width:"14px",children:(0,o.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"})}),"Labs"]})}function l(){return(0,o.jsxs)("span",{className:a.legacy,children:[(0,o.jsx)("svg",{style:{marginRight:"0.4em"},xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",width:"14px",children:(0,o.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"})}),"Legacy"]})}}}]);