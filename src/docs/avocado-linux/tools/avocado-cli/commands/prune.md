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
  -h, --help
          Print help

```
