---
description: 'Complete reference of all Avocado CLI commands on a single page.'
sidebar_label: 'Commands'
sidebar_position: 5
copy_markdown: true
---

# `commands`

A complete reference of every `avocado` command and subcommand on a single page, taken from `--help` of `avocado 1.0.0-rc.5 (78732c3 2026-09-17)`. Use your browser's find (Ctrl+F / Cmd+F) to search.

---

## Top-Level Commands

### `avocado`

```
Avocado CLI - A command line interface for Avocado

Usage: avocado [OPTIONS] <COMMAND>

Commands:
  sdk           SDK related commands
  ext           Extension related commands
  rootfs        Rootfs sysroot and image commands
  initramfs     Initramfs sysroot and image commands
  kernel        Kernel image commands
  sbom          Emit an SPDX 3.0 SBOM of the packages installed in this project
  init          Initialize a new avocado project
  runtime       Runtime management commands
  hitl          Hardware-in-the-loop testing commands
  vm            Manage the local avocado-vm helper VM (macOS / Windows dev hosts)
  container     Container Dev Mode: iterate on containers running on a device
  config        Project configuration introspection (read-only)
  clean         Clean the avocado project by removing docker volumes and state files
  install       Install all components, or add specific packages to an extension/runtime/SDK
  uninstall     Remove packages from an extension, runtime, or SDK and update avocado.yaml
  upgrade       Upgrade the CLI to the latest (or specified) version
  completion    Generate a shell completion registration script
  build         Build all components (SDK compile, extensions, and runtime images)
  fetch         Fetch and refresh repository metadata for sysroots
  provision     Provision a runtime (shortcut for 'runtime provision')
  deploy        Deploy a runtime to a device (shortcut for 'runtime deploy')
  signing-keys  Manage signing keys for extension and image signing
  var-key       Operator-held recovery key for an encrypted /var (runtimes.<r>.var.recovery)
  sign          Sign runtime images (shortcut for 'runtime sign')
  prune         Remove abandoned Docker volumes no longer associated with active configs
  save          Save the current build state to a compressed archive
  load          Load build state from a compressed archive
  unlock        Unlock (remove lock entries for) sysroots to allow package updates
  update        Move a target forward: advance to the latest feed snapshot and re-resolve packages to their latest versions on the next install (rewrites the lock)
  login         Log in to Connect (shortcut for `connect auth login`)
  connect       Avocado Connect platform commands (auth, upload)

Options:
      --target <TARGET>      Global target architecture
      --no-stamps            Disable stamp validation and writing
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help
  -V, --version              Print version

```

---

### `avocado build`

```
Build all components (SDK compile, extensions, and runtime images)

Usage: avocado build [OPTIONS]

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                         Enable verbose output
  -r, --runtime <RUNTIME>               Runtime name to build (if not provided, builds all runtimes)
  -e, --extension <EXTENSION>           Extension name to build (if not provided, builds all required extensions)
  -t, --target <TARGET>                 Target architecture
      --target-board <TARGET_BOARD>     Target board override for `{{ avocado.target.board }}`
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --output <OUTPUT>                 Output format. JSON skips TUI rendering and emits NDJSON events [default: human] [possible values: human, json]
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start                On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                            Print help

```

---

### `avocado clean`

```
Clean the avocado project by removing docker volumes and state files

Usage: avocado clean [OPTIONS] [DIRECTORY]

Arguments:
  [DIRECTORY]  Directory to clean (defaults to current directory)

Options:
      --skip-volumes
          Skip cleaning docker volumes (volumes are cleaned by default)
      --container-tool <CONTAINER_TOOL>
          Container tool to use (docker/podman) [default: docker]
  -v, --verbose
          Enable verbose output
      --stamps
          Also remove stamp files (requires -C/--config and --target)
  -C, --config <CONFIG>
          Path to avocado.yaml configuration file (required when --stamps or --unlock is used)
      --target <TARGET>
          Target architecture (required when --stamps or --unlock is used)
  -f, --force
          Force removal by killing and removing containers using the volume
      --unlock
          Also unlock (clear lock file entries) for all sysroots (requires -C/--config)
      --runs-on <USER@HOST>
          Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>
          NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>
          SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui
          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start
          On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help
          Print help

```

---

### `avocado completion`

```
Generate a shell completion registration script.

The output is a small wrapper that, when sourced, makes the shell call `avocado` itself for each TAB press. That round-trip lets completions stay live for values that depend on the local `avocado.yaml` (extension/runtime/target names) and the user's signing-key registry.

Install: bash: `avocado completion bash > /etc/bash_completion.d/avocado` (or add `source <(avocado completion bash)` to ~/.bashrc) zsh:  add `source <(avocado completion zsh)` to ~/.zshrc

Usage: avocado completion [OPTIONS] <SHELL>

Arguments:
  <SHELL>
          Shell to generate completions for

          [possible values: bash, elvish, fish, powershell, zsh]

Options:
      --runs-on <USER@HOST>
          Run command on remote host using local volume via NFS (format: user@host)

      --nfs-port <NFS_PORT>
          NFS port for remote execution (auto-selects from 12050-12099 if not specified)

      --sdk-arch <ARCH>
          SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)

      --no-tui
          Disable TUI output (use legacy sequential output with inherited stdio)

      --no-vm-auto-start
          On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)

  -h, --help
          Print help (see a summary with '-h')

```

---

### `avocado deploy`

```
Deploy a runtime to a device (shortcut for 'runtime deploy')

Usage: avocado deploy [OPTIONS] --device <DEVICE> [NAME]

Arguments:
  [NAME]  Runtime name (must be defined in config)

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                         Enable verbose output
  -t, --target <TARGET>                 Target architecture
  -d, --device <DEVICE>                 Device to deploy to as [user@]host[:port] (e.g. root@192.168.1.100:2222)
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --connect-sign                    Sign TUF metadata via the Connect platform instead of locally. Use this when deploying to a device that has received a Connect OTA update. Requires a local signing key configured for the runtime (Level 2: signing.key + avocado connect trust promote-root --key <KEY>); without one no root.json is baked and the deploy fails during Phase 1 hash collection
      --output <OUTPUT>                 Output format. JSON skips TUI rendering and emits NDJSON events [default: human] [possible values: human, json]
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start                On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                            Print help

```

---

### `avocado fetch`

```
Fetch and refresh repository metadata for sysroots

Usage: avocado fetch [OPTIONS]

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                         Enable verbose output
  -e, --extension <EXTENSION>           Extension name to fetch metadata for (if not provided, fetches for all sysroots)
  -r, --runtime <RUNTIME>               Runtime name to fetch metadata for (if not provided, fetches for all sysroots)
  -t, --target <TARGET>                 Target architecture
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start                On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                            Print help

```

---

### `avocado init`

```
Initialize a new avocado project

Usage: avocado init [OPTIONS] [DIRECTORY]

Arguments:
  [DIRECTORY]  Directory to initialize (defaults to current directory). When `--name` is also given, the project is created at <directory>/<name>/ instead of being written directly into <directory>

Options:
      --target <TARGET>
          Target architecture (e.g., "qemux86-64")
      --reference <REFERENCE>
          Reference example to initialize from (downloads from avocado-linux/references)
      --reference-branch <REFERENCE_BRANCH>
          Branch to fetch reference from (defaults to "main")
      --reference-commit <REFERENCE_COMMIT>
          Specific commit SHA to fetch reference from
      --reference-repo <REFERENCE_REPO>
          Repository to fetch reference from (format: "owner/repo", defaults to "avocado-linux/references")
      --name <NAME>
          Name for the new project. When provided, the project is created in `<directory>/<name>/`. Defaults to the reference name when initializing from a reference, or to the destination directory name otherwise
      --output <OUTPUT>
          Output format [default: human] [possible values: human, json]
      --runs-on <USER@HOST>
          Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>
          NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>
          SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui
          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start
          On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help
          Print help

```

---

### `avocado install`

```
Install all components, or add specific packages to an extension/runtime/SDK

Without packages: syncs all sysroots with avocado.yaml (installs missing, removes extraneous). With packages: adds them to the specified scope and writes to avocado.yaml.

Usage: avocado install [OPTIONS] [PACKAGES]...

Arguments:
  [PACKAGES]...
          Packages to install (when provided, adds to config and installs into the specified scope)

Options:
  -e, --extension <EXTENSION>
          Extension to install packages into (required when adding packages)

  -C, --config <CONFIG>
          Path to avocado.yaml configuration file

          [default: avocado.yaml]

  -v, --verbose
          Enable verbose output

  -f, --force
          Reinstall extensions from scratch: clear every extension's sysroot and re-seed it.

          Not needed to skip dnf's prompts — installs never prompt. Forcing discards every extension's built content, so the next build has to redo all of it.

  -r, --runtime <RUNTIME>
          Runtime name to install packages into (or sync when no packages given)

      --sdk
          Install packages into the SDK

      --no-save
          Skip writing packages to avocado.yaml

  -t, --target <TARGET>
          Target architecture

      --target-board <TARGET_BOARD>
          Target board override for `{{ avocado.target.board }}`

      --container-arg <CONTAINER_ARGS>
          Additional arguments to pass to the container runtime

      --dnf-arg <DNF_ARGS>
          Additional arguments to pass to DNF commands

      --output <OUTPUT>
          Output format. JSON skips TUI rendering and emits NDJSON events

          [default: human]
          [possible values: human, json]

      --runs-on <USER@HOST>
          Run command on remote host using local volume via NFS (format: user@host)

      --nfs-port <NFS_PORT>
          NFS port for remote execution (auto-selects from 12050-12099 if not specified)

      --sdk-arch <ARCH>
          SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)

      --no-tui
          Disable TUI output (use legacy sequential output with inherited stdio)

      --no-vm-auto-start
          On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)

  -h, --help
          Print help (see a summary with '-h')

```

