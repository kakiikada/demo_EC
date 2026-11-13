import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import categories from '../../data/categories';
import { useAuth } from "../../context/AuthContext"

type NavigationProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Navigation({
  isOpen,
  onClose,
}: NavigationProps) {
  const { isLoggedIn, userData, logout } = useAuth();

  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
  const trimmedKeyword = keyword.trim();

  if (!trimmedKeyword) return;

  navigate(`/search?q=${encodeURIComponent(trimmedKeyword)}`);
  };

  const { cartCount } = useCart();

  return(
    <>
    <div className="header-layout_right">
      <div className={`header-nav ${isOpen ? "js-active" : ""}`}>
        <nav className="header-nav_menu" onClick={onClose}>
          <ul className="header-nav_menu_item">
            <li className="header-category">Category</li>
            <li>
              <form
                className="header-searchBox"
                onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Search for products"
                />
                <button type="submit"></button>
              </form>
            </li>
            {isLoggedIn ? ( 
              <>
            <li className="header-favo"><Link to="/favorites"></Link></li>
            <li className="header-cart">
              <Link to="/cart"></Link>


                {cartCount > 0 && (
                  <span>{cartCount > 99 ? " " : cartCount}</span>
                )}
            </li>
            <li className="header-user"><Link to="/mypage"></Link></li>
            </>
            ) : (
              <>
              <li className="header-cart">
              <Link to="/cart"></Link>


                {cartCount > 0 && (
                  <span>{cartCount > 99 ? " " : cartCount}</span>
                )}
            </li>
              <li><Link className="btn-s btn-color5" to="/Login">ログイン</Link></li>
              <li><Link className="btn-s btn-color3" to="/Login?mode=register">新規登録</Link></li>
              </>
            )}
          </ul>
          <div className="header-nav_categorySP">
            <ul>
              {categories.map((category) => (
                <li
                  key={category.id}
                  to={`/category/${category.id}`}
                  className={`header-nav_categorySP-${category.id}`}
                >
                  <Link to={`/category/${category.id}`}>{category.name} <span>/ {category.label}</span></Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
    <div className="header-layout_bottom">
      <div className="header-categoryPC">
        <ul>
          {categories.map((category) => (
            <li
              key={category.id}
              to={`/category/${category.id}`}
              className={`header-nav_categoryPC-${category.id}`}
            >
              <Link to={`/category/${category.id}`}>{category.name} <span>{category.label}</span></Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  )
}