import home_catch from "../assets/common/home_catch.jpg";
function Favorites() {
  return (
      <div className="favorites">
        <div className="wrapper">
          <div className="favorites_header">
            <div className="title">
              <h1 className="title_text">Favorites</h1>
            </div>
          </div>
        </div>
        <section className="favorites_listBox">
          <ul className="basicList">
            <li className="basicList_list">
              <a href="">
                <div className="wrapper">
                  <div className="itemLine">
                    <div className="itemLine_img"><img src={home_catch} alt="" /></div>
                    <ul className="itemLine_text">
                      <li className="itemLine_text_title">商品名</li>
                      <li className="itemLine_text_text">商品説明テキストテキストテキスト</li>
                      <li className="itemLine_text_price">￥2,500</li>
                      <li className="itemLine_text_count">数量:1</li>
                    </ul>
                  </div>
                </div>
              </a>
            </li>
            <li className="basicList_list">
              <a href="">
                <div className="wrapper">
                  <div className="itemLine">
                    <div className="itemLine_img"><img src={home_catch} alt="" /></div>
                    <ul className="itemLine_text">
                      <li className="itemLine_text_title">商品名</li>
                      <li className="itemLine_text_text">商品説明テキストテキストテキスト</li>
                      <li className="itemLine_text_price">￥2,500</li>
                      <li className="itemLine_text_count">数量:1</li>
                    </ul>
                  </div>
                </div>
              </a>
            </li>
            <li className="basicList_list">
              <a href="">
                <div className="wrapper">
                  <div className="itemLine">
                    <div className="itemLine_img"><img src={home_catch} alt="" /></div>
                    <ul className="itemLine_text">
                      <li className="itemLine_text_title">商品名</li>
                      <li className="itemLine_text_text">商品説明テキストテキストテキスト</li>
                      <li className="itemLine_text_price">￥2,500</li>
                      <li className="itemLine_text_count">数量:1</li>
                    </ul>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </section>
      </div>
  );
}

export default Favorites;