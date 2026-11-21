---
title: 'First run'
description: 'The Avocado Desktop setup wizard: signing in to Avocado Connect, permissions, the CLI and QEMU checks, and starting the build VM.'
---

# First run

The first time you open Avocado Desktop, a short wizard sets it up. You can skip any step and finish it later. To see the wizard again, use **Settings → Privacy & Help → Replay welcome tour**.

## The wizard's steps

1. **Sign in to Avocado Connect.** **Sign in with browser** opens Avocado Connect in your browser. If you don't have an account yet, use **Create an account**. Signing in is optional, but you need it to sign builds and deploy them to a fleet. See [Avocado Connect sign-in](#avocado-connect-sign-in).
2. **Permissions.** This step explains the two permissions Desktop asks for:
   - **USB device access**, for flashing hardware. Desktop installs a privileged helper for this.
   - **File access**, for your projects, which live in `~/Avocado/Projects` by default.
3. **Avocado CLI check.** Desktop lists every Avocado CLI it finds. A CLI on your `PATH` at 0.39.0 or later is used ahead of the copy the app includes, and the check warns only about one older than 0.39.0. **Re-check** runs the check again. If everything is fine, the step skips itself.
4. **QEMU check (macOS).** The build VM needs QEMU. If it's missing, this step shows the install command with a **Copy** button.
5. **Start the VM (macOS).** Desktop installs and starts the build VM. You can skip this and start it later from the dashboard.
6. **You're all set.** The wizard ends by pointing you at your first project.

On Linux, the QEMU and VM steps don't appear, because builds run on the host's Docker.

## The Getting started card

Until you dismiss it, the **Overview** pane has a **Getting started** card listing anything the wizard left unfinished. Examples are "Install Avocado VM" and "Start the VM", each with its own button. To bring the card back after dismissing it, use **Settings → Privacy & Help → Show getting started again**.

## Avocado Connect sign-in

Signing in connects Desktop to your [Avocado Connect](/avocado-connect/overview) account. You need it for:

- the **Connect**, **Upload** and **Deploy OTA** fleet actions on a project
- deploys that use **Sign via Connect**
- switching between Connect profiles

Desktop signs in through the Avocado CLI, so Desktop and the CLI share one set of credentials. Signing in with either one signs in both.

To sign in or out later, use the account row at the bottom of the sidebar, or **Settings → Account**.

## Next

- [Projects](/avocado-desktop/projects)
