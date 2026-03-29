```
Create a new claim token

Usage: avocado connect claim-tokens create [OPTIONS] --name <NAME>

Options:
      --org <ORG>            Organization ID (or set connect.org in avocado.yaml)
      --project <PROJECT>    Project ID (skip interactive prompt)
      --cohort <COHORT>      Cohort ID (skip interactive prompt)
      --name <NAME>          Token name
  -t, --tag <TAG>            Tags to associate with devices claimed using this token (repeatable)
      --max-uses <MAX_USES>  Maximum number of times this token can be used
      --no-expiration        Disable expiration (default: expires in 24h)
  -C, --config <CONFIG>      Path to avocado.yaml configuration file [default: avocado.yaml]
      --profile <PROFILE>    Profile name (defaults to the active default profile)
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
      --no-tui               Disable TUI output (use legacy sequential output with inherited stdio)
  -h, --help                 Print help

```