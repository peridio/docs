---
title: 'Usage'
sidebar_position: 1
description: 'Ways to use the Avocado OS MCP server - guided slash-command workflows, natural-language requests for scaffolding, packages, provisioning, deploying, and debugging.'
---

# Usage

Once the [MCP server is installed](/developer-reference/mcp/installation), you work with Avocado OS by talking to your assistant in plain language. Behind the scenes the server exposes three things:

- **Prompts** — guided, multi-step workflows you invoke by name (slash commands in Claude).
- **Tools** — discrete actions the assistant calls (search the feed, validate YAML, provision a device, and so on).
- **Skills** — background knowledge the assistant reads to ground itself before acting.

You don't need to memorize tool names. Describe what you want; the assistant picks the right tools and surfaces the relevant skills. The examples below show common ways to use it.

## Guided workflows (slash commands)

The fastest path for most tasks is one of the built-in prompts — they orchestrate the right sequence of tools end to end:

| Prompt                   | Use it when…                                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------------- |
| `/start-avocado-project` | You're starting a fresh project — walks target pick → scaffold → next steps.                            |
| `/provision-device`      | You're flashing a physical device or QEMU VM for the **first time**.                                    |
| `/build-and-deploy`      | You're iterating after the first provision — `build` + `deploy` to a running device, with verification. |
| `/debug-build-failure`   | An `avocado install` or `avocado build` failed and you want a recovery walkthrough.                     |
| `/debug-device`          | You need to debug a running device over UART (the default debug channel).                               |
| `/debug-device-ssh`      | The device is already healthy and on the network, and you want to work over SSH.                        |

## Start a new project

> Start a new Avocado OS project for a Raspberry Pi 5 that runs a Python MQTT app.

The assistant resolves the hardware name to a canonical target, searches the reference catalog for a matching starting point, and scaffolds a validated `avocado.yaml` — falling back to a minimal starter only when no reference fits.

## Find and add packages

> Add OpenCV to my runtime.

The MCP finds the package in the **live RPM feed** and adds it to your extension — no vendoring or `pip install`. You can also explore the feed directly:

> What targets does Avocado support?
>
> Search the feed for gstreamer packages.

## Work from a reference project

> My software stack is Rust. I have an NVIDIA Jetson and a USB camera.

The assistant browses the reference catalog and can pull the **full source** of any project — `avocado.yaml`, application code, overlays, and build hooks — so you can copy patterns directly into your own project.

## Provision a device for the first time

> Provision my Jetson Orin Nano — it's never run Avocado OS before.

`/provision-device` runs the full first-time flow: environment check → target validation → per-target caveats → build → provision → physical handoff → first-boot verification over UART.

## Iterate: build, deploy, verify

> Build this and deploy it to my device at 192.168.1.50.

After the first provision, `/build-and-deploy` is the canonical loop — it builds, sideloads the update over the network (no reflash), and verifies the result. It will run `install` automatically if a missing-package error shows up.

## Diagnose a failed build

> My build failed. Here's the log:
>
> ```
> …paste the avocado build / install output…
> ```

Paste the output and the assistant runs it through the build-error analyzer. It returns a curated diagnosis when a known pattern matches, and otherwise extracts the error lines, file paths, and next steps — never an empty answer.

## Debug a running device over UART

> Help me debug my device — it's not booting.

Plug in a USB-to-UART adapter and the assistant walks through detecting the serial port, picking the right baud rate for your target, and attaching to a long-lived tmux session to stream and capture logs. UART is the default; switch to SSH once UART confirms the device is healthy.

## Closed-loop debugging

You can ask the assistant to iterate on a problem end to end:

> Figure out why my camera extension isn't loading, add some logging, redeploy, and check again.

It reads logs, edits code or extension definitions to add instrumentation, redeploys, and re-verifies — repeating until the issue is understood.

## Learn more

The full list of tools, skills, and prompts lives in the [avocado-mcp repository](https://github.com/avocado-linux/avocado-mcp). It's open source — issues and pull requests are welcome.
