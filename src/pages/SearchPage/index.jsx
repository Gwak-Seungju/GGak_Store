import { useParams } from 'react-router-dom';
import CategoryRanking from '/src/components/CategoryRanking';
import styles from './SearchPage.module.scss';
import { Suspense } from 'react';
import SkeletonRanking from '../../components/CategoryRanking/SkeletonRanking';

export default function SearchPage() {
  const { product } = useParams();

  return (
    <div className={styles.container}>
      <Suspense fallback={<SkeletonRanking version="search" />}>
        <CategoryRanking product={product} version="search" />
      </Suspense>
    </div>
  );
}
