---
title: Desktop Deploy
---

# Desktop Deploy

This guide provides a comprehensive step-by-step walkthrough for deploying firmware updates directly from your desktop to a Raspberry Pi 4 using Avocado OS's powerful sideloading capabilities. By leveraging Avocado OS sideloading, you can rapidly test and deploy firmware iterations to physical hardware without requiring a full cloud infrastructure setup, making it ideal for development environments, proof-of-concepts, and situations where direct device access is preferred. This approach streamlines the development workflow by allowing you to push updates directly from your workstation to your Raspberry Pi 4 while maintaining the security and reliability features built into the Avocado OS update system.

In this guide, you will use the Avocado CLI with a pre-configured example repository to build a custom Avocado OS image and provision it directly to your device. We'll walk through cloning the example repository, installing dependencies, building the image, flashing the system to an SD card, and then demonstrate how to use sideloading for rapid development iterations on your Raspberry Pi 4.

## Prerequisites

Before starting this guide, ensure you have:

- A Raspberry Pi 4 device
- A microSD card (16GB or larger recommended)
- A microSD card reader/writer or USB adapter for SD cards
- A Mac (macOS 10.12+) or Linux (Ubuntu 22.04+, Fedora 39+) development machine

:::info
This guide is intended to be run on a Mac (macOS 10.12+) or Linux (Ubuntu 22.04+, Fedora 39+) development machine. Running these commands on Windows is not currently supported.
:::

:::warning Linux Required for SD Card Writing
The SD card writing process **must** be performed on a Linux host machine. Docker does not allow USB passthrough, so if you're running on macOS or another non-Linux system, you'll need access to a Linux VM or physical Linux machine for the SD card flashing step. All other steps (project initialization, building, etc.) can be performed on your primary development machine.
:::

## Get the Avocado CLI

