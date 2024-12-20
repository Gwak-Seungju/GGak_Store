import { useEffect, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import CategoryRanking from '/src/components/CategoryRanking';
import SkeletonRanking from '/src/components/CategoryRanking/SkeletonRanking';
import styles from './SearchPage.module.scss';

export default function SearchPage() {
  const { product } = useParams();

  useEffect(() => {
    scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  return (
    <div className={styles.container}>
      <Suspense fallback={<SkeletonRanking version="search" />}>
        <CategoryRanking product={product} version="search" />
      </Suspense>
    </div>
  );
}
