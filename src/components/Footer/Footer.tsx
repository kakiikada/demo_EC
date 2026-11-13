import { Link, useNavigate } from "react-router-dom";
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
          <div className="footer-LogoBox">
            <img src={FooterLogo} alt="POM PLEIN" />
          </div>
          <ul className="footer-snsList">
            <li><Link className="footer-snsList_icon footer-snsList_icon--X" to="#"><img src={sns_X} alt="X" /></Link></li>
            <li><Link className="footer-snsList_icon" to="#"><img src={sns_instagram} alt="" /></Link></li>
            <li><Link className="footer-snsList_icon" to="#"><img src={sns_facebook} alt="Facebook" /></Link></li>
          </ul>
        </div>
      </div>
      <small className="footer-copy"> © {new Date().getFullYear()} portfolio site</small>
    </footer>
  )
}