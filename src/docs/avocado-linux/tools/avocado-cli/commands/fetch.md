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
  -h, --help                            Print help

```
