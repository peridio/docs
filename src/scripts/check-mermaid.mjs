#!/usr/bin/env node
/**
 * Validate every mermaid diagram in the docs against mermaid itself.
 *
 * Why this exists: `mermaid: true` renders diagrams in the READER's browser, so a
 * malformed diagram does not fail the Docusaurus build the way a broken link or
 * anchor does - it ships and renders an error box on the page. That makes a green
 * build insufficient evidence for a diagram change, which is the one property
 * pre-rendering to SVG would have given us for free. This restores it without
 * adding a headless browser to CI.
 *
 * Blocks are found by parsing markdown to mdast and selecting code nodes whose
 * lang is `mermaid`, which is exactly what Docusaurus does
 * (@docusaurus/mdx-loader/lib/remark/mermaid transforms any code node with
 * lang === 'mermaid'). Matching the parser rather than guessing at fences is what
 * keeps the two from disagreeing: a hand-rolled scanner has to re-derive
 * indentation, fence characters and fence lengths, and every case it gets wrong is
 * a diagram that renders for readers and is never checked here.
 *
 * It self-tests first - the scanner, the file walk, and the validator. A validator
 * that silently stops rejecting anything is worse than no validator, because it
 * reports success forever.
 *
 * ESM (.mjs) because mermaid ships ESM only and this package is commonjs.
 */
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'
import { mdxFromMarkdown } from 'mdast-util-mdx'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { mdxjs } from 'micromark-extension-mdxjs'
import { visit } from 'unist-util-visit'

const SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SKIP_DIRS = new Set([
  'node_modules',
  'build',
  '.docusaurus',
  '.cache-references',
  'vendor',
  '.git',
])

// Mirrors what Docusaurus actually parses with: MDX, not CommonMark. A mermaid
// fence on the line directly after a JSX/HTML open tag (`<TabItem>`,
// `<details><summary>`) is a code node under an MDX element, not a top-level
// CommonMark code node - plain `fromMarkdown()` misses it entirely, so a broken
// diagram in that position passed this gate silently.
const MDX_PARSE_OPTIONS = { extensions: [mdxjs()], mdastExtensions: [mdxFromMarkdown()] }

/**
 * Blank out a leading YAML frontmatter block, keeping every later line number
 * unchanged.
 *
 * Docusaurus slices frontmatter off with gray-matter before content ever
 * reaches remark/MDX, so the real renderer never sees it. Author-facing
 * frontmatter comments routinely contain stray `<tags>` (see
 * `field-notes/_template.mdx`'s `<slug>` placeholder) that are harmless as
 * YAML but not balanced MDX, so leaving them in front of the MDX-aware parser
 * below throws on files that build just fine.
 */
function stripFrontmatter(text) {
  const match = /^---\r?\n[\s\S]*?\r?\n---\r?\n/.exec(text)
  if (!match) return text
  const newlineCount = (match[0].match(/\n/g) || []).length
  return '\n'.repeat(newlineCount) + text.slice(match[0].length)
}

/** Every markdown file under `dir`, skipping generated and vendored trees. */
function markdownFiles(dir) {
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...markdownFiles(full))
    else if (/\.mdx?$/.test(entry.name)) out.push(full)
  }
  return out
}

/** Pull every `code` node with `lang === 'mermaid'` out of a parsed tree. */
function collectMermaidBlocks(tree) {
  const blocks = []
  visit(tree, 'code', (node) => {
    // Docusaurus accepts metadata after the language (```mermaid title="...").
    // mdast puts the language in `lang` and the rest in `meta`, so metadata needs
    // no handling here - which is where the old regex had to guess.
    if (node.lang !== 'mermaid') return
    blocks.push({ line: node.position.start.line, body: node.value })
  })
  return blocks
}

