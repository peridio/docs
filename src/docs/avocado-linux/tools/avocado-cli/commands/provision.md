```
Provision a runtime (shortcut for 'runtime provision')

Usage: avocado provision [OPTIONS] --runtime <RUNTIME>

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                         Enable verbose output
  -f, --force                           Force the operation to proceed, bypassing warnings or confirmation prompts
  -r, --runtime <RUNTIME>               Runtime name to provision
  -t, --target <TARGET>                 Target architecture
      --profile <PROVISION_PROFILE>     Provision profile to use
      --env <ENV>                       Environment variables to pass to the provision process
      --out <OUT>                       Output path relative to src_dir for provisioning artifacts
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
  -h, --help                            Print help

```
