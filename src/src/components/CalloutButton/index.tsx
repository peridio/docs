import React from 'react'
import Link from '@docusaurus/Link'

interface CalloutButtonProps {
  /** Text shown to the left of the button (the callout label). */
  label: string
  /** Button text. */
  cta: string
  /** Button link target. */
  href: string
  /** Stretch the pill to fill its container, pushing the button to the right edge. */
  fullWidth?: boolean
}

/**
 * Pill callout with a label and a primary-color button.
 * Originally inlined on the Avocado Connect overview; extracted so the same
 * exact button can be reused (e.g. the Community page Discord CTA).
 */
export default function CalloutButton({ label, cta, href, fullWidth = false }: CalloutButtonProps) {
  return (
    <div
      style={{
        display: 'flex',
        width: fullWidth ? '100%' : 'fit-content',
        maxWidth: '100%',
        justifyContent: fullWidth ? 'space-between' : undefined,
        margin: '1.5rem 0',
        alignItems: 'center',
        gap: '1rem',
        background: 'linear-gradient(135deg, rgba(123, 111, 240, 0.15), rgba(123, 111, 240, 0.05))',
        border: '1px solid rgba(123, 111, 240, 0.3)',
        borderRadius: '10px',
        padding: '0.75rem 1.25rem',
      }}
    >
      <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{label}</span>
      <Link
        href={href}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          background: 'var(--ifm-color-primary)',
          color: '#fff',
          padding: '0.45rem 1rem',
          borderRadius: '6px',
          textDecoration: 'none',
          fontSize: '0.8rem',
          fontWeight: 600,
          boxShadow: '0 0 16px rgba(123, 111, 240, 0.25)',
        }}
      >
        {cta}
      </Link>
    </div>
  )
}
