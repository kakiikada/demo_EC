import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import CategoryNav from "../components/CategoryList/CategoryNav";
import StockStatus from '../components/StockStatus';
import FavoriteButton from '../components/FavoriteButton';
import { getProducts } from '../data/products';
import type { Product } from '../data/products';
import home_catch from "../assets/common/home_catch.jpg";

function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);
  
  // 新着アイテム順に表示
  const newProducts = [...products]
  .sort((a, b) =>
    new Date(b.createdAt).getTime() -
    new Date(a.createdAt).getTime()
  )
  // 上位4つ取得
  .slice(0, 8);


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
                  {/* <button className="title_btn">Products All ＞</button> */}
                </div>
                <ul className="basicGrid_list">
                {newProducts.map((product) => (
                  <li key={product.id}>
                    <Link to={`/product/${product.id}`}>
                      <div className="itemCard">
                        <div className="itemCard_img">
                          <img src={product.image} alt={product.name} />
                          <StockStatus stock={product.stock} />
                          <div className="temCard_img_favoIcon">
                            <FavoriteButton
                              productId={product.id}
                              variant="icon"
                            />
                          </div>
                        </div>
                        <div className="itemCard_text">
                          <p>{product.name}</p>
                          <p className="itemCard_text_price">¥{product.price.toLocaleString("ja-JP")}</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
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