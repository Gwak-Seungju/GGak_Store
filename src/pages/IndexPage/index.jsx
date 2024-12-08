import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Header from '/src/components/Header';
import Footer from '/src/components/Footer';
import VisitedProduct from '/src/components/VisitedProduct';

function IndexPage() {
  return (
    <>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      <Footer />
      <VisitedProduct />
    </>
  );
}

export default IndexPage;
