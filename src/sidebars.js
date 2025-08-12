// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
export default {
  platform: [
    {
      type: 'doc',
      label: 'Getting started',
      id: 'platform/getting-started',
    },
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
          items: ['platform/guides/cloud-delegated-updates'],
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
            'platform/guides/custom-binary-backends',
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
  'dev-center': [
    {
      type: 'category',
      label: '🚧 Getting Started',
      link: {
        type: 'doc',
        id: 'dev-center/index',
      },
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'dev-center/getting-started/provision-device',
          label: '🚧 Provision Device',
        },
        {
          type: 'doc',
          id: 'dev-center/getting-started/program-device',
          label: '🚧 Program Device',
        },
        {
          type: 'doc',
          id: 'dev-center/getting-started/first-ota-update',
          label: '🚧 First OTA Update',
        },
      ],
    },
    {
      type: 'category',
      label: 'Avocado OS',
      link: {
        type: 'doc',
        id: 'dev-center/avocado-linux/introduction',
      },
      collapsible: true,
      collapsed: true,
      items: [
        'dev-center/avocado-linux/system-requirements',
        'dev-center/avocado-linux/architecture-overview',
        'dev-center/avocado-linux/development-environment',
        'dev-center/avocado-linux/system-extensions',
        'dev-center/avocado-linux/build-provisioning',
        'dev-center/avocado-linux/security-implementation',
        'dev-center/avocado-linux/update-mechanisms',
        'dev-center/avocado-linux/porting-guide',
      ],
    },
    {
      type: 'category',
      label: 'Peridio Core',
      link: {
        type: 'doc',
        id: 'dev-center/peridio-core/introduction',
      },
      collapsible: true,
      collapsed: true,
      items: [
        'dev-center/peridio-core/device-management',
        {
          type: 'category',
          label: 'Tunnels (Remote Access)',
          link: {
            type: 'doc',
            id: 'dev-center/tunnels/overview',
          },
          items: [
            'dev-center/tunnels/getting-started',
            'dev-center/tunnels/ssh-tunnels',
            'dev-center/tunnels/http-tunnels',
            'dev-center/tunnels/security',
            'dev-center/tunnels/troubleshooting',
          ],
        },
        {
          type: 'category',
          label: 'Firmware Management',
          link: {
            type: 'doc',
            id: 'dev-center/peridio-core/firmware-management/overview',
          },
          items: [
            'dev-center/peridio-core/firmware-management/artifacts',
            'dev-center/peridio-core/firmware-management/artifact-versions',
            'dev-center/peridio-core/firmware-management/binaries',
            'dev-center/peridio-core/firmware-management/binary-parts',
            'dev-center/peridio-core/firmware-management/binary-signatures',
            'dev-center/peridio-core/firmware-management/signing-keys',
          ],
        },
        {
          type: 'doc',
          id: 'dev-center/peridio-core/system-architecture',
          label: 'System Architecture',
        },
        {
          type: 'doc',
          id: 'dev-center/peridio-core/organization-management',
          label: 'Organization Management',
        },
        { type: 'doc', id: 'dev-center/peridio-core/onboarding-flow', label: 'Onboarding Flow' },
      ],
    },
    {
      type: 'category',
      label: '🚧 Supported Hardware',
      link: {
        type: 'doc',
        id: 'dev-center/hardware/supported-hardware',
      },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Production Ready',
          link: {
            type: 'doc',
            id: 'dev-center/hardware/production-ready/index',
          },
          items: [
            {
              type: 'doc',
              id: 'dev-center/hardware/production-ready/seeed-reterminal',
              label: '🚧 Seeed reTerminal',
            },
            {
              type: 'doc',
              id: 'dev-center/hardware/production-ready/icam540',
              label: '🚧 iCam540',
            },
            {
              type: 'doc',
              id: 'dev-center/hardware/production-ready/onlogic-factor',
              label: '🚧 OnLogic Factor 201/202',
            },
          ],
        },
        {
          type: 'doc',
          id: 'dev-center/hardware/nvidia/jetson-orin-nano-evk',
          label: '🚧 NVIDIA Jetson Orin Nano EVK',
        },
        {
          type: 'doc',
          id: 'dev-center/hardware/nxp/frdm-imx-93',
          label: '🚧 NXP i.MX 93 FRDM SBC',
        },
        { type: 'doc', id: 'dev-center/hardware/nxp/imx8mp', label: '🚧 NXP i.MX 8MP EVK' },
        {
          type: 'doc',
          id: 'dev-center/hardware/raspberry-pi/compute-module-4',
          label: '🚧 Raspberry Pi Compute Module 4',
        },
        { type: 'doc', id: 'dev-center/hardware/qemu', label: '🚧 QEMU (Virtual Machine)' },
        { type: 'doc', id: 'dev-center/hardware/coming-soon', label: '🚀 Coming Soon' },
      ],
    },
    {
      type: 'category',
      label: '🚧 Integration / Guides',
      link: {
        type: 'doc',
        id: 'dev-center/integration/index',
      },
      collapsible: true,
      collapsed: true,
      items: [
        'dev-center/integration/peridiod-agent',
        'dev-center/integration/evk',
        'dev-center/integration/cloud-delegated-updates',
        {
          type: 'category',
          label: 'Webhooks',
          link: {
            type: 'doc',
            id: 'dev-center/integration/webhooks/overview',
          },
          items: [
            'dev-center/integration/webhooks/configuration',
            'dev-center/integration/webhooks/events-and-payloads',
            'dev-center/integration/webhooks/security',
            'dev-center/integration/webhooks/troubleshooting',
          ],
        },
        {
          type: 'category',
          label: 'External CDN',
          link: {
            type: 'doc',
            id: 'dev-center/integration/external-cdn/overview',
          },
          items: [
            'dev-center/integration/external-cdn/aws-s3-setup',
            'dev-center/integration/external-cdn/aws-cloudfront-setup',
            'dev-center/integration/external-cdn/geographic-distribution',
            'dev-center/integration/external-cdn/cost-optimization',
          ],
        },
        {
          type: 'category',
          label: 'Certificates',
          link: {
            type: 'doc',
            id: 'dev-center/integration/certificates/overview',
          },
          items: [
            'dev-center/integration/certificates/certificate-types',
            'dev-center/integration/certificates/certificate-lifecycle',
            'dev-center/integration/certificates/creation-methods',
            'dev-center/integration/certificates/security-best-practices',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Tools',
      link: {
        type: 'doc',
        id: 'dev-center/tools/index',
      },
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'dev-center/tools/cli', label: 'Peridio CLI' },
        { type: 'doc', id: 'dev-center/tools/device-api', label: 'Device API' },
        { type: 'doc', id: 'dev-center/tools/admin-api', label: 'Admin API' },
      ],
    },
    {
      type: 'category',
      label: '🚧 Policies',
      link: {
        type: 'doc',
        id: 'dev-center/policies/index',
      },
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'dev-center/policies/coc', label: 'Code of Conduct' },
        { type: 'doc', id: 'dev-center/policies/privacy', label: 'Privacy Statement' },
      ],
    },
  ],
}
