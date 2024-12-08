import { useState } from 'react';
import styles from './CouponModal.module.scss';

const couponList = [
  { couponName: '첫 방문 할인 쿠폰(-5000원)', 할인율: 0, 할인금액: 5000 },
  { couponName: 'GGak Store 회원 정기 쿠폰(5%)', 할인율: 5, 할인금액: 0 },
  { couponName: 'GGak Store 회원 특별 쿠폰(7%)', 할인율: 7, 할인금액: 0 },
];

export default function CouponModal({ closeModal, amount, setDiscountAmount }) {
  const [isRadioChecked, setIsRadioChecked] = useState(null);
  const handleRadioCheck = (e) => {
    setIsRadioChecked(e.target.value);
  };

  const calculatedCouponList = couponList.map((item) => ({
    ...item,
    할인금액: Math.round(item.할인금액 + (amount * item.할인율) / 100),
  }));
  console.log(calculatedCouponList);

  return (
    <div className={styles.background}>
      <form className={styles.container}>
        <h2 className={styles.container__title}>적용 가능 쿠폰 리스트</h2>
        <div className={styles.container__guide}>쿠폰을 선택해주세요.(중복 선택 불가)</div>
        <div className={styles.container__list}>
          <div className={styles['container__list--header']}>쿠폰명</div>
          <div className={styles['container__list--header']}>할인율</div>
          <div className={styles['container__list--header']}>할인금액</div>
          {calculatedCouponList.map((item) => (
            <>
              <label className={styles.coupon}>
                <input type="radio" name="coupon" value={item.할인금액} onChange={handleRadioCheck} />
                {item.couponName}
              </label>
              <div className={styles.coupon__discount}> {item.할인율 === 0 ? ' - ' : item.할인율}% </div>
              <div className={styles['coupon__discount--amount']}>{item.할인금액.toLocaleString('ko-KR')}원</div>
            </>
          ))}
        </div>
        <div className={styles.container__button}>
          <button onClick={closeModal} className={styles['container__button--cancel']}>
            취소
          </button>
          <button
            onClick={() => {
              closeModal();
              setDiscountAmount(isRadioChecked);
            }}
            className={styles['container__button--select']}
          >
            쿠폰선택
          </button>
        </div>
      </form>
    </div>
  );
}
