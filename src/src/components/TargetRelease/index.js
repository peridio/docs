import React from 'react'
import CodeBlock from '@theme/CodeBlock'
import targets from '@site/src/data/hardware/targets.json'

// Avocado OS release year -> Yocto LTS codename.
const RELEASE_NAMES = { 2024: 'scarthgap', 2026: 'wrynose' }
// What `avocado init` writes into avocado.yaml.
const INIT_RELEASE = '2026'
const CHANNEL = 'edge'

// Which release and channel a target is published on, and the `distro` block
// to set when that is not the `avocado init` default. Pass `id` (a
// targets.json key) or `releases` directly, e.g. for a board-level page.
export default function TargetRelease({ id, releases }) {
  const rel = releases || targets[id].releases
  const supported = Object.keys(rel)
    .filter((y) => rel[y] === 'supported')
    .sort()
  const latest = supported[supported.length - 1]
  if (!latest) {
    return (
      <p>
        <strong>Release:</strong> not yet published on any Avocado OS release feed.
      </p>
    )
  }
  const older = supported.slice(0, -1)
  const head = (
    <>
      <strong>Latest release:</strong> {latest} ({RELEASE_NAMES[latest]}), <code>{CHANNEL}</code>{' '}
      channel.
    </>
  )
  if (latest === INIT_RELEASE) {
    return (
      <p>
        {head} This is what <code>avocado init</code> writes, so <code>avocado.yaml</code> needs no{' '}
        <code>distro</code> change.
        {older.length > 0 && <> Also published on {older.join(', ')}.</>}
      </p>
    )
  }
  return (
    <>
      <p>
        {head} <code>avocado init</code> writes <code>release: {INIT_RELEASE}</code>, which does not
        support this hardware yet, so set the release in <code>avocado.yaml</code> before{' '}
        <code>avocado install</code>:
      </p>
      <CodeBlock language="yaml" title="avocado.yaml">
        {`distro:\n  release: ${latest}\n  channel: ${CHANNEL}`}
      </CodeBlock>
    </>
  )
}
