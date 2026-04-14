---
title: 'Features'
description: 'Key features of Avocado OS — production-ready embedded Linux built on Yocto with composable extensions, deterministic builds, safe OTA, and a path from prototype to production.'
---

# Features

## Powered by Yocto. No Yocto Required.

Avocado OS is built entirely on the Yocto Project — we use it to compile the world into pre-built packages so you never touch BitBake, write recipes, or wait for multi-hour builds.

> **No Yocto learning curve. No BitBake recipes to write. No multi-hour builds on your machine.**

Embedded Linux has always forced a dichotomy of choice. On one side, Yocto — extremely high learning curve upfront, but it sets you up for success with deterministic runtimes, immutability, and reproducibility. On the other side, desktop distributions like Ubuntu and Debian — very easy to get up and running, a familiar experience for developers, but arguably not scalable towards tens of thousands to millions of devices in the field. When you apply packages at runtime, you're applying mutations to that runtime. That causes state drift. Reproducing a bug on your desk becomes guesswork.

Avocado threads the needle. You get the full power of Yocto's build infrastructure — BSP support from every major silicon vendor, proper cross-compilation, hardware-specific optimizations — without ever touching it directly. We've separated the slow loop from the fast loop of application development, without sacrificing the production-readiness that Yocto provides.

---

## Compose Your OS With Code

Your entire system is defined in a single `avocado.yaml` file. It feels like infrastructure as code — declare your extensions, runtimes, target hardware, packages, and SDK configuration in one place, and Avocado assembles your Linux image from it.

```yaml
target: raspberrypi5

runtimes:
  dev:
    extensions:
      - my-app
      - avocado-ext-dev
  prod:
    extensions:
      - my-app

extensions:
  my-app:
    types:
      - sysext
      - confext
    version: '1.0.0'
    packages:
      curl: '*'
    enable_services:
      - my-app.service
```

This is not a Dockerfile. This is not a Yocto recipe. It's a declarative configuration that assembles a complete, bootable, production-ready Linux image. Change a line, run a command, and you have a new image in minutes — not hours.

The developer experience matters here. The config is readable, the CLI is fast, and because we're working with standard YAML and standard Linux concepts, AI coding tools and existing documentation about Linux all apply directly. There's no proprietary abstraction to learn.

---

## Runtimes and Extensions

Extensions are the building blocks of Avocado systems. Every piece of user-defined functionality ships as an extension — application binaries, configuration files, kernel modules, systemd services. Extensions are built on systemd's sysext and confext mechanisms, which means they inherit dm-verity integrity checking and LUKS encryption support out of the box. The secure boot chain extends all the way through the extension layer.

Runtimes define which extensions are composed together for a given deployment:

```text
  dev runtime                factory runtime            prod runtime
 ┌──────────────┐          ┌──────────────┐          ┌──────────────┐
 │  my-app      │          │  my-app      │          │  my-app      │
 │  dev-tools   │          │  eol-tests   │          │  monitoring  │
 │  ssh-server  │          │  provisioner │          └──────────────┘
 │  monitoring  │          └──────────────┘
 └──────────────┘
       ↓                         ↓                         ↓
 ┌─────────────────────────────────────────────────────────────────┐
 │                     Avocado Linux (immutable)                   │
 └─────────────────────────────────────────────────────────────────┘
```

Switch between runtimes with one command. Avocado provides base extensions out of the box for common needs — development tooling, networking, container support. You bring your application code as your own extensions, declared in the same `avocado.yaml`, built with the same CLI. There's no separation between "the OS stuff" and "your stuff" — it's all extensions, composed together at boot time by systemd.

### Why not Docker?

Docker isolates multi-user workloads in the cloud. Embedded systems are single-purpose devices — you want integration, not isolation. Docker doesn't care about the kernel. Embedded developers deeply care about it. You end up passing `--privileged` and removing seatbelts you didn't know you needed.

Systemd extensions give you the same dependency declaration benefit without the overhead — no container runtime, no network namespaces, no pretending your device is a cloud server.

---

## Immutable System Architecture

The base system is read-only. Everything below the line is immutable SquashFS. Everything above it is your space to work in. A/B slots protect every layer.

```text
┌─────────────────────────────────────────────┐
│  /var  ·  BTRFS  ·  read-write              │  Your data, state, logs
│  Extensions, app data, sub-volumes          │
├─────────────────────────────────────────────┤
│  Extensions  ·  SquashFS  ·  read-only      │  Apps, configs, kernel modules
├──────────────────────┬──────────────────────┤
│  Avocado Linux (A)   │  Avocado Linux (B)   │  Immutable base OS
├──────────────────────┼──────────────────────┤
│  BSP + Kernel (A)    │  BSP + Kernel (B)    │  Hardware-specific
├──────────────────────┼──────────────────────┤
│  Boot Files (A)      │  Boot Files (B)      │  Bootloader + config
└──────────────────────┴──────────────────────┘
```

The fixed partitions are kept as small as possible. The rest of the disk belongs to BTRFS — extensions, application data, models, whatever you need.

Today your root filesystem with your machine learning models takes up 250 megabytes, so you lay out your partitions with maybe half a gig of space. Tomorrow your data scientist comes to you and says, "1.5 gigabytes I need." That's a one-way ticket to a dangerous repartition event across your entire fleet. With Avocado's layout, that never happens — the dynamic BTRFS partition grows with your workload.

