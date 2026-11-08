import { useSearchParams } from 'react-router-dom';
import products from '../data/products';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('q') || '';

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase())
  );
  return (


      <div className="search">
        <div className="wrapper">
          <div className="search_header">
            <div className="title-s">
              <h1 className="title_text">「{keyword}」の検索結果：{filteredProducts.length}件</h1>
            </div>
          </div>
        </div>
        <section className="search_listBox">
          <ul className="basicList">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <li className="basicList_list" key={product.id}>
                  <a href={`/product/${product.id}`}>
                    <div className="wrapper">
                      <div className="itemLine">
                        <div className="itemLine_img"><img src={product.image} alt="" /></div>
                        <ul className="itemLine_text">
                          <li className="itemLine_text_title">{product.name}</li>
                          <li className="itemLine_text_text">{product.description}</li>
                          <li className="itemLine_text_price">¥{product.price.toLocaleString("ja-JP")}</li>
                        </ul>
                      </div>
                    </div>
                  </a>
                </li>
              ))
            ) : (
              <div className="wrapper">
                <div className="itemLine">
                  <p>該当する商品が見つかりませんでした。</p>
                </div>
              </div>
            )}

          </ul>
        </section>
      </div>


















  );
}