// Reading Field Notes front matter and interpreting the `image_source` field.
//
// Kept free of side effects beyond plain reads so it can be unit-tested directly.
const fs = require('node:fs')
const path = require('node:path')
const yaml = require('yaml')

const NOTE_FILE = /^\d{4}-\d{2}-\d{2}-.+\.mdx$/

function listNoteFiles(dir) {
  return fs
    .readdirSync(dir)
    .filter((name) => NOTE_FILE.test(name))
    .sort()
    .map((name) => path.join(dir, name))
}

function readNote(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8')
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) {
    throw new Error(`${path.basename(filePath)}: no front matter block`)
  }
  return {
    slug: path.basename(filePath, '.mdx'),
    frontMatter: yaml.parse(match[1]) ?? {},
    body: raw.slice(match[0].length),
  }
}

function parseSource(value) {
  const text = String(value ?? '').trim()
  const at = text.indexOf(':')
  const kind = at === -1 ? '' : text.slice(0, at)
  const ref = at === -1 ? '' : text.slice(at + 1).trim()
  if (!ref || !['unsplash', 'url', 'local'].includes(kind)) {
    throw new Error(
      `unknown image_source form ${JSON.stringify(text)} — expected unsplash:<id>, url:<link> or local:<path>`
    )
  }
  return { kind, ref }
}

function resolveLocalPath(imgRoot, ref) {
  const resolved = path.resolve(imgRoot, ref)
  const root = path.resolve(imgRoot)
  if (resolved !== root && !resolved.startsWith(root + path.sep)) {
    throw new Error(`local source ${JSON.stringify(ref)} resolves outside ${root}`)
  }
  return resolved
}

// Rewrite one scalar front-matter line in place. Used for `image`, whose value
// the author cannot know in advance: the extension depends on whether the source
// turns out to be animated. Returns true when the file changed.
function setFrontMatterField(filePath, key, value) {
  const raw = fs.readFileSync(filePath, 'utf8')
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) {
    throw new Error(`${path.basename(filePath)}: no front matter block`)
  }
  const line = new RegExp(`^${key}:.*$`, 'm')
  if (!line.test(match[1])) {
    throw new Error(`${path.basename(filePath)}: no ${key}: line to update`)
  }
  const updated = match[1].replace(line, `${key}: ${value}`)
  if (updated === match[1]) return false
  fs.writeFileSync(
    filePath,
    `${raw.slice(0, match.index)}---\n${updated}\n---${raw.slice(match.index + match[0].length)}`
  )
  return true
}

module.exports = {
  listNoteFiles,
  readNote,
  parseSource,
  resolveLocalPath,
  setFrontMatterField,
}
