---
title: Package Feeds
description: Browse and search available packages from Avocado OS package feeds using the CLI.
sidebar_position: 5
copy_markdown: true
---

# Package Feeds

Avocado OS maintains RPM package feeds hosted at `https://repo.avocadolinux.org`. These feeds provide pre-built packages for your target architecture, including system libraries, development tools, language runtimes, and more.

The feeds are organized by release and channel (e.g., `2026/edge`) and include separate repositories for:

- **SDK packages** — tools and libraries for the build environment
- **Target packages** — packages installable into runtimes and extensions on your target hardware

## Searching for Packages

Use the [`avocado sdk dnf`](/developer-reference/avocado-cli/commands#avocado-sdk-dnf) command to search the available package feeds:

```text
avocado sdk dnf search <query>
```

For example, to find Python-related packages:

```text
avocado sdk dnf search python
```

To list all available packages:

```text
avocado sdk dnf list
```

To list packages currently installed in the SDK:

```text
avocado sdk dnf list installed
```

## Installing Packages into Runtimes

To install packages into a specific runtime, use `avocado runtime dnf`:

```text
avocado runtime dnf -r <runtime> install <package>
```

For example, to install `gcc` and `make` into the `dev` runtime:

```text
avocado runtime dnf -r dev install gcc make
```

You can also search and list packages scoped to a runtime:

```text
avocado runtime dnf -r dev search python
avocado runtime dnf -r dev list installed
```

## Installing Packages into Extensions

Extensions have their own isolated sysroot. Use `avocado ext dnf` to manage packages within an extension:

```text
avocado ext dnf -e <extension> install <package>
avocado ext dnf -e <extension> search <query>
```

## Configuring the Feed

By default, packages are fetched from `https://repo.avocadolinux.org` using the release and channel defined in your `avocado.yaml`:

```yaml
distro:
  release: 2026
  channel: edge
```

To override the repository URL or release version, use the `distro.repo` section:

```yaml
distro:
  release: 2026
  channel: edge
  repo:
    url: 'https://custom-repo.example.com'
    releasever: '2026-custom'
```

You can also override these values with environment variables:

| Variable             | Description                      |
| -------------------- | -------------------------------- |
| `AVOCADO_REPO_URL`   | Override the repository base URL |
| `AVOCADO_RELEASEVER` | Override the release version     |

## Snapshots and updating

A feed can publish snapshots, so a project resolves the same packages until you choose to move. The feed publishes a per-target pointer at `<repo>/<release>/<channel>/target/<machine>/snapshots-latest.json`. The CLI fetches it over HTTP and never writes it into your project. A 404 means the feed publishes no snapshots, and the project follows the feed's current contents.

On the first fetch the CLI pins the snapshot it resolved in `avocado.lock` under `repo-snapshot`, so a clean rebuild resolves the same packages.

`avocado update` advances the target to the latest snapshot, clears the package, kernel and snapshot pins and rewrites the lock. The next `avocado install` re-resolves against the new snapshot. It is not a package-only upgrade.

A set `AVOCADO_RELEASEVER` counts as an already applied pin, so snapshot pinning is skipped for the distro feed. In that case `avocado update` only clears pins. The variable also supplies `$releasever` for a feed that sets neither its own `releasever` nor a `release` and `channel` pair. When a project has a locked pin, the CLI says once per run that the override wins:

```text
pin ignored: AVOCADO_RELEASEVER is set to <value>; the locked pin <pin> is not used
```

Unset `AVOCADO_RELEASEVER` and the locked pin applies again.

A pin also records the feed URL it came from. If you point `distro.repo.url` at a mirror or another feed with the same release and channel, the CLI warns that the pin does not match instead of reusing a snapshot ID that feed never issued. Run `avocado update` to pin a snapshot of the new feed. When a pinned rebuild finds that the channel has moved on, it prints one line naming the pinned and the latest snapshot.

### Feed checks before downloading

`avocado install`, `sdk install`, `fetch`, `ext fetch`, `ext install`, `runtime install`, `rootfs install` and `initramfs install` check each feed before downloading anything. The CLI reads the repository metadata of each URL feed from your machine, and checks a `path:` feed on disk. An unreachable feed, or one with no metadata, fails at once with an error that names the feed and the reason, instead of a dnf error from inside the SDK container.

The check is skipped with `--runs-on`, where dnf runs on the remote machine, and for a feed with TLS verification turned off. The dnf passthrough commands (`sdk dnf`, `ext dnf`, `runtime dnf`, `sdk run`) and `avocado update` do not check feeds.

If a feed answers HTTP 429 (Too Many Requests), dnf reports "No more mirrors to try". When a run fails, the CLI checks the feed once and, if it is rate limiting, says so and how long to wait.

### Working offline

`--offline`, or `AVOCADO_OFFLINE` set to `1`, `true` or `yes`, stops the CLI's own lookups: the latest-snapshot pointer, the pin check and the feed checks. The CLI uses the snapshot pinned in `avocado.lock` and prints it once. That pin is whatever the last online `avocado update` recorded, so an old pin installs old packages.

- **No pin.** With no pin in the lock and the default distro feed, the CLI stops before any request and asks you to run `avocado update` while online. Any other `distro.repo.url` continues unpinned, with a notice.
- **Commands that fail.** `avocado update` and an `org:` feed that has no token yet fail with an error naming `--offline`.
- **Commands that still connect.** `init --reference`, `upgrade`, `vm update`, `connect` and `runtime deploy` connect as usual, because a network call is their purpose.
- **dnf still needs the network.** `--offline` does not make dnf inside the SDK container work offline. An install that needs packages from a remote feed still needs the network.

## Additional Feeds

`distro.feeds` lists the feeds a project enables, in priority order: the distro feed comes first unless you place it yourself. Position sets the dnf priority: entries get 10, 20, 30 and so on, and dnf takes a package from the repository with the lowest number regardless of version, even when another feed carries a newer one. A local build listed ahead of the distro feed therefore shadows the distro package. A name defined under `repos:` is your own feed (`url:`, `path:` or `org:`):

```yaml
distro:
  release: 2026
  channel: edge
  feeds:
    - my-mirror
    - ros2-jazzy

repos:
  my-mirror:
    url: 'https://rpm.example.com/$target'
```

A name `repos:` does not define is an **add-on feed** the distro feed publishes, such as `ros2-jazzy` above. It needs no URL: it enables the add-on's target repo (`target/<target>-<name>`, for target installs and the SDK's target sysroot) and its SDK repo (`sdk/<target>-<name>`, for the SDK host) off the distro feed's base URL, releasever and TLS settings. List the add-on once; `<name>-sdk`, `ext` and `<name>-ext` are not add-on names.

