// Same names as PluginHtmlClassNameProvider in @docusaurus/theme-common.
export function pluginHtmlClassName({ name, id }) {
  const nameClass = `plugin-${name.replace(/docusaurus-(?:plugin|theme)-(?:content-)?/gi, '')}`
  return `${nameClass} plugin-id-${id}`
}
