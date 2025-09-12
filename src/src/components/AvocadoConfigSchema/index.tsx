import React from 'react'
import SchemaDocs from '../SchemaDocs'
import schema from '../../../schemas/avocado-config.json'

interface AvocadoConfigSchemaProps {
  showSearch?: boolean
  showPropertiesTitle?: boolean
  showExamples?: boolean
}

export default function AvocadoConfigSchema({
  showSearch = true,
  showPropertiesTitle = true,
  showExamples = true,
}: AvocadoConfigSchemaProps) {
  return (
    <div className="avocado-config-schema-wrapper">
      <SchemaDocs
        schema={schema}
        options={{
          includePropertiesTitle: showPropertiesTitle,
          includeExamples: showExamples,
          searchable: showSearch,
          collapsible: true,
        }}
      />
    </div>
  )
}
