import "./CategoryNav.css";
import home_catch from "../../assets/common/home_catch.jpg";

export default function CategoryNav() {
  return (
      <section>
        <div className="categoryNav">
          <ul className="categoryNav_list">
            <li>
              <div className="categoryNav_list_title">
                <div className="categoryNav_list_title_text">
                  <p>CATEGORY</p>
                </div>
              </div>
            </li>
            <li>
              <a href="/category/1">
                <div className="categoryCard tableware">
                  <div className="categoryCard_img"><img src={home_catch} alt="" /></div>
                  <div className="categoryCard_text">
                    <p><span>Tableware</span><span>食器</span></p>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="/category/1">
                <div className="categoryCard stationery">
                  <div className="categoryCard_img"><img src={home_catch} alt="" /></div>
                  <div className="categoryCard_text">
                    <p><span>Stationery</span><span>文具</span></p>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="/category/1">
                <div className="categoryCard lighting">
                  <div className="categoryCard_img"><img src={home_catch} alt="" /></div>
                  <div className="categoryCard_text">
                    <p><span>Lighting</span><span>照明</span></p>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="/category/1">
                <div className="categoryCard fabrics">
                  <div className="categoryCard_img"><img src={home_catch} alt="" /></div>
                  <div className="categoryCard_text">
                    <p><span>Fabrics</span><span>インテリア雑貨</span></p>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div className="categoryCard plants">
                  <div className="categoryCard_img"><img src={home_catch} alt="" /></div>
                  <div className="categoryCard_text">
                    <p><span>Plants</span><span>植物小物</span></p>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </section>
  )
}