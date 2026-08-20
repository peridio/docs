const test = require('node:test')
const assert = require('node:assert/strict')
const path = require('node:path')
const fs = require('node:fs')
const os = require('node:os')
const {
  listNoteFiles,
  readNote,
  parseSource,
  resolveLocalPath,
  setFrontMatterField,
} = require('./notes')

const NOTES_DIR = path.resolve(__dirname, '..', '..', 'field-notes')

test('parseSource reads the three supported forms', () => {
  assert.deepEqual(parseSource('unsplash:Xy7Kf9pQ2aE'), { kind: 'unsplash', ref: 'Xy7Kf9pQ2aE' })
  assert.deepEqual(parseSource('local:python-multiversion-uv.png'), {
    kind: 'local',
    ref: 'python-multiversion-uv.png',
  })
  assert.deepEqual(parseSource('url:https://images.example/a.jpg'), {
    kind: 'url',
    ref: 'https://images.example/a.jpg',
  })
})

test('parseSource keeps subdirectory paths intact', () => {
  assert.deepEqual(parseSource('local:imx8mp-npu-pose/02-demo-layout.jpg'), {
    kind: 'local',
    ref: 'imx8mp-npu-pose/02-demo-layout.jpg',
  })
})

test('parseSource rejects an unknown scheme', () => {
  assert.throws(() => parseSource('ftp:whatever'), /unknown image_source form/)
  assert.throws(() => parseSource('local:'), /unknown image_source form/)
})

test('resolveLocalPath refuses to escape the image root', () => {
  const root = '/repo/static/img/field-notes'
  assert.equal(resolveLocalPath(root, 'a.png'), path.join(root, 'a.png'))
  assert.equal(resolveLocalPath(root, 'sub/a.png'), path.join(root, 'sub/a.png'))
  assert.throws(() => resolveLocalPath(root, '../../etc/passwd'), /outside/)
})

test('the real notes directory parses, and the template is not treated as a note', () => {
  const files = listNoteFiles(NOTES_DIR)
  assert.ok(files.length >= 10, `expected at least 10 notes, found ${files.length}`)
  assert.ok(!files.some((file) => file.endsWith('_template.mdx')))
  for (const file of files) {
    const { slug, frontMatter } = readNote(file)
    assert.match(slug, /^\d{4}-\d{2}-\d{2}-/)
    assert.ok(frontMatter.title, `${slug}: missing title`)
  }
})

test('setFrontMatterField rewrites one line and leaves the body alone', () => {
  const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'fm-')), 'note.mdx')
  fs.writeFileSync(
    file,
    [
      '---',
      "title: 'A note'",
      "image: '' # a stale comment",
      'draft: true',
      '---',
      '',
      'Body text stays.',
      '',
    ].join('\n')
  )
  assert.equal(setFrontMatterField(file, 'image', '/img/field-notes/a-thumb.gif'), true)
  const { frontMatter, body } = readNote(file)
  assert.equal(frontMatter.image, '/img/field-notes/a-thumb.gif')
  assert.equal(frontMatter.title, 'A note')
  assert.equal(frontMatter.draft, true)
  assert.match(body, /Body text stays\./)
  // second call is a no-op, so a re-run does not dirty the file
  assert.equal(setFrontMatterField(file, 'image', '/img/field-notes/a-thumb.gif'), false)
})

test('setFrontMatterField refuses a key that is not present', () => {
  const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'fm-')), 'note.mdx')
  fs.writeFileSync(file, ['---', "title: 'x'", '---', '', 'body', ''].join('\n'))
  assert.throws(() => setFrontMatterField(file, 'image', 'y'), /no image: line/)
})
