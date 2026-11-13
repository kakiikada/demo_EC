import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoriteProvider } from "./context/FavoriteContext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

import "./styles/App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from './pages/Home';
import Category from './pages/Category';
import ProductDetail from './pages/ProductDetail';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import SearchResults from './pages/SearchResults';
import Purchase from './pages/Purchase';
import PurchaseComplete from './pages/PurchaseComplete';
import ScrollToTop from './components/ScrollToTop';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <FavoriteProvider>
            <CartProvider>
              <ScrollToTop />
              <Header />
              <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/category/:categoryId" element={<Category />} />
                    <Route path="/product/:productId" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/purchase" element={<Purchase />} />
                    <Route path="/purchase/complete" element={<PurchaseComplete />} />
                    {/* ログイン時のみ表示されるページ */}
                    <Route element={<RequireAuth />}>
                      <Route path="/mypage" element={<MyPage />} />
                      <Route path="/favorites" element={<Favorites />} />
                    </Route>
                  </Routes>
              </main>
              <Footer />
            </CartProvider>
          </FavoriteProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;