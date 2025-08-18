# Provision with Avocado OS

Avocado OS is a Yocto-based embedded product framework that bridges rapid developer workflows and production-grade reliability. It delivers immutable, composable runtimes with deterministic, cryptographically verifiable images, fault-tolerant updates, and simplified secure boot. Using system extensions (sysext) and configuration extensions (confext), applications and configuration are layered cleanly and reproducibly—without the fragility of traditional runtime package management.

In this guide, you will use the Avocado CLI to initialize a project and orchestrate the creation of your own demo Avocado OS image targeting QEMU. We’ll install the SDK and extensions, build the image, provision a runtime, and boot the system in a virtual machine on a Linux host to experience the end-to-end workflow.

### Get the Avocado CLI

To get started with device provisioning, we will first need the [Avocado CLI](https://github.com/avocado-linux/avocado-cli). Grab the latest release for your development architecture from the [Github releases page](https://github.com/avocado-linux/avocado-cli/releases).

:::info
This guide is intended to be run on a Mac (macOS 10.12+) or Linux (Ubuntu 22.04+, Fedora 39+) development machine. Running these commands on Windows is not _currently_ supported.
:::

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
  clean      Clean the avocado project by removing the _avocado directory
  install    Install all components (SDK, extensions, and runtime dependencies)
  build      Build all components (SDK compile, extensions, and runtime images)
  provision  Provision a runtime (shortcut for 'runtime provision')

Options:
      --target <TARGET>  Global target architecture
  -h, --help             Print help
  -V, --version          Print version
```

### Initialize your project

Initialize a new Avocado project by generating an `avocado.toml` with sensible defaults (target `qemux86-64`, a `dev` runtime, and baseline SDK/extension dependencies).

#### Command
```bash
avocado init foo && cd foo
```

#### Output
```text
✓ Created config at /home/user/targets/foo/avocado.toml.
```

:::info
Run all subsequent commands in this guide from the root of your Avocado project on your host machine — the directory that contains your Avocado config. Code blocks labeled "On Device (VM)" are executed inside the running QEMU VM.
:::


### View the generated Avocado config

The generated config defines the `dev` runtime and dependencies, the SDK container image, and the `avocado-dev` extension (declared as both sysext and confext) used throughout this guide.

```toml title="avocado.toml"
[runtime.dev]
target = "qemux86-64"

[runtime.dev.dependencies]
avocado-img-bootfiles = "*"
avocado-img-rootfs = "*"
avocado-img-initramfs = "*"
avocado-dev = { ext = "avocado-dev" }

[sdk]
image = "avocadolinux/sdk:apollo-edge"

[sdk.dependencies]
nativesdk-qemu-system-x86-64 = "*"

[ext.avocado-dev]
types = ["sysext", "confext"]

[ext.avocado-dev.dependencies]
avocado-hitl = "*"

[ext.avocado-dev.sdk.dependencies]
nativesdk-avocado-hitl = "*"
```

By default, the target is set to `qemux86-64`, as it allows you go exercise all Avocado CLI workflows without a physical device.

### Install dependencies

The `avocado install` command pulls the SDK container and installs dependencies for the SDK, all declared extensions, and your runtime(s). Use `-r` to scope to a single runtime and its extensions. Otherwise, by default it builds *all* runtimes. Prompts may appear during package installation unless you pass `--force`.

#### Command
```bash title="On Host"
avocado install
```

#### Output
```text
[INFO] Starting comprehensive install process...
[INFO] Step 1/3: Installing SDK dependencies
[INFO] Installing SDK dependencies.
[INFO] Using repo URL: 'https://repo.avocadolinux.org'
[INFO] Using repo release: 'latest/apollo/edge'
[INFO] Initializing Avocado SDK.
Avocado SDK                                                                                   2.1 kB/s | 1.9 kB     00:00
Dependencies resolved.
==============================================================================================================================
 Package                               Architecture                  Version                 Repository                  Size
==============================================================================================================================
Installing:
 avocado-sdk-qemux86-64                all_avocadosdk                1.0-r0                  avocado-sdk                7.9 k

... snip ...

Installed:
  avocado-img-bootfiles-1.0-r0.avocado_qemux86_64               avocado-img-initramfs-1.0-r0.avocado_qemux86_64
  avocado-img-rootfs-1.0-r0.avocado_qemux86_64

Complete!
[SUCCESS] Successfully installed packages for runtime 'dev'
[SUCCESS] Successfully installed dependencies for 1 runtime(s)
[SUCCESS] All components installed successfully!
```

### Build all components

The `avocado build` command compiles any required SDK code for extensions, builds extension images, and produces the runtime image(s) as defined in your avocado config. By default, all runtimes are built, (use `-r` to build a specific runtime).

#### Command
```bash title="On Host"
avocado build
```

#### Output
```text
[INFO] Starting comprehensive build process...
[INFO] Step 1/3: Analyzing dependencies and compiling SDK code
[INFO] No SDK compilation needed.
[INFO] Step 2/4: Building extensions
[INFO] Building sysext extension 'avocado-dev'.

... snip ...

[SUCCESS] Created.
[SUCCESS] Successfully ran SDK lifecycle hook 'avocado-build' for target 'qemux86-64'.
[SUCCESS] Successfully built runtime 'dev'
[SUCCESS] All components built successfully!

```

### Provision a runtime

The `avocado provision` command prepares the specified runtime by transforming the output of the build, and depending on the target, either: writing final artifacts to disk, or even provisioning a physical device via USB, network, etc.



#### Command
```bash title="On Host"
avocado provision -r dev
```

#### Output
```text
[INFO] Provisioning runtime 'dev'

... snip ...

[SUCCESS] Provision script 'stone-provision.sh' completed successfully.
[SUCCESS] Provision completed.
[SUCCESS] Successfully ran SDK lifecycle hook 'avocado-provision' for target 'qemux86-64'.
[SUCCESS] Successfully provisioned runtime 'dev'
```

In this guide, we are targeting QEMU, so our provisioning process will write the necessary artifacts to disk to run.

### Run virtual target

Run the built image under QEMU using the SDK container. `sdk run -ie` launches an interactive session with the Avocado SDK environment sourced and invokes the VM launcher for the `dev` runtime.

#### Command
```bash title="On Host"
avocado sdk run -ie vm dev
```

#### Output
```text
Runtime: dev

... snip ...

Avocado OS 0.1.0 avocado-qemux86-64 ttyS0

avocado-qemux86-64 login:
```

You may log in using the username `root`, and will not be prompted for a password.


### Verify extensions

Once logged into the running virtual machine, you have a fully-running Avocado operating system.

A validation command you may run is `avocadoctl ext status` to list the status of all extensions.

#### Command
```bash title="On Device (VM)"
avocadoctl ext status
```

#### Output
```text
Extension Status
================

System Extensions (/opt, /usr):
--------------------------------
  /opt -> avocado-dev (since Tue 2025-08-12 22:53:26 UTC)
  /usr -> avocado-dev (since Tue 2025-08-12 22:53:26 UTC)

Configuration Extensions (/etc):
---------------------------------
  /etc -> avocado-dev (since Tue 2025-08-12 22:53:33 UTC)
```
