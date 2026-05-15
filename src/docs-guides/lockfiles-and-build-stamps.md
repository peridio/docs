---
sidebar_position: 9
title: 'Lockfiles and build stamps'
copy_markdown: true
description: 'How Avocado pins package versions across builds with a lockfile, and how it caches completed build steps with stamps — plus the commands to inspect, invalidate, and rebuild from a clean state.'
---

Avocado has two internal subsystems that determine what gets built and when:

- A **lockfile** that pins package versions on first install so subsequent builds are reproducible. This is your _input_ state.
- A **stamp** cache that tracks which build steps have already succeeded so they don't re-run unnecessarily. This is your _output_ state.

You generally don't think about either of these — they just make builds reproducible and fast. But when something goes wrong (an apparently stale build, a package that won't update, a partial failure that "stuck"), knowing how they work is what gets you unstuck. This page covers both, plus the commands for invalidating them.

## Lockfiles

When `avocado install` resolves a package list for the first time, the CLI writes the resolved name‑version‑release tuples for every installed package to a lockfile at `.avocado/lock.json` (under your project's source directory). On subsequent installs the CLI asks DNF for those exact versions, so two team members running the same project — or you running the same project six months from now — get byte‑identical sysroots.

### What gets locked

Entries are scoped by **target** and then by **sysroot type**. A single project can have lock entries for several sysroots in parallel:

- `sdk/<host_arch>` — packages installed into the SDK container for the host architecture (one per host arch that has run a build).
- `rootfs` — packages installed into the runtime's rootfs.
- `initramfs` — packages installed into the runtime's initramfs.
- `target-sysroot` — target-side compile dependencies (headers, libraries) installed into the SDK for cross-compilation.
- `extensions.<name>` — packages installed into each named extension's sysroot.
- `runtimes.<name>` — packages installed into each named runtime's sysroot. As of schema v6, each runtime entry also tracks per-runtime extension state under `runtimes.<name>.extensions.<ext>` — so an extension installed under different runtimes is recorded against each one independently. The top-level `extensions.<name>` map is still maintained alongside it.

The lockfile is a single JSON file (schema v6) that holds all of these. The CLI migrates older schema versions automatically on first write.

### Updating locked versions

The lockfile is **never updated by `avocado install` alone** once an entry exists — that's the whole point of pinning. To pick up a newer version of a package, you have to explicitly unlock the relevant scope first, then re‑install.

The `avocado unlock` command clears lockfile entries. It accepts scope flags so you can unlock as narrowly as the work requires:

```bash
# Unlock everything for the target (broadest)
avocado unlock

# Unlock the SDK side: SDK packages + rootfs + initramfs + target-sysroot
avocado unlock --sdk

# Unlock just one sysroot
avocado unlock --rootfs
avocado unlock --initramfs

# Unlock a single extension or runtime
avocado unlock --extension my-app
avocado unlock --runtime dev
```

After unlocking, run `avocado install` to re-resolve and write fresh entries.

`avocado clean --unlock` is the broadest equivalent — it clears every lockfile entry for the target in one step. The `--unlock` flag requires `-C/--config` and `--target`:

```bash
avocado clean --unlock -C avocado.yaml --target jetson-orin-nano-devkit
```

Use it when you want to reset the project's input state entirely.

### Lockfile workflow

The typical pattern when you want to pick up an upstream package update:

1. `avocado unlock --runtime <name>` (or whatever scope contains the package).
2. `avocado install` — the CLI re-resolves with current feed state, installs newer versions, and writes the fresh pins.
3. `avocado build` and downstream commands proceed against the new sysroot state.

You almost never need to delete `lock.json` by hand. Always prefer `avocado unlock` so the structure of the file is preserved and only the entries you want to refresh are cleared.

## Build stamps

Stamps are the CLI's way of remembering which build steps have already succeeded. When an install, build, image, sign, or provision step completes successfully — `avocado install`, `avocado build`, `avocado rootfs image`, `avocado ext image`, `avocado sign`, `avocado provision`, and so on — the CLI writes a small JSON stamp file capturing what inputs went into that step. The next time you run the same command, the CLI hashes the current inputs and compares — if they match the recorded stamp, the step is skipped.

The design is loosely modeled on Cargo's fingerprint files and Nix derivations: a stamp records _just enough_ to know whether the work needs to be redone.

### Where stamps live

Stamps are kept **inside the SDK container's persistent volume** at `$AVOCADO_PREFIX/.stamps/`, not in your project source tree. This is intentional: a stamp is only valid in the SDK environment that produced the build it describes, so it travels with that environment.

The file layout uses one stamp per (command, component, name) tuple:

```
$AVOCADO_PREFIX/.stamps/
├── sdk/<host_arch>/install.stamp
├── sdk/<host_arch>/compile-deps.stamp
├── rootfs/install.stamp
├── initramfs/install.stamp
├── extension/<name>/install.stamp
├── extension/<name>/build.stamp
├── extension/<name>/image.stamp
├── runtime/<name>/install.stamp
├── runtime/<name>/build.stamp
├── runtime/<name>/sign.stamp
└── runtime/<name>/provision.stamp
```

### What invalidates a stamp

Each stamp records SHA‑256 hashes of:

- The relevant section of `avocado.yaml` (e.g. `runtimes.dev` for a runtime stamp).
- The declared package list for that component.

When you re-run a command, the CLI re-computes those hashes against the current config and lockfile state, and re-runs the work if either has changed. Edits like adding a package, bumping a version pin, changing an overlay path, or unlocking and re-resolving the lockfile all change the relevant hash and cause the next run to redo the step.

Stamps are also chained via prerequisites: a runtime build won't proceed unless the corresponding install stamp exists, and so on. This is what prevents out-of-order builds from producing silently broken artifacts.

### Partial failures

Stamps are only written **on success**. If `avocado build` fails partway through assembling a runtime, no build stamp is created for that runtime — but stamps for any earlier successful steps (install, extension builds) remain valid. The next run resumes from the failed step rather than redoing successful work.

This is sometimes surprising: you fix the error, run `avocado build` again, and the install step doesn't re-run. That's correct — the install already succeeded, its stamp is still valid, and only the failed step needs to be retried.

### Forcing a fresh run

There are two ways to bypass stamps:

**Disable validation per-invocation** with the global `--no-stamps` flag:

```bash
avocado --no-stamps build
avocado --no-stamps install --runtime dev
```

`--no-stamps` disables both the freshness check (every step runs as if its stamp didn't exist) and stamp writing (the run won't create new stamps either). Useful for one-off forced rebuilds during debugging without affecting the cache state of subsequent runs.

**Delete the stamp cache** with `avocado clean --stamps`:

```bash
avocado clean --stamps -C avocado.yaml --target jetson-orin-nano-devkit
```

This removes the entire `.stamps` directory inside the SDK container volume. The next invocation rebuilds the cache from scratch as steps succeed. `--stamps` requires `-C/--config` and `--target` because the CLI has to enter the SDK container for the target to do the deletion.

### Picking the right tool

| Symptom                                                  | Likely cause                                        | Action                                                                                                              |
| -------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Build skipping a step you expected to re-run             | Inputs unchanged, stamp still valid                 | `avocado --no-stamps <cmd>` for a one-off, or `avocado clean --stamps` to reset                                     |
| Build reusing an old package version after a feed update | Lockfile pinning the old version                    | `avocado unlock --<scope>` then `avocado install`                                                                   |
| Build seems to ignore an `avocado.yaml` edit             | Section hash unchanged or unrelated to the edit     | Check the section you edited matches the component's stamp scope; if it should invalidate, `--no-stamps` to confirm |
| Want a fully clean re-build                              | Both layers stale or you want to start from scratch | `avocado clean --stamps --unlock` (clears both), then re-install / re-build                                         |

`avocado clean --stamps --unlock` is the heaviest reset short of `avocado clean` removing the container volume entirely — it nukes both subsystems' state for the target but leaves your sources and the SDK image alone.

## See also

- [`avocado unlock`](/developer-reference/avocado-cli/commands#avocado-unlock) — full flag reference.
- [`avocado clean`](/developer-reference/avocado-cli/commands#avocado-clean) — including `--stamps` and `--unlock` flags.
- [Configuration reference](/developer-reference/avocado-cli/configuration) — the config sections whose hashes drive stamp invalidation.
