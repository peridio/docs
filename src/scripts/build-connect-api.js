#!/usr/bin/env node

// Generates the Avocado Connect API reference pages under
// docs-guides/avocado-connect-api/ from the committed OpenAPI spec at
// openapi/avocado-connect-openapi.json (sourced from the avocado-connect
// repo: api/priv/openapi/openapi.json).
//
// One page is emitted per OpenAPI tag, in the spec's tag order. Each page
// gets an endpoint summary table, a section per operation, and an "Object
// reference" section for every component schema the tag's operations touch.
// overview.md is hand-maintained and never touched by this script.
//
// Usage: npm run build-connect-api

const fs = require('node:fs')
const path = require('node:path')

const SPEC_PATH = path.resolve(__dirname, '..', 'openapi', 'avocado-connect-openapi.json')
const OUT_DIR = path.resolve(__dirname, '..', 'docs-guides', 'avocado-connect-api')

const spec = JSON.parse(fs.readFileSync(SPEC_PATH, 'utf8'))

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete']

function deref(node) {
  if (node && node.$ref) {
    const parts = node.$ref.replace(/^#\//, '').split('/')
    let target = spec
    for (const part of parts) target = target[part]
    return deref(target)
  }
  return node
}

function refName(node) {
  return node && node.$ref ? node.$ref.split('/').pop() : null
}

// Matches github-slugger closely enough for the headings we generate.
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\- ]+/g, '')
    .replace(/ +/g, '-')
}

function escapeCell(text) {
  if (!text) return ''
  return String(text)
    .replace(/\|/g, '\\|')
    .replace(/\s*\n\s*/g, ' ')
    .trim()
}

// Render a schema as a short type label. `linkable` is the set of component
// schema names that have their own section on the page.
function typeLabel(schema, linkable) {
  if (!schema) return ''
  const name = refName(schema)
  if (name) {
    return linkable && linkable.has(name) ? `[\`${name}\`](#${slugify(name)})` : `\`${name}\``
  }
  if (schema.oneOf || schema.anyOf) {
    return (schema.oneOf || schema.anyOf).map((s) => typeLabel(s, linkable)).join(' or ')
  }
  if (schema.type === 'array') {
    const inner = typeLabel(schema.items || {}, linkable)
    // `Device[]` when inner is a plain code span, otherwise "array of X"
    return inner.startsWith('[') ? `array of ${inner}` : inner.replace(/`$/, '[]`')
  }
  let label = schema.type || 'object'
  if (schema.format) label += ` (${schema.format})`
  return `\`${label}\``
}

// Extra constraint notes appended to a property description.
function schemaNotes(schema) {
  const notes = []
  if (schema.enum) notes.push(`One of: ${schema.enum.map((v) => `\`${v}\``).join(', ')}.`)
  if (schema.default !== undefined) notes.push(`Defaults to \`${JSON.stringify(schema.default)}\`.`)
  if (schema.minimum !== undefined && schema.maximum !== undefined) {
    notes.push(`Range ${schema.minimum}–${schema.maximum}.`)
  }
  if (schema.nullable) notes.push('Nullable.')
  return notes.join(' ')
}

function propDescription(schema) {
  return escapeCell([schema.description || '', schemaNotes(schema)].filter(Boolean).join(' '))
}

// Flatten an object schema into table rows with dotted field paths.
function flattenProperties(schema, prefix, requiredByParent, linkable, rows, depth) {
  if (!schema || depth > 4) return
  const resolved = deref(schema)
  for (const [key, rawProp] of Object.entries(resolved.properties || {})) {
    const prop = deref(rawProp)
    const fieldPath = prefix ? `${prefix}.${key}` : key
    const required = (resolved.required || []).includes(key)
    rows.push({
      field: fieldPath,
      type: typeLabel(rawProp, linkable),
      required,
      description: propDescription(prop),
    })
    if (!refName(rawProp) && prop.type === 'object' && prop.properties) {
      flattenProperties(prop, fieldPath, prop.required || [], linkable, rows, depth + 1)
    }
    if (!refName(rawProp) && prop.type === 'array') {
      const items = deref(prop.items || {})
      if (!refName(prop.items) && items.type === 'object' && items.properties) {
        flattenProperties(items, `${fieldPath}[]`, items.required || [], linkable, rows, depth + 1)
      }
    }
  }
}

