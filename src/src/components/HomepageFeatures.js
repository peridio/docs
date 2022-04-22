import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="col">
            <a href="reference/accounts">
              <p>
                <h2>Reference »</h2>
                <span>Use the reference to learn about Peridio resources.</span>
              </p>
            </a>
          <a href="cli/authentication">
            <p>
              <h2>CLI »</h2>
              <span>Use the CLI to simply interact with Peridio.</span>
            </p>
          </a>
          <a href="api/0">
            <p>
              <h2>API »</h2>
              <span>Use the API to build powerful integrated systems.</span>
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
