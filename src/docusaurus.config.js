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
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
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
    './plugins/yaml-loader-plugin',
    ...(process.env.NODE_ENV === 'production'
      ? [
          [
            '@docusaurus/plugin-google-gtag',
            /** @type {import('@docusaurus/plugin-google-gtag').Options} */
            ({
              trackingID: 'G-XN33JD9H3F',
              anonymizeIP: true,
            }),
          ],
        ]
      : []),
  ],
  presets: [
    [
      'classic',
      {
        docs: {
          breadcrumbs: true,
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
            route: 'peridio-core/tools/admin-api/popout',
          },
          {
            id: 'peridio-device-api',
            layout: { title: 'Device API' },
            spec: 'openapi/peridio-device-openapi.yaml',
            route: 'peridio-core/tools/device-api/popout',
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
      docs: {
        sidebar: {
          hideable: true,
        },
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
        hideOnScroll: true,
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
            to: '/overview',
            position: 'left',
            items: [
              {
                type: 'html',
                value:
                  '<div class="dropdown__menu--grid-container"><div class="dropdown__menu--column"><div class="dropdown__menu--section-title">GETTING STARTED</div><a href="/avocado-linux/guides/getting-started" class="dropdown__menu--link">Getting started</a><a href="/avocado-linux/guides/hardware-in-the-loop" class="dropdown__menu--link">Hardware in the Loop</a><a href="/avocado-linux/guides/sideloading" class="dropdown__menu--link">Sideload an Update</a></div><div class="dropdown__menu--column"><div class="dropdown__menu--section-title">CORE PLATFORMS</div><a href="/overview" class="dropdown__menu--link">Overview</a><a href="/avocado-linux/overview" class="dropdown__menu--link">Avocado OS</a><a href="/peridio-core/overview" class="dropdown__menu--link">Peridio Core</a></div><div class="dropdown__menu--column"><div class="dropdown__menu--section-title">RESOURCES</div><a href="/peridio-core/reference/remote-access/tunnels" class="dropdown__menu--link">Remote Access Tunnels</a><a href="/peridio-core/reference/integration-management/webhooks" class="dropdown__menu--link">Webhooks</a><a href="/peridio-core/reference/device-management/ca-certificates" class="dropdown__menu--link">CA Certificates</a></div></div>',
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
                  '<div class="dropdown__menu--grid-container dropdown__menu--hardware"><div class="dropdown__menu--column"><div class="dropdown__menu--section-title">SEMICONDUCTORS</div><a href="/solutions/nxp/imx8mp" class="dropdown__menu--link">NXP i.MX 8M Plus</a><a href="/solutions/raspberry-pi/raspberry-pi-5" class="dropdown__menu--link">Raspberry Pi 5</a><a href="/solutions/nvidia/jetson-orin-nano" class="dropdown__menu--link">NVIDIA Jetson</a></div><div class="dropdown__menu--column"><div class="dropdown__menu--section-title">PRODUCTION READY</div><a href="/solutions/advantech/icam-540" class="dropdown__menu--link">Advantech ICAM 540</a><a href="/solutions/onlogic" class="dropdown__menu--link">OnLogic FR201</a><a href="/solutions/seeed" class="dropdown__menu--link">Seeed reTerminal</a></div></div><div style="margin-top: 1.75rem; text-align: right;"><a href="/hardware/support-matrix" style="font-size: 0.85rem; color: #666; opacity: 0.9; text-decoration: none; transition: opacity 0.2s ease;" onmouseover="this.style.opacity=\'1\'; this.style.color=\'#333\';" onmouseout="this.style.opacity=\'0.9\'; this.style.color=\'#666\';">View all supported hardware →</a></div>',
              },
            ],
          },
          {
            type: 'dropdown',
            label: 'Tools',
            position: 'right',
            items: [
              {
                type: 'html',
                value:
                  '<div class="dropdown__menu--grid-container dropdown__menu--hardware"><div class="dropdown__menu--column"><div class="dropdown__menu--section-title">AVOCADO LINUX</div><a href="/avocado-linux/tools/avocado-cli/overview" class="dropdown__menu--link">Avocado CLI</a><a href="/avocado-linux/tools/avocado-control" class="dropdown__menu--link">Avocado Control</a><a href="/avocado-linux/tools/meta-avocado" class="dropdown__menu--link">Meta Avocado</a></div><div class="dropdown__menu--column"><div class="dropdown__menu--section-title">PERIDIO CORE</div><a href="/peridio-core/tools/admin-api" class="dropdown__menu--link">Admin API</a><a href="/peridio-core/tools/rust-sdk" class="dropdown__menu--link">Admin API Rust SDK</a><a href="/peridio-core/tools/peridio-cli/overview" class="dropdown__menu--link">Peridio CLI</a><a href="/peridio-core/tools/peridio-daemon/overview" class="dropdown__menu--link">Peridio Daemon</a><a href="/peridio-core/tools/device-api" class="dropdown__menu--link">Device API</a></div></div>',
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
      tagName: 'script',
      attributes: {},
      innerHTML: `
        // Early gtag stub to prevent errors in development
        if (typeof window !== 'undefined' && !window.gtag) {
          window.gtag = function() {
            console.warn('[DEV] gtag called but not loaded in development:', Array.from(arguments));
          };
        }
      `,
    },
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
      innerHTML: `
        // Defensive gtag stub for development
        if (typeof window !== 'undefined' && !window.gtag) {
          window.gtag = function() {
            console.warn('[DEV] gtag called but not loaded in development:', arguments);
          };
        }

        // UnifyIntent tracking
        !function(){var e=["identify","page","startAutoPage","stopAutoPage","startAutoIdentify","stopAutoIdentify"];function t(o){return Object.assign([],e.reduce(function(r,n){return r[n]=function(){return o.push([n,[].slice.call(arguments)]),o},r},{}))}window.unify||(window.unify=t(window.unify)),window.unifyBrowser||(window.unifyBrowser=t(window.unifyBrowser));var n=document.createElement("script");n.async=!0,n.setAttribute("src","https://tag.unifyintent.com/v1/LDrzeMh2P67Pebcy3gyjWc/script.js"),n.setAttribute("data-api-key","wk_PdA49XZi_8rJCmEbbb3YJnXGDECJJvKA5wt6fdP14"),n.setAttribute("id","unifytag"),(document.body||document.head).appendChild(n)}();
      `,
    },
  ],
}

export default config
