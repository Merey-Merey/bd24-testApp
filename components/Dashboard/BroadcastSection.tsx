import React from 'react';
import styles from './BroadcastSection.module.scss';

const BroadcastSection: React.FC = () => {
  return (
    <div className={styles.broadcastSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.line}></span>Трансляция
        </h2>
        <button className={styles.liveButton}>
          <span className={styles.liveDot}></span>
          Live
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className={styles.broadcastContent}>
        <div className={styles.broadcastImage}>
          <img src="/images/live.jpg" alt="Трансляция" />
        </div>
      </div>
    </div>
  );
};

export default BroadcastSection;
