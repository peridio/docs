```
Usage: peridio webhooks create [OPTIONS] --url <URL> --organization-prn <ORGANIZATION_PRN>

Options:
      --description <DESCRIPTION>
          An arbitrary string attached to the resource. Often useful for displaying to users

      --enabled-events <ENABLED_EVENTS>
          The events that will trigger the webhook.
          
          Supply the flag multiple times to add multiple events.

      --url <URL>
          The URL that the webhook will send a POST request to

      --organization-prn <ORGANIZATION_PRN>
          The PRN of the organization you wish to create the resource within

  -h, --help
          Print help (see a summary with '-h')

```