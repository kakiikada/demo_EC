import CategoryNav from "../components/CategoryList/CategoryNav";
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
              <div className="basicGrid">
                <div className="title">
                  <h2 className="title_text">NEW ARRIVALS</h2>
                  <button className="title_btn">Products All ＞</button>
                </div>
                <ul className="basicGrid_list">
                  <li>
                    <a href="/product/1">
                      <div className="itemCard">
                        <div className="itemCard_img"><img src={home_catch} alt="" /></div>
                        <div className="itemCard_text">
                          <p>商品名</p>
                          <p className="itemCard_text_price">¥1,950(税込)</p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="/product/1">
                      <div className="itemCard">
                        <div className="itemCard_img"><img src={home_catch} alt="" /></div>
                        <div className="itemCard_text">
                          <p>商品名</p>
                          <p className="itemCard_text_price">¥1,950(税込)</p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="/product/1">
                      <div className="itemCard">
                        <div className="itemCard_img"><img src={home_catch} alt="" /></div>
                        <div className="itemCard_text">
                          <p>商品名</p>
                          <p className="itemCard_text_price">¥1,950(税込)</p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="/product/1">
                      <div className="itemCard">
                        <div className="itemCard_img"><img src={home_catch} alt="" /></div>
                        <div className="itemCard_text">
                          <p>商品名</p>
                          <p className="itemCard_text_price">¥1,950(税込)</p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="/product/1">
                      <div className="itemCard">
                        <div className="itemCard_img"><img src={home_catch} alt="" /></div>
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
          </div>
        </section>
        <CategoryNav />
      </div>
    </>
  );
}

export default Home;