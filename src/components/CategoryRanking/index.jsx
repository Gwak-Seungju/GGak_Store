// import { useState, useEffect, useTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '/src/utils/store/store';
import { cn } from '@bcsdlab/utils';
import useSearchItem from '/src/api/ShoppingSearch/useSeacrhItem';
import styles from './CategoryRanking.module.scss';

export default function CategoryRanking({ product, version }) {
  const { addVisitedProduct } = useStore((state) => state);
  const navigate = useNavigate();
  const { data } = useSearchItem(product);
  const filteredData = version === 'mainPage' ? (data ?? []).slice(0, 12) : data;

  return (
    <div
      className={cn({
        [styles.container]: true,
        [styles.container__search]: version === 'search',
      })}
    >
      {filteredData.map((item, index) => (
        <div className={styles.container__product} key={index}>
          <div className={styles['container__product--ranking']}>{index + 1}위</div>
          <img
            className={styles['container__product--image']}
            src={item.image}
            alt={item.mallName}
            onClick={() => {
              addVisitedProduct(item);
              navigate(`/ProductPage/${item.productId}`, { state: item });
            }}
          />
          <div className={styles['container__product--name']}>
            {item.title.replace(/<b>/g, '').replace(/<\/b>/g, '')}
          </div>
          <div>
            <span className={styles['container__product--price']}>{(1 * item.lprice).toLocaleString('ko-KR')}</span>
            <span>원</span>
          </div>
        </div>
      ))}
    </div>
  );
}
