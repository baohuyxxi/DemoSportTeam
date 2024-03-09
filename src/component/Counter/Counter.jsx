import "./Counter.scss";

import React, { useState } from "react";

export default function Counter({quantity, setQuantity}) {
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const handleQuantity = (value) => {
    value = value.replace(/\D/g, "");
    let intValue = parseInt(value);
    if (isNaN(intValue) || intValue < 0) {
      intValue = 1;
    }
    setQuantity(intValue);
  };
  return (
    <div className="quantity__container">
      <button className="quantity__btn decrease" onClick={decreaseQuantity}>
        -
      </button>
      <input
        className="quantity__input"
        defaultValue="1"
        value={quantity}
        onChange={(e) => handleQuantity(e.target.value)}
      />
      <button className="quantity__btn increase" onClick={increaseQuantity}>
        +
      </button>
    </div>
  );
}
