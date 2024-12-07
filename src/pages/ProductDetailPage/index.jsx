import { useLocation } from 'react-router-dom';
import ProductBox from '/src/components/ProductBox';
import styles from './ProductDetailPage.module.scss';

export default function ProductDetailPage() {
  const location = useLocation();
  console.log(location.state);

  return (
    <div className={styles.container}>
      <ProductBox product={location.state} />
    </div>
  );
}
