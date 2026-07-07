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
  organizationName: 'peridio',
  projectName: 'peridio-docs',
  trailingSlash: false,
  clientModules: ['./src/clientModules/copyInlineCode.js', './src/clientModules/imageLightbox.js'],
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  plugins: [
    './plugins/yaml-loader-plugin',
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          // Rubik Pi 3 graduated from Under Evaluation to a supported target.
          {
            from: '/hardware/under-evaluation/rubik-pi-3',
            to: '/hardware/qualcomm/rubik-pi-3',
          },
          // The former "Rubik Pi" page now points at the Rubik Pi 3 target.
          { from: '/hardware/qualcomm/rubik-pi', to: '/hardware/qualcomm/rubik-pi-3' },
          // Avocado OS product pages moved under the /avocado-os/ prefix.
          { from: '/about', to: '/avocado-os/about' },
          { from: '/features', to: '/avocado-os/features' },
          { from: '/core-concepts', to: '/avocado-os/core-concepts' },
          { from: '/open-source', to: '/avocado-os/open-source' },
          { from: '/community', to: '/avocado-os/community' },
          // Security pages moved under /avocado-os/security/ (some slugs shortened).
          { from: '/security/secure-boot', to: '/avocado-os/security/secure-boot' },
          {
            from: '/security/filesystem-integrity',
            to: '/avocado-os/security/filesystem-integrity',
          },
          { from: '/security/hardware-backed-encryption', to: '/avocado-os/security/encryption' },
          {
            from: '/security/atomic-update-architecture',
            to: '/avocado-os/security/update-architecture',
          },
          {
            from: '/security/production-ready-features',
            to: '/avocado-os/security/production-ready',
          },
          // Avocado Connect is the successor to Peridio Core; keep old bookmarks alive.
          { from: '/peridio-core/overview', to: '/avocado-connect/overview' },
          { from: '/peridio-core', to: '/avocado-connect/overview' },
        ],
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'hardware',
        path: 'docs-hardware',
        routeBasePath: 'hardware',
        sidebarPath: require.resolve('./sidebars-hardware.js'),
        breadcrumbs: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'guides',
        path: 'docs-guides',
        routeBasePath: 'developer-reference',
        sidebarPath: require.resolve('./sidebars-guides.js'),
        breadcrumbs: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'changelog',
        path: 'docs-changelog',
        routeBasePath: 'changelog',
        sidebarPath: require.resolve('./sidebars-changelog.js'),
        breadcrumbs: true,
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'field-notes',
        routeBasePath: 'field-notes',
        path: 'field-notes',
        blogTitle: 'Field Notes',
        blogDescription:
          'Technical write-ups from the Peridio team — what we are working on, decisions we made, and stories from the field. Engineering content only.',
        showReadingTime: false,
        postsPerPage: 20,
        blogSidebarCount: 0,
        authorsMapPath: 'authors.yml',
        exclude: ['CONTRIBUTING.md', '_template.mdx'],
        feedOptions: {
          type: 'all',
          title: 'Peridio Field Notes',
          description: 'Engineering notes from Peridio',
        },
      },
    ],
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
          path: 'docs-overview',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars-overview.js'),
        },
        theme: {
          customCss: [require.resolve('./src/css/custom.css')],
        },
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      docs: {
        sidebar: {
          hideable: false,
        },
      },
      navbar: {
        hideOnScroll: false,
        logo: {
          alt: 'Peridio Logo',
          src: 'img/peridio-docs-logo.svg',
          srcDark: 'img/peridio-docs-logo-dark.svg',
          style: {
            height: '25px',
            marginTop: '3px',
          },
        },
        items: [
          {
            to: '/',
            label: 'Product Documentation',
            position: 'left',
            activeBaseRegex:
              '^/$|^/(avocado-os|avocado-connect|avocado-desktop|faqs|policies)(/.*)?$',
          },
          {
            to: '/hardware/support-matrix',
            label: 'Hardware',
            position: 'left',
            activeBasePath: 'hardware',
          },
          {
            to: '/developer-reference/getting-started',
            label: 'Developer Reference',
            position: 'left',
            activeBasePath: 'developer-reference',
          },
          {
            to: '/field-notes',
            label: 'Field Notes',
            position: 'left',
            activeBasePath: 'field-notes',
          },
          {
            to: '/changelog/latest',
            label: 'Changelog',
            position: 'left',
            activeBasePath: 'changelog',
          },
        ],
      },
      footer: undefined,
      prism: {
        theme: themes.oneLight,
        darkTheme: themes.oneDark,
        additionalLanguages: ['bash', 'toml', 'ini'],
        magicComments: [
          {
            className: 'docusaurus-highlight-code-line',
            line: 'highlight-next-line',
            block: { start: 'highlight-start', end: 'highlight-end' },
          },
          {
            className: 'code-block-line--added',
            line: 'highlight-added',
            block: { start: 'highlight-added-start', end: 'highlight-added-end' },
          },
          {
            className: 'code-block-line--removed',
            line: 'highlight-removed',
            block: { start: 'highlight-removed-start', end: 'highlight-removed-end' },
          },
          {
            className: 'code-block-line--blue',
            line: 'highlight-blue',
            block: { start: 'highlight-blue-start', end: 'highlight-blue-end' },
          },
          {
            className: 'code-block-line--purple',
            line: 'highlight-purple',
            block: { start: 'highlight-purple-start', end: 'highlight-purple-end' },
          },
          {
            className: 'code-block-line--green',
            line: 'highlight-green',
            block: { start: 'highlight-green-start', end: 'highlight-green-end' },
          },
          {
            className: 'code-block-line--orange',
            line: 'highlight-orange',
            block: { start: 'highlight-orange-start', end: 'highlight-orange-end' },
          },
        ],
      },
    }),
  headTags: [
    {
      tagName: 'script',
      attributes: {},
      innerHTML: `
        // Set the active site theme
        // Options: 'peridio' (purple, default), 'avocado' (green), 'alt' (blue)
        // To switch: change the value below and rebuild
        // document.documentElement.setAttribute('data-site-theme', 'avocado');
      `,
    },
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
        href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&family=Space+Grotesk:wght@300..700&family=Spline+Sans:wght@300..700&display=swap',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Geist:wght@300..700&family=Geist+Mono:wght@400;500;600&display=swap',
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
