import React from 'react'
import styles from './styles.module.css'

export default function TestedAgainst({ avocado, jetpack, boards = [] }) {
  const parts = []
  if (avocado) parts.push(<code key="avocado">Avocado {avocado}</code>)
  if (jetpack) parts.push(<code key="jetpack">JetPack {jetpack}</code>)
  if (boards.length > 0) {
    parts.push(
      <span key="boards" className={styles.boards}>
        {boards.join(', ')}
      </span>
    )
  }

  if (parts.length === 0) return null

  return (
    <div className={styles.testedAgainst}>
      <strong>Tested against:</strong>{' '}
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className={styles.sep}> · </span>}
          {part}
        </React.Fragment>
      ))}
    </div>
  )
}
