```
Create and run an SDK container

Usage: avocado sdk run [OPTIONS] [COMMAND]...

Arguments:
  [COMMAND]...  Command and arguments to run in container

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -t, --target <TARGET>                 Target architecture
      --name <NAME>                     Assign a name to the container
  -d, --detach                          Run container in background and print container ID
      --rm <RM>                         Automatically remove the container when it exits (default: true) [default: true] [possible values: true, false]
  -i, --interactive                     Drop into interactive shell in container
  -v, --verbose                         Enable verbose output
  -E, --env                             Source the avocado SDK environment before running command
  -e, --extension <EXTENSION>           Mount extension sysroot and change working directory to it
  -r, --runtime <RUNTIME>               Mount runtime sysroot and change working directory to it
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --no-bootstrap                    Skip SDK bootstrap initialization and go directly to container prompt
      --runs-on <USER@HOST>             Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>             NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
  -h, --help                            Print help

```
