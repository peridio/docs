#!/usr/bin/env node
/**
 * Validate every ```mermaid block in the docs against mermaid's own parser.
 *
 * Why this exists: `mermaid: true` renders diagrams in the READER's browser, so a
 * malformed diagram does not fail the Docusaurus build the way a broken link or
 * anchor does - it ships and renders an error box on the page. That makes a green
 * build insufficient evidence for a diagram change, which is the one property
 * pre-rendering to SVG would have given us for free. This restores it without
 * adding a headless browser to CI.
 *
 * It self-tests first. A validator that silently stops rejecting anything is worse
 * than no validator, because it reports success forever, so the known-bad cases
 * below must fail before any real block is judged.
 *
 * ESM (.mjs) because mermaid ships ESM only and this package is commonjs.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'

const SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SKIP_DIRS = new Set([
  'node_modules',
  'build',
  '.docusaurus',
  '.cache-references',
  'vendor',
  '.git',
])

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

/**
 * The ```mermaid blocks in one file, with the 1-based line the fence opened on so
 * a failure points at somewhere editable.
 */
function mermaidBlocks(file) {
  const blocks = []
  let current = null
  fs.readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      const trimmed = line.trimEnd()
      if (current === null && trimmed === '```mermaid') current = { line: i + 1, body: [] }
      else if (current !== null && trimmed === '```') {
        blocks.push(current)
        current = null
      } else if (current !== null) current.body.push(line)
    })
  return blocks
}

/**
 * mermaid needs a DOM to initialise, even to parse.
 *
 * Promote the WHOLE window surface, not just window/document/navigator. Parts of
 * mermaid reference browser constructors bare - `box` in a sequence diagram
 * reaches `Option` - and a missing one throws "X is not defined", which is
 * indistinguishable from a syntax error at the call site. That would fail a
 * perfectly valid diagram and block it in CI.
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
  for (const key of Object.getOwnPropertyNames(dom.window)) {
    if (key in globalThis) continue
    try {
      globalThis[key] = dom.window[key]
    } catch {
      // Getter-only or otherwise unassignable; mermaid does not need it.
    }
  }
}

async function parses(mermaid, text) {
  try {
    await mermaid.parse(text)
    return null
  } catch (error) {
    return String(error?.message ?? error)
      .split('\n')[0]
      .trim()
  }
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

  if (!(await selfTest(mermaid))) process.exit(2)

  const files = markdownFiles(SRC)
  let blockCount = 0
  const failures = []

  for (const file of files) {
    for (const block of mermaidBlocks(file)) {
      blockCount++
      const failure = await parses(mermaid, block.body.join('\n'))
      if (failure) failures.push({ file, line: block.line, failure })
    }
  }

  const scope = `${blockCount} mermaid block(s) in ${files.length} markdown file(s)`
  if (failures.length === 0) {
    console.log(`mermaid ok: ${scope}`)
    return
  }

  console.error(`mermaid FAILED: ${failures.length} of ${scope}`)
  for (const { file, line, failure } of failures) {
    console.error(`  ${path.relative(SRC, file)}:${line}: ${failure}`)
  }
  process.exit(1)
}

await main()
