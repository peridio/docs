```
Package a compiled SDK section into an RPM

Usage: avocado sdk package [OPTIONS] <SECTION>

Arguments:
  <SECTION>  Compile section to package (must have a 'package' block in config)

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                         Enable verbose output
  -t, --target <TARGET>                 Target architecture
      --out <OUT_DIR>                   Output directory on host for the built RPM(s)
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
  -h, --help                            Print help

```
