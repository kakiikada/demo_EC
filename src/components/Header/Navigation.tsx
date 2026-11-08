import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from "../../context/CartContext";
import categories from '../../data/categories';

type NavigationProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Navigation({
  isOpen,
  onClose,
}: NavigationProps) {

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
            <li className="header-favo"><a href="/favorites"></a></li>
            <li className="header-cart">
              <a href="/cart"></a>


                {cartCount > 0 && (
                  <span>{cartCount > 99 ? " " : cartCount}</span>
                )}
            </li>
            <li className="header-user"><a href="/mypage"></a></li>
          </ul>
          <div className="header-nav_categorySP">
            <ul>
              {categories.map((category) => (
                <li
                  key={category.id}
                  to={`/category/${category.id}`}
                  className={`header-nav_categorySP-${category.id}`}
                >
                  <a href={`/category/${category.id}`}>{category.name} <span>/ {category.label}</span></a>
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
              <a href={`/category/${category.id}`}>{category.name} <span>{category.label}</span></a>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  )
}