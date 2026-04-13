---
title: Package Feeds
description: Browse and search available packages from Avocado OS package feeds using the CLI.
sidebar_position: 2
---

# Package Feeds

Avocado OS maintains RPM package feeds hosted at `https://repo.avocadolinux.org`. These feeds provide pre-built packages for your target architecture, including system libraries, development tools, language runtimes, and more.

The feeds are organized by release and channel (e.g., `2024/edge`) and include separate repositories for:

- **SDK packages** — tools and libraries for the build environment
- **Target packages** — packages installable into runtimes and extensions on your target hardware

## Searching for Packages

Use the [`avocado sdk dnf`](/developer-reference/avocado-cli/commands/sdk/dnf) command to search the available package feeds:

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
  release: 2024
  channel: edge
```

To override the repository URL or release version, use the `distro.repo` section:

```yaml
distro:
  release: 2024
  channel: edge
  repo:
    url: "https://custom-repo.example.com"
    releasever: "2024-custom"
```

You can also override these values with environment variables:

| Variable | Description |
|---|---|
| `AVOCADO_REPO_URL` | Override the repository base URL |
| `AVOCADO_RELEASEVER` | Override the release version |

## Additional DNF Options

Pass additional flags to DNF using `--dnf-arg`:

```text
avocado sdk dnf --dnf-arg --nogpgcheck search python
```

Pass arguments to the container runtime using `--container-arg`:

```text
avocado sdk dnf --container-arg --cap-add=SYS_ADMIN search python
```

For the full list of options, see the [`avocado sdk dnf`](/developer-reference/avocado-cli/commands/sdk/dnf) command reference.
