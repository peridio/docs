# Multipart Uploads With Binary Parts

This guide describes how to upload a binary by manually orchestrating the binary parts yourself.

:::info higher level abstractions
It is strongly recommend to avoid this complexity whenever possible by using the CLI instead as documented in the [creating a binary](introduction-to-asset-management#creating-a-binary) section of the introduction to asset management.
:::

## Prerequisites

- [Peridio CLI](https://github.com/peridio/morel/releases).
  - Last tested with version 0.8.0.

## Picking a Target Part Size

Assuming you have already [created a binary](creating-binaries), the next step in using binary parts to perform a multipart upload is deciding on a target part size. The target part size is the size that you will try to make all binary parts.

This can be reasoned about with this equation:

`total_parts = ceil(binary_size / target_size)`

You can use up to 1000 parts and each part must have a size between 5 MB and 1 GB. We recommend balancing around a 10 MB part size.

So if your binary was 1 GB:

`total_parts = ceil(1 GB / 10 MB) = 100 parts`

:::tip
It is likely that your binary's size is not an exact multiple of your target part size. In this case one of your binary parts, typically the last, will be smaller than the target part size.

`total_parts = ceil(1.003 GB / 10 MB = 100.3 parts) = 101`

The 101st part would be `0.003 GB` or `3 MB` in size.
:::

## Creating a Part

```console
peridio binary-parts create \
  --binary-prn $PERIDIO_BINARY_PRN \
  --binary-content-path $PERIDIO_BINARY_CONTENT_PATH \
  --size $PERIDIO_PART_SIZE \
  --hash $PERIDIO_HASH
```

- `--binary-content-path` points at the complete bianry, not any given chunk.
- `--hash` value can be calculated as documented in the [create a hash to later be signed](/reference/signing-keys#create-a-hash-to-later-be-signed) section of the signing keys reference.
    - Exercise extreme caution regarding newlines and invisible characters, it is a common source of mistakes.
- `--size` is the byte size of the part.

If successful, this command will return a presigned URL you can use to upload the binary part's content.

## Uploading a Part

The following is an example curl command for uploading a binary part.

```
curl $PERIDIO_PRESIGNED_URL \
  -X PUT \
  -H "content-length: $(stat -f%z $PERIDIO_FILE)" \
  -H "content-type: application/octet-stream" \
  -H "x-amz-checksum-sha256: $(cat $PERIDIO_FILE | sha256sum | grep -o '^\S\+' | xxd -r -p | base64)" \
  --upload-file $PERIDIO_FILE
```

Every specified header in that example is required.

## Listing Parts


```console
peridio binary-parts list \
  --binary-prn $PERIDIO_BINARY_PRN
```
