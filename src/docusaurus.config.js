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
      announcementBar: {
        id: 'docs-wip-announcement',
        content: `
          <div class="announcement-bar__wrapper">
            <div class="announcement-bar__content">
              <span class="announcement-bar__badge">UNDER DEVELOPMENT</span>
              <div class="announcement-bar__marquee">
                <span class="announcement-bar__message">
                  This documentation site is currently under active migration. Some content may be
                  temporarily unavailable or in transition.
                </span>
              </div>
              <div class="announcement-bar__close-placeholder"></div>
            </div>
          </div>
        `,
        isCloseable: true,
      },
      navbar: {
        logo: {
          alt: 'Peridio Logo',
          src: 'img/peridio-docs-logo.svg',
          style: {
            height: '25px',
            marginTop: '3px',
          },
        },
        items: [
          {
            type: 'dropdown',
            label: 'Documentation',
            position: 'left',
            items: [
              {
                type: 'html',
                value:
                  '<div class="dropdown__menu--grid-container"><div class="dropdown__menu--column"><div class="dropdown__menu--section-title">GETTING STARTED</div><a href="/getting-started/overview" class="dropdown__menu--link">Overview</a><a href="/getting-started/provision-device" class="dropdown__menu--link">Provision Device</a><a href="/getting-started/hardware-in-the-loop" class="dropdown__menu--link">Hardware in the Loop</a><a href="/getting-started/desktop-deploy" class="dropdown__menu--link">Desktop Deploy</a></div><div class="dropdown__menu--column"><div class="dropdown__menu--section-title">CORE PLATFORMS</div><a href="/avocado-linux/introduction" class="dropdown__menu--link">Avocado OS</a><a href="/peridio-core/introduction" class="dropdown__menu--link">Peridio Core</a><a href="/hardware/supported-hardware" class="dropdown__menu--link">Supported Hardware</a><a href="/integration" class="dropdown__menu--link">Integration Guides</a></div><div class="dropdown__menu--column"><div class="dropdown__menu--section-title">RESOURCES</div><a href="/tools" class="dropdown__menu--link">Tools</a><a href="/tunnels/overview" class="dropdown__menu--link">Remote Access Tunnels</a><a href="/integration/webhooks/overview" class="dropdown__menu--link">Webhooks</a><a href="/integration/certificates/overview" class="dropdown__menu--link">Certificates</a></div></div>',
              },
            ],
          },
          {
            type: 'dropdown',
            label: 'Featured Hardware',
            position: 'left',
            className: 'featured-hardware-dropdown',
            items: [
              {
                type: 'html',
                value:
                  '<div class="dropdown__menu--grid-container dropdown__menu--hardware"><div class="dropdown__menu--column"><div class="dropdown__menu--section-title">SILICON</div><a href="/solutions/nxp/imx8mp" class="dropdown__menu--link">NXP IMX8MP</a><a href="/solutions/raspberry-pi/raspberry-pi" class="dropdown__menu--link">Raspberry Pi</a><a href="/solutions/nvidia/jetson-orin-nano" class="dropdown__menu--link">NVIDIA Jetson</a></div><div class="dropdown__menu--column"><div class="dropdown__menu--section-title">PRODUCTION READY</div><a href="/solutions/advantech/icam-540" class="dropdown__menu--link">Advantech ICAM 540</a><a href="/solutions/onlogic" class="dropdown__menu--link">OnLogic FR201</a><a href="/solutions/seeed" class="dropdown__menu--link">Seeed reTerminal</a></div></div>',
              },
            ],
          },
          {
            type: 'dropdown',
            label: 'Tools',
            position: 'right',
            items: [
              {
                label: 'Avocado CLI',
                to: '/avocado-cli',
              },
              {
                label: 'Peridio CLI',
                to: '/peridio-cli',
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
                label: 'Peridio Daemon',
                to: '/peridio-core/device-management/agent',
              },
            ],
          },
          {
            href: 'https://console.peridio.com',
            label: 'Web Console',
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
        apiKey: '94b06f9c5bf6a24e020120fa38784bca',
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
