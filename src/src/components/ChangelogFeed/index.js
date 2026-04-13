import React, { useEffect, useRef, useState } from 'react'
import Heading from '@theme/Heading'
import styles from './styles.module.css'

const ctx = require.context('../../../docs-changelog', false, /^\.\/\d+\.\d+\.\d+\.md$/)

const entries = ctx
  .keys()
  .map((key) => {
    const mod = ctx(key)
    const version = key.replace('./', '').replace('.md', '')
    return { version, Component: mod.default || mod }
  })
  .sort((a, b) => {
    const va = a.version.split('.').map(Number)
    const vb = b.version.split('.').map(Number)
    for (let i = 0; i < 3; i++) {
      if ((vb[i] || 0) !== (va[i] || 0)) return (vb[i] || 0) - (va[i] || 0)
    }
    return 0
  })

function updateSidebarHighlight(version) {
  const sidebar = document.querySelector('[class*="docSidebarContainer"]')
  if (!sidebar) return
  sidebar.querySelectorAll('.menu__link--active').forEach((el) => {
    el.classList.remove('menu__link--active')
  })
  if (version) {
    const link = sidebar.querySelector(`.menu__link[href="/changelog#${version}"]`)
    if (link) link.classList.add('menu__link--active')
  }
}

export default function ChangelogFeed() {
  const [activeVersion, setActiveVersion] = useState(entries[0]?.version || '')
  const sectionsRef = useRef({})

  // Smooth scroll while on changelog
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = ''
    }
  }, [])

  // Scroll-spy: detect which version section is at the top of the viewport
  useEffect(() => {
    let ticking = false
    let current = entries[0]?.version || ''

    const detect = () => {
      for (const { version } of entries) {
        const el = sectionsRef.current[version]
        if (el && el.getBoundingClientRect().top <= 150) {
          current = version
        }
      }
      setActiveVersion((prev) => (prev === current ? prev : current))
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          detect()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    detect()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Sync sidebar highlight whenever the active version changes
  useEffect(() => {
    updateSidebarHighlight(activeVersion)
  }, [activeVersion])

  // Also override Docusaurus's own active-class logic on every render
  useEffect(() => {
    const frame = requestAnimationFrame(() => updateSidebarHighlight(activeVersion))
    return () => cancelAnimationFrame(frame)
  })

  return (
    <div className={styles.feed}>
      {entries.map(({ version, Component }, i) => (
        <section
          key={version}
          id={version}
          ref={(el) => {
            sectionsRef.current[version] = el
          }}
          className={styles.section}
        >
          <Heading as="h2" className={styles.versionHeading}>
            {version}
          </Heading>
          <div className="theme-doc-markdown">
            <Component />
          </div>
          {i < entries.length - 1 && <hr className={styles.separator} />}
        </section>
      ))}
    </div>
  )
}
