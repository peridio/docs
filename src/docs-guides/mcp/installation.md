---
title: 'Installation'
sidebar_position: 0
description: 'Install the Avocado OS MCP server in Claude Code, Claude Desktop, OpenAI Codex, Cursor, and other MCP clients to turn your AI assistant into an Avocado OS co-pilot.'
---

<a href="https://github.com/avocado-linux/avocado-mcp" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/Source_Code-GitHub-7b6ff0?logo=github&logoColor=white&style=for-the-badge" alt="Source Code on GitHub" /></a>

The **Avocado OS MCP server** turns an AI assistant into a working Avocado OS co-pilot. With it, your assistant can pick a hardware target, scaffold a project, search the live package feed, author and validate `avocado.yaml`, provision and deploy to a device, and debug failures — all from natural-language requests.

It's [open source](https://github.com/avocado-linux/avocado-mcp), runs locally over stdio, and needs **no API key or hosted endpoint**. All of its data sources are public.

## Prerequisites

- **Node.js ≥ 18** — the server runs via `npx`. On first run, `npx` downloads the package, installs its dependencies, and builds it (~30s); subsequent runs start instantly from cache.
- An **MCP-capable client** (Claude Code, Claude Desktop, OpenAI Codex, Cursor, etc.).
- For building, provisioning, and deploying to real hardware, you'll also want the **Avocado CLI and Docker** installed — see [Getting Started](/developer-reference/getting-started). The MCP drives the CLI on your behalf.

## The server command

Every client uses the same underlying command — only the config format differs:

```json
{
  "command": "npx",
  "args": ["-y", "github:avocado-linux/avocado-mcp"]
}
```

## Claude Code

Register the server from the CLI:

```bash
claude mcp add avocado-os -- npx -y github:avocado-linux/avocado-mcp
```

Add `-s user` to make it available across all of your projects instead of just the current one:

```bash
claude mcp add -s user avocado-os -- npx -y github:avocado-linux/avocado-mcp
```

Verify it loaded by running `claude mcp list`, or `/mcp` inside an interactive session.

## Claude Desktop

Edit your `claude_desktop_config.json`:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Add the server under `mcpServers`:

```json
{
  "mcpServers": {
    "avocado-os": {
      "command": "npx",
      "args": ["-y", "github:avocado-linux/avocado-mcp"]
    }
  }
}
```

Quit and reopen Claude Desktop. The Avocado OS tools will appear in the tools menu.

## OpenAI Codex

Add the server to `~/.codex/config.toml`:

```toml
[mcp_servers.avocado-os]
command = "npx"
args = ["-y", "github:avocado-linux/avocado-mcp"]
```

Recent Codex CLI versions can also add it for you:

```bash
codex mcp add avocado-os -- npx -y github:avocado-linux/avocado-mcp
```

## Cursor

Add the server to your Cursor MCP config — `~/.cursor/mcp.json` for all projects, or `.cursor/mcp.json` in a project root:

```json
{
  "mcpServers": {
    "avocado-os": {
      "command": "npx",
      "args": ["-y", "github:avocado-linux/avocado-mcp"]
    }
  }
}
```

## Other MCP clients

Most clients (Windsurf, Zed, Cline, and others) accept the same `mcpServers` shape shown above — drop the `avocado-os` entry into the client's MCP config file.

**VS Code** (GitHub Copilot agent mode) uses a `servers` key instead, in `.vscode/mcp.json`:

```json
{
  "servers": {
    "avocado-os": {
      "command": "npx",
      "args": ["-y", "github:avocado-linux/avocado-mcp"]
    }
  }
}
```

## Verify it works

In any connected client, ask:

> Start a new Avocado OS project for a Raspberry Pi 5

The assistant should invoke the `start-avocado-project` prompt (or call `list-targets` → `init-project` directly). If it does, you're set — head to [Usage](/developer-reference/mcp/usage) for more ways to put it to work.
