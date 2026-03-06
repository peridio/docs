```
Package a compiled SDK section into an RPM

Usage: avocado sdk package [OPTIONS] <SECTION>

Arguments:
  <SECTION>  Compile section to package (must have a 'package' block in sdk.compile.<section>)

Options:
  -C, --config <CONFIG>                 Path to avocado.yaml configuration file [default: avocado.yaml]
  -v, --verbose                         Enable verbose output
  -t, --target <TARGET>                 Target architecture
      --out <OUT_DIR>                   Output directory on host for the built RPM(s). If not specified, RPMs stay in the SDK container
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --sdk-arch <ARCH>                 SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
  -h, --help                            Print help

```

## Overview

`avocado sdk package` packages the output of a compiled SDK section into one or more architecture-specific RPM files. The compile section must have a `package` block in your `avocado.yaml`.

## Configuration

Add a `package` block to any `sdk.compile` section:

```yaml
sdk:
  compile:
    my-lib:
      compile: compile.sh
      clean: clean.sh
      packages:
        openssl-dev: '*'
      package:
        name: my-lib # defaults to section name
        version: '1.2.3' # required, semver
        release: '1' # defaults to '1'
        install: pkg-install.sh # required, script that stages files to $DESTDIR
        summary: 'My shared library'
        description: 'A cross-compiled shared library.'
        license: MIT
        vendor: Acme Corp
        url: https://example.com/my-lib
        requires:
          - openssl >= 3.0
```

### `package` block fields

| Field         | Required | Description                                                                          |
| ------------- | -------- | ------------------------------------------------------------------------------------ |
| `version`     | Yes      | RPM version in semver format (e.g., `1.2.3`)                                         |
| `install`     | Yes      | Path (relative to `src_dir`) to a script that stages files to `$DESTDIR`             |
| `name`        | No       | RPM package name; defaults to the compile section name                               |
| `release`     | No       | RPM release string; defaults to `1`                                                  |
| `summary`     | No       | One-line RPM summary; auto-generated from name if omitted                            |
| `description` | No       | Multi-line RPM description; auto-generated from name if omitted                      |
| `license`     | No       | License identifier (e.g., `MIT`, `Apache-2.0`); defaults to `Unspecified`            |
| `vendor`      | No       | RPM vendor field; defaults to `Unspecified`                                          |
| `url`         | No       | Upstream URL for the packaged software                                               |
| `requires`    | No       | List of RPM dependency strings (e.g., `openssl >= 3.0`)                              |
| `files`       | No       | Glob patterns for files to include in the main package (all staged files if omitted) |
| `split`       | No       | Map of sub-package names to sub-package configs (see below)                          |

### Sub-package splitting

Use `split` to create multiple RPMs from a single install — for example, separating runtime libraries from development headers:

```yaml
sdk:
  compile:
    my-lib:
      compile: compile.sh
      packages:
        openssl-dev: '*'
      package:
        version: '2.0.0'
        install: pkg-install.sh
        # Main package gets everything not claimed by split packages
        split:
          my-lib-dev:
            summary: 'Development headers for my-lib'
            description: 'Headers and static libraries for building against my-lib.'
            requires:
              - my-lib = 2.0.0
            files:
              - usr/include/**
              - usr/lib/*.a
              - usr/lib/*.la
          my-lib-doc:
            summary: 'Documentation for my-lib'
            files:
              - usr/share/doc/**
              - usr/share/man/**
```

Sub-package fields:

| Field         | Description                                                                   |
| ------------- | ----------------------------------------------------------------------------- |
| `summary`     | One-line summary for the sub-package                                          |
| `description` | Multi-line description                                                        |
| `requires`    | RPM dependencies for the sub-package                                          |
| `files`       | Glob patterns for files included in this sub-package (relative to `$DESTDIR`) |

Files not matched by any `split.*.files` pattern are included in the main package.

### Install script

The install script is responsible for staging files to `$DESTDIR`. Avocado sets `$DESTDIR` before running the script:

```bash
#!/usr/bin/env bash
set -e

# Files must be installed relative to $DESTDIR
install -D -m 755 my-lib/target/release/libmy.so "$DESTDIR/usr/lib/libmy.so.2.0.0"
ln -sf libmy.so.2.0.0 "$DESTDIR/usr/lib/libmy.so.2"
ln -sf libmy.so.2 "$DESTDIR/usr/lib/libmy.so"

install -D -m 644 my-lib/include/my.h "$DESTDIR/usr/include/my.h"
```

## Usage

```bash
# Package the section (RPM stays in SDK container)
avocado sdk package my-lib

# Package and copy RPM(s) to ./dist/
avocado sdk package my-lib --out ./dist/

# Package for a specific target
avocado sdk package my-lib --target qemux86-64 --out ./dist/
```

## Notes

- Run `avocado sdk compile my-lib` (or `avocado build`) before packaging to ensure the compile output is up to date.
- The RPM architecture is derived from the target (e.g., `aarch64`, `x86_64`). Override with `package.arch` if needed.
- When `--out` is specified, all generated RPMs (main + split packages) are copied to that directory.
