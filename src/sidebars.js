// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  cli: [
    'cli',
    {
      type: 'category',
      label: 'Commands',
      items: [
        {
          collapsible: false,
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
          collapsible: false,
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
          collapsible: false,
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
          collapsible: false,
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
          collapsible: false,
          type: 'category',
          label: 'organization users',
          items: [
            'cli/organization-users/create',
            'cli/organization-users/delete',
            'cli/organization-users/get',
            'cli/organization-users/list',
            'cli/organization-users/update',
          ],
        },
        {
          collapsible: false,
          type: 'category',
          label: 'products',
          items: [
            'cli/products/create',
            'cli/products/delete',
            'cli/products/get',
            'cli/products/list',
            'cli/products/update',
          ],
        },
        {
          collapsible: false,
          type: 'category',
          label: 'product users',
          items: [
            'cli/product-users/add',
            'cli/product-users/delete',
            'cli/product-users/get',
            'cli/product-users/list',
            'cli/product-users/update',
          ],
        },
        {
          collapsible: false,
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
          collapsible: false,
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
      label: 'Security',
      items: [
        'guides/creating-x509-certificates-with-openssl',
      ],
      link: {
        type: 'generated-index',
        title: 'Guides',
        description: 'Learn about the most important Docusaurus concepts!',
        slug: '/guides',
      },
    },
  ],
};

module.exports = sidebars;
