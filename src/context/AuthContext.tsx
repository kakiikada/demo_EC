import { createContext, useContext, useState } from "react";
import type { UserData } from "../data/userData";

interface AuthContextType {
  isLoggedIn: boolean;
  userData: UserData | null;
  login: (user: UserData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const login = (user: UserData) => {
    setIsLoggedIn(true);
    setUserData(user);
  };
  const logout = () => {
    setIsLoggedIn(false);
    setUserData(null);
  };
  return (
    <AuthContext.Provider
      value={{
          isLoggedIn,
          userData,
          login,
          logout
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