function propertyTable(schema, linkable, { withRequired }) {
  const rows = []
  flattenProperties(schema, '', [], linkable, rows, 0)
  if (!rows.length) return null
  const lines = []
  if (withRequired) {
    lines.push('| Field | Type | Required | Description |')
    lines.push('| ----- | ---- | -------- | ----------- |')
    for (const row of rows) {
      lines.push(
        `| \`${row.field}\` | ${row.type} | ${row.required ? 'Yes' : 'No'} | ${row.description} |`
      )
    }
  } else {
    lines.push('| Field | Type | Description |')
    lines.push('| ----- | ---- | ----------- |')
    for (const row of rows) {
      lines.push(`| \`${row.field}\` | ${row.type} | ${row.description} |`)
    }
  }
  return lines.join('\n')
}

// Compact inline summary of a response body, e.g. `{ data: Device[], meta: PaginationMeta }`.
function bodySummary(schema, linkable) {
  if (!schema) return ''
  const name = refName(schema)
  if (name) return typeLabel(schema, linkable)
  const resolved = deref(schema)
  if (resolved.type === 'object' && resolved.properties) {
    const parts = Object.entries(resolved.properties).map(([key, prop]) => {
      const propName = refName(prop)
      const inner = deref(prop)
      if (propName) return `\`${key}:\` ${typeLabel(prop, linkable)}`
      if (inner.type === 'array') return `\`${key}:\` ${typeLabel(prop, linkable)}`
      return `\`${key}: ${inner.type || 'object'}\``
    })
    if (parts.length && parts.length <= 4) return parts.join(', ')
    return '`object`'
  }
  return typeLabel(schema, linkable)
}

// Collect every component schema name reachable from a node (transitively).
function collectSchemaRefs(node, into) {
  if (!node || typeof node !== 'object') return
  const name = refName(node)
  if (name && node.$ref.includes('/schemas/')) {
    if (!into.has(name)) {
      into.add(name)
      collectSchemaRefs(spec.components.schemas[name], into)
    }
    return
  }
  if (name) {
    // Shared parameter/response refs — traverse their definitions.
    collectSchemaRefs(deref(node), into)
    return
  }
  for (const value of Object.values(node)) collectSchemaRefs(value, into)
}

function operationsForTag(tagName) {
  const ops = []
  for (const [pathKey, pathItem] of Object.entries(spec.paths)) {
    for (const method of HTTP_METHODS) {
      const op = pathItem[method]
      if (op && (op.tags || []).includes(tagName)) {
        ops.push({ method: method.toUpperCase(), path: pathKey, op })
      }
    }
  }
  return ops
}

const BASE_URL = (spec.servers && spec.servers[0] && spec.servers[0].url) || ''

// Synthesize a sample JSON value from a schema, the way Redoc does client-side:
// spec-provided examples win, then defaults, then enum/format/type-derived
// placeholders. `seen` guards against circular $refs.
function sampleFromSchema(schema, seen, depth, hint) {
  if (!schema || depth > 6) return null
  const name = refName(schema)
  if (name) {
    if (seen.has(name)) return null
    seen = new Set([...seen, name])
  }
  const resolved = deref(schema)
  if (resolved.example !== undefined) return resolved.example
  if (resolved.default !== undefined) return resolved.default
  if (resolved.enum) return resolved.enum[0]
  if (resolved.oneOf || resolved.anyOf) {
    return sampleFromSchema((resolved.oneOf || resolved.anyOf)[0], seen, depth + 1, hint)
  }
  switch (resolved.type) {
    case 'array': {
      const item = sampleFromSchema(resolved.items || {}, seen, depth + 1, hint)
      return item === null ? [] : [item]
    }
    case 'string':
      if (resolved.format === 'uuid') return '0198a2e6-6f24-7cc3-b456-663cd21c4b12'
      if (resolved.format === 'date-time') return '2026-08-14T12:00:00Z'
      if (resolved.format === 'uri' || resolved.format === 'url') return 'https://example.com'
      // Resource identifiers are UUID v7 strings even where the schema says
      // plain string — use the property name as a hint.
      if (hint === 'id' || (hint && hint.endsWith('_id'))) {
        return '0198a2e6-6f24-7cc3-b456-663cd21c4b12'
      }
      if (hint && hint.endsWith('_at')) return '2026-08-14T12:00:00Z'
      return 'string'
    case 'integer':
      return resolved.minimum !== undefined ? resolved.minimum : 0
    case 'number':
      return 0
    case 'boolean':
      return true
    case 'object':
    case undefined: {
      const out = {}
      for (const [key, prop] of Object.entries(resolved.properties || {})) {
        const value = sampleFromSchema(prop, seen, depth + 1, key)
        if (value !== null) out[key] = value
      }
      return out
    }
    default:
      return null
  }
}

