import useStore from '/src/utils/store/store';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '/src/assets/search-icon.svg';
import BucketIcon from '/src/assets/bucket-icon.svg';
import styles from './Header.module.scss';

function Header() {
  const { bucket } = useStore((state) => state);
  const inputRef = useRef();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (inputRef.current.value === '') {
      alert('검색어를 입력하세요.');
    } else {
      navigate(`/SearchPage/${inputRef.current.value}`);
    }
  };

  const activeEnter = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  const goHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.header}>
      <div className={styles['header__main-inner']}>
        <div className={styles['header__main-inner--left']}>
          <h1 className={styles['header__main-inner--name']} onClick={goHome}>
            GGak Store
          </h1>
          <div className={styles['header__main-inner--search']}>
            <input
              className={styles['header__main-inner--input']}
              placeholder="상품 입력"
              type="text"
              ref={inputRef}
              onKeyDown={(e) => activeEnter(e)}
            />
            <SearchIcon onClick={handleSearch} className={styles['header__main-inner--icon']} />
          </div>
        </div>
        <div
          className={styles.bucket}
          onClick={() => {
            navigate('/BucketPage');
          }}
        >
          <div className={styles.bucket__count}>{bucket.length}</div>
          <BucketIcon className={styles.bucket__icon} />
        </div>
      </div>
    </div>
  );
}

export default Header;
