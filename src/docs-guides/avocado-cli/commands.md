---
description: 'Complete reference of all Avocado CLI commands on a single page.'
sidebar_label: 'commands'
sidebar_class_name: 'sidebar-monospace'
sidebar_position: 5
copy_markdown: true
---

# `commands`

A complete reference of every `avocado` command and subcommand on a single page. Use your browser's find (Ctrl+F / Cmd+F) to search.

---

## Top-Level Commands

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
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
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
  -h, --help
          Print help

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
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
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
  -h, --help                            Print help

```

---

### `avocado init`

```
Initialize a new avocado project

Usage: avocado init [OPTIONS] [DIRECTORY]

Arguments:
  [DIRECTORY]  Directory to initialize (defaults to current directory)

Options:
      --target <TARGET>
          Target architecture (e.g., "qemux86-64")
      --reference <REFERENCE>
          Reference example to initialize from (downloads from avocado-os/references)
      --reference-branch <REFERENCE_BRANCH>
          Branch to fetch reference from (defaults to "main")
      --reference-commit <REFERENCE_COMMIT>
          Specific commit SHA to fetch reference from
      --reference-repo <REFERENCE_REPO>
          Repository to fetch reference from (format: "owner/repo", defaults to "avocado-linux/avocado-os")
      --runs-on <USER@HOST>
          Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>
          NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>
          SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui
          Disable TUI output (use legacy sequential output with inherited stdio)
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
          Force the operation to proceed, bypassing warnings or confirmation prompts

  -r, --runtime <RUNTIME>
          Runtime name to install packages into (or sync when no packages given)

      --sdk
          Install packages into the SDK

      --no-save
          Skip writing packages to avocado.yaml

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
  -h, --help
          Print help

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
      --profile <PROVISION_PROFILE>     Provision profile to use
      --env <ENV>                       Environment variables to pass to the provision process
      --out <OUT>                       Output path relative to src_dir for provisioning artifacts
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
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
  -h, --help
          Print help

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
  -h, --help                   Print help

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
  -h, --help                 Print help

```

---

## Connect Commands

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
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
  -h, --help                 Print help

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
      --runs-on <USER@HOST>        Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>        NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>            SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                     Disable TUI output (use legacy sequential output with inherited stdio)
  -h, --help                       Print help

```

---

### `avocado connect upload`

```
Upload current runtime build to the Connect platform

Usage: avocado connect upload [OPTIONS] <RUNTIME>

Arguments:
  <RUNTIME>  Runtime name to upload

Options:
      --org <ORG>                      Organization ID (or set connect.org in avocado.yaml)
      --project <PROJECT>              Project ID (or set connect.project in avocado.yaml)
      --version <VERSION>              Version string (defaults to runtime name-version from manifest)
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
      --runs-on <USER@HOST>            Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>            NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                         Disable TUI output (use legacy sequential output with inherited stdio)
  -h, --help                           Print help

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
  -h, --help                 Print help

```

---

### `avocado connect auth` {#connect-auth}

#### `avocado connect auth login`

```
Login to the Connect platform

Usage: avocado connect auth login [OPTIONS]

Options:
      --url <URL>            API URL (defaults to https://connect.peridio.com or AVOCADO_CONNECT_URL env var)
      --profile <PROFILE>    Profile name (defaults to "default")
      --token <TOKEN>        Use an existing API token instead of browser login
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
  -h, --help                 Print help

```

---

#### `avocado connect auth logout`

```
Logout from the Connect platform

Usage: avocado connect auth logout [OPTIONS]

Options:
      --profile <PROFILE>    Profile name (defaults to the active default profile)
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
  -h, --help                 Print help

```

---

#### `avocado connect auth status`

```
Show current auth status

Usage: avocado connect auth status [OPTIONS]

Options:
      --profile <PROFILE>    Profile name (defaults to the active default profile)
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
  -h, --help                 Print help

```

---

### `avocado connect claim-tokens` {#connect-claim-tokens}

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
  -h, --help                 Print help

```

---

### `avocado connect cohorts` {#connect-cohorts}

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
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
  -h, --help                 Print help

```

---

### `avocado connect devices` {#connect-devices}

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
  -h, --help                 Print help

```

---

### `avocado connect keys` {#connect-keys}

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
  -h, --help                 Print help

```

---

### `avocado connect orgs` {#connect-orgs}

#### `avocado connect orgs list`

```
List organizations you belong to

Usage: avocado connect orgs list [OPTIONS]

Options:
      --profile <PROFILE>    Profile name (defaults to the active default profile)
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
  -h, --help                 Print help

```

---

### `avocado connect projects` {#connect-projects}

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
      --runs-on <USER@HOST>        Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>        NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>            SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                     Disable TUI output (use legacy sequential output with inherited stdio)
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
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
  -h, --help                 Print help

```

---

### `avocado connect trust` {#connect-trust}

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
  -h, --help                 Print help

```

---

## Extension Commands

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
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
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
  -h, --help
          Print help

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
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
  -h, --help                            Print help

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
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
  -h, --help                            Print help

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
  -t, --target <TARGET>                 Target architecture
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
  -h, --help                            Print help

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
      --out <OUT_DIR>                   Output directory on host to copy the resulting image to
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
  -h, --help                            Print help

```

---

### `avocado ext install`

```
Install dependencies into extension sysroots

Usage: avocado ext install [OPTIONS] [NAME]

Arguments:
  [NAME]  Extension name (if not provided, installs all extensions)

Options:
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
  -h, --help                 Print help

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
      --out-dir <OUTPUT_DIR>            Output directory on host for the RPM package (relative or absolute path). If not specified, RPM stays in container at $AVOCADO_PREFIX/output/extensions
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
  -h, --help                            Print help

```

---

## Runtime Commands

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
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
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
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
  -h, --help                            Print help

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
  -h, --help                            Print help

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
  -f, --force                           Force the operation to proceed, bypassing warnings or confirmation prompts
  -t, --target <TARGET>                 Target architecture
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
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
  -h, --help                 Print help

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
      --profile <PROVISION_PROFILE>     Provision profile to use
      --env <ENV>                       Environment variables to pass to the provision process
      --out <OUT>                       Output path relative to src_dir for provisioning artifacts
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
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
  -h, --help                            Print help

```

---

## SDK Commands

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
  -f, --force                           Force the operation to proceed, bypassing warnings or confirmation prompts
  -t, --target <TARGET>                 Target architecture
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                          Disable TUI output (use legacy sequential output with inherited stdio)
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
  -h, --help                            Print help

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
  -h, --help                            Print help

```

---

## Signing Key Commands

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
      --runs-on <USER@HOST>     Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>     NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>         SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui                  Disable TUI output (use legacy sequential output with inherited stdio)
  -h, --help                    Print help

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
  -h, --help                 Print help

```

---

## Initramfs Commands

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
  -h, --help                            Print help

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
  -h, --help                            Print help

```

---

### `avocado initramfs install`

```
Install initramfs sysroot packages via DNF

Usage: avocado initramfs install [OPTIONS]

Options:
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
  -h, --help                            Print help

```

---

## Rootfs Commands

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
  -h, --help                            Print help

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
  -h, --help                            Print help

```

---

### `avocado rootfs install`

```
Install rootfs sysroot packages via DNF

Usage: avocado rootfs install [OPTIONS]

Options:
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
  -h, --help                            Print help

```

---

## HITL Commands

### `avocado hitl server`

```
Start a HITL server container with preconfigured settings

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
  -h, --help                            Print help

```

---
