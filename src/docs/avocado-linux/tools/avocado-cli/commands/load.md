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