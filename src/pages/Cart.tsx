import { useState } from 'react';
import home_catch from "../assets/common/home_catch.jpg";

function Cart() {
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // カートに商品を追加する処理
    console.log("数量:", quantity);
  };
  return (
      <div className="cart">
        <div className="wrapper">
          <div className="cart_header">
            <div className="title">
              <h1 className="title_text">Cart</h1>
            </div>
          </div>
        </div>
        <div className="cart_listBox">
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
                      <li className="itemLine_text_count">
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
                      </li>
                      <li className="itemLine_text_btn">
                        <button className="btn-s">削除</button>
                      </li>
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
                      <li className="itemLine_text_count">
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
                      </li>
                      <li className="itemLine_text_btn">
                        <button className="btn-s">削除</button>
                      </li>
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
                      <li className="itemLine_text_count">
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
                      </li>
                      <li className="itemLine_text_btn">
                        <button className="btn-s">削除</button>
                      </li>
                    </ul>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div className="wrapper">
          <div className="cart_total">
            <div className="cart_total_contents">
              <p className="cart_total_contents_text"><small>商品数量：</small>￥2個</p>
              <p className="cart_total_contents_text"><small>商品小計：</small>￥20,000</p>
              <p className="cart_total_contents_text"><small>送料：</small>￥300</p>
              <p className="cart_total_contents_total"><small>合計：</small><span>￥20,300</span></p>
              <div className="cart_total_contents_btn">
                <button className="btn">レジに進む</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Cart;