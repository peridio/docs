# Overview

## Getting started

This guide depends on the following requirements:

- [Peridio Cloud Configuration](/integration/guides/peridio-core-custom-integration/linux/overview#peridio-cloud-requirements)
- [Peridio CLI Development Machine](/integration/guides/peridio-core-custom-integration/linux/overview#development-machine-requirements)

### Configuration

#### Generate device identity

Export the environment variables `PERIDIO_CERTIFICATE_FILE` and `PERIDIO_PRIVATE_KEY_FILE` to the location of the PEM files generated when configuring your signing PKI. For more information about device signing PKI, see [creating CA certificates](/platform/guides/creating-x509-certificates-with-openssl).

```bash
export PERIDIO_CERTIFICATE_FILE=/path/to/end-entity-certificate.pem
export PERIDIO_PRIVATE_KEY_FILE=/path/to/end-entity-private-key.pem
```

#### Create working directory

Create a working directory for building the `qemuarm64-secureboot` machine.

```bash
mkdir build-avocado-qemuarm64 && cd build-avocado-qemuarm64
```

Checkout the `meta-avocado` project to your build directory

```bash
git clone git@github.com:peridio/meta-avocado
```

### Build the system

You can build the project using kas. The product will have the device identity included as part of the runtime environment. Building this system may take a long time to complete depending on your build machine resources.

```bash
kas build --update meta-avocado/meta-avocado-example/conf/kas/machine/qemuarm64-secureboot.yml
```

## Testing

Resize the image:

```bash
qemu-img resize --shrink -f raw build/tmp/deploy/images/qemuarm64-secureboot/avocado-image-base-qemuarm64-secureboot.img 512M
```

Boot the qemu machine:

```bash
qemu-system-aarch64 \
  -M virt,secure=on,highmem=off \
  -bios build/tmp/deploy/images/qemuarm64-secureboot/flash.bin \
  -cpu cortex-a53 \
  -device sdhci-pci \
  -device sd-card,drive=mmc \
  -device virtio-net-device,netdev=eth0 \
  -device virtio-rng-device,rng=rng0 \
  -drive file=build/tmp/deploy/images/qemuarm64-secureboot/avocado-image-base-qemuarm64-secureboot.img,if=none,format=raw,id=mmc \
  -m 1024 \
  -netdev user,id=eth0,hostfwd=tcp::10022-:22 \
  -no-acpi \
  -nographic \
  -object rng-random,filename=/dev/urandom,id=rng0 \
  -rtc base=utc,clock=host \
  -smp 2
```
