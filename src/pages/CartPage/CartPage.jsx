import "./CartPage.scss";
import FramePage from "~/component/FramePage/FramePage";
import CartCheckout from "~/component/CartCheckout/CartCheckout";
import ListProductCart from "~/component/ListProductCart/ListProductCart";
import { useState, useEffect } from "react";
export default function CartPage() {

  return (
    <FramePage>
      <div className="container__cart-page row">
        <ListProductCart />
        <CartCheckout  />
      </div>
    </FramePage>
  );
}
