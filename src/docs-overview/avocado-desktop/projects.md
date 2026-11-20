---
title: 'Projects'
description: 'Create, import and work on Avocado projects in Avocado Desktop: the Config, Install, Build, Provision and Deploy steps, fleet actions, terminals and the editor.'
---

# Projects

A project in Avocado Desktop is an ordinary Avocado project: a directory with an `avocado.yaml`. Anything you do in Desktop, you can also do with the [Avocado CLI](/developer-reference/avocado-cli/overview) in the same directory.

## Create or import a project

Open **Projects** in the sidebar.

- **New** creates a project in your projects folder, `~/Avocado/Projects` by default.
  - **Blank** asks for a **Project name** and, optionally, a **Target**. With no target, Desktop picks `qemuarm64` or `qemux86-64` to match your computer, so the project runs in an emulator.
  - **Reference** starts from one of the [Avocado references](https://github.com/avocado-linux/references), which are complete examples you can build straight away.
- **Import…** adds an existing project directory and opens it.

Each project card's menu has **Rename…**, **Duplicate…** and **Delete…**. Delete moves the project to the Trash. Imported projects also have **Remove from list…**, which forgets the project but leaves its files in place.

To switch projects, use the project name in the titlebar. Next to it are buttons to open the project in your file manager, a terminal or VS Code.

## The pipeline

An open project shows its pipeline as a rail of steps. Each step opens a drawer with its options and a run button.

| Step          | What it does                                                                                 | Shortcut |
| ------------- | -------------------------------------------------------------------------------------------- | -------- |
| **Config**    | Picks the **Target** and **Runtime** to build. **Refresh** rereads them from `avocado.yaml`. |          |
| **Install**   | Runs `avocado install`: the SDK and every package for the target.                            | ⌘/Ctrl+I |
| **Build**     | Runs `avocado build` for the selected runtime.                                               | ⌘/Ctrl+B |
| **Provision** | Runs `avocado provision` with the profile you pick.                                          | ⌘/Ctrl+P |
| **Deploy**    | Runs `avocado deploy` to a running device over the network.                                  | ⌘/Ctrl+D |

The bar along the bottom of the project shows its path, the release and channel from `avocado.yaml`, and the selected target and runtime.

### Install

**Reinstall from scratch** runs `avocado install -f`. It clears every extension's sysroot, so the next build rebuilds all of them. Use it when Build reports "up to date" after a change it should have picked up. The box unchecks itself after each run.

#### Update to the latest snapshot

**Update to the latest snapshot** moves the project to the newest packages in its feed. Checked, the button reads **Update & Install**, or **Update & Reinstall** together with **Reinstall from scratch**. It runs `avocado update` for the selected target, then Install. If the update fails, Install doesn't run. Like **Reinstall from scratch**, the box unchecks itself when the drawer opens and after each run.

`avocado update` only rewrites the target's lock in `avocado.lock`. The packages change when Install runs. When the Install succeeds, the run log lists what moved in that target's lock, up to 40 lines. Other targets in the lock stay as they were, so update each target you build.

To undo an update, open **Install** and click **Revert**. After you confirm, Desktop writes back the lock from before the update, runs **Clean**, then Install. Clean deletes all build output, so this takes as long as a first install. A plain Install can't do this, because it doesn't downgrade packages that are already installed. Desktop keeps only the most recent lock it replaced, and only until the app quits. To go back further, restore `avocado.lock` from git.

### Provision

Pick a **Profile**. Profiles come from your target and depend on the hardware: for example an SD card image, or flashing on-board storage over USB. Some profiles ask for extra fields, and **Provision** stays disabled until you fill in the required ones. If the provisioning script asks a question, answer it in the terminal.

If the profile flashes over USB, the board has to reach the build environment: the VM on macOS, or the build containers on Linux. Known devkits do automatically. Other hardware needs enabling once, as [USB devices](/avocado-desktop/usb-devices) describes.

### Deploy

Enter the device's address: an IP address, a hostname such as `device.local`, or `host:port`. If the device's serial console is connected, **Detect** finds the address for you.

Turn on **Sign via Connect** when the device's image trusts your Avocado Connect server key rather than your local signing key. That's the case when the project's `server_key` differs from its signing key. Such a device refuses a locally signed deploy, even its first one. With **Sign via Connect**, Connect signs the deploy instead. Connect-signed metadata expires after 7 days.

### Runs

A project runs one action at a time. While an action runs, the other steps are disabled and **Cancel** stops the run. The **Output** section shows each step's progress and log. **Clear** empties it, and the layout toggle puts the output next to the editor or below it.

The **More** menu has two recovery actions:

- **Unlock** releases a build lock that a crashed or killed run left behind.
- **Clean…** deletes all build output for the project.

## Fleet actions

Once you're signed in to Avocado Connect, the **Fleet** part of the rail connects the project to Connect.

- **Connect** links the project to a Connect organization, project, cohort and runtime. After that, it shows as **Connected**.
- **Reconfigure** changes those links. **Disconnect…** removes them.
- **Upload** sends a built runtime to Connect as a version.
- **Deploy OTA** sends a version to a cohort as a named deployment.

See [Avocado Connect](/avocado-connect/overview) for how cohorts, releases and deployments work.

## Terminals and consoles

The **Session** section opens tabs below the editor:

- **New Terminal**: a shell in the project directory.
- **Serial Monitor**: a board's serial console. See [Serial monitor](#serial-monitor).
- **SSH Into Device**: an SSH session to a device, as `root` by default.
- **Local Avocado VM Terminal**: a shell in the build VM (macOS).
- **Open QEMU**: boots the project's `dev` runtime in an emulator, the same as `avocado sdk run -iE vm dev`.

Recent sessions are listed for reopening.

### Serial monitor

**Serial Monitor** lists the serial devices Desktop can see. Pick one to open its console. The default speed is 115200 baud, and you can pick anything from 9600 to 921600. The **↗** button on a tab opens the console in its own window.

The tab shows its state: `connecting`, `connected`, `disconnected` or `waiting for replug`. The last means the device went away, for example when the board reset, and the console reconnects when it comes back. **Reconnect** reopens a closed console.

## The editor

A project opens with `avocado.yaml` in the editor. **Show file tree** lists the rest of the project's files. A dot marks unsaved changes.

**Add package** adds a package to an extension. **Explore packages** (⌘/Ctrl+E) searches every package available for the target.