// Sample body for a media-type object: explicit example first, else synthesized.
function sampleBody(mediaType) {
  if (!mediaType) return null
  if (mediaType.example !== undefined) return mediaType.example
  if (!mediaType.schema) return null
  return sampleFromSchema(mediaType.schema, new Set(), 0)
}

function curlExample(method, pathKey, requestSample) {
  const url = `${BASE_URL}${pathKey}`
  const lines = []
  lines.push(`curl ${method === 'GET' ? '' : `-X ${method} `}"${url}" \\`)
  if (requestSample === null) {
    lines.push('  -H "Authorization: Bearer $AVOCADO_TOKEN"')
  } else {
    lines.push('  -H "Authorization: Bearer $AVOCADO_TOKEN" \\')
    lines.push('  -H "Content-Type: application/json" \\')
    const json = JSON.stringify(requestSample, null, 2).replace(/'/g, "'\\''")
    lines.push(`  -d '${json}'`)
  }
  return lines.join('\n')
}

function renderOperation(entry, linkable, heading) {
  const { method, path: pathKey, op } = entry
  const lines = []
  lines.push(`### ${heading}`)
  lines.push('')
  lines.push(`\`${method} ${pathKey}\``)
  lines.push('')
  if (op.description) lines.push(op.description, '')

  const params = (op.parameters || []).map((p) => ({ raw: p, resolved: deref(p) }))
  for (const location of ['path', 'query']) {
    const group = params.filter((p) => p.resolved.in === location)
    if (!group.length) continue
    lines.push(`**${location === 'path' ? 'Path' : 'Query'} parameters:**`)
    lines.push('')
    if (location === 'path') {
      lines.push('| Name | Type | Description |')
      lines.push('| ---- | ---- | ----------- |')
      for (const { resolved } of group) {
        lines.push(
          `| \`${resolved.name}\` | ${typeLabel(resolved.schema, linkable)} | ${propDescription({
            ...deref(resolved.schema || {}),
            description: resolved.description,
          })} |`
        )
      }
    } else {
      lines.push('| Name | Type | Required | Description |')
      lines.push('| ---- | ---- | -------- | ----------- |')
      for (const { resolved } of group) {
        lines.push(
          `| \`${resolved.name}\` | ${typeLabel(resolved.schema, linkable)} | ${
            resolved.required ? 'Yes' : 'No'
          } | ${propDescription({
            ...deref(resolved.schema || {}),
            description: resolved.description,
          })} |`
        )
      }
    }
    lines.push('')
  }

  const body = op.requestBody && deref(op.requestBody)
  const bodySchema = body && body.content && body.content['application/json']
  if (bodySchema && bodySchema.schema) {
    lines.push(`**Request body:**${body.required ? '' : ' _(optional)_'}`)
    lines.push('')
    const table = propertyTable(deref(bodySchema.schema), linkable, { withRequired: true })
    if (table) {
      lines.push(table)
    } else {
      lines.push(`${bodySummary(bodySchema.schema, linkable)}`)
    }
    lines.push('')
  }

  lines.push('**Responses:**')
  lines.push('')
  lines.push('| Status | Body | Description |')
  lines.push('| ------ | ---- | ----------- |')
  for (const [status, rawResponse] of Object.entries(op.responses || {})) {
    const response = deref(rawResponse)
    const content = response.content && response.content['application/json']
    const summary = content && content.schema ? bodySummary(content.schema, linkable) : '—'
    lines.push(`| \`${status}\` | ${summary} | ${escapeCell(response.description)} |`)
  }
  lines.push('')

  const requestSample = bodySchema ? sampleBody(bodySchema) : null
  lines.push('**Example request:**')
  lines.push('')
  lines.push('```bash')
  lines.push(curlExample(method, pathKey, requestSample))
  lines.push('```')
  lines.push('')

  const success = Object.entries(op.responses || {}).find(
    ([status, rawResponse]) =>
      status.startsWith('2') &&
      deref(rawResponse).content &&
      deref(rawResponse).content['application/json']
  )
  if (success) {
    const [status, rawResponse] = success
    const responseSample = sampleBody(deref(rawResponse).content['application/json'])
    if (responseSample !== null) {
      lines.push(`**Example response** (\`${status}\`):`)
      lines.push('')
      lines.push('```json')
      lines.push(JSON.stringify(responseSample, null, 2))
      lines.push('```')
      lines.push('')
    }
  }
  return lines.join('\n')
}

function renderTagPage(tag, position) {
  const ops = operationsForTag(tag.name)
  const linkable = new Set()
  for (const entry of ops) collectSchemaRefs(entry.op, linkable)

  // Unique headings, mirroring how Docusaurus suffixes duplicate slugs.
  const slugCounts = new Map()
  const headings = ops.map((entry) => {
    const heading = entry.op.summary || `${entry.method} ${entry.path}`
    const base = slugify(heading)
    const count = slugCounts.get(base) || 0
    slugCounts.set(base, count + 1)
    return { heading, slug: count === 0 ? base : `${base}-${count}` }
  })

  const lines = []
  lines.push('---')
  lines.push(`title: ${tag.name}`)
  lines.push(`sidebar_position: ${position}`)
  lines.push(`description: '${(tag.description || '').replace(/'/g, "''")}'`)
  lines.push('copy_markdown: true')
  lines.push('---')
  lines.push('')
  lines.push(`# ${tag.name}`)
  lines.push('')
  if (tag.description) lines.push(tag.description, '')

  lines.push('## Endpoints')
  lines.push('')
  lines.push('| Method | Path | Description |')
  lines.push('| ------ | ---- | ----------- |')
  ops.forEach((entry, i) => {
    lines.push(
      `| \`${entry.method}\` | \`${entry.path}\` | [${escapeCell(headings[i].heading)}](#${headings[i].slug}) |`
    )
  })
  lines.push('')

  ops.forEach((entry, i) => {
    lines.push(renderOperation(entry, linkable, headings[i].heading))
  })

  const schemaNames = [...linkable].filter((name) => spec.components.schemas[name])
  if (schemaNames.length) {
    lines.push('## Object reference')
    lines.push('')
    for (const name of schemaNames) {
      const schema = spec.components.schemas[name]
      lines.push(`### ${name}`)
      lines.push('')
      if (schema.description) lines.push(schema.description, '')
      const table = propertyTable(schema, linkable, { withRequired: false })
      if (table) lines.push(table, '')
    }
  }

  return lines.join('\n').replace(/\n{3,}/g, '\n\n')
}

function fileNameForTag(tagName) {
  return `${slugify(tagName.replace(/&/g, ' '))}.md`
}

fs.mkdirSync(OUT_DIR, { recursive: true })

// Remove stale generated pages (everything except the hand-written overview).
for (const existing of fs.readdirSync(OUT_DIR)) {
  if (existing.endsWith('.md') && existing !== 'overview.md') {
    fs.unlinkSync(path.join(OUT_DIR, existing))
  }
}

const tags = spec.tags || []
tags.forEach((tag, i) => {
  const outPath = path.join(OUT_DIR, fileNameForTag(tag.name))
  fs.writeFileSync(outPath, `${renderTagPage(tag, i + 2)}\n`)
  console.log(`wrote ${path.relative(process.cwd(), outPath)}`)
})

console.log(`${tags.length} pages generated from ${path.relative(process.cwd(), SPEC_PATH)}`)
