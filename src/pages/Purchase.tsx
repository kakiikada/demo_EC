import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProducts } from '../data/products';
import type { Product } from '../data/products';
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import type { OrderData } from "../types/order";

import { validateKana, validateEmail, validatePhone, validatePostalCode } from "../data/validation";

const Purchase = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);
  const { isLoggedIn, userData } = useAuth();


  const [step, setStep] = useState("input");
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [step]);

    const [formData, setFormData] = useState(() => ({
      name: isLoggedIn ? userData?.name || "" : "",
      kana: isLoggedIn ? userData?.kana || "" : "",
      email: isLoggedIn ? userData?.email || "" : "",
      phone: isLoggedIn ? userData?.phone || "" : "",
      postalCode: isLoggedIn ? userData?.postalCode || "" : "",
      address: isLoggedIn ? userData?.address || "" : "",
      building: isLoggedIn ? userData?.building || "" : "",
      deliveryDate: "",
      deliveryTime: "",
      payment: "credit",
      note: "",
      agree: false,
    }));
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    const newValue =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : value;

    setFormData(prev => ({
      ...prev,
      [name]: newValue,
    }));

    // 入力し直した項目のエラーを解除
    setErrors(prev => ({
      ...prev,
      [name]: "",
    }));
  };
  // 入力チェック
  const validate = () => {
    const newErrors: Record<string, string> = {};

    // 名前
    if (!formData.name.trim()) {
      newErrors.name = "お名前を入力してください";
    }

    // カナ
    if (!formData.kana.trim()) {
      newErrors.kana = "フリガナを入力してください";
    } else if (!validateKana(formData.kana)) {
      newErrors.kana = "全角カタカナで入力してください";
    }

    // メールアドレス
    if (!formData.email.trim()) {
      newErrors.email = "メールアドレスを入力してください";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "正しいメールアドレスを入力してください";
    }

    // 電話番号
    if (!formData.phone.trim()) {
      newErrors.phone = "電話番号を入力してください";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "電話番号は半角数字とハイフンで入力してください";
    }

    // 郵便番号
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "郵便番号を入力してください";
    } else if (!validatePostalCode(formData.postalCode)) {
      newErrors.postalCode = "郵便番号は正しい形式で入力してください";
    }

    // 市区町村・番地
    if (!formData.address.trim()) {
      newErrors.address = "住所を入力してください";
    }

    // 利用規約
    if (!formData.agree) {
      newErrors.agree = "利用規約への同意が必要です";
    }

    return newErrors;
  };
  // 送信時にチェック
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();

    setErrors(validationErrors);

    // エラーが1つでもあれば処理を中断
    if (Object.keys(validationErrors).length > 0) {
      console.log("入力エラーあり", validationErrors);
      return;
    }
    setStep("confirm");

    // 入力チェック成功
    console.log("入力チェック成功！");
  };
  // 購入商品確認
  const { cartItems, clearCart } = useCart();
  const orderItems = cartItems.map((item) => {
    const product = products.find(
      (p) => p.id === item.productId
    );

    if (!product) return null;

    return {
      ...product,
      quantity: item.quantity,
      subtotal: product.price * item.quantity,
    };
  }).filter((item) => item !== null);
  const totalPrice = orderItems.reduce(
    (total, item) => total + item.subtotal,
    0
  );
  const shippingFee = 300;
  const grandTotal = totalPrice + shippingFee;
  
  const saveOrder = () => {
    const newOrder: OrderData = {
      orderId: `PP-${Date.now()}`,
      orderDate: new Date().toISOString(),
      items: orderItems,
      totalPrice,
      shippingFee,
      grandTotal,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      postalCode: formData.postalCode,
      address: formData.address,
      building: formData.building,
      deliveryDate: formData.deliveryDate,
      deliveryTime: formData.deliveryTime,
      payment: formData.payment,
      note: formData.note,
    };

    const savedOrders = localStorage.getItem("pomplein_orders");
    const orders: OrderData[] = savedOrders
      ? JSON.parse(savedOrders)
      : [];

    localStorage.setItem(
      "pomplein_orders",
      JSON.stringify([...orders, newOrder])
    );
  };

  return (
      <div className="purchase">
        {step === "input" && (
          <>
        <div className="wrapper">
          <div className="purchase_header">
            <div className="title">
              <h1 className="title_text">ご注文手続き</h1>
            </div>
          </div>
        </div>
        <div className="wrapper">
          <form onSubmit={handleSubmit} noValidate>

            {/* 購入者情報 */}
            <div className="purchase_contents">
              <div className="contentBox">
                <section className="purchase_section">
                  <div className="title-s">
                    <h2 className="title_text">購入者情報</h2>
                  </div>

                  <label className="purchase_inputBox">
                    <span>お名前：</span>
                    <div className="purchase_inputBox_input">
                      {errors.name && <p className="purchase_error">{errors.name}</p>}
                      <input
                        className="input"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </label>

                  <label className="purchase_inputBox">
                    <span>フリガナ：</span>
                    <div className="purchase_inputBox_input">
                      {errors.kana && <p className="purchase_error">{errors.kana}</p>}
                      <input
                        className="input"
                        type="text"
                        name="kana"
                        value={formData.kana}
                        onChange={handleChange}
                      />
                    </div>
                  </label>

                  <label className="purchase_inputBox">
                    <span>メールアドレス：</span>
                    <div className="purchase_inputBox_input">
                      {errors.email && <p className="purchase_error">{errors.email}</p>}
                      <input
                        className="input"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </label>

                  <label className="purchase_inputBox">
                    <span>電話番号：</span>
                    <div className="purchase_inputBox_input">
                      {errors.phone && <p className="purchase_error">{errors.phone}</p>}
                      <input
                        className="input"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </label>
                </section>

                {/* お届け先 */}
                <section className="purchase_section">
                  <div className="title-s">
                    <h2 className="title_text">購入者情報 ・ お届け先</h2>
                  </div>
                  <label className="purchase_inputBox">
                    <span>郵便番号：</span>
                    <div className="purchase_inputBox_input">
                      {errors.postalCode && <p className="purchase_error">{errors.postalCode}</p>}
                      <input
                        className="input"
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                      />
                    </div>
                  </label>

                  <label className="purchase_inputBox">
                    <span>市区町村・番地：</span>
                    <div className="purchase_inputBox_input">
                      {errors.address && <p className="purchase_error">{errors.address}</p>}
                      <input
                        className="input"
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                  </label>

                  <label className="purchase_inputBox">
                    <span>建物名・部屋番号：</span>
                    <div className="purchase_inputBox_input">
                      {errors.building && <p className="purchase_error">{errors.building}</p>}
                      <input
                        className="input"
                        type="text"
                        name="building"
                        value={formData.building}
                        onChange={handleChange}
                      />
                    </div>
                  </label>
                </section>

                {/* 配送情報 */}
                <section className="purchase_section">
                  <div className="title-s">
                    <h2 className="title_text">配送情報</h2>
                  </div>

                  <label className="purchase_inputBox">
                    <span>配送希望日：</span>
                    <div className="purchase_inputBox_input">
                      {errors.deliveryDate && <p className="purchase_error">{errors.deliveryDate}</p>}
                      <input
                        className="input"
                        type="date"
                        name="deliveryDate"
                        value={formData.deliveryDate}
                        onChange={handleChange}
                      />
                    </div>
                  </label>

                  <label className="purchase_inputBox">
                    <span>配送時間帯：</span>
                    <div className="purchase_inputBox_input">
                      {errors.deliveryTime && <p className="purchase_error">{errors.deliveryTime}</p>}
                      <div className="selectBox">
                        <select
                          name="deliveryTime"
                          value={formData.deliveryTime}
                          onChange={handleChange}
                        >
                          <option value="">指定なし</option>
                          <option value="morning">午前中</option>
                          <option value="14-16">14:00〜16:00</option>
                          <option value="16-18">16:00〜18:00</option>
                          <option value="18-20">18:00〜20:00</option>
                        </select>
                      </div>
                    </div>
                  </label>
                </section>

                {/* 支払い方法 */}
                <section className="purchase_section">
                  <div className="title-s">
                    <h2 className="title_text">お支払い方法</h2>
                  </div>
                  <div className="purchase_inputBox">
                    <div className="radioBox">
                      <label>
                        <input
                          type="radio"
                          name="payment"
                          value="credit"
                          checked={formData.payment === "credit"}
                          onChange={handleChange}
                        />
                        <span>クレジットカード</span>
                      </label>

                      <label>
                        <input
                          type="radio"
                          name="payment"
                          value="bank"
                          checked={formData.payment === "bank"}
                          onChange={handleChange}
                        />
                        <span>銀行振込</span>
                      </label>
                    </div>
                  </div>
                </section>

                {/* 備考 */}
                <section className="purchase_section">
                  <div className="title-s">
                    <h2 className="title_text">備考</h2>
                  </div>
                  <div className="purchase_inputBox">
                    <div className="purchase_inputBox_input">
                      {errors.note && <p className="purchase_error">{errors.note}</p>}
                      <textarea
                        className="textarea"
                        name="note"
                        placeholder="ご要望などがあればご記入ください"
                        value={formData.note}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </section>

                {/* 同意 */}
                <section className="purchase_section">
                  <div className="purchase_inputBox">
                    <div className="purchase_inputBox_input">
                      {errors.agree && <p className="purchase_error">{errors.agree}</p>}
                      <div className="checkbox">
                        <label>
                          <input
                            type="checkbox"
                            name="agree"
                            checked={formData.agree}
                            onChange={handleChange}
                          />
                          <span>利用規約に同意する</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div className="purchase_submit">
                <button className="btn" type="submit">
                  注文内容を確認する
                </button>
              </div>
            </div>

          </form>
        </div>
        </>
        )}
        {step === "confirm" && (
          <>
        <div className="wrapper">
          <div className="purchase_header">
            <div className="title">
              <h1 className="title_text">ご注文の確認</h1>
            </div>
          </div>
        </div>


        <div className="purchase_itemList">
          <div className="wrapper">
            <div className="purchase_itemList_title">
              <div className="title-s">
                <h2 className="title_text">ご注文商品</h2>
              </div>
            </div>
          </div>
          <div className="purchase_itemList_contents">
            <ul className="basicList">
              {orderItems.map((item) => (
                <li className="basicList_list" key={item.id}>
                  <div className="wrapper">
                    <div className="itemLine">
                        <div className="itemLine_img">
                            <img src={item.image} alt={item.name} />
                        </div>
                        <ul className="itemLine_text">
                            <li className="itemLine_text_title">{item.name}</li>
                            <li className="itemLine_text_count">単価：¥{item.price.toLocaleString()} × 数量：{item.quantity}</li>
                            <li className="itemLine_text_price">¥{item.subtotal.toLocaleString()}</li>
                        </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="purchase_totalWrapper">
            <div className="wrapper">
              <div className="purchase_total">
                <span className="purchase_total_add">送料：¥{shippingFee}</span> 
                <span>商品合計</span>
                <strong>¥{grandTotal.toLocaleString()}</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="wrapper">
          <div className="purchase_contents">

            <div className="contentBox">
              <section className="purchase_section">
              </section>
              <section className="purchase_section">
                <div className="title-s">
                  <h2 className="title_text">購入者情報</h2>
                </div>

                <div className="purchase_inputBox">
                  <span>お名前：</span>
                  {formData.name}
                </div>

                <div className="purchase_inputBox">
                  <span>フリガナ：</span>
                  {formData.kana}
                </div>

                <div className="purchase_inputBox">
                  <span>メールアドレス：</span>
                  {formData.email}
                </div>

                <div className="purchase_inputBox">
                  <span>電話番号：</span>
                  {formData.phone}
                </div>
              </section>

              {/* お届け先 */}
              <section className="purchase_section">
                <div className="title-s">
                  <h2 className="title_text">購入者情報 ・ お届け先</h2>
                </div>
                <div className="purchase_inputBox">
                  <span>郵便番号：</span>
                  {formData.postalCode}
                </div>

                <div className="purchase_inputBox">
                  <span>市区町村・番地：</span>
                  {formData.address}
                </div>

                <div className="purchase_inputBox">
                  <span>建物名・部屋番号：</span>
                  {formData.building || "なし"}
                </div>
              </section>

              {/* 配送情報 */}
              <section className="purchase_section">
                <div className="title-s">
                  <h2 className="title_text">配送情報</h2>
                </div>

                <div className="purchase_inputBox">
                  <span>配送希望日：</span>
                  {formData.deliveryDate || "指定なし"}
                </div>

                <div className="purchase_inputBox">
                  <span>配送時間帯：</span>
                  {formData.deliveryTime || "指定なし"}
                </div>
              </section>

              {/* 支払い方法 */}
              <section className="purchase_section">
                <div className="title-s">
                  <h2 className="title_text">お支払い方法</h2>
                </div>
                <div className="purchase_inputBox">
                  {formData.payment}
                </div>
              </section>

              {/* 備考 */}
              <section className="purchase_section">
                <div className="title-s">
                  <h2 className="title_text">備考</h2>
                </div>
                <div className="purchase_inputBox">
                  {formData.note || "なし"}
                </div>
              </section>
            </div>
            <div className="purchase_submit">
              <button
                className="btn-color1"
                type="button"
                onClick={() => setStep("input")}
              >
                入力内容を修正する
              </button>
              <button
                className="btn"
                type="button"
                onClick={() => {
                  saveOrder();
                  clearCart();
                  setStep("complete")
                }}
              >
                注文を確定する
              </button>
            </div>
          </div>
        </div>
        </>
        )}

        {step === "complete" && (
        <>
        <div className="wrapper">
          <div className="purchase_header">
            <div className="title">
              <h1 className="title_text">ご注文を承りました。</h1>
            </div>
          </div>
        </div>
        <div className="wrapper">
          <div className="purchase_contents">
            <div className="contentBox">
              <h2>ご注文ありがとうございます！</h2>
              <p>ご注文内容はマイページからご確認いただけます。</p>
            </div>
            <div className="purchase_submit">
              <Link
                className="btn"
                to="/"
              >
                TOPへ戻る
              </Link>
            </div>

          </div>
        </div>
        </>
        )}

      </div>
  );
}

export default Purchase;