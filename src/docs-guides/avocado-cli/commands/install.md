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