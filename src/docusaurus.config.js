// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require('prism-react-renderer')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Docs',
  url: 'https://docs.peridio.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/logo.svg',
  organizationName: 'peridio', // Usually your GitHub org/user name.
  projectName: 'peridio-docs', // Usually your repo name.
  trailingSlash: false,
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  plugins: [
    'docusaurus-plugin-image-zoom',
    [
      '@docusaurus/plugin-google-gtag',
      /** @type {import('@docusaurus/plugin-google-gtag').Options} */
      ({
        trackingID: 'G-XN33JD9H3F',
        anonymizeIP: true,
      }),
    ],
  ],
  presets: [
    [
      'classic',
      {
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
      },
    ],
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
          src: 'img/peridio-docs-logo.svg',
        },
        items: [
          {
            to: '/',
            label: 'Developer Center',
            position: 'left',
          },
          {
            type: 'dropdown',
            label: 'Documentation',
            position: 'left',
            items: [
              {
                label: 'Getting Started',
                to: '/platform/getting-started/introduction',
              },
              {
                label: 'Avocado OS',
                to: '/integration/linux/introduction',
              },
              {
                label: 'Peridio Core',
                to: '/platform/reference/overview',
              },
              {
                label: 'Supported Hardware',
                to: '/solutions',
              },
              {
                label: 'Integration Guides',
                to: '/integration',
              },
              {
                label: 'Tunnels (Remote Access)',
                to: '/platform/reference/tunnels',
              },
              {
                label: 'Webhooks',
                to: '/platform/reference/webhooks',
              },
              {
                label: 'Certificates',
                to: '/platform/reference/device-certificates',
              },
            ],
          },
          {
            type: 'dropdown',
            label: 'Featured Hardware',
            position: 'left',
            items: [
              {
                label: 'NXP IMX8MP',
                to: '/solutions/nxp/imx8mp',
              },
              {
                label: 'NXP FRDM 93',
                to: '/solutions/nxp/frdm-93',
              },
              {
                label: 'Raspberry Pi',
                to: '/solutions/raspberry-pi/raspberry-pi',
              },
              {
                label: 'NVIDIA Jetson',
                to: '/solutions/nvidia/jetson-orin-nano',
              },
              {
                label: 'Advantech ICAM 540',
                to: '/solutions/advantech/icam-540',
              },
              {
                label: 'OnLogic FR201',
                to: '/solutions/onlogic',
              },
              {
                label: 'Seeed reTerminal',
                to: '/solutions/seeed',
              },
            ],
          },
          {
            type: 'dropdown',
            label: 'Tools',
            position: 'left',
            items: [
              {
                label: 'CLI',
                to: '/cli',
              },
              {
                label: 'Device API',
                to: '/device-api',
              },
              {
                label: 'Admin API',
                to: '/admin-api',
              },
              {
                label: 'Peridio Agent',
                to: '/integration/linux/agents/peridio-agent',
              },
            ],
          },
          {
            href: 'https://www.peridio.com/sign-up',
            label: 'Sign Up',
            position: 'right',
          },
        ],
      },
      footer: {
        links: [],
        copyright: `Copyright © ${new Date().getFullYear()} Peridio.`,
      },
      prism: {
        theme: themes.dracula,
        darkTheme: themes.dracula,
        additionalLanguages: ['bash', 'toml'],
        // Enable custom magic comments for colored line highlighting
        // See: https://docusaurus.io/docs/markdown-features/code-blocks#highlighting-with-metadata-string
        magicComments: [
          // Keep neutral highlight support (default)
          {
            className: 'docusaurus-highlight-code-line',
            line: 'highlight-next-line',
            block: { start: 'highlight-start', end: 'highlight-end' },
          },
          // Added lines (green)
          {
            className: 'code-block-line--added',
            line: 'highlight-added',
            block: { start: 'highlight-added-start', end: 'highlight-added-end' },
          },
          // Removed lines (red)
          {
            className: 'code-block-line--removed',
            line: 'highlight-removed',
            block: { start: 'highlight-removed-start', end: 'highlight-removed-end' },
          },
        ],
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
    {
      tagName: 'script',
      attributes: {
        async: 'true',
      },
      innerHTML: `!function(){var e=["identify","page","startAutoPage","stopAutoPage","startAutoIdentify","stopAutoIdentify"];function t(o){return Object.assign([],e.reduce(function(r,n){return r[n]=function(){return o.push([n,[].slice.call(arguments)]),o},r},{}))}window.unify||(window.unify=t(window.unify)),window.unifyBrowser||(window.unifyBrowser=t(window.unifyBrowser));var n=document.createElement("script");n.async=!0,n.setAttribute("src","https://tag.unifyintent.com/v1/LDrzeMh2P67Pebcy3gyjWc/script.js"),n.setAttribute("data-api-key","wk_PdA49XZi_8rJCmEbbb3YJnXGDECJJvKA5wt6fdP14"),n.setAttribute("id","unifytag"),(document.body||document.head).appendChild(n)}();`,
    },
  ],
}

export default config
