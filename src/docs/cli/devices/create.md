```
Usage: peridio devices create [OPTIONS] --identifier <IDENTIFIER> --product-name <PRODUCT_NAME>

Options:
      --description <DESCRIPTION>
          An arbitrary string attached to the resource. Often useful for displaying to users

      --healthy <HEALTHY>
          Whether or not the device is healthy (quarantined or not)
          
          [possible values: true, false]

      --identifier <IDENTIFIER>
          The device's identifier

      --last-communication <LAST_COMMUNICATION>
          The device's last communication time

      --product-name <PRODUCT_NAME>
          The name of the product you wish to create the resource within

      --tags [<TAGS>...]
          A list of tags to attach to the device.
          
          If using firmwares and deployments, tags can be used to target devices.

      --target <TARGET>
          The target of the device.
          
          Commonly used to store the device's target triplet to indicate architecture/compiler compatibility.

      --cohort-prn <COHORT_PRN>
          The PRN of the cohort you wish to add the device to

  -h, --help
          Print help (see a summary with '-h')

```