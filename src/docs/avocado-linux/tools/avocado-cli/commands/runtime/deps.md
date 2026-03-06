```
List dependencies for a runtime

Usage: avocado runtime deps [OPTIONS] [NAME]

Arguments:
  [NAME]  Runtime name

Options:
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
  -r, --runtime <RUNTIME>    Runtime name (alias for positional NAME)
  -t, --target <TARGET>      Target architecture
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
  -h, --help                 Print help

```
