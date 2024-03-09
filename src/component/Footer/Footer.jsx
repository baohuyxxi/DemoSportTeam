import "./Footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__above">
        <div className="footer__info">
          <div className="footer__logo">
            <img
              src="https://logowik.com/content/uploads/images/sports8897.jpg"
              alt="logo"
              className="img__logo"
            />
          </div>
          <div className="footer__name">Sport Team</div>
        </div>
        <div className="footer__about">
          <div className="item__about">
            <p>Web Programming</p>
          </div>
          <div className="item__about">
            <p>Mobile Programming</p>
          </div>
          <div className="item__about">
            <p>Java Beginner</p>
          </div>
          <div className="item__about">
            <p>PHP Beginner</p>
          </div>
          <div className="item__about">
            <p>PHP Beginner</p>
          </div>
          <div className="item__about">
            <p>Mobile Programming</p>
          </div>
          <div className="item__about">
            <p>Mobile Programming</p>
          </div>
          <div className="item__about">
            <p>PHP Beginner</p>
          </div>
          <div className="item__about">
            <p>Mobile Programming</p>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="footer__below">
        <div className="footer__contact">
          Copyright © MyCourse.io 2024. All Rights Reserved 
        </div>
        <div>
          <FontAwesomeIcon
            icon={faFacebookF}
            className="footer__social"
          />
          <FontAwesomeIcon
            icon={faInstagram}
            className="footer__social"
          />
          <FontAwesomeIcon icon={faTwitter} className="footer__social" />
        </div>
      </div>
    </footer>
  );
}
