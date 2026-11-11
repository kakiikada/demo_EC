import { useState } from 'react';
import { Link } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../context/CartContext";

import home_catch from "../assets/common/home_catch.jpg";

function Cart() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
  } = useCart();

  // カート内の商品情報を取得
  const cartProducts = cartItems
    .map((item) => {
      const product = products.find(
        (product) => product.id === item.productId
      );

      if (!product) return null;

      return {
        ...product,
        quantity: item.quantity,
      };
    })
    .filter((product) => product !== null);
    // 商品の合計数量
    const totalQuantity = cartProducts.reduce(
      (total, product) => total + product.quantity,
      0
    );

    // 合計金額
    const totalPrice = cartProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    // 送料
    const shippingFee = cartProducts.length > 0 ? 300 : 0;

    // 商品小計＋送料
    const totalAmount = totalPrice + shippingFee;

  return (
      <div className="cart">
        <div className="wrapper">
          <div className="cart_header">
            <div className="title">
              <h1 className="title_text">Cart</h1>
            </div>
          </div>
        </div>
        <div className="wrapper">
          <div className="cart_layout">
            <div className="cart_listBox">
              {cartProducts.length === 0 ? (
              <ul className="basicList">
                <li className="basicList_list">
                  <div className="wrapper">
                    <div className="itemLine">
                      <p>カートに商品がありません。</p>
                    </div>
                  </div>
                </li>
              </ul>
              // <Link to="/">お買い物を続ける</Link>
              ) : (
              <ul className="basicList">
                {cartProducts.map((product) => (
                <li className="basicList_list" key={product.id}>
                  <a href={`/product/${product.id}`}>
                    <div className="wrapper">
                      <div className="itemLine">
                        <div className="itemLine_img"><img src={product.image} alt={product.name} /></div>
                        <ul className="itemLine_text">
                          <li className="itemLine_text_title">{product.name}</li>
                          <li className="itemLine_text_price">¥{product.price.toLocaleString("ja-JP")}</li>
                          <li className="itemLine_text_count">
                            <div className="quantityBtn-s">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  updateQuantity(product.id, product.quantity - 1);
                                }}
                                disabled={product.quantity <= 1}
                              >
                                -
                              </button>
                              <input
                                id={`quantity-${product.id}`}
                                type="number"
                                min="1"
                                value={product.quantity}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) =>
                                  updateQuantity(product.id, Number(e.target.value))
                                }
                              />
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  updateQuantity(product.id, product.quantity + 1);
                                }}
                              >
                                +
                              </button>
                            </div>
                          </li>
                          <li className="itemLine_text_btn">
                            <button
                              className="btn-s"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                removeFromCart(product.id);
                              }}
                            >削除</button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </a>
                </li>
                ))}
              </ul>
              )}
            </div>
            <div className="cart_total">
              <div className="cart_total_contents">
                <p className="cart_total_contents_text"><small>商品数量：</small>{totalQuantity}点</p>
                <p className="cart_total_contents_text"><small>商品小計：</small>¥{totalPrice.toLocaleString("ja-JP")}</p>
                <p className="cart_total_contents_text"><small>送料：</small>¥{shippingFee.toLocaleString("ja-JP")}</p>
                <p className="cart_total_contents_total"><small>合計：</small><span>¥{totalAmount.toLocaleString("ja-JP")}</span></p>
                <div className="cart_total_contents_btn">
                  {cartProducts.length === 0 ? (
                    <a href="/purchase" className="btn-inactive">レジに進む</a>
                  ) : (
                    <a href="/purchase" className="btn">レジに進む</a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Cart;