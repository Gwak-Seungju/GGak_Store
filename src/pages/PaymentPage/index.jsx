import { useLocation } from 'react-router-dom';
import PaymentBox from '/src/components/PaymentBox';
import useStore from '/src/utils/store/store';
import styles from './PaymentPage.module.scss';

export default function PaymentPage() {
  const { bucket } = useStore((state) => state);
  const location = useLocation();

  return (
    <div className={styles.container}>
      {location.state === null ? (
        <PaymentBox purchaseItems={bucket} isFromBucket={true} />
      ) : (
        <PaymentBox purchaseItems={[location.state]} isFromBucket={false} />
      )}
    </div>
  );
}
