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
  plugins: [
    [
      '@docusaurus/plugin-content-docs', {
        breadcrumbs: false,
        path: 'docs',
        routeBasePath: '/',
        sidebarPath: require.resolve('./sidebars.js'),
        remarkPlugins: [mdxMermaid],
      },
    ],
    [
      '@docusaurus/plugin-content-pages', {

      },
    ],
  ],
  themes: [
    [
      '@docusaurus/theme-classic', {
        customCss: [require.resolve('./src/css/custom.css')],
      },
    ],
  ],
  presets: [
    [
      'redocusaurus',
      {
        specs: [
          {
            route: '/admin-api',
            id: 'admin',
            layout: { title: 'API' },
            spec: 'openapi/peridio-admin-openapi.yaml',
          },
          {
            route: '/device-api',
            id: 'device',
            layout: { title: 'API' },
            spec: 'openapi/peridio-device-openapi.yaml',
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
          { label: 'Reference', href: '/reference' },
          { label: 'CLI', href: '/cli' },
          { label: 'Admin API', href: '/admin-api' },
          { label: 'Device API', href: '/device-api' },
          { label: 'Guides', href: '/guides' },
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
