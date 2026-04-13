import React, { useEffect, useRef, useState } from 'react'
import Heading from '@theme/Heading'
import { entries } from './changelogEntries'
import styles from './styles.module.css'

/** Map monthSlug → monthLabel for finding sidebar categories by text */
const monthSlugToLabel = Object.fromEntries(
  entries.map((e) => [e.monthSlug, e.monthLabel])
)

/**
 * Find a sidebar category <li> by its label text.
 * Works even when the category's children aren't mounted (collapsed/lazy).
 */
function findCategoryByLabel(sidebar, label) {
  for (const link of sidebar.querySelectorAll('.menu__link--sublist')) {
    if (link.textContent.trim() === label) {
      return link.closest('.menu__list-item')
    }
  }
  return null
}

/**
 * Click a category's toggle and wait for React to finish re-rendering.
 * Returns a Promise that resolves after two animation frames.
 */
function clickToggleAndWait(catLi) {
  const collapsibleDiv = catLi.querySelector('.menu__list-item-collapsible')
  if (!collapsibleDiv) return Promise.resolve()

  const toggle =
    collapsibleDiv.querySelector('.menu__caret') ||
    collapsibleDiv.querySelector('.menu__link--sublist-caret')
  if (!toggle) return Promise.resolve()

  toggle.click()

  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve))
  })
}

/**
 * Highlight the active sidebar link (no toggling of categories).
 * If the link isn't in the DOM (category is collapsed), highlights
 * the category header instead.
 */
function highlightActiveLink(sidebar, permalink) {
  sidebar.querySelectorAll('.menu__link--active').forEach((el) => {
    el.classList.remove('menu__link--active')
    el.removeAttribute('aria-current')
  })

  const activeLink = sidebar.querySelector(`.menu__link[href="${permalink}"]`)
  if (activeLink) {
    activeLink.classList.add('menu__link--active')
    activeLink.setAttribute('aria-current', 'page')
    activeLink.scrollIntoView?.({ block: 'nearest', behavior: 'smooth' })
    return
  }

  // Link not in DOM (category collapsed/lazy) — highlight the category header
  const entry = entries.find((e) => e.permalink === permalink)
  if (entry) {
    const catLi = findCategoryByLabel(sidebar, entry.monthLabel)
    const catLink = catLi?.querySelector('.menu__link--sublist')
    if (catLink) {
      catLink.classList.add('menu__link--active')
    }
  }
}

