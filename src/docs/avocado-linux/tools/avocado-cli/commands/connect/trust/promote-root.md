```
Promote root trust to user control (Level 1 → 2)

Usage: avocado connect trust promote-root [OPTIONS] --key <KEY>

Options:
      --key <KEY>            Name of the local root signing key to use
      --org <ORG>            Organization ID (or set connect.org in avocado.yaml)
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
      --profile <PROFILE>    Profile name (defaults to the active default profile)
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
  -h, --help                 Print help

```
