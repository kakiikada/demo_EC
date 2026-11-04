import { useState } from 'react';
import HeaderLogo from "../assets/logo-b.svg";
type AuthMode = 'login' | 'register' | 'reset';

function Login() {
  const [mode, setMode] = useState<AuthMode>('login');
  return (
    <div className="wrapper">
      <div className="login">
        <h1 className="login_title">
          {mode === 'login' && (<>Login</>)}
          {mode === 'register' && (<>新規登録</>)}
          {mode === 'reset' && (<>パスワード再設定</>)}
          </h1>
        <p className="login_text">Pom Plein Members</p>
        <form action="">
          <div className="login_contents">
            {mode === 'login' && (
            <>
            <ul className="login_contents_list">
              <li className="login_input"><span>E-mail</span><input type="text" /></li>
              <li className="login_input"><span>password</span><input type="password" /></li>
            </ul>
            <div className="login_contents_btn">
              <button className="btn-color2">ログイン</button>
            </div>
            <p className="login_contents_text"><button type="button" onClick={() => setMode('register')}>アカウントをお持ちでない方</button></p>
            <p className="login_contents_text"><button type="button" onClick={() => setMode('reset')}>パスワードを忘れた方</button></p>
            </>
            )}
            {mode === 'register' && (
              <>
            <ul className="login_contents_list">
              <li className="login_input"><span>E-mail</span><input type="text" /></li>
              <li className="login_input"><span>password</span><input type="password" /></li>
            </ul>
            <div className="login_contents_btn">
              <button className="btn-color1">新規登録</button>
            </div>
            <p className="login_contents_text"><button type="button" onClick={() => setMode('login')}>アカウントをお持ちの場合</button></p>
            </>
            )}
            {mode === 'reset' && (
              <>
            <ul className="login_contents_list">
              <li className="login_input"><span>E-mail</span><input type="text" /></li>
              <li className="login_input"><span>password</span><input type="password" /></li>
              <li className="login_input"><span>password確認</span><input type="password" /></li>
            </ul>
            <div className="login_contents_btn">
              <button className="btn-color3">登録</button>
              <p className="login_contents_text"><button type="button" onClick={() => setMode('login')}>ログイン画面へ</button></p>
            </div>
            </>
            )}
          </div>
        </form>
        <img className="login_logo" src={HeaderLogo} alt="POM PLEIN" />
      </div>
    </div>
  );
}

export default Login;