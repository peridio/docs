---
hide_table_of_contents: true
sidebar_position: 0
title: 'Support Matrix'
description: 'Hardware compatibility matrix for Peridio platform - supported processors, development boards, and IoT devices for secure OTA updates and device management.'
---

import SupportMatrix from '@site/src/components/SupportMatrix';
import UnderEvaluationMatrix from '@site/src/components/UnderEvaluationMatrix';

Peridio supports a wide range of hardware platforms for IoT device management and OTA updates. Our platform integrates seamlessly with various processors, development boards, and production-ready systems.

<SupportMatrix />

- **Supported** = in the published feed. **In Progress** = being brought up, not yet published.
- **2024 (scarthgap)** and **2026 (wrynose)** are the Yocto LTS bases each feed is built on.
- **Target** is the SoC/platform; **Board** is a specific carrier or variant on that target. One target can back several boards. Select them per command with the CLI's `target` and `target_board` arguments, or set defaults in your `avocado.yaml`:

  ```yaml title="avocado.yaml"
  default_target: 'imx8mp-var-dart'
  default_target_board: 'variscite-sonata'
  ```

## Additional Hardware Under Evaluation

<UnderEvaluationMatrix />

## Request hardware support

If you'd like Peridio to support your hardware platform, <a href="https://www.peridio.com/contact" target="_blank" rel="noopener noreferrer">reach out to our team</a>.
