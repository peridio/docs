```
Usage: peridio deployments update [OPTIONS] --deployment-name <DEPLOYMENT_NAME> --product-name <PRODUCT_NAME>

Options:
      --delta-updatable <DELTA_UPDATABLE>
          Whether or not the deployment will leverage Peridio-managed delta updates [possible values: true, false]
      --deployment-name <DEPLOYMENT_NAME>
          The name of the deployment (currently) to update
      --firmware <FIRMWARE>
          The UUID of the firmware to deploy
      --is-active <IS_ACTIVE>
          Whether or not the deployment is active [possible values: true, false]
      --product-name <PRODUCT_NAME>
          The name of the product you wish to create the resource within
      --name <NAME>
          The resource's name, meant to be displayable to users
      --tags [<TAGS>...]
          A list of tags that must be present on a device for it to be eligible for this deployment
      --version <VERSION>
          A SemVer requirement that must be satisfied by a device's version for the device to be eligible for this deployment
  -h, --help
          Print help

```