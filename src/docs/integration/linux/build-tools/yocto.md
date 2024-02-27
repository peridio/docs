# Yocto

Peridio provides a yocto layer `meta-peridio` that can be used to include peridiod and its dependencies into your system.

The source code for the `meta-peridio` layer is available on [GitHub](https://github.com/peridio/meta-peridio).

## Extending a reference design

The reference designs can be extended to act as platform that you can build and deploy your application. To begin, you will need to have a firm understanding of creating a custom layer to hold your Yocto customizations. More information can be found in the [Yocto layer documentation](https://docs.yoctoproject.org/dev/dev-manual/layers.html).

### Checkout the source

Create a working directory in this example we will be building for the `qemuarm64-secureboot` reference design.

```bash
mkdir build-avocado-qemuarm64 && cd build-avocado-qemuarm64
```

Checkout the `meta-avocado` project to your build directory

```bash
git clone git@github.com:peridio/meta-avocado
```

### Customizing a machine

In your custom layer you will need to define a new machine or override an existing machine.

```text
meta-my-layer
├── conf
│   ├── layer.conf
│   └── peridio
│       └── my-machine.fwup.conf
└── recipes-peridio
    └── peridiod
        ├── peridiod
        │   ├── files
        │   │   └── peridiod.conf
        │   ├── my-machine
        │   │   └── peridio.json
        └── peridiod_%.bbappend
```

You will append a configuration to the `peridiod` to include your custom configuration

```bitbake title="recipes-peridio/peridiod/peridiod.bbappends"
FILESEXTRAPATHS:prepend := "${THISDIR}/${PN}:"

SRC_URI += " \
  file://peridio.json \
  file://peridiod.conf \
"

FILES:${PN} += " \
  ${sysconfdir}/peridiod/peridio.json \
  ${systemd_unitdir}/system.conf.d/peridiod.conf \
"

do_install:append() {
  install -D -m 644 ${WORKDIR}/peridio.json \
    ${D}/${sysconfdir}/peridiod

  install -D -m 644 ${WORKDIR}/peridiod.conf \
    ${D}${systemd_unitdir}/system.conf.d/peridiod.conf
}
```

Peridio offers an example on the structure of a custom layer in the [`meta-avocado-example` layer](https://github.com/peridio/meta-avocado/tree/main/meta-avocado-example).

Ensure you add `peridiod` to your recipes. If you are integrating with the `kas` build tooling, the `meta-peridio` layer offers a [helpful include fragment](https://github.com/peridio/meta-peridio/blob/kirkstone/conf/kas/peridio-include.yml) you can use to pull in yocto build dependencies. In your `kas` config yaml file, include the meta-peridio layer and include the `peridio-includes` from the repo. For example:

```yaml
header:
  version: 11
  includes:
    - repo: meta-peridio
      file: conf/kas/peridio-include.yml

repos:

  meta-peridio:
    url: https://github.com/peridio/meta-peridio.git
    branch: kirkstone
    commit: 3c7cb6a536f440218765a51d9b588f853569caeb
    layers:
      .:

```

## Building FWUP archives

The `meta-peridio` layer includes helpful image type classes to build fwup archives and `fwup-img` raw image file formats. These image classes will preset common variables to sane defaults which can be used in your fwup configuration file. This image class can be added to your `IMAGE_CLASSES` list in your custom yocto layer.

```shell
IMAGE_CLASSES += "image_types_fwup"
```

The following are variables the image class defines that can be overridden in `local.conf` of from the command line / kas configuration scripts:

```bash
# Firmware metadata
PERIDIO_META_AUTHOR ??= "${MAINTAINER}"
PERIDIO_META_PRODUCT ??= "${DISTRO}"
PERIDIO_META_VERSION ??= "${DISTRO_VERSION}"
PERIDIO_META_DESCRIPTION ??= "${DISTRO_NAME}"
PERIDIO_META_ARCHITECTURE ??= "${TARGET_ARCH}-${ABIEXTENSION}"
PERIDIO_META_PLATFORM ??= "${MACHINE}"

# Device Disk Information
PERIDIO_DISK_DEVPATH ??= "/dev/mmcblk0"
PERIDIO_DISK_BLOCK_SIZE ??= "512"

# Location for the U-Boot environment used to store peridiod data
PERIDIO_UBOOT_ENV_OFFSET ??= "2048"
PERIDIO_UBOOT_ENV_COUNT ??= "256"

# Disk boot partition structure
PERIDIO_BOOTFS_TYPE ??= "fat"
PERIDIO_BOOTFS_OFFSET_BLOCKS ??= "4096"
PERIDIO_BOOTFS_SIZE_MB ??= "16"

# Disk root fs partition structure
PERIDIO_ROOTFS_TYPE ??= "squashfs"
PERIDIO_ROOTFS_OFFSET_BLOCKS ??= "65536"
PERIDIO_ROOTFS_SIZE_MB ??= "256"

# Disk data (read-write) partition structure
PERIDIO_DATAFS_TYPE ??= "f2fs"
PERIDIO_DATAFS_OFFSET_BLOCKS ??= "1310720"
PERIDIO_DATAFS_SIZE_MB ??= "512"

# Disk /dev paths
PERIDIO_BOOT_PART_DEVPATH ??= "${PERIDIO_DISK_DEVPATH}p1"
PERIDIO_BOOT_PART_TYPE ??= "${PERIDIO_BOOTFS_TYPE}"

PERIDIO_ROOTFS_A_PART_DEVPATH ??= "${PERIDIO_DISK_DEVPATH}p2"
PERIDIO_ROOTFS_A_PART_TYPE ??= "${PERIDIO_ROOTFS_TYPE}"
PERIDIO_ROOTFS_A_PART_OFFSET_BLOCKS ??= "${PERIDIO_ROOTFS_OFFSET_BLOCKS}"

PERIDIO_ROOTFS_B_PART_DEVPATH ??= "${PERIDIO_DISK_DEVPATH}p3"
PERIDIO_ROOTFS_B_PART_TYPE ??= "${PERIDIO_ROOTFS_TYPE}"

PERIDIO_DATAFS_PART_DEVPATH ??= "${PERIDIO_DISK_DEVPATH}p4"
PERIDIO_DATAFS_PART_TYPE ??= "${PERIDIO_DATAFS_TYPE}"
PERIDIO_DATAFS_PART_MOUNTPOINT ??= "/data"

# Yocto output directory references
PERIDIO_ROOTFS_FILE ??= "${IMAGE_NAME}.rootfs.${PERIDIO_ROOTFS_TYPE}"
PERIDIO_HOST_ROOTFS_DIR ??= "${IMGDEPLOYDIR}"
PERIDIO_HOST_IMAGE_DIR ??= "${DEPLOY_DIR_IMAGE}"

FWUP_OUTPUT_NAME ??= "${IMAGE_BASENAME}-${MACHINE}"
FWUP_IMG_TASK ??= "complete"
```

An example of how these values are used in an fwup configuration can be found in the [QEmu reference repo](https://github.com/peridio/meta-avocado/blob/main/meta-avocado-arm/conf/peridio/qemu.fwup.conf).

Yocto can produce fwup archive and `fwup-img` raw image by adding them to `IMAGE_FSTYPES`:

```bash
IMAGE_FSTYPES += "fwup"
IMAGE_FSTYPES += "fwup-img"
```
