import { useState, useEffect } from "react";
import home_catch from "../assets/common/home_catch.jpg";
import { initialUserData, type UserData } from "../data/userData";
import { validateKana, validateEmail, validatePhone, validatePostalCode } from "../data/validation";
import type { OrderData } from "../types/order";


function ProductDetail() {
  const [user, setUser] = useState<UserData>(() => {
    const savedUser = localStorage.getItem("pomplein_user");

    if (savedUser) {
      try {
        return {
          ...initialUserData,
          ...JSON.parse(savedUser),
        };
      } catch {
        return initialUserData;
      }
    }

    return initialUserData;
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState(initialUserData);

  useEffect(() => {
    localStorage.setItem("pomplein_user", JSON.stringify(user));
  }, [user]);

  // エラー
  const [errors, setErrors] = useState<Partial<Record<keyof UserData, string>>>({});
  const validateUser = () => {
    const newErrors: Partial<Record<keyof UserData, string>> = {};

    if (!editUser.name.trim()) {
      newErrors.name = "氏名を入力してください。";
    }

    if (!editUser.kana.trim()) {
      newErrors.kana = "フリガナを入力してください。";
    } else if (!validateKana(editUser.kana)) {
      newErrors.kana = "全角カタカナで入力してください。";
    }

    if (!editUser.email.trim()) {
      newErrors.email = "メールアドレスを入力してください。";
    } else if (!validateEmail(editUser.email)) {
      newErrors.email = "正しいメールアドレスを入力してください。";
    }

    if (!editUser.phone.trim()) {
      newErrors.phone = "電話番号を入力してください。";
    } else if (!validatePhone(editUser.phone)) {
      newErrors.phone = "正しい電話番号を入力してください。";
    }

    if (!editUser.postalCode.trim()) {
      newErrors.postalCode = "郵便番号を入力してください。";
    } else if (!validatePostalCode(editUser.postalCode)) {
      newErrors.postalCode = "正しい郵便番号を入力してください。";
    }

    if (!editUser.address.trim()) {
      newErrors.address = "住所を入力してください。";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  // 保存用トースト
  const [toast, setToast] = useState(false);

  const showToast = () => {
    setToast(true);

    setTimeout(() => {
      setToast(false);
    }, 1000);
  };
  // 購入履歴
  const [orders, setOrders] = useState<OrderData[]>(() => {
    const savedOrders = localStorage.getItem("pomplein_orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });



  return (
      <div className="myPage">
        <div className="wrapper">
          <div className="myPage_header">
            <div className="myPage_header_title">
              <div className="title">
                <h1 className="title_text">My Page</h1>
              </div>
              <p>こんにちは、{user.name} さん。いつもご利用ありがとうございます。</p>
            </div>
            <ul className="myPage_header_link">
              <li><a className="btn-favo-default" href="/favorites">お気に入り</a></li>
              <li><a className="btn" href="/cart">カート</a></li>
            </ul>
          </div>
        </div>
        <div className="wrapper">
          <section className="myPage_userData">
            <div className="myPage_userData_header">
              <h2 className="myPage_userData_header_title">会員情報</h2>
              <div>
                <div className={`myPage_toast ${toast ? "active" : ""}`}>
                  <p>会員情報を更新しました。</p>
                </div>
                {isEditing ? (
                <div className="myPage_userData_header_buttons">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      if (validateUser()) {
                        setUser(editUser);
                        setIsEditing(false);
                        showToast();
                      }
                    }}
                  >
                    保存する
                  </button>
                  <button
                    type="button"
                    className="btn-favo-default"
                    onClick={() => {
                      setIsEditing(false);
                      setErrors({});
                    }}
                  >
                    キャンセル
                  </button>
                </div>

                ) : (
                <>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      setEditUser(user);
                      setIsEditing(true);
                    }}
                  >
                    編集する
                  </button>
                </>
                )}
              </div>
            </div>
            <div className="myPage_userData_text">
              <div className="contentBox">                
                {isEditing ? (
                <form>
                  <ul>
                    <li>
                      <label className="myPage_inputBox">
                        <p className="myPage_inputBox_title">氏名：</p>
                        <input className="input"
                          type="text"
                          value={editUser.name}
                          onChange={(e) =>
                            setEditUser({ ...editUser, name: e.target.value })
                          }
                        />
                      {errors.name && (
                          <p className="form_error">{errors.name}</p>
                        )}
                      </label>
                    </li>
                    <li>
                      <label className="myPage_inputBox">
                        <p className="myPage_inputBox_title">カナ：</p>
                        <input className="input"
                          type="text"
                          value={editUser.kana}
                          onChange={(e) =>
                            setEditUser({ ...editUser, kana: e.target.value })
                          }
                        />
                      {errors.kana && (
                          <p className="form_error">{errors.kana}</p>
                        )}
                      </label>
                    </li>
                    <li>
                      <label className="myPage_inputBox">
                        <p className="myPage_inputBox_title">メールアドレス：</p>
                        <input className="input"
                          type="email"
                          value={editUser.email}
                          onChange={(e) =>
                            setEditUser({ ...editUser, email: e.target.value })
                          }
                        />
                        {errors.email && (
                          <p className="form_error">{errors.email}</p>
                        )}
                      </label>
                    </li>
                    <li>
                      <label className="myPage_inputBox">
                        <p className="myPage_inputBox_title">電話番号：</p>
                        <input className="input"
                          type="tel"
                          value={editUser.phone}
                          onChange={(e) =>
                            setEditUser({ ...editUser, phone: e.target.value })
                          }
                        />
                        {errors.phone && (
                          <p className="form_error">{errors.phone}</p>
                        )}
                      </label>
                    </li>
                    <li className="myPage_inputwrapper">
                      <p className="myPage_inputwrapper_title">住所：</p>
                      <ul className="myPage_inputwrapper_data">
                        <li>
                          <label className="myPage_inputBox">
                            <p className="myPage_inputBox_title">郵便番号：</p>
                            <input className="input"
                              type="text"
                              value={editUser.postalCode}
                              onChange={(e) =>
                                setEditUser({ ...editUser, postalCode: e.target.value })
                              }
                            />
                            {errors.postalCode && (
                              <p className="form_error">{errors.postalCode}</p>
                            )}
                          </label>
                        </li>
                        <li>
                          <label className="myPage_inputBox">
                            <p className="myPage_inputBox_title">住所（番地まで）：</p>
                            <input className="input"
                              type="text"
                              value={editUser.address}
                              onChange={(e) =>
                                setEditUser({ ...editUser, address: e.target.value })
                              }
                            />
                            {errors.address && (
                              <p className="form_error">{errors.address}</p>
                            )}
                          </label>
                        </li>
                        <li>
                          <label className="myPage_inputBox">
                            <p className="myPage_inputBox_title">建物名・部屋番号：</p>
                            <input className="input"
                              type="text"
                              value={editUser.building}
                              onChange={(e) =>
                                setEditUser({ ...editUser, building: e.target.value })
                              }
                            />
                          </label>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </form>
                ) : (
                  <ul>
                    <li className="myPage_inputBox">
                      <p className="myPage_inputBox_title">氏名：</p>{user.name}
                    </li>
                    <li className="myPage_inputBox">
                      <p className="myPage_inputBox_title">氏名：</p>{user.kana}
                    </li>
                    <li className="myPage_inputBox">
                      <p className="myPage_inputBox_title">メールアドレス：</p>{user.email}
                    </li>
                    <li className="myPage_inputBox">
                      <p className="myPage_inputBox_title">電話番号：</p>{user.phone}
                    </li>
                    <li className="myPage_inputwrapper">
                      <p className="myPage_inputwrapper_title">住所：</p>
                      <ul className="myPage_inputwrapper_data">
                        <li className="myPage_inputBox">
                          <p className="myPage_inputBox_title">郵便番号：</p>{user.postalCode}
                        </li>
                        <li className="myPage_inputBox">
                          <p className="myPage_inputBox_title">住所（番地まで）：</p>{user.address}
                        </li>
                        <li className="myPage_inputBox">
                          <p className="myPage_inputBox_title">建物名・部屋番号：</p>{user.building}
                        </li>
                      </ul>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </section>
        </div>
        <section className="myPage_order">
          <div className="wrapper">
            <div className="myPage_order_header">
              <h2 className="myPage_order_header_title">注文履歴</h2>
            </div>
          </div>
          <div className="myPage_orderList">
          {orders.length === 0 ? (
            <div className="myPage_orderList_header">
              <p>購入履歴はありません。</p>
            </div>
            ) : (
            <>
              {orders.map((order) => (
                <div className="myPage_orderList_headerWrapper" key={order.orderId}>
                  <div className="wrapper">
                    <div className="myPage_orderList_header">
                      <p>注文番号：{order.orderId}</p>
                      <p>注文日：{new Date(order.orderDate).toLocaleDateString("ja-JP")}</p>
                    </div>
                  </div>
                  <ul className="basicList">
                    {order.items.map((item) => (
                    <li className="basicList_list" key={item.id}>
                      <a href={`/item/${item.id}`}>
                        <div className="wrapper">
                          <div className="itemLine">
                            <div className="itemLine_img"><img src={item.image} alt={item.name} /></div>
                            <ul className="itemLine_text">
                              <li className="itemLine_text_title">{item.name}</li>
                              <li className="itemLine_text_text">{item.description}</li>
                              <li>単価：¥{item.price.toLocaleString()} × 数量：{item.quantity}</li>
                              <li className="itemLine_text_price">¥{item.subtotal.toLocaleString()}</li>
                            </ul>
                          </div>
                        </div>
                      </a>
                    </li>
                    ))}
                  </ul>
                  <div className="myPage_orderList_footer">
                    <span>お支払い合計（税込・送料込）</span>
                    <strong className="myPage_orderList_footer_price">¥{order.grandTotal.toLocaleString()}</strong>
                  </div>
                </div>
              ))}
            </>
            )}
          </div>
        </section>
        <div className="wrapper">
          <div className="myPage_logout">
            <a className="btn" href="/login">ログアウト</a>
          </div>
        </div>
      </div>
  );
}

export default ProductDetail;