// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  reference: [
    'reference/ca-certificates',
    'reference/deployments',
    'reference/device-certificates',
    'reference/devices',
    'reference/element-signing-keys',
    'reference/firmware',
    'reference/just-in-time-registration',
    'reference/organizations',
    'reference/products',
    'reference/users',
  ],
  guides: [
    'guides/creating-element-signing-keys',
    'guides/creating-x509-certificates-with-openssl',
  ],
};

module.exports = sidebars;
