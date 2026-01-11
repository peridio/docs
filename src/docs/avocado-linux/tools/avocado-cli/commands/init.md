```
Initialize a new avocado project

Usage: avocado init [OPTIONS] [DIRECTORY]

Arguments:
  [DIRECTORY]  Directory to initialize (defaults to current directory)

Options:
      --target <TARGET>
          Target architecture (e.g., "qemux86-64")
      --reference <REFERENCE>
          Reference example to initialize from (downloads from avocado-os/references)
      --reference-branch <REFERENCE_BRANCH>
          Branch to fetch reference from (defaults to "main")
      --reference-commit <REFERENCE_COMMIT>
          Specific commit SHA to fetch reference from
      --reference-repo <REFERENCE_REPO>
          Repository to fetch reference from (format: "owner/repo", defaults to "avocado-linux/avocado-os")
      --runs-on <USER@HOST>
          Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>
          NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>
          SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
  -h, --help
          Print help

```
