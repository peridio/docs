---
title: NXP i.MX 8MP EVK
description: How to develop for NXP i.MX 8M Plus Evaluation Kit.
---

The NXP i.MX 8M Plus EVK is a powerful evaluation kit designed for industrial vision and edge AI applications, featuring a quad-core Cortex-A53 processor, dedicated NPU for AI acceleration, and comprehensive multimedia capabilities.

## Technical Specifications

**Compute:**

- Quad-core Arm Cortex-A53 @ 2.0 GHz
- Cortex-M7 real-time core @ 800 MHz
- Neural Processing Unit (NPU) with 2.3 TOPS performance
- HiFi 4 DSP for audio processing

**Memory & Storage:**

- 6GB LPDDR4 RAM
- 32GB eMMC flash storage
- microSD card slot for expansion

**Vision & Display:**

- Dual MIPI CSI camera interfaces (up to 12MP/375MP/s)
- HDMI 2.0a output (up to 4K60)
- MIPI DSI display interface
- LVDS display support

**Connectivity:**

- Dual Gigabit Ethernet (one with TSN support)
- Wi-Fi 802.11ac and Bluetooth 5.0
- 2x USB 3.0, 1x USB-C
- PCIe Gen 3 interface

**Industrial Features:**

- Operating temperature: -40°C to +85°C
- Multiple CAN-FD interfaces
- Industrial I/O expansion headers
- Secure boot and cryptographic acceleration

## Getting Started

Get up and running with the Avocado Linux SDK for i.MX 8M Plus in minutes.

### Prerequisites

- Linux development machine (Ubuntu 22.04+, Fedora 39+)
- Podman installed
- 30GB+ available disk space (for full BSP)

### Installing and running the SDK

1. Pull the SDK container:

```bash
podman pull avocadolinux/sdk:apollo-edge
```

2. Create your workspace:

```bash
mkdir avocado-imx8mp
cd avocado-imx8mp
```

3. Start the SDK environment:

```bash
podman run -it --rm -e AVOCADO_SDK_TARGET=imx8mp-evk -v $(pwd):/opt:z --entrypoint entrypoint.sh avocadolinux/sdk:apollo-edge /bin/bash
```

### Building a System Image

1. Download the necessary images for the bootchain and core rootfs:

```bash
avocado-repo images
```

2. Install packages for your application (example with peridiod):

```bash
avocado-repo sysext install peridiod -y
```

3. Build system extension:

```bash
avocado-build sysext peridiod
```

4. Build var partition containing extension contents:

```bash
avocado-build var
```

5. Build complete system image:

```bash
avocado-build image
```

6. Verify that a complete system image file was output:

```bash
ls -l /opt/_avocado/output/avocado-image-imx8mp*.wic
```

### Flashing the Image

1. Insert a microSD card (minimum 8GB) into your development machine

2. Identify the device (typically `/dev/sdX` or `/dev/mmcblkX`):

```bash
lsblk
```

3. Flash the image to the SD card:

```bash
sudo dd if=/opt/_avocado/output/avocado-image-imx8mp*.wic of=/dev/sdX bs=4M conv=fsync status=progress
```

4. Insert the SD card into the i.MX 8MP EVK and power on

### Booting and Connecting

1. Connect to the serial console (115200 8N1):

```bash
minicom -D /dev/ttyUSB0 -b 115200
```

2. Default login credentials:
   - Username: `root`
   - Password: (no password by default)

3. Configure networking and start services as needed

## NPU Acceleration

The i.MX 8M Plus includes a dedicated Neural Processing Unit (NPU) providing 2.3 TOPS of AI acceleration. This enables running complex ML models directly on the edge device.

### Supported Frameworks

- TensorFlow Lite
- ONNX Runtime
- PyTorch (via ONNX)
- OpenVINO

### Example: Running Object Detection

```bash
# Install ML runtime packages
avocado-repo sysext install tensorflow-lite-vx-delegate -y

# Build and deploy with NPU support
avocado-build sysext tensorflow-lite-vx-delegate

# On target, run inference benchmark
cd /usr/share/tensorflow-lite/examples
./benchmark_model --graph=mobilenet_v2.tflite --use_nnapi=true
```

## Real-Time Processing with Cortex-M7

The i.MX 8M Plus includes a dedicated Cortex-M7 core running at 800 MHz for real-time processing tasks.

### Loading Firmware to M7 Core

```bash
# Stop the M7 core
echo stop > /sys/class/remoteproc/remoteproc0/state

# Load firmware
echo hello_world.elf > /sys/class/remoteproc/remoteproc0/firmware

# Start the M7 core
echo start > /sys/class/remoteproc/remoteproc0/state
```

## Dual Camera Support

The EVK supports dual MIPI CSI cameras for stereo vision and multi-angle capture applications.

### Camera Pipeline Setup

```bash
# List available cameras
v4l2-ctl --list-devices

# Capture from camera 0
gst-launch-1.0 v4l2src device=/dev/video0 ! video/x-raw,width=1920,height=1080 ! autovideosink

# Simultaneous dual camera capture
gst-launch-1.0 \
  v4l2src device=/dev/video0 ! queue ! autovideosink \
  v4l2src device=/dev/video1 ! queue ! autovideosink
```

## Industrial Networking

The i.MX 8M Plus EVK includes Time-Sensitive Networking (TSN) support for deterministic industrial communication.

### TSN Configuration

```bash
# Configure TSN on eth1
ip link set dev eth1 up
tc qdisc add dev eth1 parent root handle 100 taprio \
  num_tc 3 \
  map 2 2 1 0 2 2 2 2 2 2 2 2 2 2 2 2 \
  queues 1@0 1@1 2@2 \
  base-time 1000000000 \
  sched-entry S 01 300000 \
  sched-entry S 02 300000 \
  sched-entry S 04 400000 \
  clockid CLOCK_TAI
```

## Power Management

The i.MX 8M Plus supports multiple power modes for optimizing energy consumption.

### Power Mode Configuration

```bash
# Check current power mode
cat /sys/power/state

# Enter suspend mode
echo mem > /sys/power/state

# Configure CPU frequency scaling
cpufreq-set -g powersave
```

## Security Features

The i.MX 8M Plus EVK includes comprehensive security features:

- High Assurance Boot (HAB)
- Cryptographic acceleration (CAAM)
- Secure boot chain
- TrustZone support
- Inline encryption engine

### Enabling Secure Boot

Secure boot configuration is handled through the Avocado build system:

```bash
# Build with secure boot enabled
AVOCADO_SECURE_BOOT=1 avocado-build image
```

## Additional Resources

- [NXP i.MX 8M Plus Product Page](https://www.nxp.com/products/processors-and-microcontrollers/arm-processors/i-mx-applications-processors/i-mx-8-applications-processors/i-mx-8m-plus-arm-cortex-a53-machine-learning-vision-multimedia-and-industrial-iot:IMX8MPLUS)
- [i.MX 8M Plus Reference Manual](https://www.nxp.com/webapp/Download?colCode=IMX8MPRM)
- [Avocado Linux Documentation](https://avocadolinux.org)
- [Peridio Platform Documentation](/platform/reference/overview)
