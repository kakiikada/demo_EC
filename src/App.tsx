import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoriteProvider } from "./context/FavoriteContext";
import { CartProvider } from "./context/CartContext";

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

function App() {
  return (
    <>
      <BrowserRouter>
        <FavoriteProvider>
          <CartProvider>
            <Header />
            <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/category/:categoryId" element={<Category />} />
                  <Route path="/product/:productId" element={<ProductDetail />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/mypage" element={<MyPage />} />
                  <Route path="/search" element={<SearchResults />} />
                </Routes>
            </main>
            <Footer />
          </CartProvider>
        </FavoriteProvider>
      </BrowserRouter>
    </>
  );
}

export default App;