import assert from 'node:assert/strict'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
import { readNotes } from './notes.mjs'

function noteDir(t, frontMatter) {
  const dir = mkdtempSync(path.join(os.tmpdir(), 'og-notes-'))
  t.after(() => rmSync(dir, { recursive: true, force: true }))
  writeFileSync(
    path.join(dir, '2026-01-01-note.mdx'),
    ['---', ...frontMatter, '---', '', 'Body.', ''].join('\n')
  )
  return dir
}

test('a note published from the template keeps its title when og_title is left blank', (t) => {
  const [note] = readNotes(
    noteDir(t, ["title: 'The page title'", "description: 'A dek'", 'draft: false', "og_title: ''"])
  )
  assert.equal(note.slug, '2026-01-01-note')
  assert.equal(note.title, 'The page title')
})

test('an og_title with no value (YAML null) also falls back to the title', (t) => {
  const [note] = readNotes(noteDir(t, ["title: 'The page title'", 'draft: false', 'og_title:']))
  assert.equal(note.title, 'The page title')
})

test('a set og_title is the card headline', (t) => {
  const [note] = readNotes(
    noteDir(t, ["title: 'The page title'", 'draft: false', "og_title: 'Shorter'"])
  )
  assert.equal(note.title, 'Shorter')
})

test('drafts get no card', (t) => {
  assert.deepEqual(readNotes(noteDir(t, ["title: 'Draft'", 'draft: true'])), [])
})
