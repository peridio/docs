---
title: 'References: 2026.05'
description: 'New Avocado OS reference projects and updates for May 2026 — Docker workflows and the NVIDIA vision family.'
---

New reference projects landed this month, plus a repo-wide config migration.

## Shipping containers two ways

Two references demonstrate the two patterns for getting a Docker container onto
a device with Avocado:

- **`docker-registry`** — pulls a public image from a registry **once at
  `avocado build` time**, seeds it into the device's `var` partition, and runs it
  as a systemd-supervised service. The device needs no registry access at
  runtime, so it works offline after deploy.
- **`docker-save`** — builds an image **locally on the developer's machine**,
  `docker save`s it to a tarball, ships the tarball into the Avocado image at
  build time, and loads it into the engine on first boot. Useful when the image
  isn't published to a registry.

## The NVIDIA vision family

The vision references were reorganized into a dedicated NVIDIA family, and two
new ones joined it:

- **`nvidia-deepstream`** — a DeepStream pipeline on Jetson Orin Nano / AGX Orin.
- **`nvidia-gstreamer-yolo`** — GStreamer-based YOLO object detection on Jetson
  (the earlier standalone GStreamer reference, folded into the family).
- **`python-yolo`** — a portable, pure-Python YOLO detector that runs across a
  wide target set: Raspberry Pi 5, i.MX8MP EVK, i.MX91/i.MX93 boards, and Jetson
  Orin Nano.

## Config migration

Across the whole catalog, the BSP extension references migrated to
`avocado.target.board`, and the READMEs were cleaned up for consistency.
