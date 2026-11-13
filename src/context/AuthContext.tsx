import { createContext, useContext, useState } from "react";
import type { UserData } from "../data/userData";

interface AuthContextType {
  isLoggedIn: boolean;
  userData: UserData | null;
  login: (user: UserData) => void;
  logout: () => void;
  checkPassword: (currentPassword: string) => boolean;
  changePassword: (newPassword: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

  export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<UserData | null>(() => {
    const savedUser = localStorage.getItem("userData");
    return savedUser ? JSON.parse(savedUser) : null;

  });
  // 初期パスワードor保存パスワード読み込み
  const [password, setPassword] = useState(() => {
    return localStorage.getItem("mockPassword") || "test1234";
  });
  // 現在のパスワードを確認
  const checkPassword = (currentPassword: string) => {
    return currentPassword === password;
  };

  // パスワードを変更
  const changePassword = (newPassword: string) => {
    setPassword(newPassword);
    localStorage.setItem("mockPassword", newPassword);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("userData") !== null;
  });
  const login = (user: UserData) => {
    setIsLoggedIn(true);
    setUserData(user);
    localStorage.setItem("userData", JSON.stringify(user));
  };
  const logout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    localStorage.removeItem("userData");
  };
  return (
    <AuthContext.Provider
      value={{
          isLoggedIn,
          userData,
          login,
          logout,
          checkPassword,
          changePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};


