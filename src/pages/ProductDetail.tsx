import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import StockStatus from '../components/StockStatus';
import FavoriteButton from '../components/FavoriteButton';
import CartButton from "../components/CartButton";
import { getProducts } from '../data/products';
import type { Product } from '../data/products';
import { useCart } from "../context/CartContext";



function ProductDetail() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);
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
  // 購入用トースト
  const handleAddToCart = () => {
    addToCart(currentProduct.id, quantity);
    setShowToast(true);
  };
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
                <CartButton
                  productId={currentProduct.id}
                  quantity={quantity}
                />
                <FavoriteButton
                  productId={currentProduct.id}
                />
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