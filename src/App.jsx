import { Routes, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import MainComponent from './components/MainComponent/index';
import SearchPage from './pages/SearchPage';
import ProductDetailPage from './pages/ProductDetailPage';
import BucketPage from './pages/BucketPage';
import PaymentPage from './pages/PaymentPage';
import VisitedProduct from './components/VisitedProduct';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.container}>
      <VisitedProduct />
      <Routes>
        <Route path="/" element={<IndexPage />}>
          <Route path="/" element={<MainComponent />} />
          <Route path="/SearchPage/:product" element={<SearchPage />} />
          <Route path="/ProductPage/:productId/:ranking" element={<ProductDetailPage />} />
          <Route path="/BucketPage" element={<BucketPage />} />
          <Route path="/PaymentPage" element={<PaymentPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
