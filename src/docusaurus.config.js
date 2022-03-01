// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Documentation',
  url: 'https://docs.peridio.com',
  baseUrl: '/',
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
        theme: {
          customCss: [require.resolve('./src/css/custom.css')]
        },
        blog: false,
        docs: {
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
        }
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
        title: 'Peridio',
        logo: {
          alt: 'Peridio logo mark',
          src: 'img/logo.svg',
        },
        items: [
          {
            href: '/reference/api-keys',
            position: 'left',
            label: 'Reference',
          },
          {
            href: '/guides/accepting-an-invite',
            position: 'left',
            label: 'Guides',
          },
          {
            href: '/cli/installation',
            position: 'left',
            label: 'CLI',
          },
          {
            href: '/api/0',
            position: 'left',
            label: 'API',
          },
        ],
      },
      footer: {
        links: [
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Peridio.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
