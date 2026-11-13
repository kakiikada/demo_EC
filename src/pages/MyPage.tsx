import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { initialUserData, type UserData } from "../data/userData";
import { validateKana, validateEmail, validatePhone, validatePostalCode } from "../data/validation";
import type { OrderData } from "../types/order";
import { useAuth } from "../context/AuthContext";
import home_catch from "../assets/common/home_catch.jpg";


function ProductDetail() {
  const navigate = useNavigate();

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
  const [isEditingPassword, setIsEditingPassword] = useState(false);
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
  const [passwordError, setPasswordError] = useState("");
  // 保存用トースト
  const [toast, setToast] = useState(false);
  const showToast = () => {
    setToast(true);

    setTimeout(() => {
      setToast(false);
    }, 1000);
  };
  // pass
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { checkPassword, changePassword } = useAuth();

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();

  if (!checkPassword(passwordData.currentPassword)) {
    setPasswordError("現在のパスワードが正しくありません。");
    return;
  }

  if (passwordData.newPassword !== passwordData.confirmPassword) {
    setPasswordError("新しいパスワードが一致しません。");
    return;
  }

  changePassword(passwordData.newPassword);
  setPasswordError("");
  setPasswordData({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  setIsEditingPassword(false);
};

  // 購入履歴
  const [orders, setOrders] = useState<OrderData[]>(() => {
    const savedOrders = localStorage.getItem("pomplein_orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // ログアウト
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    console.log("ログアウト処理後");
    navigate("/");
    console.log("navigate実行後");
  };

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
              <li><Link className="btn-favo-default" to="/favorites">お気に入り</Link></li>
              <li><Link className="btn" to="/cart">カート</Link></li>
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
                      </label>
                      {errors.name && (
                          <p className="form_error">{errors.name}</p>
                        )}
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
                      </label>
                      {errors.email && (
                        <p className="form_error">{errors.email}</p>
                      )}
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
                      </label>
                      {errors.phone && (
                        <p className="form_error">{errors.phone}</p>
                      )}
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
                          </label>
                          {errors.postalCode && (
                            <p className="form_error">{errors.postalCode}</p>
                          )}
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
                          </label>
                          {errors.address && (
                            <p className="form_error">{errors.address}</p>
                          )}
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


            <form onSubmit={handlePasswordChange}>
              <div className="myPage_userData_header space-lm">
                <h2 className="myPage_userData_header_title">パスワード</h2>
                <div>
                  {/* <div className={`myPage_toast ${toast ? "active" : ""}`}>
                    <p>パスワードを更新しました。</p>
                  </div> */}
                  {isEditingPassword ? (
                  <div className="myPage_userData_header_buttons">
                    <button
                      type="submit"
                      className="btn"
                    >
                      保存する
                    </button>
                    <button
                      type="button"
                      className="btn-favo-default"
                      onClick={() => {
                        setIsEditingPassword(false);
                        setPasswordData({
                          currentPassword: "",
                          newPassword: "",
                          confirmPassword: "",
                        });
                        setPasswordError("");
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
                      onClick={() => setIsEditingPassword(true)}
                    >
                      パスワードを変更する
                    </button>
                  </>
                  )}
                </div>
              </div>
              <div className="myPage_userData_text">
                <div className="contentBox">                
                  {isEditingPassword ? (
                  <ul>
                    <li>
                      <label className="myPage_inputBox">
                        <p className="myPage_inputBox_title">現在のパスワード：</p>
                        <input
                          className="input"
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              currentPassword: e.target.value,
                            })
                          }
                        />
                      </label>
                    </li>
                    <li>
                      <label className="myPage_inputBox">
                        <p className="myPage_inputBox_title">新しいパスワード：</p>
                        <input
                          className="input"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              newPassword: e.target.value,
                            })
                          }
                        />
                      </label>
                    </li>
                    <li>
                      <label className="myPage_inputBox">
                        <p className="myPage_inputBox_title">新しいパスワード（確認用）：</p>
                        <input
                          className="input"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              confirmPassword: e.target.value,
                            })
                          }
                        />
                      </label>
                      {passwordError && (
                        <p className="form_error">{passwordError}</p>
                      )}
                    </li>
                  </ul>
                  ) : (
                  <ul>
                    <li className="myPage_inputBox">
                      <p className="myPage_inputBox_title">パスワード：</p>＊＊＊＊
                    </li>
                  </ul>
                  )}
                </div>
              </div>
            </form>

























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
                      <Link to={`/item/${item.id}`}>
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
                      </Link>
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
            <button
              className="btn"
              type="button"
              onClick={handleLogout}
            >
              ログアウト
            </button>
          </div>
        </div>
      </div>
  );
}

export default ProductDetail;