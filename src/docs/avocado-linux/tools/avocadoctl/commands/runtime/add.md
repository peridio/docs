---
title: runtime add
description: 'Add a runtime from a TUF repository or local manifest.'
---

Stages a new runtime on the device. There are two mutually exclusive sources:

- `--url URL` downloads from a TUF-secured repository, verifying the trust chain (`root.json` -> timestamp -> snapshot -> targets). If the repository requires authentication, set the `AVOCADO_TUF_AUTH_TOKEN` environment variable.
- `--manifest PATH` reads a local `manifest.json` file. All extension images referenced in the manifest must already exist in the images directory.

Both paths create a new runtime directory under `/var/lib/avocado/runtimes/{id}/` and install any new extension images into the shared image pool.

```
avocadoctl runtime add [OPTIONS] (--url <URL> | --manifest <PATH>)
```

### Options

| Option | Description |
|---|---|
| `--url <URL>` | TUF repository URL |
| `--manifest <PATH>` | Path to local `manifest.json` file |

### Examples

```bash
# Add from a TUF repository
avocadoctl runtime add --url https://tuf.example.com/repo

# Add from a TUF repository with authentication
AVOCADO_TUF_AUTH_TOKEN=mytoken avocadoctl runtime add --url https://tuf.example.com/repo

# Add from a local manifest
avocadoctl runtime add --manifest /path/to/manifest.json
```
