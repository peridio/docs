# Overview

Peridio can be integrated with virtually any embedded / desktop Linux runtime. The quickest way to get started with Peridio is to deploy one of our [reference designs](overview#reference-designs). Our references are a subset of boards we maintain which we have found to be common / interesting deployment targets. While deploying a reference example is the easiest path running Peridio, it is also the most opinionated about the workflow, as the remainder of this document goes on to describe. The opinions expressed in the reference designs are not requirements to use Peridio. If you require greater flexibility and control in your environment, Peridio can be integrated by leveraging an SDK or by programming against the [Device API](/device-api).

## Reference Agent

`peridiod` is a reference implementation of a Peridio Agent for Embedded Linux. Peridio offers several ways to integrate peridiod into your build workflow via several integration paths:

* [yocto](build-tools/yocto)
* [buildroot](build-tools/buildroot)

For more information about the reference Linux agent, see [peridiod](peridiod#configuring).

## Reference Designs

Peridio maintains opinionated reference implementations for a variety of development kits and evaluation boards. These designs apply a series of opinions to help produce a secure, robust, fault tolerant platform for designing connected products. These opinions are not requirements to implement Peridio into your product, Peridio is an extensible, modular core that can be integrated into a variety of systems and platforms. The Peridio reference designs for Linux implement the following opinions on structuring the platform which will prescribe a development workflow and update strategy.

### Runtime Structure

#### Partition Structure

Peridio reference designs will implement an A/B update strategy by default This requires that you have enough space for storing two times the size of your included assets. The partition structure is completely customizable, the following opinions were chosen as a general base line for producing fault tolerant embedded systems.

* U-Boot Environment
* Boot Partition A/B Updates
* RootFS A/B Updates (Squashfs read-only)
* Overlay FS Data Partition (read write)

The U-Boot Environment is used as a persistent data store for peridiod to track variables such as a boot counter, a validation flag, which partition slot is active, the contents of each slot, etc. These variables can be used at early boot time to perform roll back logic, for example, the validation flag can be set after the program reaches the desired runtime state after an update. The Peridio reference designs implement logic which will reset the validation flag to "0" when an update occurs. Your application should set this flag to "1" when it is deemed valid firmware. You can set this flag using `fw_setenv peridio_validated 1` from the command line. If has not been set, something likely went wrong and the hardware watchdog reset the board. The following is an example of logic you may place into your bootloader configuration to determine which partition to boot from:

```text
peridio_revert=\
    if test ${peridio_active} = "a"; then\
        echo "Reverting to partition B";\
        setenv peridio_active "b";\
    else\
        echo "Reverting to partition A";\
        setenv peridio_active "a";\
    fi

peridio_init=\
    if test ${peridio_booted} = 1; then\
        if test ${peridio_validated} = 0; then\
            run peridio_revert;\
            setenv peridio_validated 1;\
            saveenv;\
        fi;\
    fi;\
    if test ${peridio_active} = "a"; then\
        setenv bootpart 2;\
        setenv rootdevpath ${a.peridio_rootfs_part_devpath};\
        setenv datadevpath ${a.peridio_datafs_part_devpath};\
    else\
        setenv bootpart 3;\
        setenv rootdevpath ${b.peridio_rootfs_part_devpath};\
        setenv datadevpath ${b.peridio_datafs_part_devpath};\
    fi;

bootcmd=run peridio_init my_boot_command
```

### Peridio Cloud Requirements

Building and connecting a reference design system to Peridio requires some additional configuration to your Peridio Cloud organization. The following steps will prepare your Peridio Cloud organization to connect devices running the default reference platform.

* Reference designs use the product name `avocado-linux` by default, [create a new product](/platform/guides/creating-products) named `avocado-linux` in your Peridio Cloud organization.
* [Generate a Certificate Authority](/platform/guides/creating-x509-certificates-with-openssl) for signing trusted device identities.
* [Configure Peridio Cloud to trust your Certificate Authority](/platform/guides/creating-ca-certificates)

### Development Machine Requirements

Peridio reference designs for Linux are maintained with the Yocto build system. You will need access to a Linux environment to build Yocto based systems. You can choose to use direct Linux installations, virtual machines, or docker.

Building and configuring reference designs will require access to a development machine with the following tools and services installed:

* [Yocto System Requirements](https://docs.yoctoproject.org/ref-manual/system-requirements.html).
* [kas](https://kas.readthedocs.io/en/latest/userguide.html#dependencies-installation)
* [Install and configure the Peridio CLI](/cli)
