// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const mdxMermaid = require('mdx-mermaid');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Docs',
  tagline: 'From our minds to yours.',
  url: 'https://docs.peridio.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.svg',
  organizationName: 'peridio', // Usually your GitHub org/user name.
  projectName: 'parasola', // Usually your repo name.
  trailingSlash: false,
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        theme: {
          customCss: [require.resolve('./src/css/custom.css')],
        },
        blog: false,
        docs: {
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          remarkPlugins: [mdxMermaid],
        },
      },
    ],
    [
      'redocusaurus',
      {
        specs: [
          {
            layout: { title: 'API' },
            spec: 'static/openapi/openapi.yaml',
          },
        ],
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        disableSwitch: true,
      },
      navbar: {
        logo: {
          alt: 'Peridio logo color black',
          src: 'img/logo-color-black.svg',
        },
        items: [
          {
            href: '/reference/accounts',
            position: 'left',
            label: 'Reference',
          },
          {
            href: '/cli/authentication',
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
        links: [],
        copyright: `Copyright © ${new Date().getFullYear()} Peridio.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