---

### `avocado load`

```
Load build state from a compressed archive

Usage: avocado load [OPTIONS] --input <INPUT>

Options:
  -i, --input <INPUT>
          Input archive file path
  -C, --config <CONFIG>
          Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose
          Enable verbose output
      --container-tool <CONTAINER_TOOL>
          Container tool to use (docker/podman) [default: docker]
  -f, --force
          Overwrite existing volume and config if present
      --runs-on <USER@HOST>
          Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>
          NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>
          SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui
          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start
          On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help
          Print help

```

---

### `avocado login`

```
Log in to Connect (shortcut for `connect auth login`)

Your builds then identify themselves to the package feeds, which raises your rate limit and gives access to private feeds.

Usage: avocado login [OPTIONS]

Options:
      --url <URL>
          API URL (defaults to https://connect.peridio.com or AVOCADO_CONNECT_URL env var)

      --profile <PROFILE>
          Profile name (defaults to "default")

      --token <TOKEN>
          Use an existing API token instead of browser login

      --org <ORG>
          Organization id (UUID) to scope the new token to. Required for non-interactive multi-org logins; ignored when --token is set

      --output <OUTPUT>
          Output format

          [default: human]
          [possible values: human, json]

      --runs-on <USER@HOST>
          Run command on remote host using local volume via NFS (format: user@host)

      --nfs-port <NFS_PORT>
          NFS port for remote execution (auto-selects from 12050-12099 if not specified)

      --sdk-arch <ARCH>
          SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)

      --no-tui
          Disable TUI output (use legacy sequential output with inherited stdio)

      --no-vm-auto-start
          On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)

  -h, --help
          Print help (see a summary with '-h')

```

---

### `avocado provision`

```
Provision a runtime (shortcut for 'runtime provision')

Usage: avocado provision [OPTIONS] [NAME]

Arguments:
  [NAME]  Runtime name (must be defined in config)

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                         Enable verbose output
  -f, --force                           Force the operation to proceed, bypassing warnings or confirmation prompts
  -t, --target <TARGET>                 Target architecture
      --target-board <TARGET_BOARD>     Target board override for `{{ avocado.target.board }}`
      --profile <PROVISION_PROFILE>     Provision profile to use
      --env <ENV>                       Environment variables to pass to the provision process
      --out <OUT>                       Output path relative to src_dir for provisioning artifacts
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --list                            List the provisioning profiles available for the resolved target instead of provisioning. Reads the stone manifest from the installed SDK volume; requires `avocado install` to have run
      --output <OUTPUT>                 Output format. JSON skips TUI rendering and emits NDJSON events [default: human] [possible values: human, json]
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start                On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                            Print help

```

---

### `avocado prune`

```
Remove abandoned Docker volumes no longer associated with active configs

Usage: avocado prune [OPTIONS]

Options:
      --container-tool <CONTAINER_TOOL>
          Container tool to use (docker/podman) [default: docker]
  -v, --verbose
          Enable verbose output
      --dry-run
          Perform a dry run without actually removing volumes
      --runs-on <USER@HOST>
          Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>
          NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>
          SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui
          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start
          On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help
          Print help

```

---

### `avocado save`

```
Save the current build state to a compressed archive

Usage: avocado save [OPTIONS] --output <OUTPUT>

Options:
  -o, --output <OUTPUT>
          Output file path (e.g. state.tar.gz)
  -C, --config <CONFIG>
          Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose
          Enable verbose output
  -t, --target <TARGET>
          Target architecture
      --container-tool <CONTAINER_TOOL>
          Container tool to use (docker/podman) [default: docker]
      --include-src
          Include the src_dir contents in the archive
      --runs-on <USER@HOST>
          Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>
          NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>
          SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui
          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start
          On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help
          Print help

```

---

### `avocado sbom`

```
Emit an SPDX 3.0 SBOM of the packages installed in this project

Usage: avocado sbom [OPTIONS]

Options:
  -o, --output-path <PATH>              Write the document here instead of to stdout
  -C, --config <CONFIG>                 Path to avocado.yaml (defaults to ./avocado.yaml) [default: ./avocado.yaml]
  -t, --target <TARGET>                 Target architecture
      --include-sdk                     Also describe the SDK and target sysroot. They run on the build host and ship nothing to a device, so they are excluded by default: an SBOM answering "what is on this device" must not list the cross toolchain alongside what the device actually holds
  -v, --verbose                         Verbose output
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --output <OUTPUT>                 Output format. The document itself is JSON-LD either way; this only controls whether the summary lines accompany it [default: human] [possible values: human, json]
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start                On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                            Print help

```

---

### `avocado sign`

```
Sign runtime images (shortcut for 'runtime sign')

Usage: avocado sign [OPTIONS] [NAME]

Arguments:
  [NAME]  Runtime name to sign (if not provided, signs all runtimes with signing config)

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                         Enable verbose output
  -t, --target <TARGET>                 Target architecture
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start                On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                            Print help

```

---

### `avocado uninstall`

```
Remove packages from an extension, runtime, or SDK and update avocado.yaml

Usage: avocado uninstall [OPTIONS] <PACKAGES>...

Arguments:
  <PACKAGES>...  Packages to remove

Options:
  -e, --extension <EXTENSION>           Extension to remove packages from
  -r, --runtime <RUNTIME>               Runtime to remove packages from
      --sdk                             Remove packages from the SDK
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                         Enable verbose output
  -f, --force                           Force the operation to proceed, bypassing warnings or confirmation prompts
  -t, --target <TARGET>                 Target architecture
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start                On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                            Print help

```

---

### `avocado unlock`

```
Unlock (remove lock entries for) sysroots to allow package updates

Usage: avocado unlock [OPTIONS]

Options:
  -C, --config <CONFIG>        Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                Enable verbose output
  -t, --target <TARGET>        Target architecture
  -e, --extension <EXTENSION>  Unlock a specific extension
  -r, --runtime <RUNTIME>      Unlock a specific runtime
      --sdk                    Unlock SDK (rootfs, initramfs, target-sysroot, and all SDK arches)
      --rootfs                 Unlock rootfs
      --initramfs              Unlock initramfs
      --runs-on <USER@HOST>    Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>    NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>        SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                 Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start       On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                   Print help

```

---

### `avocado update`

```
Move a target forward: advance to the latest feed snapshot and re-resolve packages to their latest versions on the next install (rewrites the lock)

Usage: avocado update [OPTIONS]

Options:
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose              Enable verbose output
  -t, --target <TARGET>      Target architecture
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado upgrade`

```
Upgrade the CLI to the latest (or specified) version

Usage: avocado upgrade [OPTIONS]

Options:
      --version <VERSION>    Controls what version to upgrade to. If not specified, the latest version will be used
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

## Connect Commands

### `avocado connect`

```
Avocado Connect platform commands (auth, upload)

Usage: avocado connect [OPTIONS] <COMMAND>

Commands:
  auth          Authenticate with the Connect platform
  init          Initialize connect settings in avocado.yaml (org, project, server key, extensions, claim token, device config)
  clean         Remove connect configuration (connect section, connect-config extension, and device config overlay)
  orgs          Manage organizations
  ext           Publish extensions to the feed (super-admin)
  projects      Manage projects
  devices       Manage devices
  cohorts       Manage cohorts
  runtimes      List uploaded runtimes on the Connect platform
  claim-tokens  Manage claim tokens
  upload        Upload current runtime build to the Connect platform
  deploy        Deploy a runtime to a cohort
  server-key    Retrieve the Connect server's TUF signing public key
  keys          Manage signing keys registered with the Connect server
  trust         Fleet trust posture commands

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado connect auth` {#connect-auth}

```
Authenticate with the Connect platform

Usage: avocado connect auth [OPTIONS] <COMMAND>

Commands:
  login   Login to the Connect platform
  logout  Logout from the Connect platform
  status  Show current auth status

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

#### `avocado connect auth login`

```
Login to the Connect platform

Usage: avocado connect auth login [OPTIONS]

Options:
      --url <URL>            API URL (defaults to https://connect.peridio.com or AVOCADO_CONNECT_URL env var)
      --profile <PROFILE>    Profile name (defaults to "default")
      --token <TOKEN>        Use an existing API token instead of browser login
      --org <ORG>            Organization id (UUID) to scope the new token to. Required for non-interactive multi-org logins; ignored when --token is set
      --output <OUTPUT>      Output format [default: human] [possible values: human, json]
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

#### `avocado connect auth logout`

```
Logout from the Connect platform

Usage: avocado connect auth logout [OPTIONS]

Options:
      --profile <PROFILE>    Profile name (defaults to the active default profile)
      --output <OUTPUT>      Output format [default: human] [possible values: human, json]
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

