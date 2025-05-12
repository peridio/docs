```
Usage: peridio tunnels create [OPTIONS] --device-prn <DEVICE_PRN> --device-tunnel-port <DEVICE_TUNNEL_PORT>

Options:
      --cidr-block-allowlist <CIDR_BLOCK_ALLOWLIST>
          An optional list of CIDR blocks that can use the resource.
          
          Values can be provided by passing each value in a flag or by delimiting all values with ","

      --device-prn <DEVICE_PRN>
          The PRN of the device you wish to create the resource for

      --device-tunnel-port <DEVICE_TUNNEL_PORT>
          The port of the device that being used for the service

      --ttl <TTL>
          The length of time in seconds for the tunnel to live

      --wait <WAIT>
          Number of seconds to wait for a state other than "requested" (1..3600)

  -h, --help
          Print help (see a summary with '-h')

```