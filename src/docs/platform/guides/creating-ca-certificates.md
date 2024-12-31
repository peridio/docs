# Creating CA certificates

This guide describes how to create CA certificates.

To learn more about Peridio CA certificates in general, see the [CA certificates](/platform/reference/ca-certificates) reference.

## Prerequisites

- [Peridio CLI](https://github.com/peridio/morel/releases).
  - Last tested with version 0.8.0.

## Obtain a CA certificate file

There are many ways to obtain a CA certificate file including but not limited to generating your own or purchasing one from a company that specializes in certificate management. For the sake of example you may see the [creating X.509 certificates with Peridio](creating-x509-certificates-with-peridio) guide. If you follow that guide, use an intermediate certificate as your CA certificate for the purpose of this guide.

## Obtain a verification certificate file

In order to verify that you control the private key associated with the CA certificate you wish to upload, Peridio requires you upload a verification certificate. This is an end entity certificate signed by the private key associated with the CA certificate you wish to upload and whose common name is a verification code provided by Peridio.

### Obtain a verification code

You will use the obtained verification code as the common name of the verification certificate.

**Peridio CLI**

```console
peridio ca-certificates create-verification-code
```

:warning: This code is consumed upon creating a CA certificate and expires after one week.

**Peridio Web Console**

1. Navigate to your organization in the [Peridio Web Console](https://console.peridio.com).
2. Navigate to the "Certificates" page.
3. Navigate to the "New Certificate Authority" page by clicking "Add Certificate Authority".
4. The verification code will be displayed on the page.

:warning: This code is different everytime you open or refresh the page to upload a CA certificate. The common name of the verification certificate you upload must match the code displayed on the page.

### Create a verification certificate file

See the [creating X.509 certificates with Peridio](creating-x509-certificates-with-peridio) guide and create an end entity certificate whose common name is the verification code you obtained earlier.

## Submit the CA certificate and verification certificate to Peridio

**Peridio CLI**

```
peridio ca-certificates create \
  --certificate-path ca-certificate.pem \
  --verification-certificate-path verification-certificate.pem
```

:warning: The common name of the verification certificate you upload must match a verification code created via the Peridio CLI or the Peridio Admin API.

**Peridio Web Console**

1. You should still be on the "New Certificate Authority" page from when you obtained a verification code.
2. Input the CA certificate and verification certificate into the respective file inputs and submit the form.

:warning: The common name of the verification certificate you upload must match the code displayed on the page.
