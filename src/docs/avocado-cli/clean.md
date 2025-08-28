```
Clean the avocado project by removing docker volumes and state files

Usage: avocado clean [OPTIONS] [DIRECTORY]

Arguments:
  [DIRECTORY]  Directory to clean (defaults to current directory)

Options:
      --skip-volumes
          Skip cleaning docker volumes (volumes are cleaned by default)
      --container-tool <CONTAINER_TOOL>
          Container tool to use (docker/podman) [default: docker]
  -v, --verbose
          Enable verbose output
  -h, --help
          Print help

```