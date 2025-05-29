```
Usage: peridio devices create [OPTIONS] --identifier <IDENTIFIER> --product-prn <PRODUCT_PRN>

Options:
      --description <DESCRIPTION>
          An arbitrary string attached to the resource. Often useful for displaying to users

      --quarantined <QUARANTINED>
          Whether or not the device is quarantined or not
          
          [possible values: true, false]

      --identifier <IDENTIFIER>
          The device's identifier

      --product-prn <PRODUCT_PRN>
          The prn of the product you wish to create the resource within

      --tags [<TAGS>...]
          A list of tags to attach to the device.
          
          If using firmwares and deployments, tags can be used to target devices.
          
          Values can be provided by passing each value in a flag or by delimiting all values with ","

      --target <TARGET>
          The target of the device.
          
          Commonly used to store the device's target triplet to indicate architecture/compiler compatibility.

      --cohort-prn <COHORT_PRN>
          The PRN of the cohort you wish to add the device to

  -h, --help
          Print help (see a summary with '-h')

```