---
title: 'MCP: 5.0.0'
description: 'Avocado OS MCP Server 5.0.0 release notes.'
---

## A co-pilot, not a schema helper

5.0.0 is a ground-up rebuild. Through 4.x the server was two tools — fetch the
config schema and run SQL against the package feed. 5.0.0 turns it into a
working Avocado OS co-pilot that drives the whole iteration loop, refactored into
modular **tools, skills, and prompts** so an assistant can carry a project from
empty directory to a device on the bench.

The server is stdio-only over npm with no hosted endpoint and no API key; every
data source is public (`repo.avocadolinux.org`, the references repo, and the
docs). The `avocado.yaml` JSON Schema now ships **bundled with the server**, so
validation no longer drifts against a remotely-fetched schema version.

## What the co-pilot now covers

- **Scaffolding** — reference-first when a reference project matches the task, or
  a minimal `avocado.yaml` when none does.
- **Packages** — search and describe packages against the live RPM feed;
  feed-first is the default for adding any library.
- **Authoring + validation** — author `avocado.yaml` and validate it against the
  bundled schema before anything is built.
- **Provisioning + deploy** — first-time provision a device, then push iterative
  updates via `avocado deploy` with no reflash. Per-target provisioning steps are
  returned with the correct `script -q /dev/null` wrapper for LLM-driven runs.
- **On-device debugging** — a long-lived tmux session over UART/USB by default,
  or SSH once the device is healthy, with a closed loop of read logs → edit →
  redeploy → re-verify.
- **Docs + filesystem** — new tools to read the docs and the working tree so the
  assistant grounds its answers instead of guessing.

## Better, honest debugging

Diagnosis of `avocado build` and `avocado provision` failures was reworked based
on testing feedback, with a deliberate **honest fallback**: when no known pattern
matches, the server says so rather than emitting an empty or invented diagnosis.
The environment check was tightened to catch a broken host setup before it turns
into a confusing build error, and project initialization no longer fails on a
missing schema.

## App development skill

A dedicated app-development skill guides the assistant through building and
iterating on an application inside a runtime — the structured path behind
"build and deploy this" rather than one-off tool calls.

## Config and platform

- **Top-level `permissions:` block** — the schema moves users and groups into a
  top-level `permissions:` map referenced by name, and deprecates declaring them
  inside an extension, matching the CLI's config direction.
- **Host-tool delegation** — the exec channel detects when host tools are
  delegated through the Avocado Desktop MCP, so tool invocation works whether the
  CLI runs directly or via the desktop app.
- **Token optimization** — shared data is emitted once instead of being repeated
  across a response, keeping context usage down on long sessions.
- **Node pinned** — the server pins Node.js to 20.19.4 via `.tool-versions` for a
  reproducible runtime.
