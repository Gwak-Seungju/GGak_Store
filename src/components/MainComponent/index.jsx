import { Suspense, useEffect, useState } from 'react';
import { cn } from '@bcsdlab/utils';
import CategoryRanking from '/src/components/CategoryRanking';
import SkeletonRanking from '/src/components/CategoryRanking/SkeletonRanking';
import styles from './MainComponent.module.scss';

const productList = ['상의', '아우터', '바지', '스커트', '가방', '신발', '시계', '모자', '스포츠', '안경'];

export default function MainComponent() {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [product, setProduct] = useState(productList[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentCategory((prev) => (prev + 1) % productList.length);
    }, 6000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const newProduct = productList[currentCategory];
    setProduct(newProduct);
  }, [currentCategory]);

  return (
    <div className={styles.container}>
      <div className={styles.container__category}>
        <div className={styles['container__category--title']}>상품</div>
        {productList.map((item, index) => (
          <button
            key={index}
            className={cn({
              [styles.container__button]: true,
              [styles['container__button--selected']]: index === currentCategory,
            })}
            onClick={() => {
              setCurrentCategory(index);
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <Suspense fallback={<SkeletonRanking version="mainPage" />}>
        <CategoryRanking product={product} version="mainPage" />
      </Suspense>
    </div>
  );
}
