```
Usage: peridio deployments create [OPTIONS] --firmware <FIRMWARE> --product-name <PRODUCT_NAME> --name <NAME> --tags [<TAGS>...]

Options:
      --delta-updatable
          Whether or not the deployment will leverage Peridio-managed delta updates

      --firmware <FIRMWARE>
          The UUID of the firmware to deploy

      --product-name <PRODUCT_NAME>
          The name of the product you wish to create the resource within

      --name <NAME>
          The resource's name, meant to be displayable to users

      --tags [<TAGS>...]
          A list of tags that must be present on a device for it to be eligible for this deployment.

          Values can be provided by passing each value in a flag or by delimiting all values with ","

      --version <VERSION>
          A SemVer requirement that must be satisfied by a device's version for the device to be eligible for this deployment

  -h, --help
          Print help (see a summary with '-h')

```
