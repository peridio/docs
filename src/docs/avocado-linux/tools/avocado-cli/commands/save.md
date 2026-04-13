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