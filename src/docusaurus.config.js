// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Peridio Documentation',
  tagline: 'How it works and how to use it',
  url: 'https://peridio.github.io',
  baseUrl: '/parasola/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'peridio', // Usually your GitHub org/user name.
  projectName: 'parasola', // Usually your repo name.
  trailingSlash: false,

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          // ... other options
        },
      },
    ],
    [
      'redocusaurus',
      {
        debug: true,
        specs: [{
          spec: 'static/openapi/openapi.yaml',
        }],
      }
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Peridio Documentation',
        logo: {
          alt: 'Peridio logo mark',
          src: 'img/logo.svg',
        },
        items: [
          {
            href: '/api/0',
            position: 'left',
            label: 'API Reference',
          },
          {
            href: 'https://github.com/peridio',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'API Reference',
                to: '/api/0',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/peridio',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Very. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
