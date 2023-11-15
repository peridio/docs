```
Usage: peridio webhooks update [OPTIONS] --prn <PRN>

Options:
      --prn <PRN>
          The PRN of the resource to update

      --description <DESCRIPTION>
          An arbitrary string attached to the resource. Often useful for displaying to users

      --url <URL>
          The URL that the webhook will send a POST request to

      --state <STATE>
          The state of the webhook

      --enabled-events <ENABLED_EVENTS>
          The events that will trigger the webhook.
          
          Supply the flag multiple times to add multiple events.

  -h, --help
          Print help (see a summary with '-h')

```