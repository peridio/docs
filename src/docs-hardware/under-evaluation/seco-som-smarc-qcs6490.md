---
title: 'SECO SOM-SMARC-QCS6490'
sidebar_class_name: hidden
description: 'SMARC 2.1.1 module with a Qualcomm QCS6490 SoC, an 8-core Kryo 670 CPU, up to 12GB LPDDR5, and dual Gigabit Ethernet.'
---

# SECO SOM-SMARC-QCS6490

SMARC 2.1.1 module with a Qualcomm QCS6490 SoC

**Qualcomm QCS6490** | **8-core Kryo 670** | **Up to 12GB LPDDR5** | **2x GbE** | **82 x 50 mm**

<a href="https://developer.seco.com/hardware/product/computer-on-modules/smarc-modules/som-smarc-qcs5430-qcs6490-e81/" target="_blank" rel="noopener noreferrer">View on the SECO Developer Center</a>

## Overview

The SECO SOM-SMARC-QCS6490 is a SMARC 2.1.1 module with a Qualcomm QCS6490 SoC. The QCS6490 is the same SoC as on the [Qualcomm RB3 Gen 2](/hardware/qualcomm/rb3-gen-2), which Avocado OS supports on the 2026 release. SECO lists robotics, rugged handhelds, and edge AI boxes as target applications.

Avocado OS support for this module is under evaluation.

## Specifications

| Specification  | Value                                                       | Notes                          |
| -------------- | ----------------------------------------------------------- | ------------------------------ |
| SoC            | Qualcomm QCS6490                                            |                                |
| CPU            | Kryo 670: 1x A78 @ 2.7GHz, 3x A78 @ 2.4GHz, 4x A55 @ 1.9GHz | 8 cores                        |
| AI Performance | Up to 12.15 INT8 TOPS                                       | Depends on the variant         |
| GPU            | Adreno 643L                                                 | OpenGL, OpenCL, Vulkan         |
| Memory         | Up to 12GB LPDDR5-6400                                      | 64-bit interface               |
| Storage        | eMMC 5.1 up to 64GB, SD interface                           | Optional UFS                   |
| Networking     | 2x Gigabit Ethernet                                         |                                |
| USB            | 1x USB 3.1, 1x USB 2.0 OTG, 1x USB 2.0                      | 4x USB 2.0 with the hub option |
| Display        | Dual-channel LVDS, eDP 1.4, 4-lane MIPI DSI                 | DisplayPort through USB-C      |
| Camera         | 1x 2-lane MIPI CSI, 2x 4-lane MIPI CSI                      |                                |
| Expansion      | PCIe Gen3, 1x CAN, 4x UART                                  |                                |
| Wireless       | Optional Wi-Fi and Bluetooth                                |                                |
| Power Input    | +5V DC                                                      |                                |
| Operating Temp | 0°C to +60°C, or -30°C to +85°C                             | Commercial or industrial       |
| Dimensions     | 82 x 50 mm                                                  | SMARC 2.1.1                    |
| Software       | Yocto Linux (Clea OS), Android, Windows 11 IoT Enterprise   |                                |

## Use Cases

- **Robotics and drones** that need on-device vision
- **Rugged handhelds, tablets, and industrial scanners**
- **Kiosks and point-of-sale terminals**
