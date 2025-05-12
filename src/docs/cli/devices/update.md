```
Usage: peridio devices update [OPTIONS] --device-identifier <DEVICE_IDENTIFIER> --product-name <PRODUCT_NAME>

Options:
      --description <DESCRIPTION>
          An arbitrary string attached to the resource. Often useful for displaying to users

      --device-identifier <DEVICE_IDENTIFIER>
          The identifier of the device you wish to update

      --healthy <HEALTHY>
          Whether or not the device is healthy (quarantined or not)
          
          [possible values: true, false]

      --last-communication <LAST_COMMUNICATION>
          The device's last communication time

      --product-name <PRODUCT_NAME>
          The name of the product you wish to update the resource within

      --tags [<TAGS>...]
          A list of tags to attach to the device.
          
          Values can be provided by passing each value in a flag or by delimiting all values with ","

      --target <TARGET>
          The target of the device

  -h, --help
          Print help (see a summary with '-h')

```