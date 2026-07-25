---
title: 'References: 2026.07'
description: 'New Avocado OS reference projects for July 2026 — robotics, Prometheus metrics, and multi-version Python.'
---

Three new references this month.

## ROS 2 robot arm control

**`ros2-ufactory-lite6`** runs ROS 2 to drive a uFactory Lite6 robot arm from a
container. The hardware binding is flexible — it's validated across a broad
target set (i.MX8MP/i.MX91/i.MX93, Raspberry Pi 5, RZ/V2N, STM32MP257, Rubik Pi
3, Grinn Astra) and is meant to be extended beyond the listed boards.

## Prometheus metrics exporter

**`pi-metrics-exporter`** is a Rust Prometheus exporter for the Raspberry Pi
(Zero 2 W, 4, and 5) — a compact monitoring reference that exposes device
metrics for scraping.

## Per-app pinned Python with uv

**`python-multiversion-uv`** pins a specific Python version per application using
`uv`, so multiple apps can run different, independently-pinned interpreters on
one device — with cross-compilation handled in the build. The reference goes
further and turns a presence-sensing fleet into a NATS-backed data pipeline,
showing the multi-version setup doing real work end to end.
