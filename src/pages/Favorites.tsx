import home_catch from "../assets/common/home_catch.jpg";

import { Link } from "react-router-dom";
import products from "../data/products";
import { useFavorites } from "../context/FavoriteContext";
import FavoriteButton from '../components/FavoriteButton';
const Favorites = () => {
  const { favoriteIds } = useFavorites();

  // お気に入りIDと一致する商品だけ取り出す
  const favoriteProducts = products.filter((product) =>
    favoriteIds.includes(product.id)
  );

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
        {favoriteProducts.length === 0 ? (
          <ul className="basicList">
            <li className="basicList_list">
              <div className="wrapper">
                <div className="itemLine">
                  <p>お気に入りに登録された商品はありません。</p>
                </div>
              </div>
            </li>
          </ul>
        ) : (
        <ul className="basicList">
          {favoriteProducts.map((product) => (
          <li className="basicList_list" key={product.id}>
            <Link to={`/product/${product.id}`}>
              <div className="wrapper">
                <div className="itemLine">
                  <div className="itemLine_img"><img src={product.image} alt={product.name} /></div>
                  <ul className="itemLine_text">
                    <li className="itemLine_text_title">{product.name}</li>
                    <li className="itemLine_text_text">{product.description}</li>
                    <li className="itemLine_text_price">¥{product.price.toLocaleString("ja-JP")}</li>
                    <li>
                      <FavoriteButton
                        productId={product.id}
                        variant="compact"
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </Link>
          </li>
          ))}
        </ul>

        )}
        </section>
      </div>
  );
}

export default Favorites;