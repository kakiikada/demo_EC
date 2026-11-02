type NavigationProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Navigation({
  isOpen,
  onClose,
}: NavigationProps) {
  return(
    <div className={`header-nav ${isOpen ? "js-active" : ""}`}>
      <nav className="header-nav_menu" onClick={onClose}>
        <ul className="header-nav_menu_item">
          {/* <li>Home</li> */}
          <li>
            <div className="header-searchBox"><input type="text" /><button></button></div>
          </li>
          <li className="header-favo"><a href="./#Favorites"></a></li>
          <li className="header-cart"><a href="./#Cart"></a></li>
          <li className="header-user"><a href="./#MyPage"></a></li>
        </ul>
        <div className="header-nav_category">
          <ul>
            <li><a href="">カテゴリ１</a></li>
            <li><a href="">カテゴリ2</a></li>
            <li><a href="">カテゴリ3</a></li>
            <li><a href="">カテゴリ4</a></li>
            <li><a href="">カテゴリ5</a></li>
          </ul>
        </div>
      </nav>
    </div>
  )
}