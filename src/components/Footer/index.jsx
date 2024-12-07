import styles from './Footer.module.scss';

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.content__info}>
          <div>서울특별시 강남구 테헤란로 123, 456호</div>
          <div>TEL 010-1234-5678</div>
        </div>
        <div className={styles.content__notice}>
          일부 상품의 경우 주식회사 깍스토어는 통신판매의 당사자가 아닌 통신판매중개자로서 상품, 상품정보, 거래에 대한
          책임이 제한될 수 있으므로, 각 상품 페이지에서 구체적인 내용을 확인하시기 바랍니다.
        </div>
        <div className={styles.content__copyright}>
          {`COPYRIGHT ⓒ ${new Date().getFullYear()} BY GGakStore ALL RIGHTS RESERVED.`}
        </div>
      </div>
    </div>
  );
}

export default Footer;
