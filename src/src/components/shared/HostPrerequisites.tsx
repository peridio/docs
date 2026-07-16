import React from 'react'
import Admonition from '@theme/Admonition'
import Link from '@docusaurus/Link'

// The host toolchain setup shared across every Getting Started surface (the
// per-target .md/.mdx guides and the TargetSelector on the "Any Supported
// Target" page). Kept in one place so the macOS two-path story and the Linux
// path stay consistent and are edited once.
export default function HostPrerequisites() {
  return (
    <Admonition type="info" title="Choose your setup">
      <ul>
        <li>
          <strong>macOS</strong> — install the{' '}
          <Link to="/developer-reference/avocado-cli/overview">Avocado CLI</Link> and{' '}
          <Link href="https://www.docker.com/products/docker-desktop/">Docker Desktop</Link>,{' '}
          <strong>or</strong> install <Link to="/avocado-desktop/overview">Avocado Desktop</Link>,
          which bundles the build VM and toolchain — no Docker Desktop required.
        </li>
        <li>
          <strong>Linux</strong> — install the{' '}
          <Link to="/developer-reference/avocado-cli/overview">Avocado CLI</Link> and{' '}
          <Link href="https://www.docker.com/products/docker-desktop/">Docker Desktop</Link>.
          (Avocado Desktop is macOS-only today.)
        </li>
      </ul>
    </Admonition>
  )
}
