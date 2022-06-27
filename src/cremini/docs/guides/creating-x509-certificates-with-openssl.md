# Creating X.509 Certificates with OpenSSL

This guide describes how to create X.509 certificates with the [OpenSSL CLI](https://github.com/openssl/openssl).

Last tested with OpenSSL 3.0.4 21 Jun 2022.

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

Some of the commands below will reference a file, `openssl.cnf`, this is available at [Appendix A](#a---opensslcnf).

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

#### Create a Certificate

Reference [openssl-req](#openssl-req).

```sh
openssl req \
  -config openssl.cnf \
  -days 3650 \
  -key root-private-key.pem \
  -new \
  -out root-certificate.pem \
  -section root_certificate_authority_req \
  -subj "/CN=unique-root-name" \
  -x509
```

***WARNING:*** The `-days` option should be specified cautiously as it dictates how long the certificate will be valid for. The impact of a certificate expiring is dependent on the parties interacting with it. For information regarding how Peridio interacts with certificates reference [CA Certificates](/cremini/reference/ca-certificates) and [Device Certificates](/cremini/reference/device-certificates).

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

#### Create a Certificate

Reference [openssl-req](#openssl-req).

```sh
openssl req \
  -CA root-certificate.pem \
  -CAkey root-private-key.pem \
  -config openssl.cnf \
  -days 3650 \
  -key intermediate-private-key.pem \
  -new \
  -out intermediate-certificate.pem \
  -section intermediate_certificate_authority_req \
  -subj "/CN=unique-intermediate-name" \
  -x509
```

***WARNING:*** The `-days` option should be specified cautiously as it dictates how long the certificate will be valid for. The impact of a certificate expiring is dependent on the parties interacting with it. For information regarding how Peridio interacts with certificates reference [CA Certificates](/cremini/reference/ca-certificates) and [Device Certificates](/cremini/reference/device-certificates).

Note the `-CA` and `-CAkey` options; these indicate the certificate that will issue and sign the certificate you are creating. In this case we create an intermediate from a root, but you may also create an intermediate from another intermediate.

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

#### Create a Certificate

Reference [openssl-req](#openssl-req).

```sh
openssl req \
  -CA intermediate-certificate.pem \
  -CAkey intermediate-private-key.pem \
  -config openssl.cnf \
  -days 398 \
  -key end-entity-private-key.pem \
  -new \
  -out end-entity-certificate.pem \
  -section end_entity_certificate_req \
  -subj "/CN=unique-end-entity-name" \
  -x509
```

***WARNING:*** The `-days` option should be specified cautiously as it dictates how long the certificate will be valid for. The impact of a certificate expiring is dependent on the parties interacting with it. For information regarding how Peridio interacts with certificates reference [CA Certificates](/cremini/reference/ca-certificates) and [Device Certificates](/cremini/reference/device-certificates).

Note the `-CA` and `-CAkey` options; these indicate the certificate that will issue and sign the certificate you are creating. In this case we create an end entity from an intermediate, but you may also create an end entity from a root.

The certificate can be openly distributed without compromising security.

## Appendix

### A - openssl.cnf

When creating certificates and certificate signing requests there is often a set of common extensions you wish to include. It is convenient to enumerate these extensions in a config file for ease of maintenance and referenceability.

In this guide, we use the following config referenced as `openssl.cnf`.

```cnf
#
# root
#

[ root_certificate_authority_req ]
prompt=no
x509_extensions=root_certificate_authority_extensions

[ root_certificate_authority_extensions ]
subjectKeyIdentifier=hash
authorityKeyIdentifier=keyid:always
basicConstraints=critical,CA:TRUE
keyUsage=critical,digitalSignature,keyCertSign,cRLSign
extendedKeyUsage=serverAuth,clientAuth

#
# intermediate
#

[ intermediate_certificate_authority_req ]
prompt=no
x509_extensions=intermediate_certificate_authority_extensions

[ intermediate_certificate_authority_extensions ]
basicConstraints=critical,CA:TRUE,pathlen:0
keyUsage=critical,digitalSignature,keyCertSign,cRLSign
extendedKeyUsage=serverAuth,clientAuth
subjectKeyIdentifier=hash
authorityKeyIdentifier=keyid:always

#
# end entity
#

[ end_entity_certificate_req ]
prompt=no
x509_extensions=end_entity_certificate_extensions

[ end_entity_certificate_extensions ]
authorityKeyIdentifier=keyid:always
extendedKeyUsage=clientAuth
keyUsage=critical,digitalSignature
subjectKeyIdentifier=hash
```

For a comprehensive understanding of what the above configuration is doing, one should exhaustively read all of this guide's [references](#references). If you find yourself in a position of having to manage PKI, this must be considered a required effort.

## References

### config

OpenSSL's CONF library configuration files, reference https://www.openssl.org/docs/manmaster/man5/config.html.

### openssl-ecparam

OpenSSL's EC parameter manipulation and generation command, reference https://www.openssl.org/docs/manmaster/man1/openssl-ecparam.html.

### openssl-req

OpenSSL's PKCS#10 certificate request and certificate generating command, reference https://www.openssl.org/docs/manmaster/man1/openssl-req.html.

### openssl-x509

OpenSSL's certificate display and signing command, reference https://www.openssl.org/docs/manmaster/man1/openssl-x509.html.

### x509v3_config

OpenSSL's X509 V3 certificate extension configuration format, reference https://www.openssl.org/docs/manmaster/man5/x509v3_config.html.

### RFC 4158

Internet X.509 Public Key Infrastructure: Certification Path Building, reference https://datatracker.ietf.org/doc/html/rfc4158.

### RFC 5280

Internet X.509 Public Key Infrastructure Certificate and Certificate Revocation List (CRL) Profile, reference https://datatracker.ietf.org/doc/html/rfc5280.