Before anything is written to the lock, the CLI checks the name against the channel's `targets.json` and refuses one the target does not publish, suggesting the nearest published name, the add-ons the target does publish, and the other targets that carry it. A name close to one `repos:` defines is refused as a typo. If `targets.json` cannot be read, the CLI warns and lets dnf report what is missing.

### Feeds served from localhost

The loopback handling below, including `rewrite_loopback`, needs avocado-cli 1.2.0 or later.

On native Linux, a feed served from a loopback address such as `http://127.0.0.1:8000` is reachable from the SDK container as written only with host networking. The default project that `avocado init` writes already sets `--network=host` in `sdk.container_args`, together with `--privileged`, `-v /dev:/dev` and `-v /sys:/sys`, so a project that kept the default needs nothing. A project that removed it needs `--network=host` back:

```yaml
sdk:
  container_args:
    - --network=host
```

For a feed under `repos:`, the CLI keeps a loopback URL unchanged when `sdk.container_args` (including `sdk.<target>.container_args`) selects host networking, and otherwise rewrites it to the host gateway, `host.docker.internal`. That decision reads the project configuration only, so install and build stamp the same address; a feed can override it with `rewrite_loopback: true` or `false`. The distro feed follows the arguments docker actually receives instead: a `--network=host` passed on the command line with `--container-arg` also keeps a loopback distro URL, and a `--container-arg` that replaces the configured arguments drops a `--network=host` set there. The distro feed cannot use `rewrite_loopback`.

