import { useContext, useState, useEffect } from "react";
import CartItem from "../CartIem/CartItem";
import { CartContext } from "~/contexts/CartContext";
import "./ListProductCart.scss";
import Checkbox from "../Checkbox/Checkbox";

export default function ListProductCart() {
  const { cartItems, updateSelectedItems } = useContext(CartContext);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [isAllSelected, setIsAllSelected] = useState(false);

  useEffect(() => {
    const allSelected =
      cartItems.length > 0 &&
      cartItems.every((item) => selectedItems.has(`${item.id}${item.size}${item.color}`));
    setIsAllSelected(allSelected);
    updateSelectedItems(selectedItems);
  }, [cartItems.length, selectedItems]);

  const handleToggleAllCheckbox = () => {
    if (isAllSelected) {
      setSelectedItems(new Set());
      setIsAllSelected(false);
    } else {
      const newSelectedItems = new Set(cartItems.map((item) => `${item.id}${item.size}${item.color}`));
      setSelectedItems(newSelectedItems);
      setIsAllSelected(true);
    }
  };
  const handleToggleCheckbox = (itemId, isSelected) => {
    console.log(itemId, isSelected);
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = new Set(prevSelectedItems);
      if (isSelected) {
        newSelectedItems.add(itemId);
      } else {
        newSelectedItems.delete(itemId);
      }
      return newSelectedItems;
    });
  };
 

  return (
    <div className="list-product-cart col l-9 m-9 c-9">
      <div className="list-product-cart__header row">
        <div className="col l-7 ">
          <Checkbox
            id="allProduct"
            label="Product"
            checked={isAllSelected}
            onChange={handleToggleAllCheckbox}
          />
        </div>
        <div className=" col l-5 menu-right">
          <div className="row ">
            <label className="col l-3">Price</label>
            <label className="col l-3">Quantity</label>
            <label className="col l-3">Total</label>
            <label className="col l-3">Action</label>
          </div>
        </div>
      </div>
      <div className="list-product-cart__content">
        {cartItems.map((item, index) => (
          <CartItem
            key={index}
            index={index}
            cartitem={item}
            isSelected={selectedItems.has(`${item.id}${item.size}${item.color}`)}
            onToggleCheckbox={handleToggleCheckbox}
          />
        ))}
      </div>
    </div>
  );
}
