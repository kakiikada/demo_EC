import { useState } from 'react';
import home_catch from "../assets/common/home_catch.jpg";



function ProductDetail() {
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // カートに商品を追加する処理
    console.log("数量:", quantity);
  };
  return (
    <div className="wrapper">
      <div className="ProductDetail">
        <div className="ProductDetail_img">
          <img src={home_catch} alt="" />
        </div>
        <div className="ProductDetail_text">
          <h1 className="ProductDetail_text_title">商品名</h1>
          <ul className="ProductDetail_text_data">
            <li>商品説明テキストテキストテキストテキストテキストテキストテキスト</li>
            <li className="ProductDetail_price">¥1,950 <small>(税込)</small></li>
            <li className="ProductDetail_icon"><span>在庫あり</span></li>
          </ul>
          <form onSubmit={handleSubmit}>
            <div className="ProductDetail_form">
              <label htmlFor="quantity">数量：</label>
              <div className="quantityBtn">
                <button
                  type="button"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                >
                  -
                </button>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Number(e.target.value))
                  }
                />
                <button
                  type="button"
                  onClick={() => setQuantity(q => Math.max(1, q + 1))}
                >
                  +
                </button>
              </div>
              <div className="ProductDetail_form_btnBox">
                <button className="btn" type="submit">
                  カートに追加
                </button>
                <button className="btn-favo" type="button">
                  お気に入り登録
                </button>
              </div>
            </div>
          </form>

        </div>
      </div>

    </div>
  );
}

export default ProductDetail;