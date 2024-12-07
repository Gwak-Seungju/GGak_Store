// import { useState, useEffect, useTransition } from 'react';
import { cn } from '@bcsdlab/utils';
import styles from './SkeletonRanking.module.scss';

export default function SkeletonRanking({ version }) {
  const data = Array.from({ length: 100 });
  const filteredData = version === 'mainPage' ? (data ?? []).slice(0, 12) : data;

  return (
    <div
      className={cn({
        [styles.skeleton]: true,
        [styles.skeleton__search]: version === 'search',
      })}
    >
      {filteredData.map((_, index) => (
        <div className={styles.skeleton__item} key={index}>
          <div className={styles.skeleton__ranking} />
          <div className={styles.skeleton__image} />
          <div className={styles.skeleton__name} />
          <div className={styles.skeleton__price} />
        </div>
      ))}
    </div>
  );
}
