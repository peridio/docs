---
title: 'Hardware Feeds 2026.29'
description: 'Placeholder — weekly hardware feed drop: two new boards and kernel bumps across the NXP line.'
---

*Placeholder entry — fake data for the multiproduct changelog preview.*

## New boards

- **Acme IndustriPi CM5** — full runtime support on the `apollo` channel, including secure boot and A/B updates.
- **FictionalTech Edge-X1** — initial bring-up on `apollo-edge`; camera stack lands next cycle.

## Kernel and BSP bumps

- NXP i.MX93 targets move to kernel **6.12.19-lts** with the vendor ethos-u driver refresh.
- Qualcomm RB3 Gen 2 picks up the Q2 vendor BSP; Wi-Fi firmware updated to resolve a 5 GHz roaming stall.

## Deprecations

- The `legacy-imx8mq-demo` target is frozen; it stays installable from pinned snapshots but stops receiving updates after 2026.32.
