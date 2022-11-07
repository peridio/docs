// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  agent: [
    'agent',
  ],
  cli: [
    'cli',
    {
      collapsible: false,
      type: 'category',
      label: 'Commands',
      items: [
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
          items: [
            'cli/users/me',
          ],
        },
      ],
    },
  ],
  reference: [
    {
      collapsible: false,
      type: 'category',
      label: 'Reference',
      items: [
        'reference/agent',
        'reference/ca-certificates',
        'reference/deployments',
        'reference/device-certificates',
        'reference/devices',
        'reference/firmware-signing-keys',
        'reference/firmwares',
        'reference/just-in-time-provisioning',
        'reference/organizations',
        'reference/products',
        'reference/users',
      ],
      link: {
        type: 'generated-index',
        title: 'Reference',
        description: 'Learn about the most important Docusaurus concepts!',
        slug: '/reference',
      },
    },
  ],
  guides: [
    {
      collapsible: false,
      type: 'category',
      label: 'Guides',
      items: [
        'guides/creating-deployments',
        'guides/creating-firmware',
        'guides/creating-firmware-signing-keys',
        'guides/creating-products',
        'guides/creating-x509-certificates-with-openssl',
      ],
      link: {
        type: 'generated-index',
        title: 'Guides',
        slug: '/guides',
      },
    },
  ],
};

module.exports = sidebars;
