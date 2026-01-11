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
  -h, --help                            Print help

```
