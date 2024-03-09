import "./CartCheckout.scss";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "~/contexts/CartContext";

export default function CartCheckout() {
  const { totalProducts } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const shippingCost = 10;
  useEffect(() => {
    setTotalPrice(totalProducts + shippingCost);
  }, [totalProducts]);
  return (
    <div className="cart-checkout__container col l-3 m-3 c-3">
      <h3 className="cart-checkout__title">Order Summary</h3>
      <div className="cart-checkout__content">
        <div className="cart-checkout__item">
          <span>Total Products:</span>
          <span>${totalProducts}</span>
        </div>
        <div className="cart-checkout__item">
          <span>Shipping Cost:</span>
          <span>${shippingCost}</span>
        </div>
        <div className="divider"></div>
        <div className="cart-checkout__item total">
          <span>Total Price:</span>
          <span>${totalPrice}</span>
        </div>
        <button className="cart-checkout__button">Checkout</button>
      </div>
    </div>
  );
}