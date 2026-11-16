import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RequireAuth = () => {
  const { isLoggedIn, isAuthLoading } = useAuth();

  // 認証状態の確認中
  if (isAuthLoading) {
    return <p>読み込み中...</p>;
  }

  // 確認完了後、未ログインならTOPへ
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;