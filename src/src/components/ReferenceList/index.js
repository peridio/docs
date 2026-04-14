import React, { useState, useMemo } from 'react'
import Link from '@docusaurus/Link'
import Heading from '@theme/Heading'
import styles from './styles.module.css'

const GITHUB_BASE = 'https://github.com/avocado-linux/references/tree/main'

function Tag({ label, variant, onClick, active }) {
  const className = `${styles.tag} ${styles[`tag--${variant}`]}${active ? ` ${styles.tagActive}` : ''}${onClick ? ` ${styles.tagClickable}` : ''}`
  if (onClick) {
    return (
      <button className={className} onClick={onClick}>
        {label}
      </button>
    )
  }
  return <span className={className}>{label}</span>
}

function GitHubIcon({ size = 16 }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

function ReferenceCard({ reference }) {
  const { name, title, description, language, targets, topics, icon, experimental } = reference
  const pageHref = `/developer-reference/references/${name}`
  const githubHref = `${GITHUB_BASE}/${name}`

  return (
    <div className={styles.card}>
      <Link to={pageHref} className={styles.cardLink}>
        <div className={styles.cardContent}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitleRow}>
              {icon && <img src={icon} alt="" className={styles.cardIcon} />}
              <Heading as="h3" className={styles.cardTitle}>
                {title}
              </Heading>
            </div>
            <div className={styles.tags}>
              {language && <Tag label={language} variant="language" />}
              {experimental && <Tag label="Experimental" variant="experimental" />}
              {topics && topics.map((t) => <Tag key={t} label={t} variant="topic" />)}
              {targets &&
                targets.length > 0 &&
                !targets.includes('*') &&
                targets.map((t) => <Tag key={t} label={t} variant="target" />)}
              {targets && targets.includes('*') && <Tag label="all targets" variant="target" />}
            </div>
          </div>
          {description && <p className={styles.cardDescription}>{description}</p>}
        </div>
      </Link>
      <Link
        href={githubHref}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.cardGithub}
        title="View source on GitHub"
        onClick={(e) => e.stopPropagation()}
      >
        <GitHubIcon size={18} />
      </Link>
    </div>
  )
}

export default function ReferenceList({ references }) {
  const [filterType, setFilterType] = useState('all') // 'all' | 'language' | 'target' | 'topic'
  const [filterValue, setFilterValue] = useState(null)

  const languages = useMemo(
    () => [...new Set(references.map((r) => r.language).filter(Boolean))].sort(),
    [references]
  )

  const allTopics = useMemo(
    () => [...new Set(references.flatMap((r) => r.topics || []))].sort(),
    [references]
  )

  const allTargets = useMemo(() => {
    const targets = new Set()
    references.forEach((r) => {
      if (r.targets)
        r.targets.forEach((t) => {
          if (t !== '*') targets.add(t)
        })
    })
    return [...targets].sort()
  }, [references])

  const filtered = useMemo(() => {
    if (filterType === 'all') return references
    if (filterType === 'experimental') return references.filter((r) => r.experimental)
    if (filterType === 'language') return references.filter((r) => r.language === filterValue)
    if (filterType === 'target')
      return references.filter(
        (r) => r.targets && (r.targets.includes('*') || r.targets.includes(filterValue))
      )
    if (filterType === 'topic')
      return references.filter((r) => r.topics && r.topics.includes(filterValue))
    return references
  }, [references, filterType, filterValue])

  function setFilter(type, value) {
    if (filterType === type && filterValue === value) {
      setFilterType('all')
      setFilterValue(null)
    } else {
      setFilterType(type)
      setFilterValue(value)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.filterGroups}>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Language</span>
          <div className={styles.filters}>
            {languages.map((lang) => (
              <button
                key={lang}
                className={`${styles.filterBtn} ${filterType === 'language' && filterValue === lang ? styles.filterBtnActive : ''}`}
                onClick={() => setFilter('language', lang)}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Topic</span>
          <div className={styles.filters}>
            {allTopics.map((topic) => (
              <button
                key={topic}
                className={`${styles.filterBtn} ${styles.filterBtnTopic} ${filterType === 'topic' && filterValue === topic ? styles.filterBtnActive : ''}`}
                onClick={() => setFilter('topic', topic)}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Target</span>
          <div className={styles.filters}>
            {allTargets.map((target) => (
              <button
                key={target}
                className={`${styles.filterBtn} ${styles.filterBtnTarget} ${filterType === 'target' && filterValue === target ? styles.filterBtnActive : ''}`}
                onClick={() => setFilter('target', target)}
              >
                {target}
              </button>
            ))}
          </div>
        </div>
      </div>
      {filterType !== 'all' && (
        <button
          className={styles.clearFilter}
          onClick={() => {
            setFilterType('all')
            setFilterValue(null)
          }}
        >
          Clear filter
        </button>
      )}
      <div className={styles.list}>
        {filtered.map((ref) => (
          <ReferenceCard key={ref.name} reference={ref} />
        ))}
        {filtered.length === 0 && <p className={styles.empty}>No references match this filter.</p>}
      </div>
    </div>
  )
}
