import "./CardProduct.scss";
import Slider from "../Slider/Slider";
import DialogAddToCart from "../DialogAddToCart/DialogAddToCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function CardProduct({ product }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="col l-4 m-6 c-12">
      <div className="card__product">
        <div className="card__product-img">
          <Slider image={product.image} images={product.images} />
        </div>
        <div className="card__product-info">
          <div className="card__product-name">{product.title}</div>
          <div className="card__product-type">{product.product_type}</div>
          <div className="card__product-vendor">
            <FontAwesomeIcon icon={faUser} className="icon" />
            <p> {product.vendor}</p>
          </div>
          <div className="card__product-price">
            <p>${product.variants[0].price}</p>

            <button className="card__product-btn" onClick={() => setOpen(true)}>
              <FontAwesomeIcon icon={faCartPlus} className="icon" />
            </button>
          </div>
        </div>
      </div>
      {open && (
        <DialogAddToCart
          open={open}
          handleClose={handleClose}
          product={product}
        />
      )}
    </div>
  );
}
