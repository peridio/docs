/**
 * postBuild hook that injects <meta name="robots" content="noindex,nofollow">
 * into every /field-notes HTML page, so crawlers that don't execute the JS
 * redirect still get the no-index signal.
 *
 * The RSS/Atom/JSON feeds are cleaned up by build.sh after docusaurus build
 * completes — postBuild hooks run concurrently across plugins, so this
 * plugin can't reliably see the feed files written by the blog plugin's
 * own postBuild.
 *
 * Pair this with src/clientModules/fieldNotesGate.js (URL/session flag +
 * body class) and the inline head-tag script in docusaurus.config.js
 * (synchronous, flash-free redirect). Remove all four pieces when
 * Field Notes goes public.
 */

const fs = require('fs')
const path = require('path')

const NOINDEX_META = '<meta name="robots" content="noindex,nofollow">'

function injectNoindex(filePath) {
  let html = fs.readFileSync(filePath, 'utf8')
  // Replace any existing robots meta (e.g. an index,follow one another plugin
  // might emit) rather than skipping — we want noindex,nofollow to win.
  const existing = /<meta[^>]+name=["']robots["'][^>]*>/i
  if (existing.test(html)) {
    html = html.replace(existing, NOINDEX_META)
  } else {
    html = html.replace('</head>', `${NOINDEX_META}</head>`)
  }
  fs.writeFileSync(filePath, html)
}

function walkAndInject(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walkAndInject(full)
    } else if (entry.name.endsWith('.html')) {
      injectNoindex(full)
    }
  }
}

module.exports = function fieldNotesPreviewGatePlugin() {
  return {
    name: 'field-notes-preview-gate',
    async postBuild({ outDir }) {
      const fieldNotesDir = path.join(outDir, 'field-notes')
      if (fs.existsSync(fieldNotesDir) && fs.statSync(fieldNotesDir).isDirectory()) {
        walkAndInject(fieldNotesDir)
      }

      const listPage = path.join(outDir, 'field-notes.html')
      if (fs.existsSync(listPage)) {
        injectNoindex(listPage)
      }
    },
  }
}
