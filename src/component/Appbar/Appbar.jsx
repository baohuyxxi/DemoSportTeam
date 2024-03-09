import "./Appbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faU } from "@fortawesome/free-solid-svg-icons";
import {faBell, faUser} from "@fortawesome/free-regular-svg-icons";
import { CartContext } from "~/contexts/CartContext";
import { useContext, useEffect,useState  } from "react";
export default function Appbar() {
  const { cartItems } = useContext(CartContext);
  const [cartItemCount, setCartItemCount] = useState(0);
  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems.length]);
  const handleCartClick = () => {
    window.location.href = "/cart"; 
  };
  const handleLogoClick = () => {
    window.location.href = "/"; 
  };
  return (
    <header className="appbar">
      <div className="appbar__menu">
        <div className="appbar__menu-left">
          <div className="appbar__menu-left-item">
            <div className="appbar__logo">
              <img
                src="https://logowik.com/content/uploads/images/sports8897.jpg"
                alt="logo"
                className="img__logo"
                onClick={handleLogoClick}   
              />
            </div>
          </div>
        </div>
        <div className="appbar__menu-right">
          <div className="appbar__menu-right-item">
            <button className="appbar__cart" onClick={handleCartClick}>
            <span className="cart-item-count">{cartItemCount}</span>
              <FontAwesomeIcon
                icon={faCartShopping}
                className="button__icon"
              />
            </button>
          </div>
          <div className="appbar__menu-right-item"><FontAwesomeIcon icon={faBell} className="button__icon"/></div>
          <div className="appbar__menu-right-item"><FontAwesomeIcon icon={faUser} className="button__icon"/></div>
        </div>
      </div>
    </header>
  );
}
