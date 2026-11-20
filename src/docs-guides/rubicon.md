---
sidebar_position: 3
title: 'Rubicon'
copy_markdown: true
description: 'Drive a board through a Rubicon fixture: switch power and boot straps, use its serial console, run profiles and provision it from anywhere.'
---

A Rubicon is a network fixture that sits beside a development board (the DUT, device under test). It switches the board's power and boot straps with relays, carries the board's USB port and serial console over the network, and can watch the board's buses on logic-analyzer channels. An avocado VM acts as the Rubicon's hub: it drives one or more Rubicons and runs jobs against them.

With `avocado rubicon` and `avocado provision --rubicon` (avocado-cli 1.2.0 or later), you can:

- see which boards you can reach, on your own VM or on any VM hub in your Connect org,
- open the DUT's serial console,
- run named sequences of steps on the board, such as "power off, set boot mode, power on",
- provision the board from your project without being near it, from your desk or from CI.

## How a board is reached

Every Rubicon command finds its board through a hub:

- **Your own VM.** A Rubicon added to this machine's avocado VM is driven locally.
- **Through Connect.** A VM that is connected to your Connect org is a hub for the whole org. Commands reach its boards through Connect.

`--via auto`, the default, uses this machine's VM when it drives the board, and Connect otherwise. `--via local` and `--via connect` force one route. When several VMs in the org know the same board, name one with `--vm`. `--connect-profile` picks the Connect profile.

A board is named by its label, its firmware name or its address. A project can set a default with `rubicon.default`, so commands that take a board can leave it out.

## Set up a hub

Add a Rubicon to this machine's VM by its address:

```bash
avocado vm rubicon add <address> --label bench-1
avocado vm rubicon list
```

`avocado vm rubicon remove` stops managing it. `avocado rubicon add`, `remove` and `label` do the same from the board's side.

To share the hub with your org, connect the VM to Connect. This claims the VM as a hub:

```bash
avocado vm connect
avocado vm connect --status
```

`--org` and `--name` set the org and the hub's name. `--disconnect` stops the hub's Connect agent and removes its local credentials.

On a Linux machine that serves as a hub, run the VM as a systemd user service, so it stays up across logout and reboot. The service turns hibernation off:

```bash
avocado vm service install
avocado vm service status
```

`avocado vm service uninstall` stops and removes it.

### Claim a board

`avocado rubicon claim <board>` claims a board for your Connect org. Someone has to press the Rubicon's SW2 button within the minute. A claimed board accepts actions only with a token from Connect.

### Update firmware

`avocado rubicon update <board>` puts new firmware on a board. Pass a released version with `--version`, or a signed image with `--file`. `--all` updates every online board you can reach, three at a time. The board test-boots the new firmware and keeps it only if it comes back healthy. Otherwise it rolls back by itself.

## See boards and jobs

```bash
avocado rubicon list
avocado rubicon show bench-1
```

`list` shows every board you can reach, with its state and its hub's queue. `show` gives one board in detail, including what each pin is wired to on this target (see [`wiring`](#configure-the-target)).

A hub runs one job per board at a time, and others wait in its queue. `avocado rubicon cancel <job>` takes a waiting job out of the queue, or stops a running one and cleans up the board. The job ID, or its start, is in `avocado rubicon list`.

## Serial console

```bash
avocado rubicon console bench-1
```

This opens the DUT's serial console. Press `Ctrl-]` to leave. `--read-only` watches without sending input, and `--for <secs>` leaves after that many seconds.

Without a terminal, piped input goes to the DUT as raw bytes, which is how a script presses keys in a boot menu:

```bash
printf '\033[B\r' | avocado rubicon console --for 5
```

`avocado rubicon logs <board>` prints what the console showed recently. The hub records the console whenever a job powers the board, and says how old the history is.

## Configure the target

The `rubicon:` section of `avocado.yaml` describes how the Rubicon is wired to this target, and what a hub does with it. A board support extension usually ships it, so most projects only set `default`:

```yaml
rubicon:
  default: bench-1
  console:
    baud: 115200
    port: 0
  wiring:
    power: 'board power supply'
    ssr1: 'BOOT_MODE0 switch'
    ssr2: 'BOOT_MODE1 switch'
    ssr3: 'reset button'
  analyzer:
    i2c-gp: { protocol: i2c, sda: la12, scl: la13 }
```

| Key        | Meaning                                                                                                                                                                         |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `default`  | The board that commands use when none is named.                                                                                                                                 |
| `console`  | The DUT's serial console. `baud` defaults to 115200. `port` picks the UART of a multi-port USB serial adapter (0, the default, is the first).                                   |
| `wiring`   | What each Rubicon output is wired to on this target. `rubicon show` and the hub's job log print it beside the pin. The project wins per pin over an extension.                  |
| `analyzer` | Buses on the logic-analyzer channels, by name. The hub leaves those channels as plain inputs with no pull, so they don't load the bus. Every other channel keeps its pull-down. |
| `run`      | Named run profiles. See below.                                                                                                                                                  |

## Run profiles

A run profile is a named list of steps that a hub runs against the Rubicon and its DUT. Each step has exactly one key:

