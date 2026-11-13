import { useParams } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import CategoryNav from "../components/CategoryList/CategoryNav";
import StockStatus from '../components/StockStatus';
import categories from '../data/categories';
import products from '../data/products';

function Category() {
  const { categoryId } = useParams();

  const currentCategory = categories.find(
    (category) => category.id === categoryId
  );
  // 対応するカテゴリのみ取得
  const filteredProducts = products.filter(
    (product) => product.categoryId === currentCategory?.id
  );

  if (!currentCategory) {
    return <p>Category not found.</p>;
  }
  return (
    <>
      <div className="wrapper">
        <div className="category">
          <div className="basicGrid">
            <div className="title">
              <h2 className="title_text">Category - {currentCategory?.name}</h2>
            </div>
            <ul className="basicGrid_list">
            {filteredProducts.map((product) => (
              <li key={product.id}>
                <Link to={`/product/${product.id}`}>
                  <div className="itemCard">
                    <div className="itemCard_img">
                      <img src={product.image} alt={product.name} />
                      <StockStatus stock={product.stock} />
                      <button className="favoIcon"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleFavorite();
                        }}
                      ></button>
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
      <CategoryNav />
    </>
  );
}

export default Category;