#### `avocado connect auth status`

```
Show current auth status

Usage: avocado connect auth status [OPTIONS]

Options:
      --profile <PROFILE>    Profile name (defaults to the active default profile)
      --output <OUTPUT>      Output format [default: human] [possible values: human, json]
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado connect init`

```
Initialize connect settings in avocado.yaml (org, project, server key, extensions, claim token, device config)

Usage: avocado connect init [OPTIONS]

Options:
      --org <ORG>            Organization ID (skip interactive prompt)
      --project <PROJECT>    Project ID (skip interactive prompt)
      --cohort <COHORT>      Cohort ID (skip interactive prompt)
  -r, --runtime <RUNTIME>    Runtime to add connect extensions to (default: dev) [default: dev]
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
      --profile <PROFILE>    Profile name (defaults to the active default profile)
      --output <OUTPUT>      Output format (human prose or NDJSON event stream) [default: human] [possible values: human, json]
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado connect clean`

```
Remove connect configuration (connect section, connect-config extension, and device config overlay)

Usage: avocado connect clean [OPTIONS]

Options:
  -r, --runtime <RUNTIME>    Runtime to remove connect-config extension from (default: dev) [default: dev]
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
      --output <OUTPUT>      Output format (human prose or single JSON object) [default: human] [possible values: human, json]
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

Removes Connect state from the project: strips the `connect:` section and the `avocado-ext-connect-config` extension from `avocado.yaml`, and deletes `overlay/etc/avocado-conn/`. Operations are idempotent — missing items are skipped with an info message.

---

### `avocado connect orgs` {#connect-orgs}

```
Manage organizations

Usage: avocado connect orgs [OPTIONS] <COMMAND>

Commands:
  list  List organizations you belong to

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

#### `avocado connect orgs list`

