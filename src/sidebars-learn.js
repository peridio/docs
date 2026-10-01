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
      items: [
        'tutorials/device-heartbeat',
        'tutorials/react-cross-compile',
        'tutorials/rust-cross-compile',
        { type: 'doc', id: 'tutorials/data-egress', customProps: { inDevelopment: true } },
        { type: 'doc', id: 'tutorials/hardware-in-the-loop', customProps: { inDevelopment: true } },
      ],
    },
    'dev-kit-to-production',
  ],
}

export default sidebars
