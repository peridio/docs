---
title: 'References: 2026.06'
description: 'New Avocado OS reference projects and updates for June 2026 — networking and a DeepStream OTA revamp.'
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
