---
title: NVIDIA Jetson Orin Nano
description: Getting started with Avocado OS on NVIDIA Jetson Orin Nano.
sidebar_position: 3
---

import HostPrerequisites from '@site/src/components/shared/HostPrerequisites'
import SerialConsoleOptional from '@site/src/components/shared/SerialConsoleOptional'

# NVIDIA Jetson Orin Nano

This guide walks you through building and deploying Avocado OS to an NVIDIA Jetson Orin Nano Developer Kit. The Jetson is provisioned over USB using NVIDIA's tegraflash tooling, which runs inside the Avocado SDK container.

## Prerequisites

- NVIDIA Jetson Orin Nano Developer Kit
  - An NVMe SSD (M.2 2280 form factor)
- macOS 13.0+ or Linux (Ubuntu 22.04+, Fedora 39+)
- 16 GB available disk space
- A USB-C cable for provisioning (host USB to Jetson USB-C)

<HostPrerequisites />

## Serial console (optional)

<SerialConsoleOptional />

If you want a serial console, connect a TTY serial console USB adapter (for example, [this 3.3V adapter](https://www.amazon.com/dp/B07WX2DSVB)) to the Jetson's UART GPIO header pins. Locate the horizontal GPIO pins beneath the module on the topside of the carrier board, then wire the adapter:

- <span style={{display: 'inline-block', width: '14px', height: '14px', backgroundColor: '#000000', borderRadius: '2px', verticalAlign: 'middle', marginRight: '6px'}}></span> black: `GND` to UART GND
- <span style={{display: 'inline-block', width: '14px', height: '14px', backgroundColor: '#00aa00', borderRadius: '2px', verticalAlign: 'middle', marginRight: '6px'}}></span> green: `UART TXD` to adapter UART RX
- <span style={{display: 'inline-block', width: '14px', height: '14px', backgroundColor: '#0000cc', borderRadius: '2px', verticalAlign: 'middle', marginRight: '6px'}}></span> blue: `UART RXD` to adapter UART TX

(The recovery-mode jumper — shorting `FC REC` to `GND` — is covered separately under [Boot into recovery mode](#boot-into-recovery-mode) and is required whether or not you attach a serial console.)

![Jetson Orin Nano DevKit Serial Console](/img/jetson-orin-nano-devkit-serial-console.gif)

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

:::note Provisioning on a Linux host
If your Linux desktop auto-mounts removable media, disable it first — see [Linux Auto-Mounting](/developer-reference/linux-auto-mounting).
:::

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

When provisioning completes:

```text
[SUCCESS] Successfully provisioned runtime 'dev'
```

## Run

1. Remove power from the Jetson
2. Remove the jumper shorting **FC REC** to **GND**
3. Remove the USB-C cable
4. If you attached a serial console adapter, leave it connected
5. Apply power

The device will boot with the provisioned system. The `root` user has an empty password — log in over the serial console (if connected) or via SSH once the device is on the network.

### SSH access

Once booted, you can SSH into the device if you know its IP address:

```bash
ssh root@<device-ip>
```

The `dev` runtime includes an SSH server with passwordless root login for development purposes.