/**
 * The mermaid diagrams in `text`, each with the 1-based line its fence opened on.
 *
 * Everything context-sensitive falls out of using the real parser rather than
 * being special-cased:
 *
 *  - Indented fences (inside a list item), `~~~mermaid`, and fences longer than
 *    three characters are all ordinary code nodes, so they are found.
 *  - A mermaid fence inside a LONGER fence - the CommonMark-correct way to show
 *    mermaid source on a page - belongs to the outer code node's value, so it is
 *    not a diagram and is not validated. Documenting a deliberately-bad example no
 *    longer fails CI.
 *  - A fence inside an HTML comment is part of an `html` node, not a code node, so
 *    commented-out diagrams are inert here exactly as they are for a reader.
 *  - An unclosed fence runs to end of document per CommonMark, which is what
 *    Docusaurus renders too; it arrives here as one block whose body is the rest of
 *    the file, and mermaid rejects it with a line number inside the file.
 *  - A fence directly after a JSX/HTML open tag (`<TabItem>`, `<details><summary>`)
 *    is a code node nested under that element, which only an MDX-aware parse
 *    sees - plain CommonMark treats the tag as inert HTML and never re-enters
 *    block context for what follows, so the fence is silently dropped.
 *
 * MDX-aware parsing is tried first. Docusaurus applies its own compat
 * preprocessing before MDX ever runs (escaped `{#heading-ids}`, HTML-comment
 * support) that this scanner does not reproduce, so a file whose surrounding
 * prose trips the plain MDX parser falls back to the CommonMark scan the old
 * version of this script always used. That fallback is a real, reported
 * coverage gap for that one file - not a silent one, and not a crash.
 */
function scanMermaid(text) {
  const body = stripFrontmatter(text)
  try {
    return { blocks: collectMermaidBlocks(fromMarkdown(body, MDX_PARSE_OPTIONS)), degraded: false }
  } catch (error) {
    return {
      blocks: collectMermaidBlocks(fromMarkdown(body)),
      degraded: true,
      degradeReason: String(error?.message ?? error).split('\n')[0],
    }
  }
}

function mermaidBlocks(file) {
  return scanMermaid(fs.readFileSync(file, 'utf8'))
}

/**
 * DOM constructors that Node also defines, so a plain "skip what is already
 * global" loop leaves them pointing at Node's realm while mermaid operates on
 * jsdom's. `globalThis.Event !== dom.window.Event` makes
 * `document.body.dispatchEvent(new Event('x'))` throw "parameter 1 is not of type
 * 'Event'", and parses() would report that as the author's diagram being invalid.
 */
const CROSS_REALM_GLOBALS = [
  'Event',
  'EventTarget',
  'DOMException',
  'CustomEvent',
  'MessageEvent',
  'Blob',
  'File',
  'FormData',
  'WebSocket',
  'AbortController',
  'AbortSignal',
  'URL',
  'URLSearchParams',
  'crypto',
  'performance',
  'MutationObserver',
]

/**
 * mermaid needs a DOM to initialise, even to parse.
 *
 * Promote the whole window surface. Parts of mermaid reference browser
 * constructors bare - `box` in a sequence diagram reaches `Option` - and a missing
 * one throws "X is not defined", which is indistinguishable from a syntax error at
 * the call site. That would fail a perfectly valid diagram and block it in CI.
 */
function installDom() {
  const dom = new JSDOM('<!DOCTYPE html><body></body>', { pretendToBeVisual: true })
  globalThis.window = dom.window
  globalThis.document = dom.window.document
  // Recent node exposes `navigator` as a getter-only global, so define it.
  Object.defineProperty(globalThis, 'navigator', {
    value: dom.window.navigator,
    configurable: true,
  })
  const assign = (key) => {
    try {
      Object.defineProperty(globalThis, key, {
        value: dom.window[key],
        writable: true,
        configurable: true,
      })
      return true
    } catch {
      // Getter-only or otherwise unassignable; mermaid does not need it.
      return false
    }
  }
  // Force the names Node shadows, so mermaid and the document share one realm.
  for (const key of CROSS_REALM_GLOBALS) {
    if (key in dom.window) assign(key)
  }
  for (const key of Object.getOwnPropertyNames(dom.window)) {
    if (key in globalThis) continue
    assign(key)
  }
  installSvgMetrics(dom)
}

/**
 * jsdom implements no SVG layout, so the measurement calls mermaid uses to place
 * text do not exist. Without these, render() throws "text2.getBBox is not a
 * function" on a perfectly valid flowchart - an infrastructure failure that is
 * indistinguishable from a diagram bug at the call site.
 *
 * The numbers are fixed rather than real. That is the accepted limit of this
 * approach: a failure which only manifests at a particular text width cannot be
 * caught here. What it does buy is every render-time failure that does not depend
 * on metrics, which is the class that ships an error box - a gantt whose task
 * carries an unparseable date is the case that motivated it.
 */
