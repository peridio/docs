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
  -h, --help                            Print help

```
