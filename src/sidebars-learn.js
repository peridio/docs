// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  learn: [
    'index',
    {
      type: 'category',
      label: 'Get Started',
      collapsible: false,
      collapsed: false,
      items: [
        'get-started/index',
        'get-started/qemu',
        'get-started/raspberry-pi',
        'get-started/jetson',
        'get-started/any-target',
      ],
    },
    {
      type: 'category',
      label: 'Missions',
      collapsible: false,
      collapsed: false,
      items: [
        'missions/first-ota',
        'missions/remote-app',
        'missions/pi-gateway',
        'missions/jetson-vision',
      ],
    },
    {
      type: 'category',
      label: 'Tutorials',
      collapsible: false,
      collapsed: false,
      link: { type: 'doc', id: 'tutorials/index' },
      items: [
        'tutorials/device-heartbeat',
        'tutorials/react-cross-compile',
        'tutorials/rust-cross-compile',
        {
          type: 'link',
          label: 'Data Egress',
          href: '/learn/tutorials#coming-soon',
          customProps: { inDevelopment: true },
        },
      ],
    },
    'dev-kit-to-production',
  ],
}

module.exports = sidebars
