# Packaging updates

Peridiod supports installing updates from both Peridio Distributions and Peridio Releases.

## Releases

Releases allow greater control and flexibility to managing devices in the field. You can package and bundle many binaries with a release enabling workflows for use in embedded products, empowering app stores, and managing connected peripheral device firmware. It offers advanced deployment options for scheduled and phased rollouts.

To use releases, binaries must be configured to use an installer. An Installer is a module that can handle the last mile of deploying your binary onto your device. The following installer modules are currently supported:

- `fwup`: Binary in the [fwup](https://github.com/fwup-home/fwup) format.
- `file`: Writes individual files to a writeable location on the system.
- `deb`: [Debian package manager](https://www.debian.org/doc/manuals/debian-faq/pkg-basics.en.html) install format.
- `rpm`: [RPM Package manager](https://rpm.org/) install format.
- `opkg`: [OPkg Package manager](https://openwrt.org/docs/guide-user/additional-software/opkg) installer format.
- `swupdate`: [SWUpdate](https://sbabic.github.io/swupdate/swupdate.html) package format.

Binaries that you compose into bundles can each specify their own installer format with different options. The installer and installer optioins are specified in the `custom_metadata`. When adding binaries to bundles, you have the option to override the custom_metadata or inherit it from the most specific to least specific location from bundle, binary, artifact version, or artifact.

Common top level keys in the custom metadata to configure peridod are:

- `installer` (string): The module to use for installing the binary
- `installer_opts` (object): Additional options to configure the installer module. These options are different for each installer module. See below.
- `reboot_required` (true | false): Specifies if a reboot is required. If > 0 binaries specify a reboot is required, the reboot will be scheduled following the bundle installation.

Example:

```json
{
  "peridiod": {
    "installer": "",
    "installer_opts": {},
    "reboot_required": false
  }
}
```

## Installer Custom Metadata

### `fwup`

:::warning System Dependencies
Requires the `fwup` executable to be installed on the running system.
:::

The fwup installer will stream the download directly to the fwup process instead of caching it in the intermediate cache. This is good for systems that need to save disk space.

Installer Opts:

- `env` (object): A key value object of environment variables and values to decorate the environment the fwup process is being applied within.
- `extra_args` (list of strings): A list of extra command line args to pass to `fwup`.
- `task` (string): The fwup task to execute. Defaults to `upgrade`.
- `devpath` (string): The path to the device fwup will apply to.

Example:

```json
{
  "peridiod": {
    "installer": "fwup",
    "installer_opts": {
      "env": { "KEY": "VALUE" },
      "extra_args": [],
      "task": "upgrade",
      "devpath": "/dev/mmcblk0"
    },
    "reboot_required": true
  }
}
```

### `file`

The file installer will download the file to a name containing the binary PRN and when the file has been downloaded and checked for validity and signatures, the binary PRN file name will be symlinked to the final name. at the path location.

Installer Opts:

- `name` (string): The name of the file
- `path` (string): The path to where the file with `name` will be written

Example:

```json
{
  "peridiod": {
    "installer": "file",
    "installer_opts": {
      "name": "filename.ext",
      "path": "/path/to/"
    },
    "reboot_required": false
  }
}
```

### `deb`

:::warning System Dependencies
Requires the `apt` executable to be installed on the running system.
:::

Installer Opts:

- `extra_args` (list of strings): A list of extra command line args to pass to `apt`.

Example:

```json
{
  "peridiod": {
    "installer": "deb",
    "installer_opts": {
      "extra_args": []
    },
    "reboot_required": false
  }
}
```

### `rpm`

:::warning System Dependencies
Requires the `dnf` executable to be installed on the running system.
:::

Installer Opts:

- `extra_args` (list of strings): A list of extra command line args to pass to `dnf`.

Example:

```json
{
  "peridiod": {
    "installer": "rpm",
    "installer_opts": {
      "extra_args": []
    },
    "reboot_required": false
  }
}
```

### `opkg`

:::warning System Dependencies
Requires the `opkg` executable to be installed on the running system.
:::

Installer Opts:

- `extra_args` (list of strings): A list of extra command line args to pass to `opkg`.

Example:

```json
{
  "peridiod": {
    "installer": "opkg",
    "installer_opts": {
      "extra_args": []
    },
    "reboot_required": false
  }
}
```

### `swupdate`

:::warning System Dependencies
Requires the `swupdate` executable to be installed on the running system.
:::

Installer Opts:

- `extra_args` (list of strings): A list of extra command line args to pass to `swupdate`.

Example:

```json
{
  "peridiod": {
    "installer": "swupdate",
    "installer_opts": {
      "extra_args": ["-p", "custom_post_action"]
    },
    "reboot_required": true
  }
}
```

You can add this custom metadata to these records using [Peridio CLI](/peridio-cli) v0.22.0 or later or directly through the [Peridio Admin API](/admin-api).

## Distributions (Deprecated)

Distributions leverage [fwup](https://github.com/fwup-home/fwup) as the packing format and last-mile application mechanism for applying firmware to devices. They are single bundle single device updates which leverage tags based deployment strategies.

When an update is applied, the fwup upgrade instructions will be executed for the current system. These instructions can perform a variety of functions such as, manage partitions, write raw filesystems, update U-Boot environment variables and files, etc. More information about fwup functionality can be found on the [fwup README](https://github.com/fwup-home/fwup).

An example fwup configuration for the QEmu target can be found in the `meta-avocado-arm` [reference layer](https://github.com/peridio/meta-avocado/blob/main/meta-avocado-arm/conf/peridio/qemu.fwup.conf).