```
List organizations you belong to

Usage: avocado connect orgs list [OPTIONS]

Options:
      --profile <PROFILE>    Profile name (defaults to the active default profile)
      --output <OUTPUT>      Output format (human prose or single JSON object) [default: human] [possible values: human, json]
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado connect ext` {#connect-ext}

```
Publish extensions to the feed (super-admin)

Usage: avocado connect ext [OPTIONS] <COMMAND>

Commands:
  publish  Build-once publish a packaged extension RPM to the feed (super-admin)
  status   Show the status of a published extension version
  list     List published extension versions

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

#### `avocado connect ext publish`

```
Build-once publish a packaged extension RPM to the feed (super-admin)

Usage: avocado connect ext publish [OPTIONS] <RPM>

Arguments:
  <RPM>  Path to the extension RPM (from `avocado ext package`)

Options:
      --org <ORG>            Organization ID (or set connect.org in avocado.yaml)
      --name <NAME>          Extension name (default: parsed from the RPM filename)
      --version <VERSION>    Extension version (default: parsed from the RPM filename)
      --release <RELEASE>    Extension release (default: parsed, else r0)
      --arch <ARCH>          Extension arch (default: parsed, else noarch)
      --targets <TARGETS>    Override the target machines (comma-separated). Defaults to the project's `supported_targets` from avocado.yaml; only pass this to override that
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
      --profile <PROFILE>    Profile name (defaults to the active default profile)
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

#### `avocado connect ext status`

```
Show the status of a published extension version

Usage: avocado connect ext status [OPTIONS] <ID>

Arguments:
  <ID>  Version id

Options:
      --org <ORG>            Organization ID (or set connect.org in avocado.yaml)
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
      --profile <PROFILE>    Profile name (defaults to the active default profile)
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

#### `avocado connect ext list`

```
List published extension versions

Usage: avocado connect ext list [OPTIONS]

Options:
      --name <NAME>          Filter by package name
      --org <ORG>            Organization ID (or set connect.org in avocado.yaml)
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
      --profile <PROFILE>    Profile name (defaults to the active default profile)
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado connect projects` {#connect-projects}

```
Manage projects

Usage: avocado connect projects [OPTIONS] <COMMAND>

Commands:
  list    List projects in an organization
  create  Create a new project
  delete  Delete a project

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

#### `avocado connect projects list`

```
List projects in an organization

Usage: avocado connect projects list [OPTIONS]

Options:
      --org <ORG>            Organization ID (or set connect.org in avocado.yaml)
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
      --profile <PROFILE>    Profile name (defaults to the active default profile)
      --output <OUTPUT>      Output format (human prose or single JSON object) [default: human] [possible values: human, json]
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

#### `avocado connect projects create`

```
Create a new project

Usage: avocado connect projects create [OPTIONS] --name <NAME>

Options:
      --org <ORG>                  Organization ID (or set connect.org in avocado.yaml)
      --name <NAME>                Project name
      --description <DESCRIPTION>  Project description
  -C, --config <CONFIG>            Path to avocado.yaml configuration file [default: avocado.yaml]
      --profile <PROFILE>          Profile name (defaults to the active default profile)
      --output <OUTPUT>            Output format (human prose or single JSON object) [default: human] [possible values: human, json]
      --runs-on <USER@HOST>        Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>        NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>            SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                     Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start           On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                       Print help

```

---

#### `avocado connect projects delete`

```
Delete a project

Usage: avocado connect projects delete [OPTIONS] --id <ID>

Options:
      --org <ORG>            Organization ID (or set connect.org in avocado.yaml)
      --id <ID>              Project ID to delete
  -y, --yes                  Skip confirmation prompt
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
      --profile <PROFILE>    Profile name (defaults to the active default profile)
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado connect devices` {#connect-devices}

```
Manage devices

Usage: avocado connect devices [OPTIONS] <COMMAND>

Commands:
  list     List devices in an organization
  create   Create a new device
  delete   Delete a device
  reclaim  Manage admin-approved device reclaim requests

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

#### `avocado connect devices list`

```
List devices in an organization

Usage: avocado connect devices list [OPTIONS]

Options:
      --org <ORG>            Organization ID (or set connect.org in avocado.yaml)
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
      --profile <PROFILE>    Profile name (defaults to the active default profile)
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

#### `avocado connect devices create`

```
Create a new device

Usage: avocado connect devices create [OPTIONS] --name <NAME> --identifier <IDENTIFIER>

Options:
      --org <ORG>                Organization ID (or set connect.org in avocado.yaml)
      --name <NAME>              Device name
      --identifier <IDENTIFIER>  Device identifier (must be unique per org)
  -C, --config <CONFIG>          Path to avocado.yaml configuration file [default: avocado.yaml]
      --profile <PROFILE>        Profile name (defaults to the active default profile)
      --runs-on <USER@HOST>      Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>      NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>          SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                   Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start         On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                     Print help

```

---

#### `avocado connect devices delete`

```
Delete a device

Usage: avocado connect devices delete [OPTIONS] --id <ID>

Options:
      --org <ORG>            Organization ID (or set connect.org in avocado.yaml)
      --id <ID>              Device ID to delete
  -y, --yes                  Skip confirmation prompt
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
      --profile <PROFILE>    Profile name (defaults to the active default profile)
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

#### `avocado connect devices reclaim`

```
Manage admin-approved device reclaim requests

Usage: avocado connect devices reclaim [OPTIONS] <COMMAND>

Commands:
  list     List reclaim requests (defaults to pending)
  approve  Approve a pending reclaim request
  deny     Deny a pending reclaim request
  delete   Delete a denied reclaim request (recovery for typo'd denies)

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

##### `avocado connect devices reclaim list`

```
List reclaim requests (defaults to pending)

Usage: avocado connect devices reclaim list [OPTIONS]

Options:
      --org <ORG>              Organization ID (or set connect.org in avocado.yaml)
      --status <STATUS>        Filter by status [default: pending] [possible values: pending, approved, completed, denied, expired, all]
      --device-id <DEVICE_ID>  Filter to a single device by id. Returns at most one row when combined with --status pending (the partial unique index allows one pending reclaim per device)
  -C, --config <CONFIG>        Path to avocado.yaml configuration file [default: avocado.yaml]
      --profile <PROFILE>      Profile name (defaults to the active default profile)
      --runs-on <USER@HOST>    Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>    NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>        SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                 Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start       On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                   Print help

```

---

##### `avocado connect devices reclaim approve`

```
Approve a pending reclaim request

Usage: avocado connect devices reclaim approve [OPTIONS] <ID>

Arguments:
  <ID>  Reclaim request ID

Options:
      --org <ORG>            Organization ID (or set connect.org in avocado.yaml)
  -y, --yes                  Skip confirmation prompt
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
      --profile <PROFILE>    Profile name (defaults to the active default profile)
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

##### `avocado connect devices reclaim deny`

```
Deny a pending reclaim request

Usage: avocado connect devices reclaim deny [OPTIONS] <ID>

Arguments:
  <ID>  Reclaim request ID

Options:
      --org <ORG>            Organization ID (or set connect.org in avocado.yaml)
      --reason <REASON>      Reason for denial (max 1024 chars). If omitted, prompts interactively. Pass --reason "" to skip
  -y, --yes                  Skip confirmation prompt
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
      --profile <PROFILE>    Profile name (defaults to the active default profile)
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

##### `avocado connect devices reclaim delete`

```
Delete a denied reclaim request (recovery for typo'd denies)

Usage: avocado connect devices reclaim delete [OPTIONS] <ID>

Arguments:
  <ID>  Reclaim request ID

Options:
      --org <ORG>            Organization ID (or set connect.org in avocado.yaml)
  -y, --yes                  Skip confirmation prompt
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
      --profile <PROFILE>    Profile name (defaults to the active default profile)
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado connect cohorts` {#connect-cohorts}

```
Manage cohorts

Usage: avocado connect cohorts [OPTIONS] <COMMAND>

Commands:
  list    List cohorts in a project
  create  Create a new cohort
  delete  Delete a cohort

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

#### `avocado connect cohorts list`

```
List cohorts in a project

Usage: avocado connect cohorts list [OPTIONS]

Options:
      --org <ORG>            Organization ID (or set connect.org in avocado.yaml)
      --project <PROJECT>    Project ID (or set connect.project in avocado.yaml)
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
      --profile <PROFILE>    Profile name (defaults to the active default profile)
      --output <OUTPUT>      Output format (human prose or single JSON object) [default: human] [possible values: human, json]
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

#### `avocado connect cohorts create`

```
Create a new cohort

Usage: avocado connect cohorts create [OPTIONS] --name <NAME>

Options:
      --org <ORG>                  Organization ID (or set connect.org in avocado.yaml)
      --project <PROJECT>          Project ID (or set connect.project in avocado.yaml)
      --name <NAME>                Cohort name
      --description <DESCRIPTION>  Cohort description
  -C, --config <CONFIG>            Path to avocado.yaml configuration file [default: avocado.yaml]
      --profile <PROFILE>          Profile name (defaults to the active default profile)
      --runs-on <USER@HOST>        Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>        NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>            SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                     Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start           On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                       Print help

```

---

#### `avocado connect cohorts delete`

```
Delete a cohort

Usage: avocado connect cohorts delete [OPTIONS] --id <ID>

Options:
      --org <ORG>            Organization ID (or set connect.org in avocado.yaml)
      --project <PROJECT>    Project ID (or set connect.project in avocado.yaml)
      --id <ID>              Cohort ID to delete
  -y, --yes                  Skip confirmation prompt
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
      --profile <PROFILE>    Profile name (defaults to the active default profile)
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado connect runtimes` {#connect-runtimes}

```
List uploaded runtimes on the Connect platform

Usage: avocado connect runtimes [OPTIONS] <COMMAND>

Commands:
  list  List runtimes uploaded to the Connect platform

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

#### `avocado connect runtimes list`

```
List runtimes uploaded to the Connect platform

Usage: avocado connect runtimes list [OPTIONS]

Options:
      --org <ORG>            Organization ID (or set connect.org in avocado.yaml)
      --project <PROJECT>    Project ID (or set connect.project in avocado.yaml)
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
      --profile <PROFILE>    Profile name (defaults to the active default profile)
      --output <OUTPUT>      Output format (human prose or single JSON object) [default: human] [possible values: human, json]
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado connect claim-tokens` {#connect-claim-tokens}

```
Manage claim tokens

Usage: avocado connect claim-tokens [OPTIONS] <COMMAND>

Commands:
  list    List claim tokens in an organization
  create  Create a new claim token
  delete  Delete a claim token

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

#### `avocado connect claim-tokens list`

```
List claim tokens in an organization

Usage: avocado connect claim-tokens list [OPTIONS]

Options:
      --org <ORG>            Organization ID (or set connect.org in avocado.yaml)
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
      --profile <PROFILE>    Profile name (defaults to the active default profile)
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

#### `avocado connect claim-tokens create`

```
Create a new claim token

Usage: avocado connect claim-tokens create [OPTIONS] --name <NAME>

Options:
      --org <ORG>            Organization ID (or set connect.org in avocado.yaml)
      --project <PROJECT>    Project ID (skip interactive prompt)
      --cohort <COHORT>      Cohort ID (skip interactive prompt)
      --name <NAME>          Token name
  -t, --tag <TAG>            Tags to associate with devices claimed using this token (repeatable)
      --max-uses <MAX_USES>  Maximum number of times this token can be used
      --no-expiration        Disable expiration (default: expires in 24h)
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
      --profile <PROFILE>    Profile name (defaults to the active default profile)
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

#### `avocado connect claim-tokens delete`

```
Delete a claim token

Usage: avocado connect claim-tokens delete [OPTIONS] --id <ID>

Options:
      --org <ORG>            Organization ID (or set connect.org in avocado.yaml)
      --id <ID>              Claim token ID to delete
  -y, --yes                  Skip confirmation prompt
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
      --profile <PROFILE>    Profile name (defaults to the active default profile)
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado connect upload`

```
Upload current runtime build to the Connect platform

Usage: avocado connect upload [OPTIONS] --version <VERSION> <RUNTIME>

Arguments:
  <RUNTIME>  Runtime name to upload

Options:
      --org <ORG>                      Organization ID (or set connect.org in avocado.yaml)
      --project <PROJECT>              Project ID (or set connect.project in avocado.yaml)
      --version <VERSION>              Human-readable version for this upload (e.g. v0.0.2-dev)
      --description <DESCRIPTION>      Description for the upload
  -C, --config <CONFIG>                Path to avocado.yaml configuration file [default: avocado.yaml]
  -t, --target <TARGET>                Target architecture
      --file <FILE>                    Path to pre-built tarball or artifact directory (skips export from Docker volume)
      --profile <PROFILE>              Profile name (defaults to the active default profile)
      --publish                        Publish the runtime immediately after upload (draft → published)
      --deploy-cohort <DEPLOY_COHORT>  Deploy after upload: cohort ID to target
      --deploy-name <DEPLOY_NAME>      Deploy after upload: deployment name (auto-generated if omitted)
      --deploy-tag <DEPLOY_TAG>        Deploy after upload: filter by tags (repeatable)
      --deploy-activate                Deploy after upload: activate immediately (skip draft)
      --output <OUTPUT>                Output format (human prose or NDJSON event stream) [default: human] [possible values: human, json]
      --runs-on <USER@HOST>            Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>            NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                         Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start               On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                           Print help

```

---

### `avocado connect deploy`

```
Deploy a runtime to a cohort

Usage: avocado connect deploy [OPTIONS]

Options:
      --org <ORG>                  Organization ID (or set connect.org in avocado.yaml)
      --project <PROJECT>          Project ID (or set connect.project in avocado.yaml)
      --runtime <RUNTIME>          Runtime ID (skip interactive prompt)
      --cohort <COHORT>            Cohort ID (skip interactive prompt)
      --name <NAME>                Deployment name (auto-generated if omitted)
      --description <DESCRIPTION>  Description for the deployment
  -t, --tag <TAG>                  Filter by tags — only deploy to devices with these tags (repeatable)
      --activate                   Activate immediately (skip draft status)
  -C, --config <CONFIG>            Path to avocado.yaml configuration file [default: avocado.yaml]
      --profile <PROFILE>          Profile name (defaults to the active default profile)
      --output <OUTPUT>            Output format (human prose or NDJSON event stream) [default: human] [possible values: human, json]
      --runs-on <USER@HOST>        Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>        NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>            SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                     Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start           On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                       Print help

```

---

### `avocado connect server-key`

```
Retrieve the Connect server's TUF signing public key

Usage: avocado connect server-key [OPTIONS]

Options:
      --org <ORG>            Organization ID (or set connect.org in avocado.yaml)
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
      --profile <PROFILE>    Profile name (defaults to the active default profile)
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado connect keys` {#connect-keys}

```
Manage signing keys registered with the Connect server

Usage: avocado connect keys [OPTIONS] <COMMAND>

Commands:
  register  Register a local signing key with the Connect server
  approve   Approve a staged delegate key (admin only)
  list      List delegate keys registered with the server
  retire    Discard a staged delegate key

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

#### `avocado connect keys register`

```
Register a local signing key with the Connect server

Usage: avocado connect keys register [OPTIONS] --type <KEY_TYPE> --key <KEY>

Options:
      --type <KEY_TYPE>      Key type: content or root
      --key <KEY>            Name of the local signing key (from 'avocado signing-keys list')
      --org <ORG>            Organization ID (or set connect.org in avocado.yaml)
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
      --profile <PROFILE>    Profile name
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

#### `avocado connect keys approve`

```
Approve a staged delegate key (admin only)

Usage: avocado connect keys approve [OPTIONS] <KEYID>

Arguments:
  <KEYID>  Key ID of the staged key to approve

Options:
      --org <ORG>            Organization ID (or set connect.org in avocado.yaml)
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
      --profile <PROFILE>    Profile name
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

#### `avocado connect keys list`

```
List delegate keys registered with the server

Usage: avocado connect keys list [OPTIONS]

Options:
      --org <ORG>            Organization ID (or set connect.org in avocado.yaml)
      --type <KEY_TYPE>      Filter by key type: content or root
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
      --profile <PROFILE>    Profile name
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

#### `avocado connect keys retire`

```
Discard a staged delegate key

Usage: avocado connect keys retire [OPTIONS] <KEYID>

Arguments:
  <KEYID>  Key ID of the staged key to discard

Options:
      --org <ORG>            Organization ID (or set connect.org in avocado.yaml)
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
      --profile <PROFILE>    Profile name
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado connect trust` {#connect-trust}

```
Fleet trust posture commands

Usage: avocado connect trust [OPTIONS] <COMMAND>

Commands:
  status             Show fleet trust status for an organization
  promote-root       Promote root trust to user control (Level 1 → 2)
  rotate-server-key  Rotate the server signing key

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

#### `avocado connect trust status`

```
Show fleet trust status for an organization

Usage: avocado connect trust status [OPTIONS]

Options:
      --org <ORG>            Organization ID (or set connect.org in avocado.yaml)
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
      --profile <PROFILE>    Profile name (defaults to the active default profile)
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

#### `avocado connect trust promote-root`

```
Promote root trust to user control (Level 1 → 2)

Usage: avocado connect trust promote-root [OPTIONS] --key <KEY>

Options:
      --key <KEY>            Name of the local root signing key to use
      --org <ORG>            Organization ID (or set connect.org in avocado.yaml)
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
      --profile <PROFILE>    Profile name (defaults to the active default profile)
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

#### `avocado connect trust rotate-server-key`

```
Rotate the server signing key

Usage: avocado connect trust rotate-server-key [OPTIONS]

Options:
      --key <KEY>            Name of the local root signing key (required at security level 2)
      --org <ORG>            Organization ID (or set connect.org in avocado.yaml)
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
      --profile <PROFILE>    Profile name (defaults to the active default profile)
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

## Extension Commands

### `avocado ext`

```
Extension related commands

Usage: avocado ext [OPTIONS] <COMMAND>

Commands:
  install   Install dependencies into extension sysroots
  fetch     Fetch remote extensions from repo, git, or path sources
  build     Build sysext and/or confext extensions from configuration
  list      List extension names
  deps      List dependencies for extensions
  dnf       Run DNF commands in an extension's context
  clean     Clean an extension's sysroot
  checkout  Check out files from extension sysroot to source directory
  image     Create squashfs image from system extension
  package   Package extension sysroot into an RPM

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado ext install`

```
Install dependencies into extension sysroots

Usage: avocado ext install [OPTIONS] [NAME]

Arguments:
  [NAME]
          Extension name (if not provided, installs all extensions)

Options:
  -C, --config <CONFIG>
          Path to avocado.yaml configuration file

          [default: avocado.yaml]

  -v, --verbose
          Enable verbose output

  -f, --force
          Reinstall from scratch: clear this extension's sysroot and re-seed it.

          Not needed to skip dnf's prompts — installs never prompt. Forcing discards the extension's built content, so the next build has to redo it.

  -t, --target <TARGET>
          Target architecture

      --container-arg <CONTAINER_ARGS>
          Additional arguments to pass to the container runtime

      --dnf-arg <DNF_ARGS>
          Additional arguments to pass to DNF commands

      --runs-on <USER@HOST>
          Run command on remote host using local volume via NFS (format: user@host)

      --nfs-port <NFS_PORT>
          NFS port for remote execution (auto-selects from 12050-12099 if not specified)

      --sdk-arch <ARCH>
          SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)

      --no-tui
          Disable TUI output (use legacy sequential output with inherited stdio)

      --no-vm-auto-start
          On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)

  -h, --help
          Print help (see a summary with '-h')

```

---

### `avocado ext fetch`

```
Fetch remote extensions from repo, git, or path sources

Usage: avocado ext fetch [OPTIONS] [NAME]

Arguments:
  [NAME]  Extension name (if not provided, fetches all remote extensions)

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                         Enable verbose output
  -f, --force                           Force re-fetch even if already installed
      --locked                          Fail instead of updating avocado.lock: a declared extension with no lock entry, a pinned version that moved, or a pin that cannot satisfy the current requirements. Never writes the lock. Use this in CI
  -t, --target <TARGET>                 Target architecture
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start                On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                            Print help

```

---

### `avocado ext build`

```
Build sysext and/or confext extensions from configuration

Usage: avocado ext build [OPTIONS] [NAME]

Arguments:
  [NAME]  Extension name (must be defined in config)

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                         Enable verbose output
  -t, --target <TARGET>                 Target architecture
      --target-board <TARGET_BOARD>     Target board override for `{{ avocado.target.board }}`
  -r, --runtime <RUNTIME>               Runtime to build the extension against (kernel/rootfs context). Required when the project has multiple runtimes. Resolves from AVOCADO_RUNTIME / default_runtime / sole-runtime when omitted
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start                On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                            Print help

```

---

### `avocado ext list`

```
List extension names

Usage: avocado ext list [OPTIONS]

Options:
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
  -t, --target <TARGET>      Target architecture
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado ext deps`

```
List dependencies for extensions

Usage: avocado ext deps [OPTIONS] [NAME]

Arguments:
  [NAME]  Extension name (if not provided, shows all extensions)

Options:
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
  -t, --target <TARGET>      Target architecture
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado ext dnf`

```
Run DNF commands in an extension's context

Usage: avocado ext dnf [OPTIONS] --extension <EXTENSION> [COMMAND]...

Arguments:
  [COMMAND]...  DNF command and arguments to execute

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                         Enable verbose output
  -e, --extension <EXTENSION>           Name of the extension to operate on
  -t, --target <TARGET>                 Target architecture
  -r, --runtime <RUNTIME>               Runtime context for the dnf operation (scopes which extension sysroot tree dnf operates on)
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start                On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                            Print help

```

---

### `avocado ext clean`

```
Clean an extension's sysroot

Usage: avocado ext clean [OPTIONS] [NAME]

Arguments:
  [NAME]  Extension name

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                         Enable verbose output
  -t, --target <TARGET>                 Target architecture
  -r, --runtime <RUNTIME>               Runtime context for the clean (resolves which extension sysroot tree to operate on). Falls through to legacy per-target behavior when no runtime resolves
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start                On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                            Print help

```

---

### `avocado ext checkout`

```
Check out files from extension sysroot to source directory

Usage: avocado ext checkout [OPTIONS] --ext-path <EXT_PATH> --src-path <SRC_PATH> [NAME]

Arguments:
  [NAME]  Extension name

Options:
  -C, --config <CONFIG>
          Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose
          Enable verbose output
  -t, --target <TARGET>
          Target architecture
  -r, --runtime <RUNTIME>
          Runtime context for the checkout (selects which sysroot tree the files come from)
      --ext-path <EXT_PATH>
          Path within the extension sysroot to checkout (e.g., /etc/config.json or /etc for directory)
      --src-path <SRC_PATH>
          Destination path in source directory (relative to src root)
      --container-tool <CONTAINER_TOOL>
          Container tool to use (docker/podman) [default: docker]
      --runs-on <USER@HOST>
          Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>
          NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>
          SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui
          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start
          On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help
          Print help

```

---

### `avocado ext image`

```
Create squashfs image from system extension

Usage: avocado ext image [OPTIONS] [NAME]

Arguments:
  [NAME]  Extension name

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                         Enable verbose output
  -t, --target <TARGET>                 Target architecture
  -r, --runtime <RUNTIME>               Runtime to image the extension under (kernel/rootfs context). Same resolution rules as `ext build -r`
      --out <OUT_DIR>                   Output directory on host to copy the resulting image to
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start                On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                            Print help

```

---

### `avocado ext package`

```
Package extension sysroot into an RPM

Usage: avocado ext package [OPTIONS] [NAME]

Arguments:
  [NAME]  Extension name

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                         Enable verbose output
  -t, --target <TARGET>                 Target architecture
  -r, --runtime <RUNTIME>               Runtime context for the package operation
      --out-dir <OUTPUT_DIR>            Output directory on host for the RPM package (relative or absolute path). If not specified, RPM stays in container at $AVOCADO_PREFIX/output/extensions
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start                On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                            Print help

```

---

## Runtime Commands

### `avocado runtime`

```
Runtime management commands

Usage: avocado runtime [OPTIONS] <COMMAND>

Commands:
  install    Install dependencies into runtime installroots
  build      Build a runtime
  provision  Provision a runtime
  list       List runtime names
  deps       List dependencies for a runtime
  dnf        Run DNF commands in a runtime's context
  clean      Clean runtime installroot directory
  deploy     Deploy a runtime to a device
  sign       Sign runtime images

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado runtime install`

```
Install dependencies into runtime installroots

Usage: avocado runtime install [OPTIONS] [NAME]

Arguments:
  [NAME]  Runtime name (if not provided, installs for all runtimes)

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                         Enable verbose output
  -t, --target <TARGET>                 Target architecture
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start                On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                            Print help

```

---

### `avocado runtime build`

```
Build a runtime

Usage: avocado runtime build [OPTIONS] [NAME]

Arguments:
  [NAME]  Runtime name

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                         Enable verbose output
  -f, --force                           Force the operation to proceed, bypassing warnings or confirmation prompts
  -t, --target <TARGET>                 Target architecture
      --target-board <TARGET_BOARD>     Target board override for `{{ avocado.target.board }}`
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start                On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                            Print help

```

---

### `avocado runtime provision`

```
Provision a runtime

Usage: avocado runtime provision [OPTIONS] [NAME]

Arguments:
  [NAME]  Runtime name

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                         Enable verbose output
  -f, --force                           Force the operation to proceed, bypassing warnings or confirmation prompts
  -t, --target <TARGET>                 Target architecture
      --target-board <TARGET_BOARD>     Target board override for `{{ avocado.target.board }}`
      --profile <PROVISION_PROFILE>     Provision profile to use
      --env <ENV>                       Environment variables to pass to the provision process
      --out <OUT>                       Output path relative to src_dir for provisioning artifacts
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start                On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                            Print help

```

---

### `avocado runtime list`

```
List runtime names

Usage: avocado runtime list [OPTIONS]

Options:
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
  -t, --target <TARGET>      Target architecture
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado runtime deps`

```
List dependencies for a runtime

Usage: avocado runtime deps [OPTIONS] [NAME]

Arguments:
  [NAME]  Runtime name

Options:
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
  -t, --target <TARGET>      Target architecture
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado runtime dnf`

```
Run DNF commands in a runtime's context

Usage: avocado runtime dnf [OPTIONS] --runtime <RUNTIME> [COMMAND]...

Arguments:
  [COMMAND]...  DNF command and arguments to execute

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                         Enable verbose output
  -r, --runtime <RUNTIME>               Name of the runtime to operate on
  -t, --target <TARGET>                 Target architecture
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start                On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                            Print help

```

---

### `avocado runtime clean`

```
Clean runtime installroot directory

Usage: avocado runtime clean [OPTIONS] [NAME]

Arguments:
  [NAME]  Runtime name

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                         Enable verbose output
  -t, --target <TARGET>                 Target architecture
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start                On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                            Print help

```

---

### `avocado runtime deploy`

```
Deploy a runtime to a device

Usage: avocado runtime deploy [OPTIONS] --device <DEVICE> [NAME]

Arguments:
  [NAME]  Runtime name

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                         Enable verbose output
  -t, --target <TARGET>                 Target architecture
  -d, --device <DEVICE>                 Device to deploy to as [user@]host[:port] (e.g. root@192.168.1.100:2222)
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --connect-sign                    Sign TUF metadata via the Connect platform instead of locally. Use this when deploying to a device that has received a Connect OTA update. Requires a local signing key configured for the runtime (Level 2: signing.key + avocado connect trust promote-root --key <KEY>); without one no root.json is baked and the deploy fails during Phase 1 hash collection
      --output <OUTPUT>                 Output format. JSON skips TUI rendering and emits NDJSON events [default: human] [possible values: human, json]
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start                On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                            Print help

```

---

### `avocado runtime sign`

```
Sign runtime images

Usage: avocado runtime sign [OPTIONS] [NAME]

Arguments:
  [NAME]  Runtime name

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                         Enable verbose output
  -t, --target <TARGET>                 Target architecture
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start                On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                            Print help

```

---

## SDK Commands

### `avocado sdk`

```
SDK related commands

Usage: avocado sdk [OPTIONS] <COMMAND>

Commands:
  run      Create and run an SDK container
  deps     List SDK dependencies
  compile  Run compile scripts
  dnf      Run DNF commands in the SDK context
  install  Install dependencies into the SDK
  clean    Remove the SDK directory Clean the SDK or run clean scripts for specific compile sections
  package  Package a compiled SDK section into an RPM

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado sdk run`

```
Create and run an SDK container

Usage: avocado sdk run [OPTIONS] [COMMAND]...

Arguments:
  [COMMAND]...  Command and arguments to run in container

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -t, --target <TARGET>                 Target architecture
      --name <NAME>                     Assign a name to the container
  -d, --detach                          Run container in background and print container ID
      --rm <RM>                         Automatically remove the container when it exits (default: true) [default: true] [possible values: true, false]
  -i, --interactive                     Drop into interactive shell in container
  -v, --verbose                         Enable verbose output
  -E, --env                             Source the avocado SDK environment before running command
  -e, --extension <EXTENSION>           Mount extension sysroot and change working directory to it
  -r, --runtime <RUNTIME>               Mount runtime sysroot and change working directory to it
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --no-bootstrap                    Skip SDK bootstrap initialization and go directly to container prompt
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start                On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                            Print help

```

---

### `avocado sdk deps`

```
List SDK dependencies

Usage: avocado sdk deps [OPTIONS]

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -t, --target <TARGET>                 Target architecture
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start                On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                            Print help

```

---

### `avocado sdk compile`

```
Run compile scripts

Usage: avocado sdk compile [OPTIONS] [SECTIONS]...

Arguments:
  [SECTIONS]...  Specific compile sections to run

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                         Enable verbose output
  -t, --target <TARGET>                 Target architecture
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start                On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                            Print help

```

---

### `avocado sdk dnf`

```
Run DNF commands in the SDK context

Usage: avocado sdk dnf [OPTIONS] [COMMAND]...

Arguments:
  [COMMAND]...  DNF command and arguments to execute

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                         Enable verbose output
  -t, --target <TARGET>                 Target architecture
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start                On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                            Print help

```

---

### `avocado sdk install`

```
Install dependencies into the SDK

Usage: avocado sdk install [OPTIONS]

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                         Enable verbose output
  -t, --target <TARGET>                 Target architecture
      --target-board <TARGET_BOARD>     Target board override for `{{ avocado.target.board }}`
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start                On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                            Print help

```

---

### `avocado sdk clean`

```
Remove the SDK directory Clean the SDK or run clean scripts for specific compile sections

Usage: avocado sdk clean [OPTIONS] [SECTIONS]...

Arguments:
  [SECTIONS]...  Specific compile sections to clean (runs their clean scripts)

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                         Enable verbose output
  -t, --target <TARGET>                 Target architecture
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start                On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                            Print help

```

---

### `avocado sdk package`

```
Package a compiled SDK section into an RPM

Usage: avocado sdk package [OPTIONS] <SECTION>

Arguments:
  <SECTION>  Compile section to package (must have a 'package' block in config)

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                         Enable verbose output
  -t, --target <TARGET>                 Target architecture
      --out <OUT_DIR>                   Output directory on host for the built RPM(s)
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start                On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                            Print help

```

---

## Signing Key Commands

### `avocado signing-keys`

```
Manage signing keys for extension and image signing

Usage: avocado signing-keys [OPTIONS] <COMMAND>

Commands:
  create  Create a new signing key or register an external PKCS#11 key
  import  Import an existing RSA PEM key and certificate (for boot-FIT signing)
  list    List all registered signing keys
  remove  Remove a signing key

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado signing-keys create`

```
Create a new signing key or register an external PKCS#11 key

Usage: avocado signing-keys create [OPTIONS] [NAME]

Arguments:
  [NAME]  Name for the key (defaults to key ID if not provided)

Options:
      --uri <URI>               PKCS#11 URI for hardware-backed keys (e.g., 'pkcs11:token=YubiKey;object=signing-key')
      --pkcs11-device <DEVICE>  Hardware device type (tpm, yubikey, or auto-detect)
      --token <TOKEN>           PKCS#11 token label (e.g., 'avocado', 'YubiKey PIV'). If not provided, uses the first available token
      --key-label <LABEL>       Label of existing key to reference in the device
      --generate                Generate a new key in the device
      --auth <METHOD>           Authentication method for PKCS#11 device (none, prompt, env) [default: prompt]
      --algorithm <ALGORITHM>   Key algorithm: ed25519 (default), rsa2048 / rsa4096 for boot-FIT signing (a PEM key + self-signed certificate, generated with openssl), or hmac-sha256 for the secret master a runtime's var.recovery names [default: ed25519]
      --runs-on <USER@HOST>     Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>     NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>         SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                  Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start        On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                    Print help

```

---

### `avocado signing-keys import`

```
Import an existing RSA PEM key and certificate (for boot-FIT signing)

Usage: avocado signing-keys import [OPTIONS] --key <FILE> --cert <FILE> <NAME>

Arguments:
  <NAME>  Name for the key, referenced from `runtimes.<name>.signing.fit_key`

Options:
      --key <FILE>             PEM private key file
      --cert <FILE>            PEM X.509 certificate for that key
      --algorithm <ALGORITHM>  Expected key size (rsa2048 or rsa4096); read from the key when omitted
      --runs-on <USER@HOST>    Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>    NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>        SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                 Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start       On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                   Print help

```

---

### `avocado signing-keys list`

```
List all registered signing keys

Usage: avocado signing-keys list [OPTIONS]

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado signing-keys remove`

```
Remove a signing key

Usage: avocado signing-keys remove [OPTIONS] <NAME>

Arguments:
  <NAME>  Name or key ID of the key to remove

Options:
      --delete               Delete hardware key from device (requires confirmation)
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

## Var Key Commands

### `avocado var-key`

```
Operator-held recovery key for an encrypted /var (runtimes.<r>.var.recovery)

Usage: avocado var-key [OPTIONS] <COMMAND>

Commands:
  enroll  Enrol this device's recovery keyslot: derive HMAC(master, SoC UID) and hand it to avocadoctl over SSH
  derive  Print the recovery passphrase for a device UID (bench recovery of a unit's /var)

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado var-key enroll`

```
Enrol this device's recovery keyslot: derive HMAC(master, SoC UID) and hand it to avocadoctl over SSH

Usage: avocado var-key enroll [OPTIONS] --device <DEVICE> <RUNTIME>

Arguments:
  <RUNTIME>  Runtime whose var.recovery names the master secret

Options:
  -d, --device <DEVICE>      Device to enrol, as user@host
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose              Show the device's output
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado var-key derive`

```
Print the recovery passphrase for a device UID (bench recovery of a unit's /var)

Usage: avocado var-key derive [OPTIONS] --uid <UID> <RUNTIME>

Arguments:
  <RUNTIME>  Runtime whose var.recovery names the master secret

Options:
      --uid <UID>            The device's SoC UID as it reports it (device tree serial-number, or soc0 serial_number)
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
      --raw                  Emit the raw 32 bytes instead of hex, for `cryptsetup --key-file -`
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

## Initramfs Commands

### `avocado initramfs`

```
Initramfs sysroot and image commands

Usage: avocado initramfs [OPTIONS] <COMMAND>

Commands:
  install  Install initramfs sysroot packages via DNF
  image    Build initramfs image from sysroot
  clean    Remove initramfs sysroot

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado initramfs install`

```
Install initramfs sysroot packages via DNF

Usage: avocado initramfs install [OPTIONS]

Options:
  -C, --config <CONFIG>
          Path to avocado.yaml configuration file

          [default: avocado.yaml]

  -v, --verbose
          Enable verbose output

  -f, --force
          Accepted for compatibility with older scripts; has no effect.

          Clears nothing. Not needed to skip dnf's prompts — installs never prompt.

  -t, --target <TARGET>
          Target architecture

      --target-board <TARGET_BOARD>
          Target board override for `{{ avocado.target.board }}`

      --container-arg <CONTAINER_ARGS>
          Additional arguments to pass to the container runtime

      --dnf-arg <DNF_ARGS>
          Additional arguments to pass to DNF commands

      --runs-on <USER@HOST>
          Run command on remote host using local volume via NFS (format: user@host)

      --nfs-port <NFS_PORT>
          NFS port for remote execution (auto-selects from 12050-12099 if not specified)

      --sdk-arch <ARCH>
          SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)

      --no-tui
          Disable TUI output (use legacy sequential output with inherited stdio)

      --no-vm-auto-start
          On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)

  -h, --help
          Print help (see a summary with '-h')

