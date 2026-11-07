import { useState } from 'react';
import { useParams } from 'react-router-dom';
import StockStatus from '../components/StockStatus';
import products from '../data/products';



function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // カートに商品を追加する処理
    console.log("数量:", quantity);
  };
  // 対応する商品のみ取得
  const { productId } = useParams();
  const currentProduct = products.find(
    (product) => product.id === productId
  );
  return (
    <div className="wrapper">
      {currentProduct && (
      <div className="ProductDetail">
        <div className="ProductDetail_img">
        <img
          src={currentProduct.image}
          alt={currentProduct.name}
        />
        </div>
        <div className="ProductDetail_text">
          <h1 className="ProductDetail_text_title">{currentProduct.name}</h1>
          <ul className="ProductDetail_text_data">
            <li>{currentProduct.description}</li>
            <li className="ProductDetail_price">¥{currentProduct.price.toLocaleString("ja-JP")} <small>(税込)</small></li>
            <li className="ProductDetail_icon">
              <StockStatus stock={currentProduct.stock} />
            </li>
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
      )}
    </div>
  );
}

export default ProductDetail;