export default function ChangelogInfiniteScroll({ initialContent }) {
  const startPermalink = initialContent.metadata.permalink
  const startIndex = entries.findIndex((e) => e.permalink === startPermalink)
  const startIdx = startIndex >= 0 ? startIndex : 0
  const startEntry = entries[startIdx]

  const subsequentEntries = entries.slice(startIdx)

  const [visibleCount, setVisibleCount] = useState(1)
  const [activePermalink, setActivePermalink] = useState(startPermalink)
  const [activeMonthSlug, setActiveMonthSlug] = useState(startEntry?.monthSlug || '')
  const prevMonthRef = useRef(activeMonthSlug)
  const sectionsRef = useRef({})
  const sentinelRef = useRef(null)

  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = ''
    }
  }, [])

  // Infinite scroll: load next entry when sentinel is near viewport
  useEffect(() => {
    if (visibleCount >= subsequentEntries.length) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 1, subsequentEntries.length))
        }
      },
      { rootMargin: '400px' }
    )
    const el = sentinelRef.current
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [visibleCount, subsequentEntries.length])

  // Scroll-spy: detect which entry section is at the top of the viewport
  useEffect(() => {
    let ticking = false
    const displayed = subsequentEntries.slice(0, visibleCount)
    let current = displayed[0]?.permalink || startPermalink

    const detect = () => {
      for (const entry of displayed) {
        const el = sectionsRef.current[entry.permalink]
        if (el && el.getBoundingClientRect().top <= 150) {
          current = entry.permalink
        }
      }
      setActivePermalink((prev) => (prev === current ? prev : current))
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
  }, [visibleCount, subsequentEntries, startPermalink])

  // Derive activeMonthSlug from activePermalink
  useEffect(() => {
    const entry = entries.find((e) => e.permalink === activePermalink)
    if (entry) {
      setActiveMonthSlug((prev) =>
        prev === entry.monthSlug ? prev : entry.monthSlug
      )
    }
  }, [activePermalink])

  // Sync URL, document title, and active link on every entry change
  useEffect(() => {
    if (activePermalink !== window.location.pathname) {
      window.history.replaceState(null, '', activePermalink)
    }
    const activeEntry = entries.find((e) => e.permalink === activePermalink)
    if (activeEntry) {
      document.title = `${activeEntry.version} | Changelog`
    }

    const sidebar = document.querySelector('[class*="docSidebarContainer"]')
    if (sidebar) highlightActiveLink(sidebar, activePermalink)
  }, [activePermalink])

  // Toggle sidebar categories only on MONTH changes.
  // Sequential: collapse old month → wait for React → expand new month → re-highlight.
  useEffect(() => {
    const newMonth = activeMonthSlug
    const oldMonth = prevMonthRef.current
    if (newMonth === oldMonth) return
    prevMonthRef.current = newMonth

    const sidebar = document.querySelector('[class*="docSidebarContainer"]')
    if (!sidebar) return

    const oldLabel = monthSlugToLabel[oldMonth]
    const newLabel = monthSlugToLabel[newMonth]

    ;(async () => {
      // 1. Collapse the old month
      if (oldLabel) {
        const oldCat = findCategoryByLabel(sidebar, oldLabel)
        if (oldCat && !oldCat.classList.contains('menu__list-item--collapsed')) {
          await clickToggleAndWait(oldCat)
        }
      }

      // 2. Re-query DOM (it may have changed) and expand the new month
      if (newLabel) {
        const newCat = findCategoryByLabel(sidebar, newLabel)
        if (newCat && newCat.classList.contains('menu__list-item--collapsed')) {
          await clickToggleAndWait(newCat)
        }
      }

      // 3. After React re-renders with new month expanded, re-highlight the link
      requestAnimationFrame(() => {
        const freshSidebar = document.querySelector('[class*="docSidebarContainer"]')
        if (freshSidebar) highlightActiveLink(freshSidebar, activePermalink)
      })
    })()
  }, [activeMonthSlug, activePermalink])

  // MutationObserver: re-apply active-link highlight when React re-renders the sidebar
  useEffect(() => {
    const sidebar = document.querySelector('[class*="docSidebarContainer"]')
    if (!sidebar) return

    let selfTriggered = false
    let timeout

    const observer = new MutationObserver(() => {
      if (selfTriggered) return
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        selfTriggered = true
        highlightActiveLink(sidebar, activePermalink)
        requestAnimationFrame(() => {
          selfTriggered = false
        })
      }, 50)
    })

    observer.observe(sidebar, {
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => {
      observer.disconnect()
      clearTimeout(timeout)
    }
  }, [activePermalink])

  const displayed = subsequentEntries.slice(0, visibleCount)

  return (
    <div className="row">
      <div className="col">
        <div className={styles.feed}>
          {displayed.map((entry, i) => {
            const isNewMonth =
              i === 0 || entry.monthSlug !== displayed[i - 1].monthSlug

            return (
              <section
                key={entry.permalink}
                id={entry.version}
                data-permalink={entry.permalink}
                ref={(el) => {
                  sectionsRef.current[entry.permalink] = el
                }}
                className={styles.section}
              >
                {isNewMonth && (
                  <div className={styles.monthLabel}>{entry.monthLabel}</div>
                )}
                <Heading as="h2" className={styles.versionHeading}>
                  {entry.version}
                </Heading>
                <div className="theme-doc-markdown markdown">
                  <entry.Component />
                </div>
                {i < displayed.length - 1 && <hr className={styles.separator} />}
              </section>
            )
          })}
          {visibleCount < subsequentEntries.length && (
            <div ref={sentinelRef} className={styles.sentinel} />
          )}
        </div>
      </div>
    </div>
  )
}