```

---

### `avocado initramfs image`

```
Build initramfs image from sysroot

Usage: avocado initramfs image [OPTIONS]

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                         Enable verbose output
  -t, --target <TARGET>                 Target architecture
      --out <OUT_DIR>                   Output directory on host for the resulting image
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start                On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                            Print help

```

---

### `avocado initramfs clean`

```
Remove initramfs sysroot

Usage: avocado initramfs clean [OPTIONS]

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                         Enable verbose output
  -t, --target <TARGET>                 Target architecture
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start                On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                            Print help

```

---

## Rootfs Commands

### `avocado rootfs`

```
Rootfs sysroot and image commands

Usage: avocado rootfs [OPTIONS] <COMMAND>

Commands:
  install  Install rootfs sysroot packages via DNF
  image    Build rootfs image from sysroot
  clean    Remove rootfs sysroot

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado rootfs install`

```
Install rootfs sysroot packages via DNF

Usage: avocado rootfs install [OPTIONS]

Options:
  -C, --config <CONFIG>
          Path to avocado.yaml configuration file

          [default: avocado.yaml]

  -v, --verbose
          Enable verbose output

  -f, --force
          Accepted for compatibility with older scripts; has no effect.

          Clears nothing. Not needed to skip dnf's prompts — installs never prompt.

  -t, --target <TARGET>
          Target architecture

      --target-board <TARGET_BOARD>
          Target board override for `{{ avocado.target.board }}`

      --container-arg <CONTAINER_ARGS>
          Additional arguments to pass to the container runtime

      --dnf-arg <DNF_ARGS>
          Additional arguments to pass to DNF commands

      --runs-on <USER@HOST>
          Run command on remote host using local volume via NFS (format: user@host)

      --nfs-port <NFS_PORT>
          NFS port for remote execution (auto-selects from 12050-12099 if not specified)

      --sdk-arch <ARCH>
          SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)

      --no-tui
          Disable TUI output (use legacy sequential output with inherited stdio)

      --no-vm-auto-start
          On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)

  -h, --help
          Print help (see a summary with '-h')

