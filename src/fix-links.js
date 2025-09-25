#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// Map of old paths to new paths
const pathMappings = {
  // Reference mappings
  '/peridio-core/reference/organizations':
    '/peridio-core/reference/account-management/organizations',
  '/peridio-core/reference/peridio-resource-names':
    '/peridio-core/reference/account-management/peridio-resource-names',
  '/peridio-core/reference/users': '/peridio-core/reference/account-management/users',

  '/peridio-core/reference/artifacts': '/peridio-core/reference/binary-management/artifacts',
  '/peridio-core/reference/artifact-versions':
    '/peridio-core/reference/binary-management/artifact-versions',
  '/peridio-core/reference/binaries': '/peridio-core/reference/binary-management/binaries',
  '/peridio-core/reference/binary-parts': '/peridio-core/reference/binary-management/binary-parts',
  '/peridio-core/reference/binary-signatures':
    '/peridio-core/reference/binary-management/binary-signatures',
  '/peridio-core/reference/signing-keys': '/peridio-core/reference/binary-management/signing-keys',

  '/peridio-core/reference/agent': '/peridio-core/reference/device-management/agent',
  '/peridio-core/reference/ca-certificates':
    '/peridio-core/reference/device-management/ca-certificates',
  '/peridio-core/reference/cohorts': '/peridio-core/reference/device-management/cohorts',
  '/peridio-core/reference/device-certificates':
    '/peridio-core/reference/device-management/device-certificates',
  '/peridio-core/reference/devices': '/peridio-core/reference/device-management/devices',
  '/peridio-core/reference/just-in-time-provisioning':
    '/peridio-core/reference/device-management/just-in-time-provisioning',
  '/peridio-core/reference/products': '/peridio-core/reference/device-management/products',
  '/peridio-core/reference/verification-certificates':
    '/peridio-core/reference/device-management/verification-certificates',
  '/peridio-core/reference/verification-codes':
    '/peridio-core/reference/device-management/verification-codes',
  '/peridio-core/reference/x509': '/peridio-core/reference/device-management/x509',

  '/peridio-core/reference/webhooks': '/peridio-core/reference/integration-management/webhooks',

  '/peridio-core/reference/bundles': '/peridio-core/reference/bundle-management/bundles',
  '/peridio-core/reference/releases': '/peridio-core/reference/bundle-management/releases',
  '/peridio-core/reference/release-channels':
    '/peridio-core/reference/bundle-management/release-channels',
  '/peridio-core/reference/bundle-overrides':
    '/peridio-core/reference/bundle-management/bundle-overrides',
  '/peridio-core/reference/bundle-distribution':
    '/peridio-core/reference/bundle-management/bundle-distribution',

  '/peridio-core/reference/tunnels': '/peridio-core/reference/remote-access/tunnels',

  '/peridio-core/reference/fleet-view': '/peridio-core/reference/web-console/fleet-view',

  '/peridio-core/reference/firmware': '/peridio-core/reference/deprecated/firmware',
  '/peridio-core/reference/deployments': '/peridio-core/reference/deprecated/deployments',

  // Guides mappings
  '/platform/guides/cloud-delegated-updates':
    '/platform/guides/cloud-integration/cloud-delegated-updates',

  '/platform/guides/introduction-to-binary-management':
    '/platform/guides/binary-management/introduction-to-binary-management',
  '/platform/guides/multipart-uploads-with-binary-parts':
    '/platform/guides/binary-management/multipart-uploads-with-binary-parts',
  '/platform/guides/creating-artifacts': '/platform/guides/binary-management/creating-artifacts',
  '/platform/guides/creating-artifact-versions':
    '/platform/guides/binary-management/creating-artifact-versions',
  '/platform/guides/creating-signing-keys':
    '/platform/guides/binary-management/creating-signing-keys',
  '/platform/guides/creating-binaries': '/platform/guides/binary-management/creating-binaries',
  '/platform/guides/creating-binary-parts':
    '/platform/guides/binary-management/creating-binary-parts',
  '/platform/guides/creating-binary-signatures':
    '/platform/guides/binary-management/creating-binary-signatures',
  '/platform/guides/custom-binary-backends':
    '/platform/guides/binary-management/custom-binary-backends',

  '/platform/guides/creating-ca-certificates':
    '/platform/guides/device-management/creating-ca-certificates',
  '/platform/guides/creating-devices': '/platform/guides/device-management/creating-devices',
  '/platform/guides/creating-products': '/platform/guides/device-management/creating-products',
  '/platform/guides/creating-x509-certificates-with-openssl':
    '/platform/guides/device-management/creating-x509-certificates-with-openssl',
  '/platform/guides/creating-x509-certificates-with-peridio':
    '/platform/guides/device-management/creating-x509-certificates-with-peridio',

  '/platform/guides/introduction-to-bundle-management':
    '/platform/guides/bundle-management/introduction-to-bundle-management',
  '/platform/guides/creating-bundles': '/platform/guides/bundle-management/creating-bundles',
  '/platform/guides/creating-releases': '/platform/guides/bundle-management/creating-releases',

  '/platform/guides/introduction-to-remote-access':
    '/platform/guides/remote-access/introduction-to-remote-access',
  '/platform/guides/creating-tunnels': '/platform/guides/remote-access/creating-tunnels',

  '/platform/guides/creating-firmware': '/platform/guides/deprecated/creating-firmware',
  '/platform/guides/creating-deployments': '/platform/guides/deprecated/creating-deployments',
}

// Function to update links in a file
function updateLinksInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8')
    let hasChanges = false

    // Update each mapping
    for (const [oldPath, newPath] of Object.entries(pathMappings)) {
      // Match various link formats:
      // [text](oldPath)
      // [text](oldPath#anchor)
      // [text](oldPath.md)
      // [text](oldPath.md#anchor)

      const patterns = [
        // Exact match
        new RegExp(`\\]\\(${oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g'),
        // With anchor
        new RegExp(`\\]\\(${oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}#([^)]+)\\)`, 'g'),
        // With .md extension
        new RegExp(`\\]\\(${oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\.md\\)`, 'g'),
        // With .md extension and anchor
        new RegExp(`\\]\\(${oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\.md#([^)]+)\\)`, 'g'),
      ]

      patterns.forEach((pattern, index) => {
        const replacement =
          index === 0
            ? `](${newPath})`
            : index === 1
              ? `](${newPath}#$1)`
              : index === 2
                ? `](${newPath})`
                : `](${newPath}#$1)`

        const newContent = content.replace(pattern, replacement)
        if (newContent !== content) {
          hasChanges = true
          content = newContent
        }
      })
    }

    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8')
      console.log(`Updated: ${filePath}`)
      return true
    }

    return false
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message)
    return false
  }
}

// Function to recursively find markdown files
function findMarkdownFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      findMarkdownFiles(fullPath, files)
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath)
    }
  }

  return files
}

// Main execution
function main() {
  console.log('Starting link update process...')

  // Find all markdown files
  const docsDir = path.join(__dirname, 'docs')
  const files = findMarkdownFiles(docsDir)

  let updatedCount = 0

  files.forEach((file) => {
    if (updateLinksInFile(file)) {
      updatedCount++
    }
  })

  console.log(`\nProcess complete. Updated ${updatedCount} files.`)
}

if (require.main === module) {
  main()
}

module.exports = { updateLinksInFile, pathMappings }
