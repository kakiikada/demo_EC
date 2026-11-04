
import { useState } from "react";
import "./Header.css";
import HeaderLogo from "../../assets/logo-b.svg";
import HamburgerButton from "./HamburgerButton";
import Navigation from "./Navigation";

const isForm = location.pathname === "/Login";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="header">
        <div className="header-layout">
          <div className="header-layout_left">
            <h1><a href="/"><img src={HeaderLogo} alt="POM PLEIN" /></a></h1>
          </div>
          {/* {!isForm && (
          <div className="header-layout_right">
          <Navigation
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}/>
          </div>
          )}
          {!isForm && (
          <div className="header-icon">
            <HamburgerButton
              isOpen={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
          )} */}
          
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