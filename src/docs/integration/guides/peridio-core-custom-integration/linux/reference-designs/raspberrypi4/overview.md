# Raspberry Pi 4B

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

Create a working directory for building the `raspberrypi4-64` machine.

```bash
mkdir build-avocado-raspberrypi4-64 && cd build-avocado-raspberrypi4-64
```

Checkout the `meta-avocado` project to your build directory

```bash
git clone git@github.com:peridio/meta-avocado
```

### Build the system

You can build the project using kas. The product will have the device identity included as part of the runtime environment. Building this system may take a long time to complete depending on your build machine resources.

```bash
kas build --update meta-avocado/meta-avocado-example/conf/kas/machine/raspberrypi4-64.yml
```

## Testing

Insert a microSD card and execute the following command to write the image:

```shell
fwup build/tmp/deploy/images/raspberrypi4-64/avocado-image-base-raspberrypi4-64.fw
```

Connect a serial console cable to the UART pins on the Raspberry Pi header

<img src="/img/integration/linux/reference-designs/raspberry-pi-serial-cable-connection.png" />

Insert the microSD card and power on the board.
