import React from 'react'
import { DeckardSchema } from '../../vendor/index.esm.js'
import '../../vendor/style.css'

interface SchemaDocsProps {
  schema?: object
  options?: object
}

export default function SchemaDocs({ schema, options = {} }: SchemaDocsProps) {
  const defaultOptions = {
    includeHeader: false,
    includePropertiesTitle: true,
    includeExamples: true,
    searchable: true,
    collapsible: true,
    autoExpand: false,
    examplesOnFocusOnly: false,
    ...options,
  }

  if (!schema) {
    return (
      <div style={{ padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
        <p>Schema not found or failed to load.</p>
      </div>
    )
  }

  return (
    <div className="schema-docs-container">
      <DeckardSchema schema={schema} options={defaultOptions} />
    </div>
  )
}
