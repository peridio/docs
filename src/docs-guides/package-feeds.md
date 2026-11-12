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

A set `AVOCADO_RELEASEVER` counts as an already applied pin, so snapshot pinning is skipped for the distro feed. In that case `avocado update` only clears pins. The variable also supplies `$releasever` for a feed that sets neither its own `releasever` nor a `release` and `channel` pair.

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

## Using a locally built package

To use a package you built yourself instead of the one the distro feed carries, build the RPM, publish it in a local feed, and rank that feed first. Do the steps in this order, because `avocado install` resolves against the feeds as they are declared when it runs.

1. **Build the RPM.** For a component of the base OS, build it with BitBake; the RPMs land under the build's `tmp/deploy/rpm/<arch>/` directory, as [Modifying OS Components](/developer-reference/modifying-os-components) describes. For your own code, use the SDK. Compile the section, then package it (the section needs a `package` block in `avocado.yaml`):

   ```text
   avocado sdk compile <section>
   avocado sdk package <section> --out <dir>
   ```

   To package an extension sysroot instead, run `avocado ext package <name> --out-dir <dir>`. Without `--out-dir` the RPM stays inside the container.

2. **Put the RPM in a feed directory.** Place the built RPM in a directory that works as an RPM repository. See the provisional note below.

3. **Declare the directory under `repos:`** with `path:`, using the grammar from [Additional Feeds](#additional-feeds).

4. **List it ahead of the distro feed in `distro.feeds`.** Feed order is the priority, so the first feed that carries the package name wins, as described in [Additional Feeds](#additional-feeds).

5. **Install, build and provision.** Run `avocado install`, then `avocado build`, then `avocado provision <runtime> --profile <profile>`.

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
