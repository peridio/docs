```
Usage: peridio devices get-update [OPTIONS] --device-prn <DEVICE_PRN>

Options:
      --device-prn <DEVICE_PRN>
          The PRN of the device you wish to check for an update for
      --release-prn <RELEASE_PRN>
          The PRN of the release to consider as the device's current release during bundle resolution
      --bundle-prn <BUNDLE_PRN>
          The PRN of the bundle to consider as the device's current bundle during bundle resolution
      --release-version <RELEASE_VERSION>
          The version to consider as the device's current release version during bundle resolution
      --write
          Whether the server's record of what the device's current state is will be updated in reaction to the release PRN, bundle PRN, and release version parameters if they are also supplied
  -h, --help
          Print help

```