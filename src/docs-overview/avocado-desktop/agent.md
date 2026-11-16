---
title: 'Agent'
description: 'The Avocado Desktop agent chat: choosing a backend (Claude Code, OpenAI Codex or the in-VM agent), what it can do through the Avocado MCP, and its settings.'
---

# Agent

Avocado Desktop has a built-in agent chat (developer preview). Describe what you want in plain English, and the agent edits your project and runs the toolchain for you. It uses the same `avocado install`, `build`, `provision` and `deploy` steps you would run yourself.

Open it with the **Agent** button in the titlebar, or **Show Agent Chat** in the menu bar icon. **New chat** starts a fresh conversation, **Past sessions** reopens an old one, and the model picker in the chat header switches models.

The agent can see which project you have open, so a request like "build and install this" acts on that project.

## Choose a backend

The agent runs on one of three backends. Pick one under **Settings → Agent**.

| Backend          | Where it runs | What it needs                                                                                     |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------- |
| **Claude Code**  | Your computer | Claude Code installed and signed in once with `claude /login`, on a Claude Pro, Max or Team plan. |
| **OpenAI Codex** | Your computer | The Codex CLI installed and signed in.                                                            |
| **Microclaw**    | The build VM  | An API key for the model provider, entered in Settings.                                           |

With Claude Code, Desktop uses your Claude subscription. **Force subscription billing** is on by default. It ignores an `ANTHROPIC_API_KEY` in your environment, so you aren't billed through the API by accident.

## What the agent can do

The agent works through the **Avocado MCP**, a [Model Context Protocol](https://modelcontextprotocol.io) server that Desktop runs. Through it, the agent can:

- list your projects, and read and write project files
- add packages to an extension
- run Install, Build, Provision and Deploy, and follow their progress
- answer prompts in the provisioning terminal
- read serial consoles and the list of connected USB devices
- start and stop the build VM
- read the **Events** log
- run Avocado CLI commands

Desktop can also give the agent the public `avocado-os` MCP server, which searches Avocado documentation, references and package feeds.

## Use the Avocado MCP from another client

Desktop's MCP server listens at `http://127.0.0.1:11551/mcp` while the app runs. Any MCP client on your computer can use it. **Settings → Agent** has a ready-made configuration snippet under **External clients**, and an example `curl` request under **MCP host server**.

## Related

- [Settings → Agent](/avocado-desktop/settings#agent)
