// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require('prism-react-renderer')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Docs',
  url: 'https://docs.peridio.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.svg',
  organizationName: 'peridio', // Usually your GitHub org/user name.
  projectName: 'peridio-docs', // Usually your repo name.
  trailingSlash: false,
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    ['classic', {
      docs: {
        breadcrumbs: false,
        path: 'docs',
        routeBasePath: '/',
        sidebarPath: require.resolve('./sidebars.js'),
        id: 'docs1',
      },
      theme: {
        customCss: [require.resolve('./src/css/custom.css')],
      },
    }],
    [
      'redocusaurus',
      {
        specs: [
          {
            id: 'peridio-admin-api',
            layout: { title: 'Admin API' },
            spec: 'openapi/peridio-admin-openapi.yaml',
            route: 'admin-api',
          },
          {
            id: 'peridio-device-api',
            layout: { title: 'Device API' },
            spec: 'openapi/peridio-device-openapi.yaml',
            route: 'device-api',
          },
        ],
        config: './redocly.yaml',
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
          // Items are now handled by the custom MegaMenuNavbar component
        ],
      },
      footer: {
        links: [],
        copyright: `Copyright © ${new Date().getFullYear()} Peridio.`,
      },
      prism: {
        theme: themes.dracula,
        darkTheme: themes.dracula,
        additionalLanguages: ['bash'],
      },
      algolia: {
        appId: 'EBXD92WI74',
        apiKey: 'cc85a8afb9c77cc48205e2e73eeb0d7a',
        indexName: 'peridio',
      },
      zoom: {
        selector: '.markdown > img',
        background: {
          light: 'rgb(255, 255, 255)',
          dark: 'rgb(50, 50, 50)',
        },
        config: {
          // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
        },
      },
      scripts: [
        {
          src: 'https://tag.unifyintent.com/v1/LDrzeMh2P67Pebcy3gyjWc/script.js',
          async: true,
          'data-api-key': 'wk_PdA49XZi_8rJCmEbbb3YJnXGDECJJvKA5wt6fdP14',
          id: 'unifytag',
        },
        {
          innerHTML: `!function(){var e=["identify","page","startAutoPage","stopAutoPage","startAutoIdentify","stopAutoIdentify"];function t(o){return Object.assign([],e.reduce(function(r,n){return r[n]=function(){return o.push([n,[].slice.call(arguments)]),o},r},{}))}window.unify||(window.unify=t(window.unify)),window.unifyBrowser||(window.unifyBrowser=t(window.unifyBrowser))}();`,
        },
      ],
    }),
  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'true',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
      },
    },
  ],
}

export default config
