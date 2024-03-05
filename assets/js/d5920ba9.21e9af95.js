"use strict";(self.webpackChunkparasola=self.webpackChunkparasola||[]).push([[1823],{83359:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>d,contentTitle:()=>a,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var t=n(74848),r=n(28453);const o={},a="Overview",s={id:"integration/linux/overview",title:"Overview",description:"Peridio can be integrated with virtually any embedded / desktop Linux runtime. The quickest way to get started with Peridio is to deploy one of our reference designs. Our references are a subset of boards we maintain which we have found to be common / interesting deployment targets. While deploying a reference example is the easiest path running Peridio, it is also the most opinionated about the workflow, as the remainder of this document goes on to describe. The opinions expressed in the reference designs are not requirements to use Peridio. If you require greater flexibility and control in your environment, Peridio can be integrated by leveraging an SDK or by programming against the Device API.",source:"@site/docs/integration/linux/overview.md",sourceDirName:"integration/linux",slug:"/integration/linux/overview",permalink:"/integration/linux/overview",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"integration",previous:{title:"System Integrations",permalink:"/integration/introduction"},next:{title:"peridiod",permalink:"/integration/linux/peridiod"}},d={},l=[{value:"Reference Agent",id:"reference-agent",level:2},{value:"Reference Designs",id:"reference-designs",level:2},{value:"Runtime Structure",id:"runtime-structure",level:3},{value:"Partition Structure",id:"partition-structure",level:4},{value:"Peridio Cloud Requirements",id:"peridio-cloud-requirements",level:3},{value:"Development Machine Requirements",id:"development-machine-requirements",level:3}];function c(e){const i={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.h1,{id:"overview",children:"Overview"}),"\n",(0,t.jsxs)(i.p,{children:["Peridio can be integrated with virtually any embedded / desktop Linux runtime. The quickest way to get started with Peridio is to deploy one of our ",(0,t.jsx)(i.a,{href:"overview#reference-designs",children:"reference designs"}),". Our references are a subset of boards we maintain which we have found to be common / interesting deployment targets. While deploying a reference example is the easiest path running Peridio, it is also the most opinionated about the workflow, as the remainder of this document goes on to describe. The opinions expressed in the reference designs are not requirements to use Peridio. If you require greater flexibility and control in your environment, Peridio can be integrated by leveraging an SDK or by programming against the ",(0,t.jsx)(i.a,{href:"/device-api",children:"Device API"}),"."]}),"\n",(0,t.jsx)(i.h2,{id:"reference-agent",children:"Reference Agent"}),"\n",(0,t.jsxs)(i.p,{children:[(0,t.jsx)(i.code,{children:"peridiod"})," is a reference implementation of a Peridio Agent for Embedded Linux. Peridio offers several ways to integrate peridiod into your build workflow via several integration paths:"]}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsx)(i.li,{children:(0,t.jsx)(i.a,{href:"build-tools/yocto",children:"yocto"})}),"\n",(0,t.jsx)(i.li,{children:(0,t.jsx)(i.a,{href:"build-tools/buildroot",children:"buildroot"})}),"\n"]}),"\n",(0,t.jsxs)(i.p,{children:["For more information about the reference Linux agent, see ",(0,t.jsx)(i.a,{href:"peridiod#configuring",children:"peridiod"}),"."]}),"\n",(0,t.jsx)(i.h2,{id:"reference-designs",children:"Reference Designs"}),"\n",(0,t.jsx)(i.p,{children:"Peridio maintains opinionated reference implementations for a variety of development kits and evaluation boards. These designs apply a series of opinions to help produce a secure, robust, fault tolerant platform for designing connected products. These opinions are not requirements to implement Peridio into your product, Peridio is an extensible, modular core that can be integrated into a variety of systems and platforms. The Peridio reference designs for Linux implement the following opinions on structuring the platform which will prescribe a development workflow and update strategy."}),"\n",(0,t.jsx)(i.h3,{id:"runtime-structure",children:"Runtime Structure"}),"\n",(0,t.jsx)(i.h4,{id:"partition-structure",children:"Partition Structure"}),"\n",(0,t.jsx)(i.p,{children:"Peridio reference designs will implement an A/B update strategy by default This requires that you have enough space for storing two times the size of your included assets. The partition structure is completely customizable, the following opinions were chosen as a general base line for producing fault tolerant embedded systems."}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsx)(i.li,{children:"U-Boot Environment"}),"\n",(0,t.jsx)(i.li,{children:"Boot Partition A/B Updates"}),"\n",(0,t.jsx)(i.li,{children:"RootFS A/B Updates (Squashfs read-only)"}),"\n",(0,t.jsx)(i.li,{children:"Overlay FS Data Partition (read write)"}),"\n"]}),"\n",(0,t.jsxs)(i.p,{children:['The U-Boot Environment is used as a persistent data store for peridiod to track variables such as a boot counter, a validation flag, which partition slot is active, the contents of each slot, etc. These variables can be used at early boot time to perform roll back logic, for example, the validation flag can be set after the program reaches the desired runtime state after an update. The Peridio reference designs implement logic which will reset the validation flag to "0" when an update occurs. Your application should set this flag to "1" when it is deemed valid firmware. You can set this flag using ',(0,t.jsx)(i.code,{children:"fw_setenv peridio_validated 1"})," from the command line. If has not been set, something likely went wrong and the hardware watchdog reset the board. The following is an example of logic you may place into your bootloader configuration to determine which partition to boot from:"]}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-text",children:'peridio_revert=\\\n    if test ${peridio_active} = "a"; then\\\n        echo "Reverting to partition B";\\\n        setenv peridio_active "b";\\\n    else\\\n        echo "Reverting to partition A";\\\n        setenv peridio_active "a";\\\n    fi\n\nperidio_init=\\\n    if test ${peridio_booted} = 1; then\\\n        if test ${peridio_validated} = 0; then\\\n            run peridio_revert;\\\n            setenv peridio_validated 1;\\\n            saveenv;\\\n        fi;\\\n    fi;\\\n    if test ${peridio_active} = "a"; then\\\n        setenv bootpart 2;\\\n        setenv rootdevpath ${a.peridio_rootfs_part_devpath};\\\n        setenv datadevpath ${a.peridio_datafs_part_devpath};\\\n    else\\\n        setenv bootpart 3;\\\n        setenv rootdevpath ${b.peridio_rootfs_part_devpath};\\\n        setenv datadevpath ${b.peridio_datafs_part_devpath};\\\n    fi;\n\nbootcmd=run peridio_init my_boot_command\n'})}),"\n",(0,t.jsx)(i.h3,{id:"peridio-cloud-requirements",children:"Peridio Cloud Requirements"}),"\n",(0,t.jsx)(i.p,{children:"Building and connecting a reference design system to Peridio requires some additional configuration to your Peridio Cloud organization. The following steps will prepare your Peridio Cloud organization to connect devices running the default reference platform."}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsxs)(i.li,{children:["Reference designs use the product name ",(0,t.jsx)(i.code,{children:"avocado-linux"})," by default, ",(0,t.jsx)(i.a,{href:"/platform/guides/creating-products",children:"create a new product"})," named ",(0,t.jsx)(i.code,{children:"avocado-linux"})," in your Peridio Cloud organization."]}),"\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.a,{href:"/platform/guides/creating-x509-certificates-with-openssl",children:"Generate a Certificate Authority"})," for signing trusted device identities."]}),"\n",(0,t.jsx)(i.li,{children:(0,t.jsx)(i.a,{href:"/platform/guides/creating-ca-certificates",children:"Configure Peridio Cloud to trust your Certificate Authority"})}),"\n"]}),"\n",(0,t.jsx)(i.h3,{id:"development-machine-requirements",children:"Development Machine Requirements"}),"\n",(0,t.jsx)(i.p,{children:"Peridio reference designs for Linux are maintained with the Yocto build system. You will need access to a Linux environment ot build Yocto based systems. You can choose to use direct Linux installations, virtual machines, or docker."}),"\n",(0,t.jsx)(i.p,{children:"Building and configuring reference designs will require access to a development machine with the following tools and services installed:"}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.a,{href:"https://docs.yoctoproject.org/ref-manual/system-requirements.html",children:"Yocto System Requirements"}),"."]}),"\n",(0,t.jsx)(i.li,{children:(0,t.jsx)(i.a,{href:"https://kas.readthedocs.io/en/latest/userguide.html#dependencies-installation",children:"kas"})}),"\n",(0,t.jsx)(i.li,{children:(0,t.jsx)(i.a,{href:"/cli",children:"Install and configure the Peridio CLI"})}),"\n"]})]})}function u(e={}){const{wrapper:i}={...(0,r.R)(),...e.components};return i?(0,t.jsx)(i,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},28453:(e,i,n)=>{n.d(i,{R:()=>a,x:()=>s});var t=n(96540);const r={},o=t.createContext(r);function a(e){const i=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function s(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),t.createElement(o.Provider,{value:i},e.children)}}}]);