```
List extension names

Usage: avocado ext list [OPTIONS]

Options:
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
  -t, --target <TARGET>      Target architecture
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
  -h, --help                 Print help

```
