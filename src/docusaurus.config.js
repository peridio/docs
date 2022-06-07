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
        id: 'cremini',
        path: 'cremini/docs',
        routeBasePath: '/cremini',
        sidebarPath: require.resolve('./cremini-sidebars.js'),
        remarkPlugins: [mdxMermaid],
      },
    ],
    [
      '@docusaurus/plugin-content-docs', {
        breadcrumbs: false,
        id: 'chanterelle',
        path: 'chanterelle/docs',
        routeBasePath: '/chanterelle',
        sidebarPath: require.resolve('./chanterelle-sidebars.js'),
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
            route: '/cremini/admin-api',
            id: 'cremini-admin',
            layout: { title: 'API' },
            spec: 'cremini/openapi/peridio-admin-openapi.yaml',
          },
          {
            route: '/cremini/device-api',
            id: 'cremini-device',
            layout: { title: 'API' },
            spec: 'cremini/openapi/peridio-device-openapi.yaml',
          },
          {
            route: '/chanterelle/api',
            id: 'chanterelle',
            layout: { title: 'API' },
            spec: 'chanterelle/openapi/openapi.yaml',
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
        items: [],
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
