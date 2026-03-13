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
  -h, --help
          Print help

```