To get started with device provisioning, we will first need the [Avocado CLI](https://github.com/avocado-linux/avocado-cli). Grab the latest release for your development architecture from the [Github releases page](https://github.com/avocado-linux/avocado-cli/releases).

#### Command

```bash
avocado
```

#### Output

```text
Avocado CLI - A command line interface for Avocado

Usage: avocado [OPTIONS] <COMMAND>

Commands:
  sdk        SDK related commands
  ext        Extension related commands
  init       Initialize a new avocado project
  runtime    Runtime management commands
  hitl       Hardware-in-the-loop testing commands
  clean      Clean the avocado project by removing docker volumes and state files
  install    Install all components (SDK, extensions, and runtime dependencies)
  upgrade    Upgrade the CLI to the latest (or specified) version
  build      Build all components (SDK compile, extensions, and runtime images)
  provision  Provision a runtime (shortcut for 'runtime provision')
  deploy     Deploy a runtime to a device (shortcut for 'runtime deploy')

Options:
      --target <TARGET>  Global target architecture
  -h, --help             Print help
  -V, --version          Print version

```

## Clone the Avocado Extension Repository

Instead of initializing a new project, we'll use a pre-configured example that supports multiple targets. Clone the Avocado extension repository which contains a comprehensive example configuration.

#### Command

```bash
git clone https://github.com/avocado-linux/avocado-ext.git
```

## Navigate to the Development Runtime

The repository contains a full example configuration in the `runtimes/dev` directory that supports multiple hardware targets. Navigate to this directory:

#### Command

```bash
cd avocado-ext/runtimes/dev
```

This directory contains a comprehensive `avocado.toml` configuration file that supports multiple targets including Raspberry Pi 4, with all necessary dependencies and extensions pre-configured.

## Set Target Architecture

Since the configuration supports multiple targets, we need to specify which target architecture we're building for by setting an environment variable:

#### Command

```bash
export AVOCADO_TARGET="raspberrypi4"
```

This environment variable tells all subsequent Avocado commands to use the Raspberry Pi 4 target configuration.

:::info
Run all subsequent commands in this guide from the `runtimes/dev` directory — the directory that contains the multi-target Avocado config (`avocado.toml`).
:::

## Pre-configured Setup

The example repository comes with a pre-configured `avocado.toml` that includes user credentials and all necessary settings for multiple hardware targets. The configuration is already set up with an empty root password for development convenience, so no additional credential setup is required.

## Install dependencies

The `avocado install` command pulls the SDK container and installs dependencies for the SDK, all declared extensions, and your runtime(s). The `--force` flag (`-f`) skips interactive prompts during package installation.

#### Command

```bash
avocado install -f
```

#### Output

```text
[INFO] Using target: raspberrypi4 (from environment variable)
[INFO] Starting comprehensive install process...
[INFO] Step 1/3: Installing SDK dependencies
[INFO] Using target: raspberrypi4 (from environment variable)
[INFO] Installing SDK dependencies.
[INFO] Initializing Avocado SDK.
Avocado SDK                                                          1.9 kB/s | 1.9 kB     00:00
Dependencies resolved.
==============================================================================================================================
| Package                               Architecture                  Version                 Repository                  Size
==============================================================================================================================
Installing:
 avocado-sdk-raspberrypi4               all_avocadosdk                1.0-r0                  avocado-sdk                7.9 k

... snip ...

Installed:
  avocado-img-bootfiles-1.0-r0.avocado_raspberrypi4   avocado-img-initramfs-1.0-r0.avocado_raspberrypi4
  avocado-img-rootfs-1.0-r0.avocado_raspberrypi4

Complete!
[SUCCESS] Successfully installed packages for runtime 'dev'
[SUCCESS] Successfully installed dependencies for 1 runtime(s)
[SUCCESS] All components installed successfully!
```

## Build all components

The `avocado build` command compiles any required SDK code for extensions, builds extension images, and produces the runtime image(s) as defined in your avocado config. This process creates the complete Avocado OS image optimized for the Raspberry Pi 4.

#### Command

```bash
avocado build
```

#### Output

```text
[INFO] Using target: raspberrypi4 (from environment variable)
[INFO] Starting comprehensive build process...
[INFO] Step 1/4: Analyzing dependencies and compiling SDK code
[INFO] No SDK compilation needed.
[INFO] Step 2/4: Building extensions
[INFO] Building sysext extension 'avocado-dev'.

... snip ...

[SUCCESS] Created.
[SUCCESS] Successfully ran SDK lifecycle hook 'avocado-build' for target 'raspberrypi4'.
[SUCCESS] Successfully built runtime 'dev'
[SUCCESS] All components built successfully!
```

## Provision the Raspberry Pi 4

The `avocado provision` command prepares the specified runtime by transforming the build output and creating the final artifacts for deployment. For Raspberry Pi 4, this creates an SD card image that can be flashed to your microSD card.

#### Command

```bash
avocado provision -r dev
```

#### Output

```text
[INFO] Provisioning runtime 'dev'

... snip ...

[SUCCESS] Provision script completed successfully.
[SUCCESS] Provision completed.
[SUCCESS] Successfully ran SDK lifecycle hook 'avocado-provision' for target 'raspberrypi4'.
[SUCCESS] Successfully provisioned runtime 'dev'
```

The provisioning process creates the necessary artifacts for flashing to your Raspberry Pi 4's SD card. The generated image includes your configured user credentials, extensions, and all the components needed to boot Avocado OS on your device.

## SD Card Provisioning Configuration

The example repository includes pre-configured SD card provisioning profiles that grant the necessary system access for writing to SD cards. No additional configuration is required.

## Write to SD Card

Now we're ready to write the Avocado OS image to your SD card. This process is interactive and requires you to insert the SD card at the right moment.

:::warning Important
Make sure your SD card is **NOT** inserted before running the provisioning command. The tool needs to detect the SD card insertion to identify the correct device.

**CLI UX Note**: If the command appears to be stuck or waiting, press **Enter** to proceed with SD card detection. If it seems to be waiting again after detection, press **"y"** to continue with the write operation.
:::

#### Command

```bash
avocado provision --provision-profile sd -r dev
```

#### Interactive Process

The provisioning process will guide you through the SD card writing:

1. **Initial Setup**: The tool prepares the image and waits for SD card detection
2. **Insert SD Card**: When prompted, insert your SD card - it will be automatically detected
3. **Confirmation**: You'll need to confirm the write operation by typing `y`

#### Output

```text
[INFO] Provisioning runtime 'dev'
[INFO] Running SDK lifecycle hook 'avocado-provision' for 'dev'.
[INFO] Running stone provision.
  Input directory:  /opt/_avocado/raspberrypi4/output/runtimes/dev/stone
[INFO] Provisioning storage device 'rootdisk'.
[INFO] Building image 'uboot_env' in device 'rootdisk'.
[INFO] Building image 'boot' in device 'rootdisk'.
[INFO] Building FAT image 'boot' -> 'boot.img'.
[SUCCESS] Built FAT image 'boot.img'.
[INFO] Building image 'rootfs' in device 'rootdisk'.
[INFO] Building image 'var' in device 'rootdisk'.
[INFO] Building storage device 'rootdisk' with fwup template 'rootdisk.conf'.
[SUCCESS] Created firmware package using configuration:
  package: '/opt/_avocado/raspberrypi4/output/runtimes/dev/stone/_build/avocado-raspberrypi4-rootdisk.zip'
  configuration: '/opt/_avocado/raspberrypi4/output/runtimes/dev/stone/rootdisk.conf'
[INFO] Executing provision script '/opt/_avocado/raspberrypi4/output/runtimes/dev/stone/stone-provision-sd.sh'.
==========================================
Avocado SD Card Provisioning Tool
==========================================

This tool will write the Avocado system image to an SD card.
Make sure you have an SD card ready for programming.

Recording existing block devices...
Existing devices: none

Waiting for new mass storage device to be detected...
.
Found new mass storage device: /dev/sdb
Waiting for block device to be ready for access...

Block device exists and is readable, proceeding...
SD card successfully detected:
  Device: /dev/sdb
  Size: 29 GiB (32010928128 bytes)
  Vendor: Mass
  Model: Storage Device

WARNING: This will completely overwrite the device /dev/sdb!
All existing data on this 29 GiB SD card will be lost.

Are you sure you want to continue? (y/N): y
User confirmed. Proceeding with firmware write...
Writing system image to SD card...
100% [====================================] 95.44 MB in / 286.33 MB out
Success!
Elapsed time: 1 min 16 s
System image successfully written to SD card!
You can now safely remove the SD card and use it to boot your device.
[SUCCESS] Provision script 'stone-provision-sd.sh' completed successfully.
[SUCCESS] Provision completed.
[SUCCESS] Successfully ran SDK lifecycle hook 'avocado-provision' for target 'raspberrypi4'.
[SUCCESS] Successfully provisioned runtime 'dev'
```

## Boot Your Raspberry Pi 4

Once the SD card writing is complete:

1. **Safely remove** the SD card from your computer
2. **Insert the SD card** into your Raspberry Pi 4
3. **Connect power** to boot the device
4. **Log in** using the `root` account and the password you configured earlier

Your Raspberry Pi 4 is now running Avocado OS and ready for development and sideloading workflows!

## Sideloading: Network-Based Updates

Now that your Raspberry Pi 4 is running Avocado OS, you can use sideloading to deploy updates over the network without reflashing the SD card. This enables rapid development iterations by allowing you to modify your project, rebuild components, and deploy changes directly to your running device.

### Network Connectivity Requirements

Your Raspberry Pi 4 and development workstation must be connected to the same local area network (LAN) and able to communicate with each other.

#### Verify Network Connectivity

First, determine how to connect to your device. The device uses the hostname `avocado-raspberrypi4` by default, but depending on your network setup, you may need to use the IP address instead.

**Option 1: Using mDNS hostname (if supported by your network)**

```bash
ssh root@avocado-raspberrypi4
```

**Option 2: Using IP address**

If the hostname doesn't resolve, find your device's IP address by checking your router's admin panel or using network scanning tools, then connect using the IP:

```bash
ssh root@192.168.0.103
```

**Option 3: Adding to /etc/hosts**

Alternatively, you can add an entry to your `/etc/hosts` file to map the hostname to the IP address:

```bash
echo "192.168.0.103 avocado-raspberrypi4" | sudo tee -a /etc/hosts
```

#### SSH Configuration for Development

During development with frequent reflashing and updates, SSH host key checking may cause conflicts. Use this command to bypass host key verification:

```bash
ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null root@avocado-raspberrypi4
```

Or with an IP address:

```bash
ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null root@192.168.0.103
```

### Making Project Changes

Let's demonstrate sideloading by adding a new package to our system. We'll add the `tcpdump` network analysis tool to show how dependency changes can be deployed without reflashing.

#### Verify Current State

First, SSH into your device and verify that `tcpdump` is not currently available:

```bash
ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null root@avocado-raspberrypi4
tcpdump --version
```

You should see an error indicating the command is not found.

#### Add New Dependency

In your development workstation's `runtimes/dev` directory, edit the `avocado.toml` file to add `tcpdump` to the application dependencies.

Find the `[ext.app.dependencies]` section and add the `tcpdump` line:

```toml title="avocado.toml"
... snip ...

[ext.app.dependencies]
i2c-tools = "*"
# highlight-added-start
tcpdump = "*"
# highlight-added-end

... snip ...
```

#### Rebuild and Provision

After making the dependency change, rebuild the components with the new package included:

##### Install Dependencies

```bash
avocado install -f
```

##### Build Components

```bash
avocado build
```

##### Provision Runtime

```bash
avocado provision -r dev
```

### Deploy via Sideloading

Now deploy the updated system to your device using the `avocado deploy` command:

```bash
avocado deploy -r dev -d 192.168.0.103
```

Replace `192.168.0.103` with your device's IP address or use the hostname if mDNS resolution is working:

```bash
avocado deploy -r dev -d avocado-raspberrypi4
```

##### Deployment Process

The sideloading process will:

1. **Transfer updated images** to the device over the network
2. **Install the new system components**
3. **Automatically reboot** the device to activate changes

### Verify the Update

After the device finishes rebooting (this may take a minute or two), SSH back into the device and verify that `tcpdump` is now available:

```bash
ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null root@avocado-raspberrypi4
tcpdump --version
```

You should now see the `tcpdump` version information, confirming that the package was successfully added to your system through sideloading!

### Development Workflow

This sideloading workflow enables rapid iteration during development:

1. **Make changes** to your `avocado.toml` configuration
2. **Rebuild** with `avocado install -f && avocado build && avocado provision -r dev`
3. **Deploy** with `avocado deploy -r dev -d <device-address>`
4. **Test** your changes on the live device
5. **Repeat** as needed

This approach is significantly faster than reflashing SD cards and allows you to iterate quickly while developing and testing your embedded Linux applications.
