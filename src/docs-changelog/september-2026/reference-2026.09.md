---
title: 'References: 2026.09'
description: 'Avocado OS references, September 2026: encrypted /var on Jetson with the key sealed to the firmware TPM, and DeepStream 9.1 on Jetson AGX Thor.'
---

One new reference and one large update this month.

## Encrypted /var on Jetson

[**`jetson-encrypted-var`**](https://github.com/avocado-linux/references/tree/main/jetson-encrypted-var)
puts `/var` on a LUKS2 volume. The volume key is sealed to the OP-TEE firmware
TPM of the Jetson against PCR 7, and is not stored on disk. The reference has
no application code. The `var` block of the runtime in `avocado.yaml` turns on
the encryption:

```yaml
var:
  encrypt: true
  hardware: tpm2
```

- `/var` is encrypted in place on first boot, so content that the build seeds
  into `/var` stays.
- With `hardware: tpm2`, the device does not use a software-derived key for
  `/var` when the firmware TPM is missing. The default, `auto`, uses an Argon2id
  key in that case.
- On Jetson, the OP-TEE firmware TPM is opt-in. The runtime must list
  `optee-ftpm-init` in `initramfs.packages`. Without it, `hardware: tpm2` fails
  closed.
- With `hardware: tpm2`, the device also fails closed when a firmware update
  changes PCR 7. The recovery keyslot and the optional operator-held key
  (`avocado var-key`) let you recover the data in `/var` by hand. They do not
  keep the device booting.

The reference supports the Jetson Orin Nano, Orin NX, AGX Orin and AGX Thor.
We tested it end to end on a Jetson Orin Nano. It requires the 2026 release,
because `cryptsetup-var` is published on 2026 only. See
[Encrypted /var](/developer-reference/security/encrypted-var).

## DeepStream 9.1 on Jetson AGX Thor

[**`nvidia-deepstream`**](https://github.com/avocado-linux/references/tree/main/nvidia-deepstream)
adds Jetson AGX Thor and moves from DeepStream 7.1 to 9.1 (JetPack 7.2), on the
2026 release and the `next` channel.

- Target identifiers drop the `-devkit` suffix to match the 2026 feeds:
  `jetson-orin-nano` and `jetson-agx-orin`.
- `tensorrt-trtexec-prebuilt` is included, so you can build TensorRT engines on
  the device.
- Prebuilt FP16 engines for Thor are in the repository. If an engine is
  missing, the build gives a warning and continues. You can then build the
  engines on the device to bring up a new board.
- The pipeline uses the new `nvstreammux`. `tegra-libraries-pva` is added
  because the NvDCF tracker needs it.
