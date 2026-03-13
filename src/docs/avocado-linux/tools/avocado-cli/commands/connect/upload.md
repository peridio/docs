```
Upload current runtime build to the Connect platform

Usage: avocado connect upload [OPTIONS] <RUNTIME>

Arguments:
  <RUNTIME>  Runtime name to upload

Options:
      --org <ORG>                  Organization ID (or set connect.org in avocado.yaml)
      --project <PROJECT>          Project ID (or set connect.project in avocado.yaml)
      --version <VERSION>          Version string (defaults to runtime name-version from manifest)
      --description <DESCRIPTION>  Description for the upload
  -C, --config <CONFIG>            Path to avocado.yaml configuration file [default: avocado.yaml]
  -t, --target <TARGET>            Target architecture
      --file <FILE>                Path to pre-built tarball or artifact directory (skips export from Docker volume)
      --profile <PROFILE>          Profile name (defaults to the active default profile)
      --runs-on <USER@HOST>        Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>        NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>            SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
  -h, --help                       Print help

```