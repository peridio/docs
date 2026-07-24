---
title: 'Installation'
sidebar_position: 0
description: 'Install the Avocado OS MCP server in Claude Code, Claude Desktop, OpenAI Codex, Cursor, and other MCP clients to turn your AI assistant into an Avocado OS co-pilot.'
---

<a href="https://github.com/avocado-linux/avocado-mcp" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/Source_Code-GitHub-7b6ff0?logo=github&logoColor=white&style=for-the-badge" alt="Source Code on GitHub" /></a>

The **Avocado OS MCP server** turns an AI assistant into a working Avocado OS co-pilot. With it, your assistant can pick a hardware target, scaffold a project, search the live package feed, author and validate `avocado.yaml`, provision and deploy to a device, and debug failures — all from natural-language requests.

It's [open source](https://github.com/avocado-linux/avocado-mcp), runs locally over stdio, and needs **no API key or hosted endpoint**. All of its data sources are public.

## Prerequisites

- **Node.js ≥ 18** — the server runs via `npx`. On first run, `npx` downloads the package, installs its dependencies, and builds it (~30s); subsequent runs start instantly from cache. (Reaching the optional Avocado Desktop server from Claude Desktop bridges through [`mcp-remote`](https://www.npmjs.com/package/mcp-remote), which needs Node **20.18.1+** — see [The Avocado Desktop MCP server](#the-avocado-desktop-mcp-server).)
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

## The Avocado Desktop MCP server

If you use the [Avocado Desktop](/avocado-desktop/overview) app, it exposes a second MCP server of its own while the app is running: an HTTP server at `http://127.0.0.1:11551/mcp` with tools for driving the app itself (listing and focusing projects, running build and provision actions, VM status and control, USB and serial devices, and UI navigation). The app's built-in agent is connected to both servers automatically; the configs below are for reaching them from an external client instead.

Because this server lives inside the app, it is only reachable while Avocado Desktop is running.

### Claude Code

```bash
claude mcp add --transport http avocado-desktop http://127.0.0.1:11551/mcp
```

### Claude Desktop

`claude_desktop_config.json` only accepts command-based (stdio) servers, so bridge the HTTP endpoint with [`mcp-remote`](https://www.npmjs.com/package/mcp-remote). This config connects Claude Desktop to both servers:

```json
{
  "mcpServers": {
    "avocado-os": {
      "command": "npx",
      "args": ["-y", "github:avocado-linux/avocado-mcp"]
    },
    "avocado-desktop": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "http://127.0.0.1:11551/mcp"]
    }
  }
}
```

Quit and reopen Claude Desktop after saving. Note that `mcp-remote` requires Node.js 20.18.1 or newer (a floor set by its dependencies), higher than the Node 18 minimum for the `avocado-os` server alone.

### Clients with native HTTP support

For the `avocado-desktop` HTTP endpoint only, Cursor and several other clients accept a `url` entry directly, with no bridge needed. The `avocado-os` server is stdio, so it keeps the command-based config shown earlier in every client:

```json
{
  "mcpServers": {
    "avocado-desktop": {
      "url": "http://127.0.0.1:11551/mcp"
    }
  }
}
```

## Verify it works

To verify the `avocado-os` server, ask in any connected client:

> Start a new Avocado OS project for a Raspberry Pi 5

The assistant should invoke the `/start-avocado-project` prompt (or call `list-targets` → `init-project` directly). If it does, you're set — head to [Usage](/developer-reference/mcp/usage) for more ways to put it to work.

To verify the `avocado-desktop` server, make sure the app is running and ask the assistant to report the VM status or list your Avocado projects; it should answer via the desktop server's tools rather than the shell.

## Troubleshooting

- **Restart the client fully after config changes.** An already-open session will not pick up an edited MCP config, and the resulting failure looks identical to a broken server. Quit and reopen the app (or start a new CLI session) after every config edit.
- **`avocado-os` fails to connect even though npm reports no error.** A strict `~/.npmrc` can block the one-time build the `github:` install runs on first launch — `min-release-age` refuses the git install, and `ignore-scripts` skips the build step. If you set either, comment it out, run `npx -y github:avocado-linux/avocado-mcp` once to prime the cache, then restore your setting; later launches reuse the cached build.

- **The `avocado-desktop` server does not connect.** Its MCP server is only available while the Avocado Desktop app is open. Start the app, then retry from the client.
