import home_catch from "../assets/common/home_catch.jpg";

function Home() {
  return (
    <>
      <div className="home">
        <section>
          <div className="catch">
            <div className="catch_scroll">
              <p>Prease Scroll Down!</p>
            </div>
            <img src={home_catch} alt="catch" />
          </div>
        </section>
        <section>
          <div className="wrapper">
            <div className="newItem">
              <div className="title">
                <h2 className="title_text">NEW ARRIVALS</h2>
                <button className="title_btn">Products All ＞</button>
              </div>
              <ul className="newItem_list">
                <li>
                  <a href="">
                    <div className="itemCard">
                      <img src={home_catch} alt="" />
                      <div className="itemCard_text">
                        <p>商品名</p>
                        <p className="itemCard_text_price">¥1,950(税込)</p>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="">
                    <div className="itemCard">
                      <img src={home_catch} alt="" />
                      <div className="itemCard_text">
                        <p>商品名</p>
                        <p className="itemCard_text_price">¥1,950(税込)</p>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="">
                    <div className="itemCard">
                      <img src={home_catch} alt="" />
                      <div className="itemCard_text">
                        <p>商品名</p>
                        <p className="itemCard_text_price">¥1,950(税込)</p>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="">
                    <div className="itemCard">
                      <img src={home_catch} alt="" />
                      <div className="itemCard_text">
                        <p>商品名</p>
                        <p className="itemCard_text_price">¥1,950(税込)</p>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="">
                    <div className="itemCard">
                      <img src={home_catch} alt="" />
                      <div className="itemCard_text">
                        <p>商品名</p>
                        <p className="itemCard_text_price">¥1,950(税込)</p>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section>
          <div className="wrapper">
            <div className="category">
              <ul className="category_list">
                <li>
                  <a href="">
                    <div className="category_list_title">
                      <div className="category_list_title_text">
                        <p>CATEGORY</p>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="">
                    <div className="categoryCard tableware">
                      <img src={home_catch} alt="" />
                      <div className="categoryCard_text">
                        <p>Tableware/食器</p>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="">
                    <div className="categoryCard stationery">
                      <img src={home_catch} alt="" />
                      <div className="categoryCard_text">
                        <p>Stationery/文具</p>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="">
                    <div className="categoryCard lighting">
                      <img src={home_catch} alt="" />
                      <div className="categoryCard_text">
                        <p>Lighting/照明</p>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="">
                    <div className="categoryCard fabrics">
                      <img src={home_catch} alt="" />
                      <div className="categoryCard_text">
                        <p>Fabrics/インテリア雑貨</p>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="">
                    <div className="categoryCard plants">
                      <img src={home_catch} alt="" />
                      <div className="categoryCard_text">
                        <p>Plants/植物小物</p>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;