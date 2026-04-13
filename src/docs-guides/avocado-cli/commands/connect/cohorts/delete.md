```
Delete a cohort

Usage: avocado connect cohorts delete [OPTIONS] --id <ID>

Options:
      --org <ORG>            Organization ID (or set connect.org in avocado.yaml)
      --project <PROJECT>    Project ID (or set connect.project in avocado.yaml)
      --id <ID>              Cohort ID to delete
  -y, --yes                  Skip confirmation prompt
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
      --profile <PROFILE>    Profile name (defaults to the active default profile)
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
  -h, --help                 Print help

```