On Docker Desktop and under the Avocado VM, host networking does not share your machine's loopback, so the CLI rewrites a loopback URL to the host gateway even with `--network=host`. There the feed server must accept connections that arrive through that gateway address. If the feed is unreachable while the server listens only on `127.0.0.1`, bind it to an address the gateway reaches, such as `0.0.0.0`.

## Using a locally built package

To use a package you built yourself instead of the one the distro feed carries, build the RPM, publish it in a local feed, and rank that feed first. Do the steps in this order, because `avocado install` resolves against the feeds as they are declared when it runs.

1. **Build the RPM.** For a component of the base OS, build it with BitBake; the RPMs land under the build's `tmp/deploy/rpm/<arch>/` directory, as [Modifying OS Components](/developer-reference/modifying-os-components) describes. For your own code, use the SDK. Compile the section, then package it (the section needs a `package` block in `avocado.yaml`):

   ```text
   avocado sdk compile <section>
   avocado sdk package <section> --out <dir>
   ```

   Without `--out` the RPM stays inside the container. `avocado ext package` does not fit this workflow: it packages an extension's sources, not a built sysroot, so its RPM does not deliver compiled binaries. For that source workflow, see `source.type: package` in [Cross-compilation](/developer-reference/cross-compilation).

2. **Put the RPM in a feed directory.** Copy the built RPM into a directory and run `avocado feed index <dir>`. It writes `<dir>/repodata/` with the host's `createrepo_c`, and rewrites it on every run. Run it again after you add, remove or replace an RPM.

3. **Declare the directory under `repos:`** with `path:`, using the grammar from [Additional Feeds](#additional-feeds).

4. **List it ahead of the distro feed in `distro.feeds`, and list the distro feed after it.** Feed order is the priority, so the first feed that carries the package name wins, as described in [Additional Feeds](#additional-feeds). A list that names only the local feed is not enough: the CLI then inserts the distro feed (`avocado`) first, and the distro package wins.

5. **Unlock the scope that holds the package.** If an earlier `avocado install` already locked the distro package, a `*` entry keeps that locked version, and the local RPM is not selected even with the feeds in the right order. Run `avocado unlock` for that scope, for example `avocado unlock --extension my-ext`. See [Updating locked versions](/developer-reference/lockfiles-and-build-stamps#updating-locked-versions). A project that has never installed the package can skip this step.

6. **Install, build and provision.** Run `avocado install`, then `avocado build`, then `avocado provision <runtime> --profile <profile>`.

A `path:` feed plus a plain `*` entry for the package installs a local RPM. The feed directory needs repository metadata, which `avocado feed index <dir>` writes. Declare the feed under `repos:` with `path:`, list it in `distro.feeds` ahead of `avocado`, and declare the package with version `"*"` in an extension:

```yaml
distro:
  release: 2026
  channel: edge
  feeds:
    - local-rpms
    - avocado

repos:
  local-rpms:
    path: /home/me/rpms

extensions:
  my-ext:
    version: '1.0.0'
    packages:
      my-package: '*'

runtimes:
  dev:
    extensions: [my-ext]
```

### `avocado feed index`

`avocado feed index <dir>` needs `createrepo_c` on your `PATH`. Install it from your package manager, for example `apt install createrepo-c`, `dnf install createrepo_c` or `pacman -S createrepo_c`. The command fails with an error naming the tool when it is missing, and naming the path when the directory does not exist.

The metadata takes its timestamps from the newest RPM in the directory, so indexing an unchanged directory again writes the same `repomd.xml`. A symlinked directory that leads back into its own path, such as `a -> .`, fails naming the link, because `createrepo_c` would follow it forever. A link to a directory outside the feed is followed and indexed.

## Additional DNF Options

Pass additional flags to DNF using `--dnf-arg`:

```text
avocado sdk dnf --dnf-arg --nogpgcheck search python
```

Pass arguments to the container runtime using `--container-arg`:

```text
avocado sdk dnf --container-arg --cap-add=SYS_ADMIN search python
```

For the full list of options, see the [`avocado sdk dnf`](/developer-reference/avocado-cli/commands#avocado-sdk-dnf) command reference.
