import { Outlet } from "react-router-dom";
import { Suspense } from 'react';
import Header from '/src/components/Header';
import Footer from '/src/components/Footer';

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
    </>
  )
}

export default IndexPage;