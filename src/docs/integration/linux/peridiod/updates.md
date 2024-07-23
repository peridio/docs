# Packaging Updates

Peridiod supports installing updates from both Peridio Distributions and Peridio Releases.

## Releases

Releases allow greater control and flexibility to managing devices in the field. You can package and bundle many binaries with a release enabling workflows for use in embedded products, empowering app stores, and managing connected peripheral device firmware. It offers advanced deployment options for scheduled and phased rollouts.

### Installers

Peridiod now has a concept of "Installers", initially supported installer types are `file` and [fwup](https://github.com/fwup-home/fwup). When using releases, you will have to use the custom_metadata of a binary, artifact version, or artifact to instruct peridiod how to install the binary content. The custom metadata will be added to the binaries in a bundle through inheritance by first checking the binary, followed by the artifact version, and finally the artifact. Add custom metadata to the artifact record if the installation instructions are common across all version and binaries. If installation instruction are not all the same, or in certain versions or on certain targets it differs, you can override by adding it to individual artifact versions or binaries.

Here is an example of what custom metadata for installers would look like:

fwup

```json
{
  "installer": "fwup",
  "installer_opts": {
    "devpath": "/dev/mmcblk0",
    "extra_args": [],
    "env": {}
  },
  "reboot_required": true
}
```

file

```json
{
  "installer": "file",
  "installer_opts": {
    "name": "my_file.txt",
    "path": "/opt/my_app",
  },
  "reboot_required": false
}
```

You can add this custom metadata to these records using [Peridio CLI](/cli) v0.22.0 or later or directly through the [Peridio Admin API](/admin-api).

## Distributions

Distributions leverage [fwup](https://github.com/fwup-home/fwup) as the packing format and last-mile application mechanism for applying firmware to devices. They are single bundle single device updates which leverage tags based deployment strategies.

When an update is applied, the fwup upgrade instructions will be executed for the current system. These instructions can perform a variety of functions such as, manage partitions, write raw filesystems, update U-Boot environment variables and files, etc. More information about fwup functionality can be found on the [fwup README](https://github.com/fwup-home/fwup).

An example fwup configuration for the QEmu target can be found in the `meta-avocado-arm` [reference layer](https://github.com/peridio/meta-avocado/blob/main/meta-avocado-arm/conf/peridio/qemu.fwup.conf).
