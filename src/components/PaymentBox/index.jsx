import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@bcsdlab/utils';
import CouponModal from '/src/components/CouponModal';
import useStore from '/src/utils/store/store';
import styles from './PaymentBox.module.scss';

const generalPayment = ['카드', '가상계좌', 'Apple Pay', '휴대폰', '카카오페이', '삼성페이', '네이버페이', '페이코'];

export default function PaymentBox({ purchaseItems, isFromBucket }) {
  const { clearBucket } = useStore((state) => state);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isRadioChecked, setIsRadioChecked] = useState(null);
  const [checkboxes, setCheckBoxes] = useState([
    { id: 1, label: '[필수 ] 개인정보 수집 및 이용 동의', checked: false },
    { id: 2, label: '[필수 ] 개인정보 제 3자 제공 동의', checked: false },
    { id: 3, label: '[필수 ] 전자결제대행 이용 동의', checked: false },
  ]);
  const [clickedButton, setClickedButton] = useState('카드');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRadioChecked === null) {
      alert('결제 방법을 선택해주세요');
    }
    const allChecked = checkboxes.every((checkbox) => checkbox.checked);
    if (allChecked && isRadioChecked !== null) {
      alert('결제가 완료되었습니다. 감사합니다.');
      if (isFromBucket) clearBucket();
      navigate('/');
    } else {
      alert('필수 동의 사항을 모두 체크해주십시오.');
    }
  };

  const handleRadioCheck = (e) => {
    setIsRadioChecked(e.target.value);
  };

  const handleCheckboxChange = (id) => {
    setCheckBoxes((prev) =>
      prev.map((checkbox) => (checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox))
    );
  };

  const result = purchaseItems.reduce((acc, item) => acc + item.lprice * item.productNumber, 0);

  return (
    <div className={styles.container}>
      <div className={styles.bucket}>
        <div className={styles.bucket__head}>
          <div className={styles.bucket__count}>상품 총 개수: {purchaseItems.length}</div>
        </div>
        {purchaseItems.map((item, index) => (
          <div className={styles.bucket__box} key={index}>
            <img className={styles['bucket__box--image']} src={item.image} alt={item.mallName}></img>
            <div className={styles['bucket__box--name']}>{item.title.replace(/<b>/g, '').replace(/<\/b>/g, '')}</div>
            <div className={styles['bucket__box--number']}>{item.productNumber}개</div>
            <div className={styles['bucket__box--price']}>
              {(item.lprice * item.productNumber).toLocaleString('ko-KR')}원
            </div>
          </div>
        ))}
        <div className={styles.payment}>
          <div className={styles.payment__price}>
            <div>상품 금액 </div>
            <div>{result.toLocaleString('ko-KR')}원</div>
          </div>
          <div className={styles.coupon}>
            <div id="coupon">쿠폰 할인</div>
            <button className={styles.coupon__select} onClick={openModal}>
              쿠폰 선택
            </button>
            {isModalOpen && (
              <CouponModal closeModal={closeModal} amount={result} setDiscountAmount={setDiscountAmount} />
            )}
            <div>- {(1 * discountAmount).toLocaleString('ko-KR')}원</div>
          </div>
          <div className={styles['payment__price--total']}>
            총 {(result - discountAmount).toLocaleString('ko-KR')}원
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles['payment-info']}>
          <div className={styles['payment-info__guide']} id="paymentMethod">
            결제 수단
          </div>
          <div>
            <label htmlFor="GGak">
              <input type="radio" name="payment" value="깍 페이" id="GGak" onChange={handleRadioCheck} /> 깍 페이
            </label>
            <br />
            <label htmlFor="toss">
              <input type="radio" name="payment" value="토스 페이" id="toss" onChange={handleRadioCheck} /> 토스 페이
            </label>
            <br />
            <label htmlFor="general">
              <input type="radio" name="payment" value="일반 결제" id="general" onChange={handleRadioCheck} /> 일반 결제
            </label>
            <br />
          </div>
          <div className={styles['payment-info__guide']}>결제 안내</div>
          <div
            className={cn({
              [styles['payment-info__method']]: isRadioChecked === '일반 결제',
            })}
          >
            {isRadioChecked === '깍 페이' && <div className={styles['payment-info--GGak-pay']}>GG Pay</div>}
            {isRadioChecked === '토스 페이' && (
              <div className={styles['payment-info--toss-pay']}>
                ㆍ토스페이: 모든 카드(신용/체크), 계좌 결제 가능, 토스 소액후불결제
              </div>
            )}
            {isRadioChecked === '일반 결제' &&
              generalPayment.map((item, index) => (
                <button
                  className={cn({
                    [styles['payment-info__general-button']]: true,
                    [styles['payment-info__general-button--selected']]: item === clickedButton,
                  })}
                  type="button"
                  key={index}
                  onClick={() => {
                    setClickedButton(item);
                  }}
                >
                  {item}
                </button>
              ))}
          </div>
          <div className={styles['payment-info__guide']}>품절 시 환불 안내</div>
          <div className={styles['payment-info__guide--refund']}>
            ㆍ입점업체 배송은 낮은 확률로 상품이 품절일 가능성이 있습니다. 이에 품절 시 빠르게 환불 처리해드립니다.
            <br />
            ㆍ현금 환불의 경우, 예금정보가 일치해야 환불 처리가 가능합니다. 은행명, 계좌번호, 예금주명을 정확히 기재
            부탁드립니다.
            <br />
            ㆍ환불 받으신 날짜 기준으로 3~5일(주말 제외) 후 결제대행사에서 직접 고객님의 계좌로 환불 처리됩니다.
          </div>
          <div className={styles['payment-info__guide']}>주문자 동의</div>
          <div className={styles['payment-info__guide--agreement']}>
            <div className={styles['payment-info--agree']}>
              주문 내용을 확인했으며 서비스 약관 및 결제에 동의합니다.
            </div>
            {checkboxes.map((checkbox) => (
              <label key={checkbox.id}>
                <input type="checkbox" checked={checkbox.checked} onChange={() => handleCheckboxChange(checkbox.id)} />
                {checkbox.label}
                <br />
              </label>
            ))}
            <label htmlFor="like">
              <input type="checkbox" name="agreement" id="like" />
              [선택 ] 페이지가 마음에 드신가요?
              <br />
            </label>
          </div>
        </div>
        <div className={styles.submit}>
          <input
            type="submit"
            className={styles.submit__pay}
            value={`${(result - discountAmount).toLocaleString('ko-KR')}원 결제하기`}
          />
        </div>
      </form>
    </div>
  );
}
