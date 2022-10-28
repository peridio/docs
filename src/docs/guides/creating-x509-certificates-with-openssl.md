# Creating X.509 Certificates with OpenSSL

This guide describes how to create X.509 certificates with [OpenSSL](https://www.openssl.org/).

## Prerequisites

- [OpenSSL](https://www.openssl.org/)
  - Last tested with version 3.0.4 21 Jun 2022.

## Hardware Constraints

For nearly every production scenario, Peridio recommends storing your sensitive credentials in a hardware security module. It is common for hardware security modules to impose constraints on the credentials they store. For example, Microchip's [ATECC608B](https://www.microchip.com/en-us/product/ATECC608B) stores certificates [in a novel fashion](https://ww1.microchip.com/downloads/en/Appnotes/20006367A.pdf). One can use this guide to create certificates that are compatible with the ATECC608B so long as the start dates have a resolution of hours (minute and second must be 0) and end dates are a set number of years from the issue date (must have identical month, day, hour, minute and second as corresponding issue date).

While this guide is useful for quickly creating certificates for non-production runs, one should be mindful that the choices you make with respect to production hardware, firmware, and software can impose constraints upon your public key infrastructure. To avoid unexpected delays in development and manufacturing and ensure you have the time and resources available to operate securely, it is best to make the decisions that dictate these constraints as soon as possible.

## Private and Public Keys

Every X.509 certificate has a public key within it. The public key is derived from a private key. When considered together they are referred to as an asymetric key pair. Generally, this field is refered to as [public-key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography) or asymmetric cryptography.

To create an asymmetric key pair, one must first decide on a public key algorithm to use, this choice dictates:

- The cryptographic properties of the keys and in turn their capabilities and security guarantees.
- The processes required to create and interact with the keys.

This guide will use the [ECDSA](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm) public key algorithm, but RSA and DSA are other common choices.

Effective security requires keeping the private key private; the public key can be openly distributed without compromising security.

***WARNING:*** Private keys are sensitive components of a public key infrastructure. If they are leaked the entire downstream chain of trust is fundamentally compromised.

### Inspect a Private Key

To inspect any private key created later in this guide:

```sh
openssl ecparam \
  -in key.pem \
  -text \
  -noout
```

## Create Certificates

Some of the commands below will reference an `openssl.cnf` file, you must create this with the contents described at [Appendix A](#a---opensslcnf).

The aforementioned config requires one additional file to track created certificates and one additional directory to store certificates historically. You must create them:

```sh
touch database.txt
mkdir certificates
```

Note that when creating certificates with the `openssl ca` command that it will write the same created certificate file twice, once to the `certificates` directory where the name will be the serial number in hex with *.pem* appended, and once to the calling directory with the name specified by the `-out` option of the command.

### Inspect a Certificate Signing Request

To inspect any certificate signing request created later in this guide:

```sh
openssl req \
  -in certificate-signing-request.pem \
  -text \
  -noout
```

### Inspect a Certificate

To inspect any certificate created later in this guide:

```sh
openssl x509 \
  -in certificate.pem \
  -text \
  -noout
```

### Root

Generally speaking, a root certificate authority is a certificate that:

- is self-signed
- is capable of signing certificates

#### Create a Private Key

Reference [openssl-ecparam](#openssl-ecparam).

```sh
openssl ecparam \
  -genkey \
  -name prime256v1 \
  -out root-private-key.pem
```

***WARNING:*** Private keys are sensitive components of a public key infrastructure. If they are leaked the entire downstream chain of trust is fundamentally compromised.

#### Create a Certificate Signing Request

Reference [openssl-req](#openssl-req).

```sh
openssl req \
  -config openssl.cnf \
  -key root-private-key.pem \
  -new \
  -out root-certificate-signing-request.pem \
  -section root_certificate_authority_req \
  -subj "/CN=unique-root-name"
```

#### Create a Certificate

Reference [openssl-ca](#openssl-ca).

You must fill in the `-startdate` and `-enddate` values.

```sh
openssl ca \
  -batch \
  -config openssl.cnf \
  -enddate YYYYMMDDHHMMSSZ \
  -extensions root_certificate_authority_extensions \
  -in root-certificate-signing-request.pem \
  -keyfile root-private-key.pem \
  -out root-certificate.pem \
  -selfsign \
  -startdate YYYYMMDDHHMMSSZ
```

***WARNING:*** The `-startdate` and `-enddate` options should be specified cautiously as they dictate when the certificate will be valid for. The impact of a certificate not being valid yet or having already expired is dependent on the parties interacting with it. For information regarding how Peridio interacts with certificates reference [CA Certificates](/reference/ca-certificates) and [Device Certificates](/reference/device-certificates). It is also common for hardware security modules to require these dates to be specified in a very particular manner, see [Hardware Constraints](#hardware-constraints).

You may retain or delete the certificate signing request depending on your use case.

The certificate can be openly distributed without compromising security.

### Intermediate

Generally speaking, an intermediate certificate authority is a certificate that:

- is not self signed
- is signed either by an intermediate certificate authority or a root certificate authority
- is capable of signing certificates

#### Create a Private Key

Reference [openssl-ecparam](#openssl-ecparam).

```sh
openssl ecparam \
  -genkey \
  -name prime256v1 \
  -out intermediate-private-key.pem
```

***WARNING:*** Private keys are sensitive components of a public key infrastructure. If they are leaked the entire downstream chain of trust is fundamentally compromised.

#### Create a Certificate Signing Request

Reference [openssl-req](#openssl-req).

```sh
openssl req \
  -key intermediate-private-key.pem \
  -new \
  -out intermediate-certificate-signing-request.pem \
  -subj "/CN=unique-intermediate-name"
```

#### Create a Certificate

Reference [openssl-ca](#openssl-ca).

You must fill in the `-startdate` and `-enddate` values.

```sh
openssl ca \
  -batch \
  -cert root-certificate.pem \
  -config openssl.cnf \
  -enddate YYYYMMDDHHMMSSZ \
  -extensions intermediate_certificate_authority_extensions \
  -in intermediate-certificate-signing-request.pem \
  -keyfile root-private-key.pem \
  -out intermediate-certificate.pem \
  -startdate YYYYMMDDHHMMSSZ
```

***WARNING:*** The `-startdate` and `-enddate` options should be specified cautiously as they dictate when the certificate will be valid for. The impact of a certificate not being valid yet or having already expired is dependent on the parties interacting with it. For information regarding how Peridio interacts with certificates reference [CA Certificates](/reference/ca-certificates) and [Device Certificates](/reference/device-certificates). It is also common for hardware security modules to require these dates to be specified in a very particular manner, see [Hardware Constraints](#hardware-constraints).

You may retain or delete the certificate signing request depending on your use case.

The certificate can be openly distributed without compromising security.

### End-entity Certificate

Generally speaking, an end-entity certificate is a certificate that:

- is not self signed
- is signed by either an intermediate certificate authority or a root certificate authority
- is not capable of signing certificates

#### Create a Private Key

Reference [openssl-ecparam](#openssl-ecparam).

```sh
openssl ecparam \
  -genkey \
  -name prime256v1 \
  -out end-entity-private-key.pem
```

***WARNING:*** Private keys are sensitive components of a public key infrastructure. If they are leaked the entire downstream chain of trust is fundamentally compromised.

#### Create a Certificate Signing Request

Reference [openssl-req](#openssl-req).

```sh
openssl req \
  -key end-entity-private-key.pem \
  -new \
  -out end-entity-certificate-signing-request.pem \
  -subj "/CN=unique-end-entity-name"
```

#### Create a Certificate

Reference [openssl-ca](#openssl-ca).

You must fill in the `-startdate` and `-enddate` values.

```sh
openssl ca \
  -batch \
  -cert intermediate-certificate.pem \
  -config openssl.cnf \
  -enddate YYYYMMDDHHMMSSZ \
  -extensions end_entity_certificate_extensions \
  -in end-entity-certificate-signing-request.pem \
  -keyfile intermediate-private-key.pem \
  -out end-entity-certificate.pem \
  -startdate YYYYMMDDHHMMSSZ
```

***WARNING:*** The `-startdate` and `-enddate` options should be specified cautiously as they dictate when the certificate will be valid for. The impact of a certificate not being valid yet or having already expired is dependent on the parties interacting with it. For information regarding how Peridio interacts with certificates reference [CA Certificates](/reference/ca-certificates) and [Device Certificates](/reference/device-certificates). It is also common for hardware security modules to require these dates to be specified in a very particular manner, see [Hardware Constraints](#hardware-constraints).

You may retain or delete the certificate signing request depending on your use case.

The certificate can be openly distributed without compromising security.

## Appendix

### A - openssl.cnf

When creating certificates and certificate signing requests there is often a set of common extensions you wish to include. It is convenient to enumerate these extensions in a config file for ease of maintenance and referenceability.

In this guide, we use the following config referenced as `openssl.cnf`.

```cnf
#
# ca
#

[ ca ]
default_ca=default_ca

[ default_ca ]
database=database.txt
default_days=0
default_md=SHA256
email_in_dn=no
new_certs_dir=certificates
policy=default_policy
rand_serial=yes
unique_subject=no
x509_extensions=root_certificate_authority_extensions

[ default_policy ]
countryName            = optional
stateOrProvinceName    = optional
organizationName       = optional
organizationalUnitName = optional
commonName             = supplied

#
# extensions
#

[ root_certificate_authority_extensions ]
basicConstraints=critical,CA:TRUE,pathlen:1
extendedKeyUsage=serverAuth,clientAuth
keyUsage=critical,digitalSignature,keyCertSign,cRLSign
subjectKeyIdentifier=hash

[ intermediate_certificate_authority_extensions ]
authorityKeyIdentifier=keyid:always
basicConstraints=critical,CA:TRUE,pathlen:0
extendedKeyUsage=serverAuth,clientAuth
keyUsage=critical,digitalSignature,keyCertSign,cRLSign
subjectKeyIdentifier=hash

[ end_entity_certificate_extensions ]
authorityKeyIdentifier=keyid:always
extendedKeyUsage=clientAuth
keyUsage=critical,digitalSignature
subjectKeyIdentifier=hash
```

For a comprehensive understanding of what the above configuration is doing, one should exhaustively read all of this guide's [References](#references).

## References

### config

OpenSSL's CONF library configuration files, reference https://www.openssl.org/docs/man3.0/man5/config.html.

### openssl-ca

OpenSSL's sample minimal CA application, reference https://www.openssl.org/docs/man3.0/man1/openssl-ca.html.

### openssl-ecparam

OpenSSL's EC parameter manipulation and generation command, reference https://www.openssl.org/docs/man3.0/man1/openssl-ecparam.html.

### openssl-req

OpenSSL's PKCS#10 certificate request and certificate generating command, reference https://www.openssl.org/docs/man3.0/man1/openssl-req.html.

### openssl-x509

OpenSSL's certificate display and signing command, reference https://www.openssl.org/docs/man3.0/man1/openssl-x509.html.

### RFC 4158

Internet X.509 Public Key Infrastructure: Certification Path Building, reference https://datatracker.ietf.org/doc/html/rfc4158.

### RFC 5280

Internet X.509 Public Key Infrastructure Certificate and Certificate Revocation List (CRL) Profile, reference https://datatracker.ietf.org/doc/html/rfc5280.

### x509v3_config

OpenSSL's X509 V3 certificate extension configuration format, reference https://www.openssl.org/docs/man3.0/man5/x509v3_config.html.
