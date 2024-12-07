import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '/src/utils/store/store';
import styles from './ProductBox.module.scss';

export default function ProductBox({ product }) {
  const { addItem, bucket } = useStore((state) => state);
  const [productNumber, setProductNumber] = useState(1);
  const navigate = useNavigate();

  const isNotAddableProduct = bucket.some((item) => item.title === product.title);

  const handleBucketClick = () => {
    if (bucket.length === 0 || !isNotAddableProduct) {
      product.productNumber = productNumber;
      addItem(product);
      alert('장바구니에 담겼습니다!');
    } else {
      alert('이미 장바구니에 같은 상품이 있습니다.');
    }
  };

  const handlePurchaseClick = () => {
    product.productNumber = productNumber;
    navigate('/PaymentPage', {
      state: { product },
    });
  };

  return (
    <div className={styles.container}>
      <img className={styles.container__image} src={product.image} alt={product.mallName}></img>
      <div className={styles.container__product}>
        <div className={styles['container__product--title']}>
          {product.title.replace(/<b>/g, '').replace(/<\/b>/g, '')}
        </div>
        <div className={styles['container__product--price']}>{(1 * product.lprice).toLocaleString('ko-KR')}원</div>
        <div className={styles['quantity-container']}>
          <span>구매 수량</span>
          <div>
            <button
              className={styles['quantity-container__button']}
              onClick={() => {
                if (productNumber > 1) {
                  setProductNumber((count) => count - 1);
                }
              }}
            >
              -
            </button>
            <span className={styles['quantity-container--count']}>{productNumber}</span>
            <button
              className={styles['quantity-container__button']}
              onClick={() => {
                setProductNumber((count) => count + 1);
              }}
            >
              +
            </button>
          </div>
        </div>
        <div className={styles['total-price-container']}>
          <span>총 상품 금액</span>
          <div className={styles['total-price-container--price']}>
            {(productNumber * product.lprice).toLocaleString('ko-KR')}원
          </div>
        </div>
        <div className={styles['button-container']}>
          <button onClick={handleBucketClick} className={styles['button-container--bucket']}>
            장바구니
          </button>
          <button onClick={handlePurchaseClick} className={styles['button-container--purchase']}>
            구매하기
          </button>
        </div>
      </div>
    </div>
  );
}
