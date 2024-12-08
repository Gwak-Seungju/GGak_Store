import { useNavigate } from 'react-router-dom';
import useStore from '/src/utils/store/store';
import styles from './BucketPage.module.scss';

export default function BucketPage() {
  const { bucket, setBucket, removeItem, clearBucket } = useStore((state) => state);
  const navigate = useNavigate();
  const handleDecrease = (index) => {
    const updatedItems = bucket.map((item, i) => {
      if (i === index && item.productNumber > 0) {
        return { ...item, productNumber: item.productNumber - 1 };
      }
      return item;
    });
    setBucket(updatedItems);
  };
  const handleIncrease = (index) => {
    const updatedItems = bucket.map((item, i) => {
      if (i === index) {
        return { ...item, productNumber: item.productNumber + 1 };
      }
      return item;
    });
    setBucket(updatedItems);
  };
  const totalPrice = bucket.reduce((accumulator, item) => accumulator + item.lprice * item.productNumber, 0);

  return (
    <div className={styles.container}>
      <div className={styles.container__head}>
        <div>상품 총 개수: {bucket.length}</div>
        <button className={styles['container__head--clear']} onClick={clearBucket}>
          장바구니 비우기
        </button>
      </div>
      {bucket.map((item, index) => (
        <div className={styles['bucket-container']} key={index}>
          <img className={styles['bucket-container--image']} src={item.image} alt={item.mallName}></img>
          <div className={styles['bucket-container--name']}>{item.title.replace(/<b>/g, '').replace(/<\/b>/g, '')}</div>
          <div className={styles['bucket-container__count']}>
            <button
              className={styles['bucket-container__count--decrease']}
              onClick={() => {
                handleDecrease(index);
              }}
            >
              -
            </button>
            <div className={styles['bucket-container__count--number']}>{item.productNumber}</div>
            <button
              className={styles['bucket-container__count--increase']}
              onClick={() => {
                handleIncrease(index);
              }}
            >
              +
            </button>
          </div>
          <div className={styles['bucket-container__price']}>
            {(item.lprice * item.productNumber).toLocaleString('ko-KR')}원
          </div>
          <button
            className={styles['bucket-container__delete']}
            onClick={() => {
              removeItem(item.productId);
            }}
          >
            x
          </button>
        </div>
      ))}
      <div className={styles.totalPrice}>총 결제 금액: {totalPrice.toLocaleString('ko-KR')}원</div>
      <button
        className={styles.order}
        onClick={() => {
          totalPrice === 0 ? alert('최소 하나 이상의 상품을 구매하셔야 합니다.') : navigate('/PaymentPage');
        }}
      >
        주문하기
      </button>
    </div>
  );
}
