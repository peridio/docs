```
Upgrade the CLI to the latest (or specified) version

Usage: avocado upgrade [OPTIONS]

Options:
      --version <VERSION>    Controls what version to upgrade to. If not specified, the latest version will be used
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
  -h, --help                 Print help

```