function installSvgMetrics(dom) {
  const proto = dom.window.SVGElement?.prototype
  if (!proto) return
  if (!proto.getBBox) {
    proto.getBBox = function () {
      return { x: 0, y: 0, width: 100, height: 20 }
    }
  }
  if (!proto.getComputedTextLength) {
    proto.getComputedTextLength = function () {
      return 100
    }
  }
  if (!proto.getExtentOfChar) {
    proto.getExtentOfChar = function () {
      return { x: 0, y: 0, width: 8, height: 16 }
    }
  }
  if (!proto.getNumberOfChars) {
    proto.getNumberOfChars = function () {
      return (this.textContent || '').length
    }
  }
}

/**
 * Validate one diagram, returning null when it is fine or the full failure text.
 *
 * `parse` is a syntax check only, so a diagram that parses and then throws while
 * rendering still ships the error box this gate exists to prevent. We own a DOM
 * already, so render it too and report either failure.
 *
 * The whole message is kept, not just its first line: mermaid's parse errors carry
 * the caret, the offending token and the `Expecting` list on the lines after the
 * summary, and those are the part that tells an author what to change.
 */
async function parses(mermaid, text, id = 'check') {
  try {
    await mermaid.parse(text)
  } catch (error) {
    return String(error?.message ?? error).trimEnd()
  }
  try {
    await mermaid.render(`${id}-${renderSeq++}`, text)
  } catch (error) {
    return `renders as an error box: ${String(error?.message ?? error).trimEnd()}`
  }
  return null
}

let renderSeq = 0

/**
 * Re-point line numbers inside a mermaid message at the file.
 *
 * mermaid counts from the start of the diagram body, so printing its number
 * against the fence line names a line the author did not write. The body begins on
 * the line after the fence.
 */
function absolutize(message, fenceLine) {
  return message.replace(/\bline (\d+)\b/g, (_, n) => `line ${fenceLine + Number(n)}`)
}

/** Indent a multi-line failure so it reads as one finding under its location. */
function indent(message) {
  return message
    .split('\n')
    .map((line) => `      ${line}`)
    .join('\n')
}

/**
 * Prove the scanner still finds what it claims to.
 *
 * The parser self-test cannot cover this: a block the scanner never yields is
 * never handed to mermaid, so a scanner that silently finds nothing reports
 * "0 blocks, ok" and every diagram in the repo goes unchecked.
 */
function selfTestScanner() {
  const cases = [
    ['bare fence', '```mermaid\nflowchart TD\n  a --> b\n```', 1],
    ['fence with metadata', '```mermaid title="x"\nflowchart TD\n  a --> b\n```', 1],
    ['two blocks', '```mermaid\na\n```\ntext\n```mermaid\nb\n```', 2],
    ['non-mermaid fence ignored', '```bash\necho hi\n```', 0],
    // `mermaidjs` is a different language tag, not a mermaid block with metadata.
    ['adjacent language not matched', '```mermaidjs\na\n```', 0],
    // Renderable shapes the old fence regex dropped without a word.
    [
      'indented inside a list item',
      '- item\n\n  ```mermaid\n  flowchart TD\n    a --> b\n  ```',
      1,
    ],
    ['tilde fence', '~~~mermaid\nflowchart TD\n  a --> b\n~~~', 1],
    ['four-backtick fence', '````mermaid\nflowchart TD\n  a --> b\n````', 1],
    ['three-backtick closed by four', '```mermaid\nflowchart TD\n````\ntext\n', 1],
    // Not diagrams, and must not be validated.
    ['mermaid shown inside a longer fence', '````markdown\n```mermaid\nflowkart TD\n```\n````', 0],
    ['commented out', '<!--\n```mermaid\nflowkart TD\n```\n-->', 0],
    // An unclosed fence is one block running to EOF, which is what a reader gets.
    ['unterminated fence', 'intro\n```mermaid\nflowchart TD\n  a --> b', 1],
    // The failure mode this scanner exists to catch: plain CommonMark never
    // re-enters block context after a JSX/HTML open tag, so the fence right
    // after it was previously invisible here while Docusaurus still rendered
    // (and could still break) the diagram.
    [
      'mermaid fence directly after a JSX open tag',
      '<TabItem value="a">\n```mermaid\nflowchart TD\n  a --> b\n```\n</TabItem>',
      1,
    ],
    [
      'mermaid fence directly after a nested HTML open tag',
      '<details>\n<summary>x</summary>\n```mermaid\nflowchart TD\n  a --> b\n```\n</details>',
      1,
    ],
  ]
  for (const [name, text, wantBlocks] of cases) {
    const { blocks } = scanMermaid(text)
    if (blocks.length !== wantBlocks) {
      console.error(
        `self-test FAILED: scanner "${name}" gave ${blocks.length} block(s), expected ${wantBlocks}`
      )
      return false
    }
  }
  // Line numbers are what a failure points at, so pin one rather than trusting it.
  const { blocks: indentedBlocks } = scanMermaid('- item\n\n  ```mermaid\n  flowchart TD\n  ```')
  const [indented] = indentedBlocks
  if (indented.line !== 3) {
    console.error(`self-test FAILED: scanner reported fence line ${indented.line}, expected 3`)
    return false
  }
  // Prose that trips the MDX-aware parse (an unterminated heading-ID brace,
  // here) must still fall back to the CommonMark scan rather than losing the
  // diagram entirely.
  const fallback = scanMermaid('## Heading {#not-a-valid-expr\n\ntext\n\n```mermaid\nflowchart TD\n  a --> b\n```')
  if (!fallback.degraded) {
    console.error('self-test FAILED: scanner did not report degrading on unparseable MDX prose')
    return false
  }
  if (fallback.blocks.length !== 1) {
    console.error(
      `self-test FAILED: fallback scan gave ${fallback.blocks.length} block(s), expected 1`
    )
    return false
  }
  console.log(`self-test ok: scanner agrees on ${cases.length} block shapes`)
  return true
}

