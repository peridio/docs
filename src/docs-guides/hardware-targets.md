---
title: Hardware Targets
description: How Avocado separates the compile target from the hardware board, and why avocado-bsp-{{ avocado.target.board }} works the way it does.
---

# Hardware Targets

Avocado distinguishes two related-but-separate concepts: the **target** (what you
build _for_) and the **board** (the specific product you build it _on_).
Understanding the difference explains the `default_target`,
`default_target_board`, and `avocado-bsp-{{ avocado.target.board }}` lines you see
in an `avocado.yaml`.

## Target vs. board

- **Target** — the compile target: the SoC/architecture platform you build for.
  It determines the toolchain, architecture, and base BSP family. For example,
  `jetson-orin-nx` is the target for anything built on the NVIDIA Jetson Orin NX
  module. This is what `--target`, `AVOCADO_TARGET`, and `default_target` set, and
  what `supported_targets` lists and validates against.
- **Board** — an optional, more specific hardware variant _within_ a target: a
  particular carrier board or product built around that module. For example,
  `icam-540` (Advantech's industrial AI camera) is a board built on the
  `jetson-orin-nx` module. A board is set with `--target-board`,
  `AVOCADO_TARGET_BOARD`, a runtime's `target_board`, or `default_target_board`.
  **If you don't set a board, it falls back to the target.**

Why two levels? A single target — say the Orin NX module — is carried by many
different products, each with its own device tree, pinmux, and peripheral wiring
(its own BSP), while sharing the exact same architecture and toolchain. Modeling
the board separately lets one project build for many products off a single target
without duplicating the rest of the configuration.

## Declaring targets: `supported_targets` and `default_target`

```yaml title="avocado.yaml"
default_target: jetson-orin-nx

supported_targets:
  - jetson-orin-nx
```

- **`supported_targets`** — the list of targets your project supports. The
  resolved target is validated against this list; an unsupported target fails
  fast with an error that lists the supported ones.
- **`default_target`** — the target used when none is given explicitly.
  Resolution precedence, highest first: **`--target` flag → `AVOCADO_TARGET`
  environment variable → `default_target`.**

There is no `supported_target_boards` list — boards aren't enumerated or validated
the way targets are. A board is just a variant selector layered on top of a
supported target.

## Selecting a board: `default_target_board` and `{{ avocado.target.board }}`

```yaml title="avocado.yaml"
default_target_board: icam-540
```

- **`default_target_board`** — the board used when none is given. Resolution
  precedence, highest first: **`--target-board` flag → `AVOCADO_TARGET_BOARD`
  environment variable → a runtime's `target_board` → `default_target_board` →
  (fallback) the target itself.**
- **`{{ avocado.target.board }}`** — interpolates the _resolved_ board into your
  configuration. Because a missing board falls back to the target,
  `{{ avocado.target.board }}` equals `{{ avocado.target }}` by default.

## The BSP line: `avocado-bsp-{{ avocado.target.board }}`

This is where the board concept earns its keep. Project and reference configs
pull the board-specific BSP extension by interpolating the resolved board:

```yaml title="avocado.yaml"
runtimes:
  dev:
    extensions:
      - avocado-bsp-{{ avocado.target.board }}
```

- With the board set to `icam-540`, this resolves to **`avocado-bsp-icam-540`** —
  the ICAM-540's device tree, pinmux, and drivers.
- With no board set, it falls back to the target, e.g. **`avocado-bsp-jetson-orin-nx`**
  — the generic Orin NX BSP.

So a single line adapts to whichever product you're building for: the board
selector decides which BSP package gets installed, while the architecture,
toolchain, and application layers stay identical. That is precisely why the board
is a first-class concept separate from the target — it is the hook that swaps the
hardware-specific layer without touching anything else.

## Worked example: Advantech ICAM-540

The ICAM-540 is an industrial AI camera built on the NVIDIA Jetson Orin NX
module. In Avocado terms:

- **target**: `jetson-orin-nx` — the Orin NX compile platform
- **board**: `icam-540` — the camera product's carrier board and BSP

```yaml title="avocado.yaml"
default_target: jetson-orin-nx
default_target_board: icam-540

supported_targets:
  - jetson-orin-nx

runtimes:
  dev:
    extensions:
      - app
      - avocado-bsp-{{ avocado.target.board }} # → avocado-bsp-icam-540
```

Build the same Orin NX target on a different carrier board and only the board —
and therefore the resolved BSP — changes.
