// Renders a 1200x630 Open Graph card for every docs page, plus the site-wide
// default card, into the build output (build/og/...).
//
// Unlike Field Notes cards (committed by `npm run og`), docs-page cards are
// rendered at build time: there are ~250 of them, committing them would add
// tens of MB to the repo, and a card rendered from the same content as the
// page cannot go stale. The theme's DocItem/Metadata points og:image at
// cardPathFor(permalink), and this plugin writes exactly those paths.
//
// The artwork is a generated pixel composition, one per family (scripts/og/pixels.mjs).
//
// A card that cannot be rendered (a title too long for the layout, say) fails
// the build, the same way a broken link does.

const path = require('node:path')
const { mkdir, writeFile } = require('node:fs/promises')

const DOCS_PLUGIN = 'docusaurus-plugin-content-docs'

/** Every docs page across all docs plugin instances, as card input. */
function collectDocs(allContent, cardPathFor, familyFor) {
  const docs = []
  for (const content of Object.values(allContent[DOCS_PLUGIN] ?? {})) {
    for (const version of content.loadedVersions ?? []) {
      for (const doc of version.docs) {
        const family = familyFor(doc.permalink)
        docs.push({
          slug: doc.permalink,
          file: cardPathFor(doc.permalink),
          // `og_title` is an optional shorter headline for the card only.
          title: doc.frontMatter.og_title ?? doc.title,
          description: doc.description,
          eyebrow: family.eyebrow,
          family: family.key,
        })
      }
    }
  }
  return docs
}

module.exports = function ogCardsPlugin() {
  let docs = []
  return {
    name: 'og-cards-plugin',

    async allContentLoaded({ allContent }) {
      const { cardPathFor, familyFor } = await import('../../scripts/og/routes.mjs')
      docs = collectDocs(allContent, cardPathFor, familyFor)
    },

    async postBuild({ outDir }) {
      const { loadFonts, renderNote } = await import('../../scripts/og/render.mjs')
      const { DEFAULT_OG_CARD } = await import('../../scripts/og/routes.mjs')
      const { familyArtwork } = await import('../../scripts/og/pixels.mjs')
      const fonts = await loadFonts()
      const cards = [
        ...docs,
        {
          slug: 'default',
          file: DEFAULT_OG_CARD,
          title: 'Peridio Docs',
          description:
            'Guides, references and hardware support for Avocado OS and Avocado Connect: build, ship and update embedded Linux devices.',
          eyebrow: 'Documentation',
          family: 'default',
        },
      ]

      const started = Date.now()
      const failures = []
      let bytes = 0
      for (const card of cards) {
        try {
          const artwork = await familyArtwork(card.family)
          const { buffer } = await renderNote({ ...card, artwork }, fonts)
          const target = path.join(outDir, card.file)
          await mkdir(path.dirname(target), { recursive: true })
          await writeFile(target, buffer)
          bytes += buffer.length
        } catch (error) {
          failures.push(error.message)
        }
      }
      if (failures.length) {
        throw new Error(
          `Open Graph cards failed for ${failures.length} page(s):\n- ${failures.join('\n- ')}\n` +
            'Shorten the title, or add a shorter `og_title` to the page front matter.'
        )
      }
      console.log(
        `[og-cards] ${cards.length} cards (${(bytes / 1024 / 1024).toFixed(1)} MB) in ${((Date.now() - started) / 1000).toFixed(1)}s`
      )
    },
  }
}
