import React from 'react';
import styles from './HomepageFeatures.module.css';

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="col">
          <div style={{ marginBottom: '20px' }}>
            <a href="reference/accounts">
              <h2>Reference »</h2>
              <span>Use the reference to learn about Peridio resources.</span>
            </a>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <a href="cli/authentication">
              <h2>CLI »</h2>
              <span>Use the CLI to simply interact with Peridio.</span>
            </a>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <a href="api/0">
              <h2>API »</h2>
              <span>Use the API to build powerful integrated systems.</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
