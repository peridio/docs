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
// Hardware solution pages (src/pages, rendered by SolutionLayout) are React
// pages, not docs, so they carry no front matter. Their card copy is read back
// from the page's own built HTML after the build, so the card cannot disagree
// with the page it previews.
//
// A card that cannot be rendered (a title too long for the layout, say) fails
// the build, the same way a broken link does.

const path = require('node:path')
const { readFileSync } = require('node:fs')
const { mkdir, readFile, writeFile } = require('node:fs/promises')

const DOCS_PLUGIN = 'docusaurus-plugin-content-docs'
const PAGES_PLUGIN = 'docusaurus-plugin-content-pages'
const SOLUTION_LAYOUT = /from '@site\/src\/components\/solutions\/SolutionLayout'/

/** Pages rendered by SolutionLayout, as { permalink } (copy is read after the build). */
function collectSolutionPages(allContent, siteDir) {
  const pages = []
  for (const content of Object.values(allContent[PAGES_PLUGIN] ?? {})) {
    for (const page of content ?? []) {
      if (page.type !== 'jsx') continue
      const file = page.source.replace(/^@site\//, `${siteDir}/`)
      if (SOLUTION_LAYOUT.test(readFileSync(file, 'utf8')))
        pages.push({ permalink: page.permalink })
    }
  }
  return pages
}

const decode = (text) =>
  text
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')

function metaContent(html, attr, name) {
  for (const tag of html.match(/<meta\b[^>]*>/g) ?? []) {
    if (!tag.includes(`${attr}="${name}"`)) continue
    const content = tag.match(/content="([^"]*)"/)
    if (content) return decode(content[1])
  }
  return ''
}

/**
 * A solution page's card input, from its built HTML. The page title reads
 * "Product Topic | Subtitle | Peridio"; the card headline is the first part.
 */
async function solutionCard(outDir, permalink, cardPathFor, familyFor) {
  const html = await readFile(
    path.join(outDir, `${permalink.replace(/\/$/, '') || '/index'}.html`),
    'utf8'
  )
  const title = metaContent(html, 'property', 'og:title').split(' | ')[0].trim()
  const family = familyFor(permalink)
  return {
    slug: permalink,
    file: cardPathFor(permalink),
    title,
    description: metaContent(html, 'name', 'description'),
    eyebrow: family.eyebrow,
    family: family.key,
  }
}

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

module.exports = function ogCardsPlugin(context) {
  let docs = []
  let solutionPages = []
  return {
    name: 'og-cards-plugin',

    async allContentLoaded({ allContent }) {
      const { cardPathFor, familyFor } = await import('../../scripts/og/routes.mjs')
      docs = collectDocs(allContent, cardPathFor, familyFor)
      solutionPages = collectSolutionPages(allContent, context.siteDir)
    },

    async postBuild({ outDir }) {
      const { loadFonts, renderNote } = await import('../../scripts/og/render.mjs')
      const { DEFAULT_OG_CARD, cardPathFor, familyFor } = await import(
        '../../scripts/og/routes.mjs'
      )
      const { familyArtwork } = await import('../../scripts/og/pixels.mjs')
      const fonts = await loadFonts()
      const solutions = await Promise.all(
        solutionPages.map(({ permalink }) =>
          solutionCard(outDir, permalink, cardPathFor, familyFor)
        )
      )
      const cards = [
        ...docs,
        ...solutions,
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
