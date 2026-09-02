---
title: 'References: 2026.08'
description: 'New Avocado OS reference projects for August 2026 — x86 RTX GPU inference, RZ/V2N DRP-AI3 object detection, and a custom signed U-Boot.'
---

Three new references this month.

## x86 RTX GPU inference

[**`x86-rtx`**](https://github.com/avocado-linux/references/tree/main/x86-rtx)
runs GPU inference on Intel x86-64 with a discrete NVIDIA RTX GPU,
two ways selectable at provision time: host-native TensorRT-RTX that compiles an
ONNX model into an engine on-device, and a containerized path that runs an
`nvidia/cuda` image on the GPU through the NVIDIA Container Toolkit via CDI. Both
ride the same driver stack, supplied by the board BSP chosen with
`--target-board` (Neousys Nuvo-9000 or LattePanda Sigma). The CUDA image is
pre-seeded into `/var` at build time, so the device runs offline with no
registry pull.

## RZ/V2N DRP-AI3 object detection

[**`rzv2n-drpai-yolo`**](https://github.com/avocado-linux/references/tree/main/rzv2n-drpai-yolo)
runs YOLOv3 object detection on the on-chip DRP-AI3
accelerator of the SolidRun RZ/V2N HummingBoard SoM, using Renesas's TVM-compiled
model from the RZ/V2N AI SDK. It pulls frames from a looping video file, draws
bounding boxes per frame, and renders the annotated feed full-screen on
Wayland/Weston via GStreamer.

## Custom signed U-Boot for i.MX 8M Plus EVK

[**`uboot-custom-imx8mp-evk`**](https://github.com/avocado-linux/references/tree/main/uboot-custom-imx8mp-evk)
cross-compiles a custom `imx-boot` bundle (TF-A
BL31 + U-Boot SPL/proper + DDR firmware) from source in the SDK container and
replaces the upstream bootloader on the NXP i.MX 8M Plus EVK. It builds
HAB-ready (so the image can be signed against the SoC's SRK fuses) with FIT
signature verification, and an `insert-fit-pubkey.sh` step injects your RSA
public key so you can rotate FIT signing keys without rebuilding U-Boot.
