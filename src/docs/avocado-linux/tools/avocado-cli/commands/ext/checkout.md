```
Check out files from extension sysroot to source directory

Usage: avocado ext checkout [OPTIONS] --extension <EXTENSION> --ext-path <EXT_PATH> --src-path <SRC_PATH>

Options:
  -C, --config <CONFIG>
          Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose
          Enable verbose output
  -e, --extension <EXTENSION>
          Name of the extension to checkout from
  -t, --target <TARGET>
          Target architecture
      --ext-path <EXT_PATH>
          Path within the extension sysroot to checkout (e.g., /etc/config.json or /etc for directory)
      --src-path <SRC_PATH>
          Destination path in source directory (relative to src root)
      --container-tool <CONTAINER_TOOL>
          Container tool to use (docker/podman) [default: docker]
      --runs-on <USER@HOST>
          Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>
          NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>
          SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
  -h, --help
          Print help

```
