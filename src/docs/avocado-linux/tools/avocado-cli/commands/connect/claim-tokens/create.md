```
Create a new claim token

Usage: avocado connect claim-tokens create [OPTIONS] --name <NAME>

Options:
      --org <ORG>              Organization ID (or set connect.org in avocado.yaml)
      --name <NAME>            Token name
      --cohort-id <COHORT_ID>  Cohort ID to assign claimed devices to
      --max-uses <MAX_USES>    Maximum number of times this token can be used
      --no-expiration          Disable expiration (default: expires in 24h)
  -C, --config <CONFIG>        Path to avocado.yaml configuration file [default: avocado.yaml]
      --profile <PROFILE>      Profile name (defaults to the active default profile)
      --runs-on <USER@HOST>    Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>    NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>        SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
  -h, --help                   Print help

```
