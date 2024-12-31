# Creating X.509 certificates with OpenSSL

This guide describes how to create [X.509](/platform/reference/x509) certificates with [OpenSSL](https://www.openssl.org/).

:::tip more speed less flexibility
For a more streamlined workflow, see [creating X.509 certificates with Peridio](/platform/guides/creating-x509-certificates-with-peridio).
:::

## Prerequisites

- [OpenSSL CLI](https://www.openssl.org/).
  - Last tested with version 3.0.4 21 Jun 2022.

:::tip inspect created resources
To inspect any private key, certificate signing request, or certificate you create in this guide, reference [X.509](/platform/reference/x509).
:::

## Create certificates

:::info openssl config
Some of the commands below will reference an `openssl.cnf` file, you must create this with the contents described at [Appendix A](#a---opensslcnf).
:::

The `openssl.cnf` file requires, and points to the paths of, one additional file to track created certificates and one additional directory to store certificates historically. You must create them:

```console
touch database.txt
mkdir certificates
```

Note that when creating certificates with the `openssl ca` command that it will write the same created certificate file twice, once to the `certificates` directory where the name will be the serial number in hex with *.pem* appended, and once to the calling directory with the name specified by the `-out` option of the command.

:::warning sensitive private keys
Private keys are sensitive components of a public key infrastructure. If they are leaked the entire downstream chain of trust is compromised.
:::

:::warning certificate validity period
The `-startdate` and `-enddate` options should be specified cautiously as they dictate when the certificate will be valid for. The impact of a certificate not being valid yet or having already expired is dependent on the parties interacting with it.

For information regarding how Peridio interacts with certificates reference [CA Certificates](/platform/reference/ca-certificates) and [Device Certificates](/platform/reference/device-certificates).
:::

### Root

For context, reference [X.509](/platform/reference/x509#root).

#### Create a private key

For context, reference [cli-x509-create](/cli/x509/create).

```console
openssl ecparam \
  -genkey \
  -name prime256v1 \
  -out root-private-key.pem
```

#### Create a certificate signing request

For context, reference [openssl-req](#openssl-req).

```console
openssl req \
  -config openssl.cnf \
  -key root-private-key.pem \
  -new \
  -out root-certificate-signing-request.pem \
  -section root_certificate_authority_req \
  -subj "/CN=unique-root-name"
```

#### Create a certificate

For context, reference [openssl-ca](#openssl-ca).

You must fill in the `-startdate` and `-enddate` values.

```console
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

### Intermediate

For context, reference [X.509 intermediate](/platform/reference/x509#intermediate).

#### Create a private key

For context, reference [openssl-ecparam](#openssl-ecparam).

```console
openssl ecparam \
  -genkey \
  -name prime256v1 \
  -out intermediate-private-key.pem
```

#### Create a certificate signing request

For context, reference [openssl-req](#openssl-req).

```console
openssl req \
  -key intermediate-private-key.pem \
  -new \
  -out intermediate-certificate-signing-request.pem \
  -subj "/CN=unique-intermediate-name"
```

#### Create a certificate

For context, reference [openssl-ca](#openssl-ca).

You must fill in the `-startdate` and `-enddate` values.

```console
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

### End-entity certificate

For context, reference [X.509 end entity](/platform/reference/x509#end-entity).

#### Create a private key

For context, reference [openssl-ecparam](#openssl-ecparam).

```console
openssl ecparam \
  -genkey \
  -name prime256v1 \
  -out end-entity-private-key.pem
```

#### Create a certificate signing request

For context, reference [openssl-req](#openssl-req).

```console
openssl req \
  -key end-entity-private-key.pem \
  -new \
  -out end-entity-certificate-signing-request.pem \
  -subj "/CN=unique-end-entity-name"
```

#### Create a certificate

For context, reference [openssl-ca](#openssl-ca).

You must fill in the `-startdate` and `-enddate` values.

```console
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
