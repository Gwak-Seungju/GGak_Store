import { Link } from 'react-router-dom';
import useStore from '/src/utils/store/store';
import { cn } from '@bcsdlab/utils';
import styles from './CategoryRanking.module.scss';

export default function CategoryRanking({ products, isPending }) {
  const { addVisitedProduct } = useStore((state) => state);

  return (
    <div
      className={cn({
        [styles.container]: true,
        [styles['container__fade-out']]: isPending,
        [styles['container__fade-in']]: !isPending,
      })}
    >
      {(products ?? []).map((item, index) => (
        <div className={styles.container__product} key={index}>
          <div className={styles['container__product--ranking']}>{index + 1}위</div>
          <Link to={`/ProductPage/${item.productId}/${index + 1}`}>
            <img
              className={styles['container__product--image']}
              src={item.image}
              alt={item.mallName}
              onClick={() => {
                addVisitedProduct(item);
              }}
            />
          </Link>
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
