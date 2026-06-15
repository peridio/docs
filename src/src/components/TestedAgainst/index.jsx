import React from 'react'
import styles from './styles.module.css'

export default function TestedAgainst({ avocado, jetpack, boards = [] }) {
  return (
    <div className={styles.testedAgainst}>
      <strong>Tested against:</strong>{' '}
      {avocado && <code>Avocado {avocado}</code>}{' '}
      {jetpack && <code>JetPack {jetpack}</code>}{' '}
      {boards.length > 0 && <span className={styles.boards}>· {boards.join(', ')}</span>}
    </div>
  )
}
