---
title: 'References: 2026.06'
description: 'New Avocado OS reference projects and updates for June 2026 — networking, NPU offload, and a DeepStream OTA revamp.'
---

## iPhone travel router

**`iphone-travel-router`** turns a Raspberry Pi 5 into a travel router that
shares an iPhone's tethered connection over Wi-Fi, with NAT and a Cockpit web UI
for management. A self-contained networking reference — no cloud, no app.

## DeepStream, rebuilt for OTA

`nvidia-deepstream` got a major revamp aimed at real-world updates: the pipeline
is split into multiple extensions so an update ships only the layer that
changed, it uses TensorRT with a prebuilt/embedded engine for faster startup,
and install/build are meaningfully faster. It doubles as a worked example of
**how to split an application into multiple extensions** for OTA efficiency.

## On-device AI accelerators

Several NPU and RTOS references landed on `main` this month. They demonstrate
offloading real workloads to on-device accelerators:

- **`imx8mp-npu-pose`** — single-person pose estimation (MoveNet SinglePose
  Lightning, INT8-quantized by the reference) on the i.MX8M Plus Vivante VIP9000
  NPU via NNStreamer's TFLite VX delegate.
- **`imx8mp-npu-nnstreamer`** — live MobileNet INT8 camera classification on the
  same i.MX8M Plus NPU, with in-SDK INT8 quantization.
- **`zephyr-imx8mp-evk`** — a Zephyr RTOS firmware for the i.MX8MP Cortex-M7
  co-processor, built entirely in the Avocado SDK and talking to Linux over
  rpmsg/OpenAMP — a showcase of the SDK-as-toolchain model.
- **`astra-1680-deepx`** — DeepX M1 NPU offload on the SolidRun Astra SL1680.

> These four are in the references repo but are not yet browsable on the docs
> site (their READMEs are missing the frontmatter the docs sync requires). They
> will appear in the Developer Reference section once that's added.
