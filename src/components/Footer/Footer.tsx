import "./Footer.css";
import FooterLogo from "../../assets/logo-b.svg";

import sns_X from "../../assets/sns-X.png";
import sns_instagram from "../../assets/sns_instagram.png";
import sns_facebook from "../../assets/sns-facebook.png";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrapper">
        <div className="footer-layout">
          <div className="footer-layout_left">
            <div className="footer-LogoBox">
              <img src={FooterLogo} alt="POM PLEIN" />
            </div>
            <ul className="footer-snsList">
              <li><a className="footer-snsList_icon footer-snsList_icon--X" href="#"><img src={sns_X} alt="X" /></a></li>
              <li><a className="footer-snsList_icon" href="#"><img src={sns_instagram} alt="" /></a></li>
              <li><a className="footer-snsList_icon" href="#"><img src={sns_facebook} alt="Facebook" /></a></li>
            </ul>
          </div>
          {/* <div className="footer-layout_right">
            <p>SHOP</p>
            <ul>
              <li>カテゴリ１</li>
              <li>カテゴリ2</li>
              <li>カテゴリ3</li>
              <li>カテゴリ4</li>
              <li>カテゴリ5</li>
            </ul>
          </div> */}
        </div>
        <small className="footer-copy"> © {new Date().getFullYear()} portfolio site</small>
      </div>
    </footer>
  )
}