```

---

### `avocado rootfs image`

```
Build rootfs image from sysroot

Usage: avocado rootfs image [OPTIONS]

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                         Enable verbose output
  -t, --target <TARGET>                 Target architecture
      --out <OUT_DIR>                   Output directory on host for the resulting image
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start                On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                            Print help

```

---

### `avocado rootfs clean`

```
Remove rootfs sysroot

Usage: avocado rootfs clean [OPTIONS]

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                         Enable verbose output
  -t, --target <TARGET>                 Target architecture
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start                On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                            Print help

```

---

## HITL Commands

### `avocado hitl`

```
Hardware-in-the-loop testing commands

Usage: avocado hitl [OPTIONS] <COMMAND>

Commands:
  start   Start a managed HITL NFS server for this project (detached; see `status`, `logs`, `stop`)
  status  List HITL servers on this machine
  stop    Stop and remove this project's HITL server (or every one with --all)
  logs    Show this project's HITL server log
  sync    Re-run the extension lifecycle on a device after rebuilding what it is served
  server  Start a HITL server in the foreground (alias for `start --foreground`)

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado hitl start`

```
Start a managed HITL NFS server for this project (detached; see `status`, `logs`, `stop`)

Usage: avocado hitl start [OPTIONS] --extension <EXTENSIONS>