/**
 * Prove the file walk still finds files.
 *
 * markdownFiles() is the other way this gate can report success over nothing, and
 * the scanner self-test runs on synthetic strings that never touch it.
 */
function selfTestWalk() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'check-mermaid-'))
  try {
    fs.mkdirSync(path.join(root, 'nested'))
    fs.mkdirSync(path.join(root, 'node_modules'))
    fs.writeFileSync(path.join(root, 'a.md'), '# a')
    fs.writeFileSync(path.join(root, 'nested', 'b.mdx'), '# b')
    fs.writeFileSync(path.join(root, 'c.txt'), 'not markdown')
    fs.writeFileSync(path.join(root, 'node_modules', 'd.md'), '# skipped')
    const found = markdownFiles(root)
      .map((f) => path.relative(root, f))
      .sort()
    const want = ['a.md', path.join('nested', 'b.mdx')].sort()
    if (JSON.stringify(found) !== JSON.stringify(want)) {
      console.error(
        `self-test FAILED: walk found ${JSON.stringify(found)}, expected ${JSON.stringify(want)}`
      )
      return false
    }
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
  console.log('self-test ok: file walk finds nested markdown and skips generated trees')
  return true
}

/**
 * Prove the validator still discriminates. Each known-bad case must be rejected;
 * if any is accepted, the parser or our use of it has drifted and every "OK"
 * below would be meaningless.
 */
async function selfTest(mermaid) {
  const good = [
    ['plain flowchart', 'flowchart TD\n  a["x"] --> b["y"]'],
    // A sequence `box` reaches browser constructors the bare jsdom globals do not
    // provide. Getting that wrong rejects a valid diagram with "Option is not
    // defined", which reads like a syntax error - so pin it here.
    [
      'sequence with a styled box',
      'sequenceDiagram\n  box rgba(37,99,235,0.12) H\n  participant W as w\n  end\n  W->>W: x',
    ],
    [
      'styled flowchart',
      'flowchart TD\n  a["x"] --> b["y"]\n  style a fill:#2563eb1f,stroke:#2563eb',
    ],
  ]
  const bad = [
    ['unknown diagram type', 'flowkart TD\n  a --> b'],
    ['unclosed subgraph', 'flowchart TD\n  subgraph s["t"]\n  a --> b'],
    ['not a diagram', '%%%% nonsense ((('],
    // Passes mermaid.parse() and throws at render, so it is only caught because
    // parses() renders too. Drop the render step and this case goes green while
    // the page ships an error box - which is the whole reason the step is there.
    [
      'parses but fails to render',
      'gantt\n  title t\n  dateFormat YYYY-MM-DD\n  section s\n  task :a1, notadate, 3d',
    ],
  ]

  for (const [name, text] of good) {
    const goodFailure = await parses(mermaid, text)
    if (goodFailure) {
      console.error(`self-test FAILED: valid "${name}" was rejected - ${goodFailure}`)
      return false
    }
  }
  for (const [name, text] of bad) {
    if (!(await parses(mermaid, text))) {
      console.error(`self-test FAILED: "${name}" was accepted, so this check proves nothing`)
      return false
    }
  }
  console.log(`self-test ok: ${good.length} valid accepted, ${bad.length} malformed rejected`)
  return true
}

