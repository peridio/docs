// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  agent: ['agent'],
  cli: [
    'cli',
    {
      collapsible: false,
      type: 'category',
      label: 'Commands',
      items: [
        {
          type: 'category',
          label: 'artifacts',
          items: [
            'cli/artifacts/create',
            'cli/artifacts/list',
            'cli/artifacts/get',
            'cli/artifacts/update',
          ],
        },
        {
          type: 'category',
          label: 'artifact versions',
          items: [
            'cli/artifact-versions/create',
            'cli/artifact-versions/list',
            'cli/artifact-versions/get',
            'cli/artifact-versions/update',
          ],
        },
        {
          type: 'category',
          label: 'bundles',
          items: ['cli/bundles/create', 'cli/bundles/list', 'cli/bundles/get'],
        },
        {
          type: 'category',
          label: 'ca certificates',
          items: [
            'cli/ca-certificates/create',
            'cli/ca-certificates/create_verification_code',
            'cli/ca-certificates/delete',
            'cli/ca-certificates/get',
            'cli/ca-certificates/list',
            'cli/ca-certificates/update',
          ],
        },
        {
          type: 'category',
          label: 'cohorts',
          items: [
            'cli/cohorts/create',
            'cli/cohorts/list',
            'cli/cohorts/get',
            'cli/cohorts/update',
          ],
        },
        {
          type: 'category',
          label: 'deployments',
          items: [
            'cli/deployments/create',
            'cli/deployments/delete',
            'cli/deployments/get',
            'cli/deployments/list',
            'cli/deployments/update',
          ],
        },
        {
          type: 'category',
          label: 'devices',
          items: [
            'cli/devices/create',
            'cli/devices/delete',
            'cli/devices/get',
            'cli/devices/list',
            'cli/devices/update',
            'cli/devices/authenticate',
          ],
        },
        {
          type: 'category',
          label: 'device certificates',
          items: [
            'cli/device-certificates/create',
            'cli/device-certificates/delete',
            'cli/device-certificates/get',
            'cli/device-certificates/list',
          ],
        },
        {
          type: 'category',
          label: 'firmwares',
          items: [
            'cli/firmwares/create',
            'cli/firmwares/delete',
            'cli/firmwares/get',
            'cli/firmwares/list',
          ],
        },
        {
          type: 'category',
          label: 'organizations',
          items: [
            'cli/organizations/add-user',
            'cli/organizations/get-user',
            'cli/organizations/list-users',
            'cli/organizations/remove-user',
            'cli/organizations/update-user',
          ],
        },
        {
          type: 'category',
          label: 'products',
          items: [
            'cli/products/add-user',
            'cli/products/create',
            'cli/products/delete',
            'cli/products/get',
            'cli/products/get-user',
            'cli/products/list',
            'cli/products/list-users',
            'cli/products/remove-user',
            'cli/products/update',
            'cli/products/update-user',
          ],
        },
        {
          type: 'category',
          label: 'releases',
          items: [
            'cli/releases/create',
            'cli/releases/list',
            'cli/releases/get',
            'cli/releases/update',
          ],
        },
        {
          type: 'category',
          label: 'signing-keys',
          items: [
            'cli/signing-keys/create',
            'cli/signing-keys/delete',
            'cli/signing-keys/get',
            'cli/signing-keys/list',
          ],
        },
        {
          type: 'category',
          label: 'users',
          items: ['cli/users/me'],
        },
      ],
    },
  ],
  reference: [
    // 'reference/agent',
    {
      collapsible: false,
      type: 'category',
      label: 'Account Management',
      items: [
        'reference/organizations',
        'reference/peridio-resource-names',
        'reference/users',
      ],
    },
    {
      collapsible: false,
      type: 'category',
      label: 'Asset Management',
      items: [
        {
          type: 'doc',
          label: 'Artifacts',
          id: 'reference/artifacts',
        },
        {
          type: 'doc',
          label: 'Artifact Versions',
          id: 'reference/artifact-versions',
        },
        {
          type: 'doc',
          label: 'Binaries',
          id: 'reference/binaries',
        },
        {
          type: 'doc',
          label: 'Binary Parts',
          id: 'reference/binary-parts',
        },
        {
          type: 'doc',
          label: 'Binary Signatures',
          id: 'reference/binary-signatures',
        },
        'reference/firmware-signing-keys',
        {
          type: 'doc',
          label: 'Firmware',
          id: 'reference/firmware',
          customProps: { legacy: true },
        },
      ],
    },
    {
      collapsible: false,
      type: 'category',
      label: 'Device Management',
      items: [
        'reference/ca-certificates',
        {
          type: 'doc',
          label: 'Cohorts',
          id: 'reference/cohorts',
        },
        'reference/device-certificates',
        'reference/devices',
        'reference/just-in-time-provisioning',
        'reference/products',
        'reference/verification-certificates',
        'reference/verification-codes',
      ],
    },
    {
      collapsible: false,
      type: 'category',
      label: 'Release Mangement',
      items: [
        {
          type: 'doc',
          label: 'Bundles',
          id: 'reference/bundles',
        },
        {
          type: 'doc',
          label: 'Deployments',
          id: 'reference/deployments',
          customProps: { legacy: true },
        },
        {
          type: 'doc',
          label: 'Releases',
          id: 'reference/releases',
        },
      ],
    },
  ],
  guides: [
    {
      collapsible: false,
      type: 'category',
      label: 'General Availability',
      items: [
        'guides/creating-artifact-versions',
        'guides/creating-artifacts',
        'guides/creating-binaries',
        'guides/creating-bundles',
        'guides/creating-ca-certificates',
        'guides/creating-deployments',
        'guides/creating-devices',
        'guides/creating-firmware',
        'guides/creating-firmware-signing-keys',
        'guides/creating-products',
        'guides/creating-releases',
        'guides/creating-x509-certificates-with-openssl',
        'guides/updating-devices',
      ],
      link: {
        type: 'generated-index',
        title: 'General Availability',
        slug: '/guides',
      },
    },
  ],
}

module.exports = sidebars
