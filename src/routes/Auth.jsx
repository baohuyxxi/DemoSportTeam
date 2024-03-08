import React, { Suspense, lazy, useState } from "react";

const ProductsPage = lazy(() => import("~/pages/ProductsPage/ProductsPage"));
const CartPage = lazy(() => import("~/pages/CartPage/CartPage"));

export default function Auth() {
  const [path, setPath] = useState(window.location.pathname);

  const handleRouteChange = (newPath) => {
    setPath(newPath);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        {path === "/" && <ProductsPage />}
        {path === "/cart" && <CartPage />}
      </div>
    </Suspense>
  );
}