async function main() {
  installDom()
  const mermaid = (await import('mermaid')).default
  mermaid.initialize({ startOnLoad: false })

  if (!selfTestScanner()) process.exit(2)
  if (!selfTestWalk()) process.exit(2)
  if (!(await selfTest(mermaid))) process.exit(2)

  const files = markdownFiles(SRC)
  let blockCount = 0
  const failures = []
  const generatedFailures = []
  const degradedFiles = []

  // Generated reference pages are written by sync-references from a clone of
  // avocado-linux/references at unpinned origin/main. A malformed diagram
  // committed to THAT repo is not fixable from this one, so failing on it would
  // hand an unrelated repo a red deploy button here. Report it and keep going;
  // authored content stays fail-closed, which is what the gate is for.
  const generated = path.join(SRC, 'docs-guides', 'references')
  const isGenerated = (file) => file.startsWith(generated + path.sep)

  for (const file of files) {
    const { blocks, degraded, degradeReason } = mermaidBlocks(file)
    if (degraded) degradedFiles.push({ file, reason: degradeReason })
    for (const block of blocks) {
      blockCount++
      const failure = await parses(mermaid, block.body)
      if (failure) {
        const entry = { file, line: block.line, failure: absolutize(failure, block.line) }
        ;(isGenerated(file) ? generatedFailures : failures).push(entry)
      }
    }
  }

  const scope = `${blockCount} mermaid block(s) in ${files.length} markdown file(s)`

  // Floors. Without these a discovery regression prints "0 mermaid block(s) in 0
  // markdown file(s)" and exits 0 - reporting success over nothing checked, which
  // is the failure mode this whole script exists to rule out.
  if (files.length === 0) {
    console.error(`mermaid FAILED: no markdown files found under ${SRC} - the walk is broken`)
    process.exit(2)
  }
  if (blockCount === 0) {
    console.error(
      `mermaid FAILED: ${files.length} markdown file(s) scanned and not one mermaid block found. ` +
        'The docs do contain diagrams, so this means the scanner stopped finding them.'
    )
    process.exit(2)
  }

  // The generated tree is absent until sync-references has run. That is a real
  // coverage hole rather than a pass - say so rather than letting the total
  // imply full coverage.
  if (!fs.existsSync(generated)) {
    console.warn(
      'mermaid warning: src/docs-guides/references/ is absent, so generated reference ' +
        'pages were NOT checked. Run `npm run sync-references` first to include them.'
    )
  }

  if (generatedFailures.length > 0) {
    console.warn(
      `mermaid warning: ${generatedFailures.length} malformed diagram(s) in generated ` +
        'reference pages. These come from avocado-linux/references and cannot be fixed ' +
        'here, so they do not fail this check - fix them upstream.'
    )
    for (const { file, line, failure } of generatedFailures) {
      console.warn(`  ${path.relative(SRC, file)}:${line}:`)
      console.warn(indent(failure))
    }
  }

  if (degradedFiles.length > 0) {
    console.warn(
      `mermaid warning: ${degradedFiles.length} file(s) fell back to a CommonMark-only scan ` +
        'because their surrounding prose is not valid plain MDX (Docusaurus applies compat ' +
        'preprocessing this scanner does not reproduce - escaped heading IDs, HTML-comment ' +
        'support). A mermaid fence directly after a JSX/HTML open tag in one of these files ' +
        'would not be found.'
    )
    for (const { file, reason } of degradedFiles) {
      console.warn(`  ${path.relative(SRC, file)}: ${reason}`)
    }
  }

  if (failures.length === 0) {
    console.log(`mermaid ok: ${scope}`)
    return
  }

  console.error(`mermaid FAILED: ${failures.length} of ${scope}`)
  for (const { file, line, failure } of failures) {
    console.error(`  ${path.relative(SRC, file)}:${line}:`)
    console.error(indent(failure))
  }
  process.exit(1)
}

await main()
