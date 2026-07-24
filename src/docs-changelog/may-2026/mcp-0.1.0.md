---
title: 'MCP 0.1.0'
description: 'Placeholder — Avocado MCP 0.1.0: initial release of the Model Context Protocol server.'
---

*Placeholder entry — fake data for the multiproduct changelog preview.*

Initial release of the Avocado MCP server — the bridge that lets MCP-aware clients (including the upcoming desktop app) drive Avocado builds.

## Tools

- **`project_status`** — parse `avocado.yaml` and report runtimes, extensions, and build state.
- **`build`** / **`install`** — run CLI lifecycle commands with `--output json` and stream progress.
- **`get_config_schema`** — expose the declarative format's schema so agents can validate edits before writing.

Installs as a one-shot command from GitHub; a package-registry distribution is planned.
