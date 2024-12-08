import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '/src/assets/search-icon.svg';
import BucketIcon from '/src/assets/bucket-icon.svg';
import useStore from '/src/utils/store/store';
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
      <div className={styles['main-inner']}>
        <div className={styles['main-inner--left']}>
          <h1 className={styles['main-inner--name']} onClick={goHome}>
            GGak Store
          </h1>
          <div className={styles['main-inner--search']}>
            <input
              className={styles['main-inner--input']}
              placeholder="상품 입력"
              type="text"
              ref={inputRef}
              onKeyDown={(e) => activeEnter(e)}
            />
            <SearchIcon onClick={handleSearch} className={styles['main-inner--icon']} />
          </div>
        </div>
        <div
          className={styles['main-inner__bucket']}
          onClick={() => {
            navigate('/BucketPage');
          }}
        >
          <div className={styles['main-inner__bucket--count']}>{bucket.length}</div>
          <BucketIcon className={styles['main-inner__bucket--icon']} />
        </div>
      </div>
    </div>
  );
}

export default Header;
