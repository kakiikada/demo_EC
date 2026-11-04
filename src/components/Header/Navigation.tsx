type NavigationProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Navigation({
  isOpen,
  onClose,
}: NavigationProps) {
  return(
    <>
    <div className="header-layout_right">
      <div className={`header-nav ${isOpen ? "js-active" : ""}`}>
        <nav className="header-nav_menu" onClick={onClose}>
          <ul className="header-nav_menu_item">
            {/* <li>Home</li> */}
            <li>
              <div className="header-searchBox"><input type="text" /><button></button></div>
            </li>
            <li className="header-favo"><a href="/Favorites"></a></li>
            <li className="header-cart"><a href="/Cart"></a></li>
            <li className="header-user"><a href="/MyPage"></a></li>
          </ul>
          <div className="header-nav_categorySP">
            <ul>
              <li><a href="/category/1">Tableware <span>/ 食器</span></a></li>
              <li><a href="/category/1">Stationery <span>/ 文具</span></a></li>
              <li><a href="/category/1">Lighting <span>/ 照明</span></a></li>
              <li><a href="/category/1">Fabrics <span>/ インテリア雑貨</span></a></li>
              <li><a href="/category/1">Plants <span>/ 植物小物</span></a></li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
    <div className="header-layout_bottom">
      <div className="header-categoryPC">
        <ul>
          <li><a href="/category/1">Tableware<span>食器</span></a></li>
          <li><a href="/category/1">Stationery<span>文具</span></a></li>
          <li><a href="/category/1">Lighting<span>照明</span></a></li>
          <li><a href="/category/1">Fabrics<span>インテリア雑貨</span></a></li>
          <li><a href="/category/1">Plants<span>植物小物</span></a></li>
        </ul>
      </div>
    </div>
    </>
  )
}