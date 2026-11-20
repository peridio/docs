---
title: 'Settings'
description: 'Every Avocado Desktop setting, tab by tab: Account, Agent, Virtual machine, Environment, Shortcuts, Updates, and Privacy & Help.'
---

# Settings

Open Settings with ⌘/Ctrl+, or from the account menu at the bottom of the sidebar. On macOS, it's also **Settings…** in the app menu. Most settings save as soon as you change them. The ones that need a restart have their own **Save & restart** button.

## Account

| Setting             | What it does                                                                                                               |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Avocado Connect** | Signed out, it shows **Sign in with browser**. Signed in, it shows who you are and your account details.                   |
| **Active profile**  | Switches between Avocado Connect profiles, the same profiles the Avocado CLI uses.                                         |
| **Appearance**      | **Dark Mode** (the default) or **Avocado Classic**. Every window follows the theme, including the terminal and the editor. |
| **Sign out**        | Under **Danger Zone**. It signs out of Avocado Connect, in both Desktop and the CLI.                                       |

## Agent

Picks the agent's backend and configures it. See [Agent](/avocado-desktop/agent).

**Claude Code** and **OpenAI Codex**:

| Setting                                | What it does                                                                                                                                                    |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Command**, **Args**, **Working dir** | How Desktop starts the agent. The defaults work; change them only to run a different build of the agent. The working directory defaults to your home directory. |
| **Force subscription billing**         | Claude Code only, on by default. It ignores `ANTHROPIC_API_KEY`, so you're billed through your Claude plan rather than the API.                                 |
| **MCP servers**                        | **Test connection** checks that the agent can reach the Avocado MCP.                                                                                            |
| **External clients**                   | A configuration snippet for using Desktop's MCP server from another MCP client.                                                                                 |

**Microclaw** runs the agent inside the build VM:

| Setting                               | What it does                                                                                     |
| ------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **Enabled**                           | Runs the agent in the VM. Off by default.                                                        |
| **Provider**, **Model**, **Base URL** | The model to use. Defaults to Anthropic.                                                         |
| **API key**                           | The provider's API key. It shows **Not set** until you add one.                                  |
| **Safety**                            | **Confirm before high-risk tools**, on by default and recommended.                               |
| **avocado-os server**                 | Gives the agent the public `avocado-os` MCP server. Optionally, it can use a local copy instead. |

Click **Save & restart agent** to apply changes. **MCP host server** shows the address of Desktop's own MCP server.

## Virtual machine

Sizes and manages the build VM on macOS. See [Build VM](/avocado-desktop/virtual-machine).

| Setting             | What it does                                                                                   |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| **CPU cores**       | 1 to 12. **Save & restart VM** applies it.                                                     |
| **Memory**          | 1 to 32 GiB, in 512 MiB steps. **Save & restart VM** applies it.                               |
| **Disk**            | Up to 1024 GiB. **Grow disk & restart VM** applies it. The disk can grow but not shrink.       |
| **Hibernate after** | Idle seconds before the VM hibernates. `0` turns automatic hibernation off.                    |
| **Reset /var…**     | Under **Danger Zone**. It erases everything stored in the VM, and you type `RESET` to confirm. |

The sliders turn amber past half of your computer's resources and red past three quarters.

## Environment

| Setting                       | What it does                                                                                                                                                                      |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Terminal app**              | The terminal that **Open in Terminal** uses. **Auto-detect**, or pick one Desktop found, such as iTerm, Ghostty, WezTerm or Alacritty.                                            |
| **Projects location**         | Where new projects are created. The default is `~/Avocado/Projects`.                                                                                                              |
| **VM artifact override**      | Uses a local VM image instead of the released one. For testing a VM build.                                                                                                        |
| **CLI binary**                | **Override path** runs a different Avocado CLI from the one the app includes.                                                                                                     |
| **CLI environment overrides** | Values passed to every CLI run: the package repository URL (`AVOCADO_REPO_URL`), the distro release and channel, and the VM channel URL base. **Reset to defaults…** clears them. |

Leave the CLI overrides empty unless you're pointing Desktop at a different package feed. A project's own `distro` block in `avocado.yaml` normally decides the release and channel. See [Configuration](/developer-reference/avocado-cli/configuration).

## Shortcuts

| Action          | Default  |
| --------------- | -------- |
| Install         | ⌘/Ctrl+I |
| Build           | ⌘/Ctrl+B |
| Provision       | ⌘/Ctrl+P |
| Deploy          | ⌘/Ctrl+D |
| Search packages | ⌘/Ctrl+E |

Click a shortcut to record a new one. Esc cancels, and **↺** restores the default. Desktop flags a shortcut that clashes with another one.

These shortcuts are fixed: Settings ⌘/Ctrl+,, and zoom ⌘/Ctrl with +, − or 0.

## Updates

Lists **Avocado Desktop**, the **Avocado CLI** and, on macOS, the **Avocado VM**, each with its state: up to date, an available update, or an error to retry. **Check now** checks all three. If you use a pre-release CLI, such as an `rc` build, Updates offers the final release once it ships. See [Install and update](/avocado-desktop/install#updates).

## Privacy & Help

| Setting                        | What it does                                                                                     |
| ------------------------------ | ------------------------------------------------------------------------------------------------ |
| **Share analytics data**       | Sends product usage data to Peridio. On by default. See the [Privacy Policy](/policies/privacy). |
| **Show getting started again** | Brings back the **Getting started** card on the Overview pane.                                   |
| **Replay welcome tour**        | Runs the first-run wizard again.                                                                 |