Options:
  -C, --config-path <CONFIG_PATH>       Path to avocado.yaml configuration file [default: avocado.yaml]
  -e, --extension <EXTENSIONS>          Extensions to serve
      --container-arg <CONTAINER_ARGS>  Additional container arguments
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
  -t, --target <TARGET>                 Target
  -v, --verbose                         Enable verbose output
  -p, --port <PORT>                     NFS port number to use
      --no-stamps                       Disable stamp validation
      --foreground                      Stay attached and stream the server log instead of detaching
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start                On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                            Print help

```

---

### `avocado hitl status`

```
List HITL servers on this machine

Usage: avocado hitl status [OPTIONS]

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado hitl stop`

```
Stop and remove this project's HITL server (or every one with --all)

Usage: avocado hitl stop [OPTIONS]

Options:
  -C, --config-path <CONFIG_PATH>  Path to avocado.yaml configuration file [default: avocado.yaml]
  -t, --target <TARGET>            Target
      --all                        Stop every HITL server, not just this project's
      --runs-on <USER@HOST>        Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>        NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>            SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                     Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start           On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                       Print help

```

---

### `avocado hitl logs`

```
Show this project's HITL server log

Usage: avocado hitl logs [OPTIONS]

Options:
  -C, --config-path <CONFIG_PATH>  Path to avocado.yaml configuration file [default: avocado.yaml]
  -t, --target <TARGET>            Target
  -f, --follow                     Follow the log
      --runs-on <USER@HOST>        Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>        NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>            SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                     Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start           On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                       Print help

```

---

### `avocado hitl sync`

```
Re-run the extension lifecycle on a device after rebuilding what it is served

Usage: avocado hitl sync [OPTIONS] --device <DEVICE>

Options:
  -d, --device <DEVICE>      Device as [user@]host, e.g. root@192.168.1.77
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado hitl server`

```
Start a HITL server in the foreground (alias for `start --foreground`)

Usage: avocado hitl server [OPTIONS]

Options:
  -C, --config-path <CONFIG_PATH>       Path to avocado.yaml configuration file [default: avocado.yaml]
  -e, --extension <EXTENSIONS>          Extensions to create NFS exports for
      --container-arg <CONTAINER_ARGS>  Additional container arguments
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
  -t, --target <TARGET>                 Target to build for
  -v, --verbose                         Enable verbose output
  -p, --port <PORT>                     NFS port number to use
      --no-stamps                       Disable stamp validation
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start                On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                            Print help

```

---

## Config Commands

### `avocado config`

```
Project configuration introspection (read-only)

Usage: avocado config [OPTIONS] <COMMAND>

Commands:
  show  Show the parsed avocado.yaml in a stable JSON or YAML-ish summary

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado config show`

```
Show the parsed avocado.yaml in a stable JSON or YAML-ish summary

Usage: avocado config show [OPTIONS]

Options:
  -c, --config <CONFIG>      Path to avocado.yaml (defaults to ./avocado.yaml) [default: ./avocado.yaml]
      --output <OUTPUT>      Output format [default: human] [possible values: human, json]
      --detail               Include nested detail (extensions, packages, SDK summary, runtime↔extension cross-references) under a `detail` key. Default output is unchanged when this flag is absent so existing consumers keep working byte-for-byte
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

## Container Commands

### `avocado container`

