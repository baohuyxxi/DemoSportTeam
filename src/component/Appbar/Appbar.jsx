import "./Appbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function Appbar() {
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
              <FontAwesomeIcon
                icon={faCartShopping}
                className="appvar__cart-icon"
              />
            </button>
          </div>
          <div className="appbar__menu-right-item">Login</div>
        </div>
      </div>
    </header>
  );
}
