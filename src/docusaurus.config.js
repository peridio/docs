// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require('prism-react-renderer')

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
      '@docusaurus/plugin-sitemap',
      {
        changefreq: 'weekly',
        priority: 0.5,
        ignorePatterns: ['/tags/**'],
        filename: 'sitemap.xml',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        breadcrumbs: false,
        path: 'docs',
        routeBasePath: '/',
        sidebarPath: require.resolve('./sidebars.js'),
      },
    ],
    ['@docusaurus/plugin-content-pages', {}],
    [
      '@docusaurus/plugin-google-gtag',
      /** @type {import('@docusaurus/plugin-google-gtag').Options} */
      ({
        trackingID: 'G-XN33JD9H3F',
        anonymizeIP: true,
      }),
    ],
  ],
  themes: [
    [
      '@docusaurus/theme-classic',
      {
        customCss: [require.resolve('./src/css/custom.css')],
      },
    ],
    ['@docusaurus/theme-search-algolia', {}],
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
        theme: {
          options: {
            scrollYOffset: 60,
            disableSearch: true,
          },
          primaryColor: '#3424ee',
        },
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
          { label: 'Platform', to: '/platform/reference/overview' },
          { label: 'Integration', to: '/integration/introduction' },
          { label: 'Admin API', to: '/admin-api' },
          { label: 'Device API', to: '/device-api' },
          { label: 'CLI', to: '/cli' },
          { label: 'Web Console', href: 'https://console.peridio.com', position: 'right' },
        ],
      },
      footer: {
        links: [],
        copyright: `Copyright © ${new Date().getFullYear()} Peridio.`,
      },
      prism: {
        theme: themes.github,
        darkTheme: themes.dracula,
        additionalLanguages: ['bash'],
      },
      algolia: {
        appId: 'EBXD92WI74',
        apiKey: 'cc85a8afb9c77cc48205e2e73eeb0d7a',
        indexName: 'peridio',
      },
    }),
}

module.exports = config
