import React from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
import styles from './index.module.css'

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">Documentation</h1>
        <p className="hero__subtitle">Find user guides, developer guides, API references, and more.</p>
      </div>
    </header>
  )
}

export default function Home() {
  return (
    <Layout>
      <HomepageHeader />
      <main className={styles.container}>
        <ul>
          <li><a href="/reference/organizations">Reference</a></li>
          <li><a href="/cli">Command Line Interface</a></li>
          <li><a href="/admin-api">Peridio Admin API</a></li>
          <li><a href="/device-api">Peridio Device API</a></li>
          <li><a href="/guides/overview">Guides</a></li>
        </ul>
      </main>
    </Layout>
  )
}
