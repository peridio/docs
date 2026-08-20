import React from 'react'
import Admonition from '@theme/Admonition'
import Link from '@docusaurus/Link'

// The host toolchain setup shared across every Getting Started surface (the
// per-target .md/.mdx guides and the TargetSelector on the "Any Supported
// Target" page). Kept in one place so both platforms' two-path story stays
// consistent and is edited once.
//
// The two Desktop bullets differ for a reason. On macOS the app bundles its own
// build VM and needs no Docker; on Linux it drives the host's Docker, so Docker
// stays a prerequisite on that path. Offering "install Avocado Desktop instead"
// on Linux would drop a requirement that builds need.
//
// The Linux bullet also names two things the macOS one does not need. The pacman
// package depends on an independently installed avocado-cli, so Desktop is not an
// alternative to the CLI there the way it is elsewhere, and a reader following
// the plain "either" would have `pacman -U` refuse on the unmet dependency. And
// no Linux package pulls in usbip, which USB provisioning needs.
export default function HostPrerequisites() {
  return (
    <Admonition type="info" title="Choose your setup">
      <ul>
        <li>
          <strong>macOS</strong> — install the{' '}
          <Link to="/developer-reference/avocado-cli/installation">Avocado CLI</Link> and{' '}
          <Link href="https://www.docker.com/products/docker-desktop/">Docker Desktop</Link>,{' '}
          <strong>or</strong> install{' '}
          <Link href="https://www.peridio.com/downloads#desktop">Avocado Desktop</Link>, which
          bundles the build VM and toolchain — no Docker Desktop required.
        </li>
        <li>
          <strong>Linux</strong> — install{' '}
          <Link href="https://docs.docker.com/engine/install/">Docker</Link> and either the{' '}
          <Link to="/developer-reference/avocado-cli/installation">Avocado CLI</Link> or{' '}
          <Link href="https://www.peridio.com/downloads#desktop">Avocado Desktop</Link>, which ships
          as a deb, rpm, or pacman package. Docker is required either way on Linux: Desktop builds
          with the host&apos;s Docker rather than the VM it bundles on macOS. The pacman package is
          the exception to &quot;either&quot;, since it links the Avocado CLI rather than bundling
          one, so install that too. For USB provisioning, add your distribution&apos;s usbip tools.
        </li>
        <li>
          Every shipping CLI build, with its size and SHA-256, is listed on{' '}
          <Link href="https://www.peridio.com/downloads#cli-artifacts">Downloads</Link>.
        </li>
      </ul>
    </Admonition>
  )
}
