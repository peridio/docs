// Configuration for documents that are currently in development
// NOTE: This file is kept for reference but the actual in-development
// flags are now managed via frontmatter using sidebar_custom_props

// Documents marked with inDevelopment flag via frontmatter:
export const IN_DEVELOPMENT_DOCS = [
  'avocado-linux/references/provisioning',
  'hardware/advantech/icam-540/provision',
  'hardware/nvidia/jetson-orin-nano-developer-kit/provision',
]

// The actual implementation now uses:
// sidebar_custom_props:
//   inDevelopment: true
//
// This is handled by the DocSidebarItem component and ProvisionGuide inDevelopment prop
