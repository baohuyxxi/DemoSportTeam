import "./DialogAddToCart.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState, useContext } from "react";
import { CartContext } from "~/contexts/CartContext";
import Counter from "../Counter/Counter";
import React from "react";
import Slider from "../Slider/Slider";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

export default function DialogAddToCart({ open, handleClose, product }) {
  const dialogRef = useRef(null);
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        handleClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, handleClose]);

  useEffect(() => {
    setColors(
      product.options.find((option) =>
        option.name.toLowerCase().includes("color")
      )?.values || []
    );
    setSizes(
      product.options.find((option) =>
        option.name.toLowerCase().includes("size")
      )?.values || []
    );
  }, [product]);

  const handleAddToCart = () => {
    if (
      (colors.length > 0 && !selectedColor) ||
      (sizes.length > 0 && !selectedSize)
    ) {
      alert("Please select size and color before adding to cart!");
      return;
    }
    addToCart({
      id: product.id,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      price: product.variants[0].price,
    });
    handleClose();
  };

  return (
    <dialog
      open={open}
      className={`dialog__add-to-cart ${open ? "open" : ""}`}
      ref={dialogRef}
    >
      <header>
        <h2>Product added to cart</h2>
        <button className="btn__close" onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </header>
      <div className="dialog__content">
        <div className="row">
          <div className="dialog__product-image col l-6 m-6 c-6">
            <Slider image={product.image} images={product.images} />
          </div>
          <div className="dialog__product-info col l-6 m-6 c-6">
            <div className="product-name">
              <span className="title">Name: </span>
              {product.title}
            </div>
            <div className="product-type">
              <span className="title">Product type: </span>
              {product.product_type}
            </div>
            <div className="product-vendor">
              <span className="title">Vendor: </span>
              {product.vendor}
            </div>
            <div className="product-price">
              <span className="title">Price: </span>${product.variants[0].price}
            </div>
            {colors.length > 0 && (
              <div className="color__product">
                <span className="title">Color:</span>
                <div className="color__list">
                  {colors?.map((item, index) => (
                    <div
                      className={
                        selectedColor === item
                          ? `color__item selected`
                          : `color__item`
                      }
                      key={index}
                    >
                      <label
                        htmlFor={`color-${index}`}
                        onClick={() => setSelectedColor(item)}
                      >
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {sizes.length > 0 && (
              <div className="size__product">
                <div className="title">Size</div>
                <div className="size__list">
                  {sizes?.map((item, index) => (
                    <div
                      className={
                        selectedSize === item
                          ? `size__item selected`
                          : `size__item`
                      }
                      key={index}
                    >
                      <label
                        htmlFor={`size-${index}`}
                        onClick={() => setSelectedSize(item)}
                      >
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="quantity__product">
              <div className="title">Quantity</div>
              <Counter quantity={quantity} setQuantity={setQuantity} />
            </div>
            <button className="btn__add-to-cart" onClick={handleAddToCart}>
              <FontAwesomeIcon icon={faCartPlus} className="icon" />
              <p>Add To Cart</p>
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
