import { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HeaderLogo from "../assets/logo-b.svg";
type AuthMode = 'login' | 'register' | 'reset';
import { useAuth } from "../context/AuthContext"
import { supabase } from "../lib/supabase";

function Login() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [searchParams] = useSearchParams();
  const urlMode = searchParams.get("mode");
  useEffect(() => {
    if (urlMode === "register") {
      setMode("register");
    }
  }, [urlMode]);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    name: "",
    kana: "",
    phone: "",
    postalCode: "",
    address: "",
    building: "",
  });


  const { login } = useAuth();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(loginData.email, loginData.password);

      setErrorMessage("");
      navigate("/MyPage");
    } catch (error) {
      console.error("ログインエラー:", error);
      setErrorMessage("メールアドレスまたはパスワードが違います。");
    }
  };

  const handleRegister = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: registerData.email,
      password: registerData.password,
    });

    if (error) {
      console.error("新規登録エラー:", error);

      if (
        error.message.includes("already registered") ||
        error.message.includes("already been registered") ||
        error.message.includes("User already registered")
      ) {
        setErrorMessage("このメールアドレスは既に使用されています。");
      } else {
        setErrorMessage("新規登録に失敗しました。入力内容を確認してください。");
      }

      return;
    }
    if (!data.user) {
      setErrorMessage("ユーザー登録に失敗しました。");
      return;
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: data.user.id,
        name: registerData.name,
        kana: registerData.kana,
        phone: registerData.phone,
        postal_code: registerData.postalCode,
        address: registerData.address,
        building: registerData.building,
      });

    if (profileError) {
      console.error("プロフィール登録エラー:", profileError);
      setErrorMessage("プロフィール情報の登録に失敗しました。");
      return;
    }
    // 登録後、自動ログイン状態を解除
    await supabase.auth.signOut();

    setErrorMessage("");
    setMode("login");
    setLoginData({
      email: registerData.email,
      password: "",
    });
    setRegisterData({
      email: "",
      password: "",
      name: "",
      kana: "",
      phone: "",
      postalCode: "",
      address: "",
      building: "",
    });
  };

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  return (
    <div className="wrapper">
      <div className="login">
        <h1 className="login_title">
          {mode === 'login' && (<>Login</>)}
          {mode === 'register' && (<>新規登録</>)}
          {mode === 'reset' && (<>パスワード再設定</>)}
          </h1>
        <p className="login_text">Pom Plein Members</p>
        <form onSubmit={handleLogin}>
          <div className="login_contents">
            {mode === 'login' && (
            <>
            <ul className="login_contents_list">
              <li className="login_input">
                <span>E-mail</span>
                <input
                  type="text"
                  name="email"
                  value={loginData.email}
                  onChange={(e) => {
                    setLoginData({
                      ...loginData,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                 />
              </li>
              <li className="login_input">
                <span>password</span>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={(e) => {
                    setLoginData({
                      ...loginData,
                      [e.target.name]: e.target.value,
                    });
                  }}
                 />
              </li>
            </ul>
            <div className="login_contents_btn">
              <button type="submit" className="btn-color2">ログイン</button>
            </div>
            {errorMessage && (
              <p className="error_message space-m">{errorMessage}</p>
            )}
            <p className="login_contents_text"><button type="button" onClick={() => setMode('register')}>アカウントをお持ちでない方</button></p>
            {/* <p className="login_contents_text"><button type="button" onClick={() => setMode('reset')}>パスワードを忘れた方</button></p> */}
            </>
            )}
            {mode === 'register' && (
              <>
            <ul className="login_contents_list">
              <li className="login_input">
                <span>E-mail</span>
                <input
                  type="text"
                  name="email"
                  placeholder="実在するアドレスは記載しないで下さい"
                  value={registerData.email}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      email: e.target.value,
                    })
                  }
                />
              </li>
              <li className="login_input">
                <span>password</span>
                <input
                  type="password"
                  name="password"
                  placeholder="実在するパスワードは記載しないで下さい"
                  value={registerData.password}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      password: e.target.value,
                    })
                  }
                />
              </li>
              <li className="login_input">
                <span>氏名</span>
                <input
                  type="text"
                  name="name"
                  placeholder="個人情報は記載しないで下さい"
                  value={registerData.name}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      name: e.target.value,
                    })
                  }
                />
              </li>
              <li className="login_input">
                <span>氏名（カナ）</span>
                <input
                  type="text"
                  name="kana"
                  placeholder="個人情報は記載しないで下さい"
                  value={registerData.kana}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      kana: e.target.value,
                    })
                  }
                />
              </li>
              <li className="login_input">
                <span>電話番号</span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="個人情報は記載しないで下さい"
                  value={registerData.phone}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      phone: e.target.value,
                    })
                  }
                />
              </li>
              <li className="login_input">
                <span>住所-郵便番号</span>
                <input
                  type="text"
                  name="postalCode"
                  placeholder="個人情報は記載しないで下さい"
                  value={registerData.postalCode}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      postalCode: e.target.value,
                    })
                  }
                />
              </li>
              <li className="login_input">
                <span>住所（番地まで）</span>
                <input
                  type="text"
                  name="address"
                  placeholder="個人情報は記載しないで下さい"
                  value={registerData.address}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      address: e.target.value,
                    })
                  }
                />
              </li>
              <li className="login_input">
                <span>建物名・部屋番号</span>
                <input
                  type="text"
                  name="building"
                  placeholder="個人情報は記載しないで下さい"
                  value={registerData.building}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      building: e.target.value,
                    })
                  }
                />
              </li>
            </ul>
            {errorMessage && (
              <p className="error_message space-m">{errorMessage}</p>
            )}
            <div className="login_contents_btn">
              <button
                type="button"
                className="btn-color1"
                onClick={handleRegister}
              >
                新規登録
              </button>
            </div>
            <p className="login_contents_text"><button type="button" onClick={() => setMode('login')}>アカウントをお持ちの場合</button></p>
            </>
            )}
            {mode === 'reset' && (
              <>
            <ul className="login_contents_list">
              <li className="login_input"><span>E-mail</span><input type="text" /></li>
              <li className="login_input"><span>新規password</span><input type="password" /></li>
              <li className="login_input"><span>新規password確認</span><input type="password" /></li>
            </ul>
            {errorMessage && (
              <p className="error_message space-m">{errorMessage}</p>
            )}          
            <div className="login_contents_btn">
              <button className="btn-color3">登録</button>
              <p className="login_contents_text"><button type="button" onClick={() => setMode('login')}>ログイン画面へ</button></p>
            </div>
            <p className="note_message space-m">当サイトはデモサイトなので、通常のサービスとは異なり、メールによる本人確認を行わずにパスワードを再設定できます。</p>
            </>
            )}
            <p className="error_message space-m">※実際の個人情報・メールアドレス・パスワードなどは絶対に入力しないでください。</p>
            <div className="note_message space-s">
              ■テストアカウント<br />メールアドレス：aaa@aaa.com<br />パスワード：pass_1234
            </div>
            <p className="note_message space-s">当サイトはデータベースにアカウント情報が保存されます。存在しないメールアドレスでも登録できるようメールでの本人確認の手順を省略しており、そのためメールアドレス・パスワードが第三者に知られてしまっていた場合、簡単に閲覧・編集ができてしまいます。</p>
          </div>
        </form>
        <img className="login_logo" src={HeaderLogo} alt="POM PLEIN" />
      </div>
    </div>
  );
}

export default Login;