| Step             | What it does                                                                                                                                                                                                |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `out`            | Switch outputs on or off: `{ power: "on", ssr1: "off" }`.                                                                                                                                                   |
| `pulse`          | Turn outputs on for some milliseconds, then off, like a button press: `{ ssr3: 200 }`.                                                                                                                      |
| `servo`          | Set servo or linear-actuator outputs to a pulse width in microseconds: `{ sv1: 1800 }`. 0 stops the pulses.                                                                                                 |
| `wait_ms`        | Wait this many milliseconds.                                                                                                                                                                                |
| `run`            | Run another run profile's steps here.                                                                                                                                                                       |
| `hold_usb`       | Keep the board's USB devices with these IDs attached to the hub for the rest of the job: `vvvv:pppp`, `vvvv:*` for any product of a vendor, or `*` for every device on the board's USB port.                |
| `wait_usb`       | Wait until a held device with this ID is attached: `{ id: "vvvv:pppp", timeout_s: 30 }`.                                                                                                                    |
| `console_expect` | Wait until the console prints one of these markers.                                                                                                                                                         |
| `console_send`   | Type this on the console as is. Write the line ending (`"boot\r"`) and any escape sequence (`"\u001b[B"` is the down arrow).                                                                                |
| `sd_mux`         | Hand the card in an SD multiplexer on the board's USB port to the hub (`host`) or to the DUT (`dut`). On the hub, the card is a disk, and the provision that follows gets it as `AVOCADO_PROVISION_DEVICE`. |
| `mode`           | `transfer` gives the Rubicon's whole USB buffer pool to flashing. Provision jobs switch to it themselves. `monitor` lends part of the pool to on-board analysis while the DUT runs.                         |
| `with_usb`       | Provision jobs only: attach a USB device to the hub, run a command in the job's SDK container with it, then let it go. The console pauses meanwhile.                                                        |

A board whose boot mode is set by switches might ship these:

```yaml
rubicon:
  run:
    power-off:
      - out: { power: 'off' }
    power-on:
      - out: { power: 'on' }
    reset:
      - pulse: { ssr3: 200 }
    # Power-cycle into the ROM's USB recovery mode, and keep the
    # recovery device attached to the hub for the flash.
    enter-recovery:
      - run: power-off
      - out: { ssr1: 'on', ssr2: 'off' }
      - wait_ms: 3000
      - run: power-on
      - hold_usb: ['vvvv:pppp']
      - wait_usb: { id: 'vvvv:pppp', timeout_s: 30 }
    # Set the boot mode back to on-board storage and boot.
    boot-emmc:
      - run: power-off
      - out: { ssr1: 'off', ssr2: 'on' }
      - wait_ms: 3000
      - run: power-on
      - console_expect: ['login:']
```

Run one on a board:

```bash
avocado rubicon run reset --board bench-1
```

Extensions contribute run profiles and wiring. A project entry with the same name replaces the extension's profile as a whole.

### Hook run profiles to a provision profile

A provision profile names the run profiles a hub runs around it:

```yaml
provision:
  emmc:
    rubicon: { before: enter-recovery, after: boot-emmc }
```

`before` runs first, for example to put the DUT into recovery. `after` runs only when the provision succeeded, for example to boot the board and check that it comes up.

## Provision through a Rubicon

```bash
avocado provision dev --profile emmc --rubicon bench-1
```

`--rubicon` provisions the board behind that Rubicon on the hub that drives it: this machine's VM if it has the board, otherwise a hub in your org through Connect. With no value it uses `rubicon.default`. The CLI packs what the provision needs, sends the hub only what it lacks, runs the job there and streams the log back. `--via`, `--vm` and `--connect-profile` work as for `avocado rubicon`.

By default the job is automated, for CI and tests. The hub checks that the board boots, and it owns the console while the job runs. Add `--interactive` when you are at the board's console: the hub runs the `before` steps and the flash, then leaves the DUT powered on to boot. It skips the boot check and keeps the console out of the job log, and your `avocado rubicon console` stays writable throughout.

A hub job's SDK container sees only its own board's USB buses.

## Provisionable bundles

A bundle holds everything a provision needs, so a machine with no build tree can replay it:

- the runtime images, the board's boot files, and the provisioning manifest and scripts,
- the project's `avocado.yaml` and `avocado.lock`, and the resolved run profiles,
- a copy of each extension that has a `path` source.

The hub installs the SDK and any package extensions from the package feed, pinned by the bundled lock, and fetches git extensions from their repository. A git extension in a private repository, or a feed that needs a token, does not work on a hub yet.

```bash
# Write a bundle instead of provisioning
avocado provision dev --profile emmc --pack ./out

# Replay it, in an empty directory, on a machine with only the SDK
avocado provision --bundle ./out/dev-<target>.bundle
```

`--pack` writes a directory with `bundle.json` and content-addressed blobs. Given an existing directory, it writes `<runtime>-<target>.bundle` inside it. `--bundle` caches blobs under `.avocado-bundle/` in the current directory and writes the bundle's `avocado.yaml` and lock there. Run it in an empty directory, never in a project. A replay takes its settings from the bundle, so `--bundle` refuses `--container-arg`, `--dnf-arg`, `--out`, `--force` and `--target`.

The bundle also pins the runtime the pack resolved. The replay uses that runtime even when the pack picked it with `AVOCADO_RUNTIME`.

### Through Connect

Connect stores bundles and provisioning assets, so CI can provision a board on a hub in your org:

```bash
# Attach provisioning assets to an uploaded runtime
avocado connect upload dev --provisionable

# Or upload a bundle file
avocado connect bundle upload ./out/dev-<target>.bundle --name dev

# Provision a board on a hub, and fail unless the job passes
avocado connect provision --rubicon <address> --runtime <runtime-id> --profile emmc --wait
```

`connect upload --provisionable` packs the provisioning assets and attaches them to the uploaded runtime. Connect skips content it already has, such as the runtime's own images. `connect provision` takes either `--runtime` or `--bundle <id>`. `--wait` streams the job's log and exits non-zero unless the job passed. `--repository`, `--pr`, `--commit` and `--run-url` record where the job came from.

## See also

- [Provisioning](/developer-reference/provisioning)
- [`avocado rubicon` commands](/developer-reference/avocado-cli/commands#rubicon-commands)
