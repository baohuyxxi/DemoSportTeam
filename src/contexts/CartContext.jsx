import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cart");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalProducts(total);
  }, [cartItems]);
  const updatePriceProducts = (index,price) => {
    const updatedCartItems = cartItems.map((item, i) => {
      if (i === index) {
        return { ...item, price: price };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };
  const addToCart = (newItem) => {
    setCartItems((prevItems) => [...prevItems, newItem]);
    localStorage.setItem("cart", JSON.stringify([...cartItems, newItem]));
  };

  const removeFromCart = (index) => {
    const updatedCartItems = cartItems.filter((item, i) => i !== index);
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const updateQuantity = (index, newQuantity) => {
    const updatedCartItems = cartItems.map((item, i) => {
      if (i === index) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalProducts,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        updatePriceProducts
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
