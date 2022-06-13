import React from 'react';
import styles from './StackIndex.module.css';

export default function Home() {
  return (
    <main>
      <div className={styles.stack_link}>
        <a href="chanterelle/reference/accounts">
          <span className={styles.title}>Reference</span>
          <span className={styles.subtitle}>learn</span>
        </a>
      </div>
      <div className={styles.stack_link}>
        <a href="chanterelle/cli/authentication">
          <span className={styles.title}>CLI</span>
          <span className={styles.subtitle}>interact</span>
        </a>
      </div>
      <div className={styles.stack_link}>
        <a href="chanterelle/api">
          <span className={styles.title}>API</span>
          <span className={styles.subtitle}>integrate</span>
        </a>
      </div>
    </main>
  );
}
