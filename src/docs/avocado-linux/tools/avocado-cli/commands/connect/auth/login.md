```
Login to the Connect platform

Usage: avocado connect auth login [OPTIONS]

Options:
      --url <URL>            API URL (defaults to https://connect.peridio.com or AVOCADO_CONNECT_URL env var)
      --profile <PROFILE>    Profile name (defaults to "default")
      --token <TOKEN>        Use an existing API token instead of browser login
      --runs-on <USER@HOST>  Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>  NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>      SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
  -h, --help                 Print help

```