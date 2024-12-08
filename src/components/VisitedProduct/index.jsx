import { useNavigate } from 'react-router-dom';
import useStore from '../../utils/store/store';
import styles from './VisitedProduct.module.scss';

export default function VisitedProduct() {
  const { visitedProduct, addVisitedProduct, clearVisitedProduct } = useStore((state) => state);
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.container__head}>visited</div>
      {visitedProduct.length !== 0
        ? visitedProduct.slice(0, 5).map((item, index) => (
            <span key={index}>
              <img
                className={styles.container__image}
                src={item.image}
                alt={item.mallName}
                onClick={() => {
                  addVisitedProduct(item);
                  navigate(`/ProductPage/${item.productId}`, { state: item });
                }}
              />
            </span>
          ))
        : null}
      <button className={styles.container__clear} onClick={clearVisitedProduct}>
        비우기
      </button>
    </div>
  );
}
