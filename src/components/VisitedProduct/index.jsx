import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '/src/utils/store/store';
import styles from './VisitedProduct.module.scss';

export default function VisitedProduct() {
  const { visitedProduct, addVisitedProduct, clearVisitedProduct } = useStore((state) => state);
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className={`${styles.container} ${isExpanded ? styles.expanded : ''}`}>
      <div className={styles.container__head} onClick={toggleExpand}>
        Visited {isExpanded ? '▲' : '▼'}
      </div>
      {isExpanded && (
        <>
          {visitedProduct.length !== 0 ? (
            visitedProduct.slice(0, 5).map((item, index) => (
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
          ) : (
            <div className={styles.container__empty}>No visited products</div>
          )}
          <button className={styles.container__clear} onClick={clearVisitedProduct}>
            Clear
          </button>
        </>
      )}
    </div>
  );
}