---

## We Package The World

Avocado pre-builds the world into RPM packages — runtime packages for the device and SDK packages for your development machine.

> **These are not packages you install at runtime.** They're composed into extensions at development time, producing deterministic images that go onto devices.

```yaml
extensions:
  my-app:
    packages:
      curl: '*'
      openssl: '*'
    sdk:
      packages:
        nativesdk-rust: '*'
        nativesdk-go: '*'
```

Package feeds are organized by architecture and target. The right packages are resolved automatically for whatever hardware you're building for. Need to add your own? Layer a private repository on top.

---

## Multi-Target, One Config

Write your application once. Deploy it to any supported hardware by changing one line. Target-specific dependencies are resolved automatically.

```text
                  avocado.yaml
                ┌──────────────┐
                │  my-app      │
                │  my-config   │
                │  my-service  │
                └──────┬───────┘
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
   Raspberry Pi    Jetson Orin   NXP i.MX93
      5            Nano
```

Hardware decisions change. A prototype on a Raspberry Pi might ship on an NXP SoM. With Avocado, that pivot doesn't require rebuilding your application.

---

## Prototype to Production in the Same Stack

The typical embedded workflow has a painful handoff: prototype on something easy, then rewrite everything for production. Ubuntu is great for prototyping but impossible to certify. Yocto is production-ready but brutal to get started with. And here's the trap — when you harden systems, you put the seatbelts on and you make it difficult for developers to move quickly. The more you harden, the more friction you introduce.

Avocado eliminates that tradeoff. The system is hardened from day one — immutable, signed, secure boot ready — without sacrificing developer speed. The same stack runs from your desk to the factory floor.

> **No migration. No second system. No chasm to cross.**

- **References that ship** — Start from a surgical, production-ready example. Modify it in minutes. It's not a demo you throw away.
- **Production-ready by default** — Images are read-only. Extensions are signed. Security is built in from the first build.
- **Factory runtime** — Declare end-of-line tests in the same `avocado.yaml`. Did the camera enumerate? Is the network up? Pass or fail, then hand off to the production runtime.
- **One provisioning command** — `avocado provision` works the same whether you're burning fuses on NXP, flashing USB on Jetson, or writing an SD card for Raspberry Pi.

---

## Deterministic, Reproducible Builds

> **When you run `avocado build`, you get the same image every time.**

The same packages, the same versions, the same layout, the same checksums. This is not aspirational — it's architectural.

This stands in contrast to how most teams build embedded systems today. A Dockerfile pulls `apt-get install` from upstream repositories that change daily — your build on Monday produces a different image than your build on Friday. Ubuntu and Debian package mirrors are living, mutable targets. Even pinning versions doesn't guarantee the same binary output because the build environment itself varies. Ship that to a fleet and what you're left with are systems in the field mutating. When you apply packages at runtime, you apply mutations to that runtime. That causes state drift — being observable or understanding what's going wrong in your application becomes really difficult to reproduce on the desk.

Avocado's approach is different. Packages are pre-built from known Yocto sources into versioned, immutable RPM feeds. The CLI installs specific package versions into a sysroot and images them. There's no runtime package resolution, no network fetches during build, no ambient state leaking in. The `avocado.yaml` plus the package feed version fully determines the output.

> **Two engineers on different machines, building the same config against the same feed, get bit-identical images.**

This matters for certification, for auditing, for debugging production issues, and for sleeping well at night. When a device in the field has a problem, you can reproduce its exact image locally because the build is deterministic.

---

## Safe OTA with Automatic Rollback

OTA updates target runtimes — the collection of extensions that make up your deployment. Push a new runtime to your fleet and devices apply it without a reboot. Extensions are merged live by systemd. If something goes wrong, automatic rollback restores the last known-good state.

> **No reboot required. No half-applied updates. No bricked devices.**

Updates are granular because of the extension architecture. Update your application without touching the base OS. Update the OS without touching the application. Update the model without touching either. Each layer is independently versioned and independently updatable, and the A/B mechanism protects the entire stack.

This matters economically. Devices on 5G or cellular networks have expensive data links. Pushing a monolithic image — your entire OS plus a multi-gigabyte AI model — every time you change one thing is a cost that kills ROI at scale. With extensions, you only push what changed.

---

## Security All the Way Through

Security in Avocado OS is not a feature you bolt on later — it's structural. The secure boot chain starts at the hardware root of trust and extends through every layer of the system, including extensions.

- [Secure boot](/security/secure-boot) with a verified boot chain from bootloader through kernel through extensions
- [dm-verity filesystem integrity](/security/filesystem-integrity) on every read-only image, including extensions
- [Hardware-backed encryption](/security/hardware-backed-encryption) with LUKS and TPM support
- [Atomic update architecture](/security/atomic-update-architecture) that eliminates partial-update attack vectors
- Immutable root filesystem that cannot be tampered with at runtime

Every extension image carries its own dm-verity hash tree. If a single bit is altered, the system detects it. Combined with secure boot, this means the chain of trust extends from the silicon all the way up to your application code — not just to the kernel, not just to the root filesystem, but through every extension in the runtime.
