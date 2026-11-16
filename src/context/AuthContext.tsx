import { useEffect } from "react";
import { supabase, supabaseAuthCheck } from "../lib/supabase";
import { createContext, useContext, useState } from "react";
import type { UserData } from "../data/userData";

interface AuthContextType {
  isLoggedIn: boolean;
  isAuthLoading: boolean;
  userData: UserData | null;
  userId: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  changePassword: (newPassword: string) => Promise<void>;
  verifyPassword: (email: string, password: string) => Promise<void>;
  updateProfile: (updatedUser: UserData) => Promise<void>;
  
}

const AuthContext = createContext<AuthContextType | null>(null);

  export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  
  // パスワードを変更
  const changePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      throw error;
    }
  };
  // プロフィールを変更
  const updateProfile = async (updatedUser: UserData) => {
    if (!userId) {
      throw new Error("ユーザーIDが取得できません。");
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        name: updatedUser.name,
        kana: updatedUser.kana,
        phone: updatedUser.phone,
        postal_code: updatedUser.postalCode,
        address: updatedUser.address,
        building: updatedUser.building,
      })
      .eq("id", userId);

    if (error) {
      throw error;
    }

    setUserData(updatedUser);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  
  useEffect(() => {
    const fetchProfile = async (userId: string, email: string) => {
      setUserId(userId);

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("プロフィール取得エラー:", error);
        setUserData(null);
        return;
      }

      setUserData({
        name: data.name,
        kana: data.kana ?? "",
        email: email,
        phone: data.phone ?? "",
        postalCode: data.postal_code ?? "",
        address: data.address ?? "",
        building: data.building ?? "",
      });
    };

    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        setIsLoggedIn(!!session);

        if (session?.user) {
          await fetchProfile(
            session.user.id,
            session.user.email ?? ""
          );
        } else {
          setUserId(null);
          setUserData(null);
        }
      } catch (error) {
        console.error("認証状態の確認エラー:", error);
      } finally {
        setIsAuthLoading(false);
      }
    };

    initializeAuth();

  const { data: { subscription } } =
    supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);

      if (event === "SIGNED_OUT") {
        setUserData(null);
      }

      if (event === "SIGNED_IN" && session?.user) {
        setTimeout(() => {
          fetchProfile(
            session.user.id,
            session.user.email ?? ""
          );
        }, 0);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
  };
  // 現在のパスワードを確認
  const verifyPassword = async (email: string, password: string) => {
    const { error } = await supabaseAuthCheck.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
  };
  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  };
  return (
    <AuthContext.Provider
      value={{
          isLoggedIn,
          isAuthLoading,
          userData,
          userId,
          login,
          logout,
          changePassword,
          verifyPassword,
          updateProfile,
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


