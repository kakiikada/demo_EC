import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { UserData } from "../data/userData";
import { validateKana, validateEmail, validatePhone, validatePostalCode } from "../data/validation";
import type { OrderData } from "../types/order";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import home_catch from "../assets/common/home_catch.jpg";


function MyPage() {
  const {
    userData: user,
    userId,
    changePassword,
    verifyPassword,
    updateProfile,
    logout,
  } = useAuth();

  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [editUser, setEditUser] = useState<UserData | null>(null);

  useEffect(() => {
    if (user) {
      setEditUser(user);
    }
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

    // if (!editUser.email.trim()) {
    //   newErrors.email = "メールアドレスを入力してください。";
    // } else if (!validateEmail(editUser.email)) {
    //   newErrors.email = "正しいメールアドレスを入力してください。";
    // }

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
  const [toastMessage, setToastMessage] = useState("");
  const [toastTarget, setToastTarget] = useState("");
  const showToast = (message: string, target: string) => {
    setToastMessage(message);
    setToastTarget(target);
    setToast(true);

    setTimeout(() => {
      setToast(false);
    }, 3000);
  };

  // pass
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    if (!user) return;

    // 新しいパスワードの一致確認
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("新しいパスワードが一致しません。");
      return;
    }

    try {
      // 現在のパスワードを確認
      await verifyPassword(user.email, passwordData.currentPassword);
    } catch (error) {
      setPasswordError("現在のパスワードが正しくありません。");
      return;
    }

    try {
      // 新しいパスワードに変更
      await changePassword(passwordData.newPassword);

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setIsEditingPassword(false);
      showToast("パスワードを変更しました。", "password");

    } catch (error) {
      console.error("パスワード変更エラー:", error);
      setPasswordError("パスワードを変更できませんでした。");
    }
  };

  // 退会処理
  const handleDeleteAccount = async () => {
    if (!user || !deletePassword) {
      return;
    }

    try {
      // ① ログイン中のセッションを取得
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session) {
        throw new Error("ログイン状態を確認できませんでした。");
      }

      // ② Cloudflare Workerへ退会リクエストを送信
      const response = await fetch(
        "https://pom-plein-account-api.kakiikada.workers.dev/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            email: user.email,
            password: deletePassword,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.detail
            ? `${result.error}: ${result.detail}`
            : result.error || "退会処理に失敗しました。"
        );
      }

      // ③ ブラウザに残っているログイン情報を解除
      const { error: signOutError } =
        await supabase.auth.signOut({ scope: "local" });

      if (signOutError) {
        console.error("ローカルログアウト時のエラー:", signOutError);
      }

      // ④ 画面を初期状態に戻してTOPへ移動
      setDeletePassword("");
      setIsDeleteModalOpen(false);
      navigate("/");

    } catch (error) {
      console.error("退会処理エラー:", error);

      alert(
        error instanceof Error
          ? error.message
          : "退会処理に失敗しました。"
      );
    }
  };


  // 購入履歴
  const [orders, setOrders] = useState<OrderData[]>(() => {
    const savedOrders = localStorage.getItem("pomplein_orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // ログアウト
  const handleLogout = () => {
    logout();
    console.log("ログアウト処理後");
    navigate("/");
    console.log("navigate実行後");
  };

  const handleSaveUser = async () => {
    if (!validateUser() || !editUser || !user) return;

    try {
      await updateProfile(editUser);

      setIsEditing(false);
      showToast("会員情報を更新しました。", "profile");
    } catch (error) {
      console.error("プロフィール更新エラー:", error);
    }
  };
  // 退会用モーダル
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // 退会時のパスワード
  const [deletePassword, setDeletePassword] = useState("");
  // デモアカウントのパスワード変更を禁止
  const isPublicDemoAccount = user?.email === "aaa@aaa.com";

  return (
      <div className="myPage">
        {user ? (
        <section>
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
                  <div className={`myPage_toast ${toast && toastTarget === "profile" ? "active" : ""}`}>
                    <p>{toastMessage}</p>
                  </div>
                  {isEditing ? (
                  <div className="myPage_userData_header_buttons">
                    <button
                      type="button"
                      className="btn"
                      onClick={handleSaveUser}
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
                        </label>
                        {errors.kana && (
                        <p className="form_error">{errors.kana}</p>
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
                        <p className="myPage_inputBox_title">氏名(カナ)：</p>{user.kana}
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
                  <p className="note_message">※当サイトはデモサイトですがデータベースに記載内容が保存されます。実際の個人情報・メールアドレス・パスワードなどは入力しないでください。</p>
                </div>
              </div>

              {/* メルアド変更 */}
              <div className="myPage_userData_header space-l">
                <h2 className="myPage_userData_header_title">メールアドレス</h2>
              </div>
              <div className="myPage_userData_text">
                <div className="contentBox">                
                  <ul>
                    <li className="myPage_inputBox">
                      <p className="myPage_inputBox_title">メールアドレス：</p>{user.email}
                    </li>
                  </ul>
                  <p className="note_message">※セキュリティ上の理由により、登録後のメールアドレス変更には対応しておりません (存在しないメールアドレスでも登録可能な仕様にしたいが、メールアドレスの再設定にメールの送信が必要となるため)。<br />誤って実際に使用しているメールアドレスを登録した場合は、アカウントを削除のうえ、架空のメールアドレスで再登録してください。</p>
                </div>
              </div>

              {/* パスワード変更 */}
              <form onSubmit={handlePasswordChange}>
                <div className="myPage_userData_header space-l">
                  <h2 className="myPage_userData_header_title">パスワード</h2>
                  <div>
                    <div className={`myPage_toast ${toast && toastTarget === "password" ? "active" : ""}`}>
                      <p>{toastMessage}</p>
                    </div>
                  {isPublicDemoAccount ? (
                    <p className="note_message">
                      公開用テストアカウントのため、パスワードは変更できません。
                    </p>
                  ) : isEditingPassword ? (
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
                    <p className="note_message">※当サイトはデモサイトですがデータベースに記載内容が保存されます。実際の個人情報・メールアドレス・パスワードなどは入力しないでください。</p>
                  </div>
                </div>
              </form>
              <div className="wrapper">
                <div className="myPage_otherArea">
                  <button
                    className="btn-s"
                    type="button"
                    onClick={handleLogout}
                  >
                    ログアウト
                  </button>
                  <button
                    className="btn-s"
                    onClick={() => setIsDeleteModalOpen(true)}
                  >退会手続き</button>
                </div>
              </div>
            </section>
          </div>
        </section>
        ) : (
        <div className="wrapper">
          <p className="myPage_header">
            読み込み中
          </p>
        </div>
        )}
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
        {/* モーダル */}
          {isDeleteModalOpen && (
            <div className="myPage_deleteModal">
              <div className="myPage_deleteModal_content">
                {/* 退会手続き */}
                <div className="myPage_userData">
                  <div className="myPage_userData_text">
                    <div className="contentBox">                
                      <div className="myPage_userData_header">
                        <h2 className="myPage_userData_header_title">退会手続き</h2>
                      </div>
                      <p className="myPage_userData_text_line space-lm">
                        POM PLEINのご利用を終了される場合は、以下の注意事項をご確認のうえ、退会手続きを行ってください。
                      </p>
                      <p className="myPage_userData_text_line">
                        退会手続きを完了すると、登録されている会員情報（氏名・住所・電話番号など）が削除されます。
                      </p>
                      <p className="myPage_userData_text_line">
                        退会後は、現在のアカウントでログインすることができなくなります。
                      </p>
                      <p className="myPage_userData_text_line">
                        退会手続き完了後は、アカウントを元に戻すことはできません。再度ご利用になる場合は、新規登録が必要です。
                      </p>
                      <label className="myPage_userData_text_line" htmlFor="deletePassword">
                        <div className="myPage_inputBox">
                          <p className="myPage_inputBox_title">
                            現在のパスワード：
                          </p>
                          <input
                            className="input"
                            id="deletePassword"
                            type="password"
                            placeholder="現在のパスワードを入力"
                            value={deletePassword}
                            onChange={(e) => setDeletePassword(e.target.value)}
                          />
                        </div>
                      </label>
                      <div className="myPage_userData_text_btn">              
                        <button
                          className="btn-color5"
                          onClick={() => setIsDeleteModalOpen(false)}
                        >キャンセル</button>
                        <button
                          className="btn"
                          onClick={handleDeleteAccount}
                        >退会する</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
  );
}

export default MyPage;