import home_catch from "../assets/common/home_catch.jpg";

function ProductDetail() {
  return (
      <div className="myPage">
        <div className="wrapper">
          <div className="myPage_header">
            <div className="myPage_header_title">
              <div className="title">
                <h1 className="title_text">My Page</h1>
              </div>
              <p>こんにちは、Guest さん。いつもご利用ありがとうございます。</p>
            </div>
            <ul className="myPage_header_link">
              <li><a className="btn-favo" href="/favorites">お気に入り</a></li>
              <li><a className="btn" href="/cart">カート</a></li>
            </ul>
          </div>
        </div>
        <section className="myPage_order">
          <div className="wrapper">
            <div className="myPage_order_header">
              <h2 className="myPage_order_header_title">注文履歴</h2>
              <p className="myPage_order_header_subTitle">※当サイトはデモサイトなので、履歴は20件を超えると古いものから順番に削除される仕様になっています。</p>
            </div>
          </div>
          <div className="myPage_order_list">
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
          </div>
        </section>
        <div className="wrapper">
          <section className="myPage_userData">
            <div className="myPage_userData_header">
              <h2 className="myPage_userData_header_title">会員情報</h2>
            </div>
            <div className="myPage_userData_text">
              <ul>
                <li>name：あああ</li>
                <li>e-mail：あああ</li>
                <li>address：あああ</li>
              </ul>
            </div>
            <div className="myPage_userData_btn">
              <a className="btn" href="/login">ログアウト</a>
            </div>
          </section>
        </div>
      </div>
  );
}

export default ProductDetail;