import { useEffect, useState, useTransition } from 'react';
import CategoryRanking from '../CategoryRanking';
import useSearchItem from '/src/api/ShoppingSearch/useSeacrhItem';
import { cn } from '@bcsdlab/utils';
import styles from './MainComponent.module.scss';

export default function MainComponent() {
  const productList = ['상의', '아우터', '바지', '스커트', '가방', '신발', '시계', '모자', '스포츠', '안경'];
  const [currentCategory, setCurrentCategory] = useState(0);
  const [product, setProduct] = useState([productList[0]]);
  const { data } = useSearchItem(product);
  const [isPending, startTransition] = useTransition();
  const [visibleData, setVisibleData] = useState([]);

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

  useEffect(() => {
    if (data) {
      startTransition(() => {
        setVisibleData(data);
      });
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.container__category}>
        <div>상품</div>
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
      <CategoryRanking products={visibleData} isPending={isPending} />
    </div>
  );
}
