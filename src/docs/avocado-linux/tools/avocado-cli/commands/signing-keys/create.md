```
Create a new signing key or register an external PKCS#11 key

Usage: avocado signing-keys create [OPTIONS] [NAME]

Arguments:
  [NAME]  Name for the key (defaults to key ID if not provided)

Options:
      --uri <URI>               PKCS#11 URI for hardware-backed keys (e.g., 'pkcs11:token=YubiKey;object=signing-key')
      --pkcs11-device <DEVICE>  Hardware device type (tpm, yubikey, or auto-detect)
      --token <TOKEN>           PKCS#11 token label (e.g., 'avocado', 'YubiKey PIV'). If not provided, uses the first available token
      --key-label <LABEL>       Label of existing key to reference in the device
      --generate                Generate a new key in the device
      --auth <METHOD>           Authentication method for PKCS#11 device (none, prompt, env) [default: prompt]
      --runs-on <USER@HOST>     Run command on remote host using local volume via NFS (format: user@host)
      --nfs-port <NFS_PORT>     NFS port for remote execution (auto-selects from 12050-12099 if not specified)
      --sdk-arch <ARCH>         SDK container architecture for cross-arch emulation via Docker buildx/QEMU (aarch64 or x86-64)
  -h, --help                    Print help

```
