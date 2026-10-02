// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  learn: [
    'index',
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
  ],
}

module.exports = sidebars
