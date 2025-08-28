// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
export default {
  platform: [
    {
      type: 'doc',
      label: 'Getting Started',
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
          label: 'Account Management',
          items: [
            'platform/reference/organizations',
            'platform/reference/peridio-resource-names',
            'platform/reference/users',
          ],
        },
        {
          type: 'category',
          label: 'Binary Management',
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
          label: 'Device Management',
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
          label: 'Integration Management',
          items: ['platform/reference/webhooks'],
        },
        {
          type: 'category',
          label: 'Bundle Management',
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
              label: 'Release Channels',
              id: 'platform/reference/release-channels',
            },
            {
              type: 'doc',
              label: 'Bundle Overrides',
              id: 'platform/reference/bundle-overrides',
            },
            {
              type: 'doc',
              label: 'Bundle Distribution',
              id: 'platform/reference/bundle-distribution',
            },
          ],
        },
        {
          type: 'category',
          label: 'Remote Access',
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
          label: 'Cloud Integration',
          items: ['platform/guides/cloud-delegated-updates'],
        },
        {
          type: 'category',
          label: 'Binary Management',
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
          label: 'Device Management',
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
          label: 'Bundle Management',
          items: [
            'platform/guides/introduction-to-bundle-management',
            'platform/guides/creating-bundles',
            'platform/guides/creating-releases',
          ],
        },
        {
          type: 'category',
          label: 'Remote Access',
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
  'peridio-cli': [
    'peridio-cli',
    {
      type: 'autogenerated',
      dirName: 'peridio-cli',
    },
  ],
  'avocado-cli': [
    'avocado-cli',
    {
      type: 'autogenerated',
      dirName: 'avocado-cli',
    },
  ],
  'dev-center': [
    {
      type: 'category',
      label: 'Getting Started',
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'getting-started/overview',
        },
        {
          type: 'doc',
          id: 'getting-started/provision-device',
          label: 'Provision Device',
        },
        {
          type: 'doc',
          id: 'getting-started/hardware-in-the-loop',
          label: 'Hardware in the Loop',
        },
        {
          type: 'doc',
          id: 'getting-started/desktop-deploy',
          label: 'Desktop Deploy',
        },
        // {
        //   type: 'doc',
        //   id: 'getting-started/first-ota-update',
        //   label: 'First OTA Update',
        // },
      ],
    },
    {
      type: 'category',
      label: 'Avocado OS',
      link: {
        type: 'doc',
        id: 'avocado-linux/introduction',
      },
      collapsible: true,
      collapsed: true,
      items: [
        'avocado-linux/system-requirements',
        'avocado-linux/architecture-overview',
        'avocado-linux/development-environment',
        'avocado-linux/system-extensions',
        'avocado-linux/user-management',
        'avocado-linux/build-provisioning',
        'avocado-linux/security-implementation',
        'avocado-linux/update-mechanisms',
        'avocado-linux/porting-guide',
      ],
    },
    {
      type: 'category',
      label: 'Peridio Core',
      link: {
        type: 'doc',
        id: 'peridio-core/introduction',
      },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: 'peridio-core/core-concepts',
          label: 'Core Concepts',
        },
        {
          type: 'doc',
          id: 'peridio-core/system-architecture',
          label: 'System Architecture',
        },
        {
          type: 'doc',
          id: 'peridio-core/peridio-resource-names',
          label: 'Peridio Resource Names (PRNs)',
        },
        {
          type: 'category',
          label: 'Device Management',
          link: {
            type: 'doc',
            id: 'peridio-core/device-management/overview',
          },
          items: [
            'peridio-core/device-management/agent',
            'peridio-core/device-management/ca-certificates',
            'peridio-core/device-management/cohorts',
            'peridio-core/device-management/device-certificates',
            'peridio-core/device-management/devices',
            'peridio-core/device-management/just-in-time-provisioning',
            'peridio-core/device-management/products',
            'peridio-core/device-management/verification-certificates',
            'peridio-core/device-management/verification-codes',
            'peridio-core/device-management/x509',
          ],
        },
        {
          type: 'category',
          label: 'Tunnels (Remote Access)',
          link: {
            type: 'doc',
            id: 'tunnels/overview',
          },
          items: [
            'tunnels/getting-started',
            'tunnels/ssh-tunnels',
            'tunnels/http-tunnels',
            'tunnels/security',
            'tunnels/troubleshooting',
          ],
        },
        {
          type: 'category',
          label: 'Firmware Management',
          link: {
            type: 'doc',
            id: 'peridio-core/firmware-management/overview',
          },
          items: [
            'peridio-core/firmware-management/artifacts',
            'peridio-core/firmware-management/artifact-versions',
            'peridio-core/firmware-management/binaries',
            'peridio-core/firmware-management/binary-parts',
            'peridio-core/firmware-management/binary-signatures',
            'peridio-core/firmware-management/signing-keys',
            'peridio-core/firmware-management/bundles',
            'peridio-core/firmware-management/releases',
            'peridio-core/firmware-management/release-channels',
            'peridio-core/firmware-management/bundle-overrides',
            'peridio-core/firmware-management/bundle-distribution',
          ],
        },
        {
          type: 'category',
          label: 'OTA Updates',
          link: {
            type: 'doc',
            id: 'peridio-core/ota/overview',
          },
          items: [
            'peridio-core/ota/avocado-side-loading',
            'peridio-core/ota/cohort-based-releases',
            'peridio-core/ota/quick-deploy-bundle-overrides',
            'peridio-core/ota/deployments-deprecated',
          ],
        },
        {
          type: 'category',
          label: 'Account Management',
          link: {
            type: 'doc',
            id: 'peridio-core/account-management/overview',
          },
          items: [
            'peridio-core/account-management/organizations',
            'peridio-core/account-management/users',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Supported Hardware',
      link: {
        type: 'doc',
        id: 'hardware/supported-hardware',
      },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Silicon',
          items: [
            {
              type: 'doc',
              id: 'hardware/nvidia/jetson-orin-nano-evk',
              label: 'NVIDIA Jetson Orin Nano EVK',
            },
            { type: 'doc', id: 'hardware/nxp/imx8mp', label: 'NXP i.MX 8MP EVK' },
            {
              type: 'doc',
              id: 'hardware/nxp/frdm-imx-93',
              label: 'NXP i.MX 93 FRDM SBC',
            },
            { type: 'doc', id: 'hardware/qemu', label: 'QEMU (Virtual Machine)' },
            {
              type: 'doc',
              id: 'hardware/raspberry-pi/compute-module-4',
              label: 'Raspberry Pi Compute Module 4',
            },
          ],
        },
        {
          type: 'category',
          label: 'Production Ready',
          link: {
            type: 'doc',
            id: 'hardware/production-ready/index',
          },
          items: [
            {
              type: 'html',
              value:
                '<a href="/solutions/advantech/icam-540" target="_blank" rel="noopener noreferrer" class="menu__link" style="display: block;">Advantech ICAM-540</a>',
            },
            {
              type: 'html',
              value:
                '<a href="/solutions/onlogic" target="_blank" rel="noopener noreferrer" class="menu__link" style="display: block;">OnLogic FR201</a>',
            },
            {
              type: 'html',
              value:
                '<a href="/solutions/seeed" target="_blank" rel="noopener noreferrer" class="menu__link" style="display: block;">Seeed reTerminal</a>',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Integration & Guides',
      link: {
        type: 'doc',
        id: 'integration/index',
      },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Peridio Core Rapid Setup',
          link: {
            type: 'doc',
            id: 'integration/peridio-core-rapid-setup',
          },
          items: ['integration/evk'],
        },
        'integration/peridiod-agent',
        'integration/cloud-delegated-updates',
        {
          type: 'category',
          label: 'Peridio Core Custom Integration',
          link: {
            type: 'doc',
            id: 'integration/guides/peridio-core-custom-integration/introduction',
          },
          collapsible: true,
          collapsed: false,
          items: [
            {
              type: 'category',
              label: 'Android',
              items: [
                'integration/guides/peridio-core-custom-integration/android/overview',
                {
                  type: 'category',
                  label: 'Reference Designs',
                  items: [
                    {
                      type: 'autogenerated',
                      dirName:
                        'integration/guides/peridio-core-custom-integration/android/reference-designs',
                    },
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'Linux',
              items: [
                'integration/guides/peridio-core-custom-integration/linux/overview',
                {
                  type: 'category',
                  label: 'Peridio Daemon',
                  items: [
                    'integration/guides/peridio-core-custom-integration/linux/peridiod/getting-started',
                    'integration/guides/peridio-core-custom-integration/linux/peridiod/configuration',
                    'integration/guides/peridio-core-custom-integration/linux/peridiod/updates',
                    'integration/guides/peridio-core-custom-integration/linux/peridiod/containers',
                  ],
                },
                {
                  type: 'category',
                  label: 'Build Tools',
                  items: [
                    'integration/guides/peridio-core-custom-integration/linux/build-tools/yocto',
                    'integration/guides/peridio-core-custom-integration/linux/build-tools/buildroot',
                  ],
                },
                {
                  type: 'category',
                  label: 'Reference Designs',
                  items: [
                    {
                      type: 'autogenerated',
                      dirName:
                        'integration/guides/peridio-core-custom-integration/linux/reference-designs',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Webhooks',
          link: {
            type: 'doc',
            id: 'integration/webhooks/overview',
          },
          items: [
            'integration/webhooks/configuration',
            'integration/webhooks/events-and-payloads',
            'integration/webhooks/security',
            'integration/webhooks/troubleshooting',
          ],
        },
        {
          type: 'category',
          label: 'External CDN',
          link: {
            type: 'doc',
            id: 'integration/external-cdn/overview',
          },
          items: [
            'integration/external-cdn/aws-s3-setup',
            'integration/external-cdn/aws-cloudfront-setup',
            'integration/external-cdn/geographic-distribution',
            'integration/external-cdn/cost-optimization',
          ],
        },
        {
          type: 'category',
          label: 'Certificates',
          link: {
            type: 'doc',
            id: 'integration/certificates/overview',
          },
          items: [
            'integration/certificates/certificate-types',
            'integration/certificates/certificate-lifecycle',
            'integration/certificates/creation-methods',
            'integration/certificates/security-best-practices',
          ],
        },
        {
          type: 'category',
          label: 'Bundle Management',
          link: {
            type: 'doc',
            id: 'integration/bundle-management/overview',
          },
          items: [
            'integration/bundle-management/creating-bundles',
            'integration/bundle-management/creating-releases',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Tools',
      link: {
        type: 'doc',
        id: 'tools/index',
      },
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'tools/avocado-cli', label: 'Avocado CLI' },
        { type: 'doc', id: 'tools/peridio-cli', label: 'Peridio CLI' },
        { type: 'doc', id: 'tools/device-api', label: 'Device API' },
        { type: 'doc', id: 'tools/admin-api', label: 'Admin API' },
      ],
    },
    {
      type: 'category',
      label: 'Policies',
      link: {
        type: 'doc',
        id: 'policies/index',
      },
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'policies/coc', label: 'Code of Conduct' },
        { type: 'doc', id: 'policies/privacy', label: 'Privacy Statement' },
      ],
    },
  ],
}
