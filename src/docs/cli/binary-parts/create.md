```
Create a binary part.

Binary parts track the chunks of a multipart upload to Peridio.

Usage: peridio binary-parts create [OPTIONS] --binary-prn <BINARY_PRN> --hash <HASH> --index <INDEX> --size <SIZE>

Options:
      --binary-prn <BINARY_PRN>
          The PRN of the binary you wish to create a part for

      --expected-binary-size <EXPECTED_BINARY_SIZE>
          The total size of the binary's content

      --hash <HASH>
          The base64 encoding of the SHA256 hash of the binary part's data

      --index <INDEX>
          Uniquely identifies a binary part and defines its position within the binary being created. Can be any number from 1 to 10,000, inclusive. If you create a binary part using the same index that was used with a previous binary part, the previously uploaded binary part is overwritten

      --size <SIZE>
          The size in bytes of the binary part

      --binary-content-path <BINARY_CONTENT_PATH>
          The path to the file you wish to upload as the binary's content

  -h, --help
          Print help (see a summary with '-h')

```