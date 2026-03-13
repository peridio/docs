```
Unlock (remove lock entries for) sysroots to allow package updates

Usage: avocado unlock [OPTIONS]

Options:
  -C, --config <CONFIG>        Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                Enable verbose output
  -t, --target <TARGET>        Target architecture
  -e, --extension <EXTENSION>  Unlock a specific extension
  -r, --runtime <RUNTIME>      Unlock a specific runtime
      --sdk                    Unlock SDK (rootfs, target-sysroot, and all SDK arches)
      --runs-on <USER@HOST>    Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>    NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>        SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
  -h, --help                   Print help

```
