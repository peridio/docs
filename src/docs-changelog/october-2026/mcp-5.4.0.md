---
title: 'MCP: 5.4.0'
description: 'Avocado OS MCP Server 5.4.0: target and provisioning tools, feed and stone skills, validation with the CLI schema, and Avocado CLI 1.0.0 required.'
---

Released on 30 October. 5.4.0 brings the MCP server up to date with Avocado
CLI 1.0.0. It includes the
5.3.0 changes, which did not get a separate release. See
[MCP usage](/developer-reference/mcp/usage).

## Requirements

- **Avocado CLI 1.0.0 or later.** `environment-check` reports an older CLI.
- **Docker Desktop is not required.** The server knows that avocado-vm
  supplies Docker on macOS and Windows.

## New tools and skills

- **`get-target-info` and `list-provision-profiles`.** Provisioning, serial and
  disk advice comes from the board data in the docs. A board as a user types
  it, such as "Orin Nano", resolves to its target.
- **Feeds and lockfile skill.** The server reads `avocado.lock`, queries every
  enabled feed, and reports which feed supplied a package.
  `check-package-coverage` covers all dependencies.
- **Stone skill.** Questions about partitions, flashing and boot files go to
  this skill. `validate-yaml` checks `stone_manifest`, and stone errors in
  build and provision logs get a diagnosis.

## Validation and project setup

- **`validate-yaml` runs `avocado config validate`**, and `get-config-schema`
  reads the schema from the installed CLI. The result agrees with what the CLI
  accepts.
- **`init-project` starts projects with `avocado init`.** It refuses unsafe
  feed values and hides credentials in repository URLs.
- **Package tools use the feed that the project configures**, not a fixed 2024
  `edge` feed. The output shows which feed the tool used.
- **Feed URLs expand only `AVOCADO_*` environment variables**, and the output
  masks their values.

## Diagnostics and content

- New diagnostic patterns for current CLI and provision errors.
  `explain-build-error` also reads deploy logs. Build stamp, `--connect-sign`
  login and tegraflash RCM errors each get their own diagnosis.
- CLI commands and flags in tools, prompts and skills match the current CLI.
- The skills for deploy, OS updates, `--connect-sign`, seeding `/var`,
  containers on the device and provisioning on macOS agree with CLI rc.5 and
  the docs. `connect-init` is marked destructive.
- Docs lookup works for index pages, drafts and field notes.
- Target lists show only real boards and QEMU, not architecture entries from
  the feed.
