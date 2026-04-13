---
title: NVIDIA Jetson Orin Nano
description: Getting started with Avocado OS on NVIDIA Jetson Orin Nano.
sidebar_position: 3
---

# NVIDIA Jetson Orin Nano

This guide walks you through building and deploying Avocado OS to an NVIDIA Jetson Orin Nano Developer Kit. The Jetson is provisioned over USB using NVIDIA's tegraflash tooling, which runs inside the Avocado SDK container.

## Prerequisites

- NVIDIA Jetson Orin Nano Developer Kit
  - An NVMe SSD (M.2 2280 form factor)
- Linux host machine (Ubuntu 22.04+, Fedora 39+)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- The latest version of the [Avocado CLI](/developer-reference/avocado-cli/overview)
- 16 GB available disk space
- A USB-C cable for provisioning (host USB to Jetson USB-C)
- A TTY serial console USB adapter ([this or similar](https://www.amazon.com/dp/B07WX2DSVB)) — must be set to 3.3V

:::warning Disable auto-mount
If your host machine auto-mounts removable media, disable it before provisioning. Auto-mounting can interfere with the flash process.
:::

Connect your TTY serial console USB adapter to the Jetson's GPIO header pins. Locate the horizontal GPIO pins beneath the module on the topside of the carrier board:

- Boot into recovery mode:
  - <span style={{display: 'inline-block', width: '14px', height: '14px', backgroundColor: '#cccc00', borderRadius: '2px', verticalAlign: 'middle', marginRight: '6px'}}></span> yellow: short `FC REC` to `GND`
- Connect your serial console adapter to the target device:
  - <span style={{display: 'inline-block', width: '14px', height: '14px', backgroundColor: '#00aa00', borderRadius: '2px', verticalAlign: 'middle', marginRight: '6px'}}></span> green: `GND` to adapter UART GND
  - <span style={{display: 'inline-block', width: '14px', height: '14px', backgroundColor: '#0000cc', borderRadius: '2px', verticalAlign: 'middle', marginRight: '6px'}}></span> blue: `UART TXD` to adapter UART RX
  - <span style={{display: 'inline-block', width: '14px', height: '14px', backgroundColor: '#cc00cc', borderRadius: '2px', verticalAlign: 'middle', marginRight: '6px'}}></span> violet: `UART RXD` to adapter UART TX

![Jetson Orin Nano DevKit Serial Console](/img/jetson-orin-nano-devkit-serial-console.jpg)

Open a serial terminal:

```bash
tio -b 115200 /dev/ttyUSB0
```

Replace `/dev/ttyUSB0` with the appropriate device path for your adapter.

## Boot into recovery mode

To flash the Jetson, it must be in USB recovery mode:

1. With the device powered off, short the **FC REC** pin to **GND** using a jumper
2. Connect the USB-C cable from the Jetson to your host machine
3. Apply power to the Jetson

Verify the device is detected:

```bash
lsusb
```

Look for an entry containing `NVIDIA Corp. APX` — this confirms the device is in recovery mode.

## Initialize

Create a new project targeting the Jetson Orin Nano.

```bash
avocado init --target jetson-orin-nano-devkit jetson-orin-nano-devkit
cd jetson-orin-nano-devkit
```

## Install

Install the SDK toolchain, extension dependencies, and runtime packages.

```bash
avocado install -f
```

## Build

Build the system image.

```bash
avocado build
```

## Provision

Provision the `dev` runtime using the `tegraflash` profile. This builds the system image and flashes it to the Jetson over USB.

```bash
avocado provision -r dev --profile tegraflash
```

The procedure advances through several steps:

```text
== Step 1: Signing binaries ==
...
== Step 2: Boot Jetson via RCM ==
...
== Step 3: Sending flash sequence commands ==
...
```

During step 3, you will be prompted to disconnect and reconnect the USB-C cable:

```text
The Jetson device is waiting for USB disconnect to proceed.
Please manually disconnect and reconnect the USB cable now.

Steps:
  1. Unplug the USB-C cable from the Jetson device
  2. Wait 2-3 seconds
  3. Plug the USB-C cable back in

Press Enter after reconnecting the USB cable...
```

Follow the instructions. The process continues to step 4 (writing partitions) and step 5 (final status). During step 5, perform the same USB disconnect/reconnect procedure again.

When provisioning completes:

```text
[SUCCESS] Successfully provisioned runtime 'dev'
```

## Run

1. Remove power from the Jetson
2. Remove the jumper shorting **FC REC** to **GND**
3. Remove the USB-C cable
4. Leave the serial console adapter connected
5. Apply power

The device will boot with the provisioned system. Log in as `root` with an empty password via the serial console.