```
Container Dev Mode: iterate on containers running on a device

Usage: avocado container [OPTIONS] <COMMAND>

Commands:
  dev  Layer-aware hot-reload loop for a container running on a device

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado container dev` {#container-dev}

```
Layer-aware hot-reload loop for a container running on a device

Usage: avocado container dev [OPTIONS] <COMMAND>

Commands:
  up      Start the dev registry + watcher and bootstrap the device
  sync    One-shot re-push of the current watched image + notify the device
  status  Report registry/watcher/last-sync state for the dev loop
  down    Stop the dev registry + watcher and tear down listeners
  prune   Garbage-collect this project's Container Dev Mode registry store (distinct from the top-level `prune`, which removes Docker volumes)

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

#### `avocado container dev up`

```
Start the dev registry + watcher and bootstrap the device

Usage: avocado container dev up [OPTIONS]

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

#### `avocado container dev sync`

```
One-shot re-push of the current watched image + notify the device

Usage: avocado container dev sync [OPTIONS]

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

#### `avocado container dev status`

```
Report registry/watcher/last-sync state for the dev loop

Usage: avocado container dev status [OPTIONS]

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

#### `avocado container dev down`

```
Stop the dev registry + watcher and tear down listeners

Usage: avocado container dev down [OPTIONS]

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

#### `avocado container dev prune`

```
Garbage-collect this project's Container Dev Mode registry store (distinct from the top-level `prune`, which removes Docker volumes)

Usage: avocado container dev prune [OPTIONS]

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

## Kernel Commands

### `avocado kernel`

```
Kernel image commands

Usage: avocado kernel [OPTIONS] <COMMAND>

Commands:
  image  Wrap the rootfs sysroot's kernel binary into a signed kos.layer.kernel KAB. Requires `avocado rootfs install` to have run first (the kernel-image-* package lands the binary in the rootfs sysroot's /boot dir)

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado kernel image`

```
Wrap the rootfs sysroot's kernel binary into a signed kos.layer.kernel KAB. Requires `avocado rootfs install` to have run first (the kernel-image-* package lands the binary in the rootfs sysroot's /boot dir)

Usage: avocado kernel image [OPTIONS]

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                         Enable verbose output
  -t, --target <TARGET>                 Target architecture
      --out <OUT_DIR>                   Output directory on host for the resulting image
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start                On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                            Print help

```

---

## VM Commands

### `avocado vm`

```
Manage the local avocado-vm helper VM (macOS / Windows dev hosts)

Usage: avocado vm [OPTIONS] <COMMAND>

Commands:
  start    Boot the avocado-vm (no-op if already running)
  stop     Stop the avocado-vm (graceful; falls back to SIGKILL with --force)
  status   Show running state + manifest metadata
  shell    Open an SSH session into the running avocado-vm
  logs     Print (or tail with -f) the QEMU serial console log
  rebuild  Re-record the manifest from a fresh --vm-source. Preserves data disk unless --reset-data is given. VM must be stopped first
  reset    Wipe the persistent `var.btrfs` and re-seed from the installed var artifact. Use this when you want a clean /var (Docker volumes, container caches, project work in /data, etc.). Doesn't change the VM image version — see `vm update` for that
  config   Read/write persistent VM configuration at `~/.avocado/vm/config.yaml`. Same file the Avocado.app settings UI edits — every knob shipped in the desktop is reachable here
  update   Check for and apply VM image updates from the release channel. Stops + restarts the VM if it was running. A release that ships a new `var` image schedules a state sync applied on the next start; the VM's Docker volumes, SDKs and /data are preserved

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado vm start`

```
Boot the avocado-vm (no-op if already running)

Usage: avocado vm start [OPTIONS]

Options:
      --vm-source <VM_SOURCE>          Directory containing `direct` profile output (manifest.json + artifacts). Resolution order when unset: $AVOCADO_VM_DIR → ~/.avocado/vm/install/ (populated by `avocado vm update`) → last `vm start`/`vm rebuild` dir → error
      --memory-mib <MEMORY_MIB>        Memory in MiB. Resolution order: this flag → `runtime.memory_mib` in `~/.avocado/vm/config.yaml` (also written by Avocado.app's settings UI) → 4096. When passed, the value is persisted back to the config so the next flag-less `vm start` reuses it
      --cpus <CPUS>                    vCPU count. Same resolution + persistence as `--memory-mib`, falling back to `runtime.cpus` or 4
      --ssh-port <SSH_PORT>            Bind SSH on this host port (default: pick a free high port)
      --cmdline-extra <CMDLINE_EXTRA>  Extra kernel cmdline appended to the manifest's default
      --workspace <WORKSPACE>          Host directory exposed to the VM as a 9p workspace (mounted at /mnt/workspace in the guest). Defaults to $AVOCADO_VM_WORKSPACE or $HOME. Every project the CLI operates on must live under this path
      --var-size <VAR_SIZE>            Persistent /var disk size (e.g. "50G", "100G"). Growable on each start; shrink requires `vm rebuild --reset-data`. The file is sparse, so the on-disk footprint only grows as data is written. Default 50G — comfortable for SDK image + several container images
      --dns <DNS>                      One-shot DNS override applied to this start only. Repeatable — `--dns 1.1.1.1 --dns 8.8.8.8` sets both. Wins over any value persisted via `vm config set network.dns`; the persisted value is unchanged. Useful when a VPN's slirp DNS proxy is broken
  -w, --watch                          Tail the serial log live while waiting for boot-sync. On failure, the tail of the log is printed automatically even without this flag
      --foreground                     Stay in the foreground (does not yet implement live serial; placeholder)
      --runs-on <USER@HOST>            Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>            NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                         Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start               On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                           Print help

```

---

### `avocado vm stop`

```
Stop the avocado-vm (graceful; falls back to SIGKILL with --force)

Usage: avocado vm stop [OPTIONS]

Options:
      --force
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado vm status`

```
Show running state + manifest metadata

Usage: avocado vm status [OPTIONS]

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado vm shell`

```
Open an SSH session into the running avocado-vm

Usage: avocado vm shell [OPTIONS] [-- <COMMAND>...]

Arguments:
  [COMMAND]...  Optional command + args to run instead of an interactive shell

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado vm logs`

```
Print (or tail with -f) the QEMU serial console log

Usage: avocado vm logs [OPTIONS]

Options:
  -f, --follow
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado vm rebuild`

```
Re-record the manifest from a fresh --vm-source. Preserves data disk unless --reset-data is given. VM must be stopped first

Usage: avocado vm rebuild [OPTIONS]

Options:
      --vm-source <VM_SOURCE>  Falls back to $AVOCADO_VM_DIR if unset
      --reset-data
      --runs-on <USER@HOST>    Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>    NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>        SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                 Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start       On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                   Print help

```

---

### `avocado vm reset`

```
Wipe the persistent `var.btrfs` and re-seed from the installed var artifact. Use this when you want a clean /var (Docker volumes, container caches, project work in /data, etc.). Doesn't change the VM image version — see `vm update` for that

Usage: avocado vm reset [OPTIONS]

Options:
  -y, --yes                  Skip the interactive confirmation prompt
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado vm config` {#vm-config}

```
Read/write persistent VM configuration at `~/.avocado/vm/config.yaml`. Same file the Avocado.app settings UI edits — every knob shipped in the desktop is reachable here

Usage: avocado vm config [OPTIONS] <COMMAND>

Commands:
  get    Print the value of a dotted key (e.g. `network.dns`). Silent on missing keys; use `--output json` to disambiguate missing vs empty
  set    Set a dotted key. Multiple values become a list (e.g. `vm config set network.dns 1.1.1.1 8.8.8.8`)
  unset  Remove a dotted key. No-op if it doesn't exist
  list   Print the entire config (YAML by default, JSON with `--output json`). The same JSON shape is what avocado-desktop reads to render its UI

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

#### `avocado vm config get`

```
Print the value of a dotted key (e.g. `network.dns`). Silent on missing keys; use `--output json` to disambiguate missing vs empty

Usage: avocado vm config get [OPTIONS] <KEY>

Arguments:
  <KEY>  Dotted key path, e.g. `network.dns` or `network.dns_search`

Options:
      --output <OUTPUT>      Output format (human plain text or JSON `{key, value}`) [default: human] [possible values: human, json]
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

#### `avocado vm config set`

```
Set a dotted key. Multiple values become a list (e.g. `vm config set network.dns 1.1.1.1 8.8.8.8`)

Usage: avocado vm config set [OPTIONS] <KEY> <VALUES>...

Arguments:
  <KEY>        Dotted key path
  <VALUES>...  One or more values. A single value is stored as a scalar; two or more are stored as a list. Use `vm config unset` to remove

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

#### `avocado vm config unset`

```
Remove a dotted key. No-op if it doesn't exist

Usage: avocado vm config unset [OPTIONS] <KEY>

Arguments:
  <KEY>  Dotted key path

Options:
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

#### `avocado vm config list`

```
Print the entire config (YAML by default, JSON with `--output json`). The same JSON shape is what avocado-desktop reads to render its UI

Usage: avocado vm config list [OPTIONS]

Options:
      --output <OUTPUT>      [default: human] [possible values: human, json]
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---

### `avocado vm update`

```
Check for and apply VM image updates from the release channel. Stops + restarts the VM if it was running. A release that ships a new `var` image schedules a state sync applied on the next start; the VM's Docker volumes, SDKs and /data are preserved

Usage: avocado vm update [OPTIONS]

Options:
      --channel <CHANNEL>    Channel name (default: `~/.avocado/config.yaml [vm].channel`, or `stable` if unset)
      --check                Print availability + exit without downloading
  -y, --yes                  Skip the interactive confirmation prompt
      --output <OUTPUT>      Output format (human prose or single JSON object) [default: human] [possible values: human, json]
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
      --no-vm-auto-start     On macOS/Windows, don't auto-start the avocado-vm; talk to the local docker daemon directly. (Equivalent to `AVOCADO_VM_AUTO_START=0`.)
  -h, --help                 Print help

```

---
