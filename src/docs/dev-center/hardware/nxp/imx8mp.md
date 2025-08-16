---
title: NXP i.MX 8MP EVK
description: How to develop for NXP i.MX 8M Plus Evaluation Kit.
---

![i.MX 8MP EVK](/img/hardware/nxp/imx8mp-evk.jpg)

The i.MX 8M Plus Evaluation Kit is a powerful and flexible platform for edge AI development. With a quad-core Cortex-A53 processor and an integrated neural processing unit (NPU), it enables real-time ML inference without overloading the CPU—ideal for vision, voice, and industrial applications.

Combined with Avocado OS, teams can deploy complex workloads quickly using a consistent, production-ready Linux environment.

## Technical Specifications

| Component        | Details                                                   |
|------------------|-----------------------------------------------------------|
| CPU              | Quad-core Arm Cortex-A53 (1.8 GHz)                        |
| MCU              | Single Arm Cortex-M7 (800 MHz)                            |
| NPU              | i.MX 8M Plus SoC integrated NPU                           |
| AI Performance   | Up to 2.3 TOPS (INT8)                                     |
| Memory           | 6GB 32-bit LPDDR4                                         |
| Memory Bandwidth | 12.8 GB/s                                                 |
| Storage          | 32GB eMMC                                                 |
| Connectivity     | Single M.2 Key E wireless module with Wi-Fi and Bluetooth |
| Power Modes      | 1.7W / 2W / 4W / 6W                                       |

## Getting Started

Get up and running with the Avocado Linux SDK for i.MX 8M Plus in minutes.

### Prerequisites

- A Mac (macOS 10.12+) or Linux (Ubuntu 22.04+, Fedora 39+) development machine
- Docker installed
- 10GB+ available disk space


### Provisioning your device

1. Initialize your project

```bash
avocado init --target imx8mp-evk avocado-imx8mp
cd avocado-imx8mp
```

2. Install all components (SDK, extensions, and runtime dependencies):

```bash
avocado install -f
```

3. Build all components

```bash
avocado build
```

4. Provision a runtime

```bash
avocado provision -r dev
```

5. Verify that a complete system image file was output:

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
