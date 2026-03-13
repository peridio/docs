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
  -h, --help                            Print help

```
