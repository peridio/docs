import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">Documentation</h1>
        <p className="hero__subtitle">Find user guides, developer guides, API references, and more.</p>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout>
      <HomepageHeader />
      <main>
        <div className={styles.stack}>
          <div className={styles.header}>
            <span className={styles.title}>Cremini</span>
            <span className={styles.subtitle}>v1-stable</span>
          </div>
          <div className={styles.body}>
            <ul>
              <li><a href="/cremini/reference/organizations">Reference</a></li>
              <li><a href="/cremini/admin-api">Peridio Admin API</a></li>
              <li><a href="/cremini/device-api">Peridio Device API</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.stack}>
          <div className={styles.header}>
            <span className={styles.title}>Chanterelle</span>
            <span className={styles.subtitle}>v2-alpha</span>
          </div>
          <div className={styles.body}>
            <ul>
              <li><a href="/chanterelle/reference/accounts">Reference</a></li>
              <li><a href="/chanterelle/cli/installation">CLI</a></li>
              <li><a href="/chanterelle/api">Peridio API</a></li>
            </ul>
          </div>
        </div>
      </main>
    </Layout>
  );
}
