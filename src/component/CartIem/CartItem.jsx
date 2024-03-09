import { useContext, useEffect, useState } from "react";
import "./CartItem.scss";
import productAPI from "~/services/apis/productAPI";
import Counter from "../Counter/Counter";
import { CartContext } from "~/contexts/CartContext";
import Checkbox from "../Checkbox/Checkbox";
export default function CartItem({
  cartitem,
  index,
  isSelected,
  onToggleCheckbox,
}) {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(cartitem.quantity);
  const [total, setTotal] = useState(0);
  const {removeFromCart, updateQuantity, updatePriceProducts} = useContext(CartContext);
  useEffect(() => {
    productAPI.pecialProduct(cartitem.id).then((data) => {
      const variant = data?.product.variants.find(
        (item) =>
          (item.option1 === cartitem.color || !cartitem.color) &&
          (item.option2 === cartitem.size || !cartitem.size)
      );
      const img = data?.product.images.find(
        (item) => item.id === variant?.image_id
      );
      const title = data?.product.title;
      updatePriceProducts(index, variant.price)
      setProduct({
        image: img?.src,
        title: title,
        classify: variant.title,
        price: variant.price,
      });
    });
  }, [cartitem.lenght]);

  useEffect(() => {
    setTotal(product.price * quantity);
    updateQuantity(index, quantity);
  }, [product, quantity]);

  const handleRemove = () => {
    removeFromCart(index);
  };

  const handleCheckboxChange = () => {
    onToggleCheckbox(`${cartitem.id}${cartitem.size}${cartitem.color}`, !isSelected);
  };

  return (
    <div className={`cart-item row ${isSelected ? "selected" : ""}`}>
      <div className="col l-5">
        <div className="info__cart-item">
          <Checkbox
            id={`${cartitem.id}-${cartitem.size}-${cartitem.color}`}
            checked={isSelected}
            onChange={() => handleCheckboxChange()}
          />
          <div className="img__cart-item">
            <img src={product.image} alt="" className="img-cart" />
          </div>
          <div className="title__cart-item">
            <span>{product.title}</span>
          </div>
        </div>
      </div>
      <div className="col l-2 size-color">
        <div className="classify">Classify</div>
        <span>{product.classify}</span>
      </div>
      <div className=" col l-5">
        <div className="row menu-right">
          <label className="col l-3 item__menu-right">${product.price}</label>
          <div className="col l-3 item__menu-right">
            <Counter quantity={quantity} setQuantity={setQuantity} />
          </div>
          <label className="col l-3">${total}</label>
          <div className="col l-3">
            <button className="remove__cart-item" onClick={handleRemove}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
