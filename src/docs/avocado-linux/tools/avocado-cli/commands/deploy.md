```
Deploy a runtime to a device (shortcut for 'runtime deploy')

Usage: avocado deploy [OPTIONS] --runtime <RUNTIME> --device <DEVICE>

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                         Enable verbose output
  -r, --runtime <RUNTIME>               Runtime name to deploy
  -t, --target <TARGET>                 Target architecture
  -d, --device <DEVICE>                 Device IP address or hostname to deploy to
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
  -h, --help                            Print help

```
