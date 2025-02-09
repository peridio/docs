// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
export default {
  platform: [
    {
      collapsible: true,
      collapsed: false,
      type: 'category',
      label: 'Reference',
      items: [
        'platform/reference/overview',
        {
          type: 'category',
          label: 'Account management',
          items: [
            'platform/reference/organizations',
            'platform/reference/peridio-resource-names',
            'platform/reference/users',
          ],
        },
        {
          type: 'category',
          label: 'Binary management',
          items: [
            {
              type: 'doc',
              label: 'Artifacts',
              id: 'platform/reference/artifacts',
            },
            {
              type: 'doc',
              label: 'Artifact Versions',
              id: 'platform/reference/artifact-versions',
            },
            {
              type: 'doc',
              label: 'Binaries',
              id: 'platform/reference/binaries',
            },
            {
              type: 'doc',
              label: 'Binary Parts',
              id: 'platform/reference/binary-parts',
            },
            {
              type: 'doc',
              label: 'Binary Signatures',
              id: 'platform/reference/binary-signatures',
            },
            'platform/reference/signing-keys',
          ],
        },
        {
          type: 'category',
          label: 'Device management',
          items: [
            {
              type: 'doc',
              label: 'Agent',
              id: 'platform/reference/agent',
            },
            'platform/reference/ca-certificates',
            {
              type: 'doc',
              label: 'Cohorts',
              id: 'platform/reference/cohorts',
            },
            'platform/reference/device-certificates',
            'platform/reference/devices',
            'platform/reference/just-in-time-provisioning',
            'platform/reference/products',
            'platform/reference/verification-certificates',
            'platform/reference/verification-codes',
            'platform/reference/x509',
          ],
        },
        {
          type: 'category',
          label: 'Integration management',
          items: ['platform/reference/webhooks'],
        },
        {
          type: 'category',
          label: 'Bundle mangement',
          items: [
            {
              type: 'doc',
              label: 'Bundles',
              id: 'platform/reference/bundles',
            },
            {
              type: 'doc',
              label: 'Releases',
              id: 'platform/reference/releases',
            },
            {
              type: 'doc',
              label: 'Release channels',
              id: 'platform/reference/release-channels',
            },
            {
              type: 'doc',
              label: 'Bundle overrides',
              id: 'platform/reference/bundle-overrides',
            },
            {
              type: 'doc',
              label: 'Bundle distribution',
              id: 'platform/reference/bundle-distribution',
            },
          ],
        },
        {
          type: 'category',
          label: 'Remote access',
          items: ['platform/reference/tunnels'],
        },
        {
          type: 'category',
          label: 'Web Console',
          items: [
            {
              type: 'doc',
              label: 'Fleet View',
              id: 'platform/reference/fleet-view',
            },
          ],
        },
        {
          type: 'category',
          label: 'Deprecated',
          items: [
            {
              type: 'doc',
              label: 'Firmware',
              id: 'platform/reference/firmware',
            },
            {
              type: 'doc',
              label: 'Deployments',
              id: 'platform/reference/deployments',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Cloud integration',
          items: [
            'platform/guides/cloud-delegated-updates',
          ],
        },
        {
          type: 'category',
          label: 'Binary management',
          items: [
            'platform/guides/introduction-to-binary-management',
            'platform/guides/multipart-uploads-with-binary-parts',
            'platform/guides/creating-artifacts',
            'platform/guides/creating-artifact-versions',
            'platform/guides/creating-signing-keys',
            'platform/guides/creating-binaries',
            'platform/guides/creating-binary-parts',
            'platform/guides/creating-binary-signatures',
          ],
        },
        {
          type: 'category',
          label: 'Device management',
          items: [
            'platform/guides/creating-ca-certificates',
            'platform/guides/creating-devices',
            'platform/guides/creating-products',
            'platform/guides/creating-x509-certificates-with-openssl',
            'platform/guides/creating-x509-certificates-with-peridio',
          ],
        },
        {
          type: 'category',
          label: 'Bundle management',
          items: [
            'platform/guides/introduction-to-bundle-management',
            'platform/guides/creating-bundles',
            'platform/guides/creating-releases',
          ],
        },
        {
          type: 'category',
          label: 'Remote access',
          items: [
            'platform/guides/introduction-to-remote-access',
            'platform/guides/creating-tunnels',
          ],
        },
        {
          type: 'category',
          label: 'Deprecated',
          items: ['platform/guides/creating-firmware', 'platform/guides/creating-deployments'],
        },
      ],
    },
  ],
  integration: [
    {
      type: 'doc',
      label: 'Introduction',
      id: 'integration/introduction',
    },
    {
      collapsible: true,
      collapsed: false,
      type: 'category',
      label: 'Android',
      items: [
        'integration/android/overview',
        {
          collapsible: true,
          type: 'category',
          label: 'Reference designs',
          items: [
            {
              type: 'autogenerated',
              dirName: 'integration/android/reference-designs',
            },
          ],
        },
      ],
    },
    {
      collapsible: true,
      collapsed: false,
      type: 'category',
      label: 'Linux',
      items: [
        'integration/linux/overview',
        {
          collapsible: true,
          type: 'category',
          label: 'Peridio Daemon',
          items: [
            'integration/linux/peridiod/getting-started',
            'integration/linux/peridiod/configuration',
            'integration/linux/peridiod/updates',
            'integration/linux/peridiod/containers',
          ],
        },
        {
          collapsible: true,
          type: 'category',
          label: 'Build Tools',
          items: ['integration/linux/build-tools/yocto', 'integration/linux/build-tools/buildroot'],
        },
        {
          collapsible: true,
          type: 'category',
          label: 'Reference Designs',
          items: [
            {
              type: 'autogenerated',
              dirName: 'integration/linux/reference-designs',
            },
          ],
        },
      ],
    },
  ],
  cli: [
    'cli',
    {
      type: 'autogenerated',
      dirName: 'cli',
    },
  ],
}
