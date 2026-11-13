
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import HeaderLogo from "../../assets/logo-b.svg";
import HeaderLogo_w from "../../assets/logo-w.svg";
import HamburgerButton from "./HamburgerButton";
import Navigation from "./Navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Homeの際のヘッダーのデザイン変更
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setIsScrolled(false);
      return;
    }

    const handleScroll = () => {
      // ブラウザの高さを取得
      const threshold = window.innerHeight * 0.8;
      setIsScrolled(window.scrollY > threshold);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHome]);
  // ロゴの切り替え
  const currentLogo = isHome && !isScrolled
  ? HeaderLogo_w
  : HeaderLogo;

  return (
    <header className={`header
    ${isHome ? "is-home" : ""}
    ${isScrolled ? "is-scrolled" : ""}
    `}
    >
        <div className="header-layout">
          <div className="header-layout_left">
            <h1><Link to="/">
              <img src={currentLogo} alt="POM PLEIN" />
            </Link></h1>
          </div>
          <Navigation
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
          <div className="header-icon">
            <HamburgerButton
              isOpen={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
        </div>
    </header>
  )
}