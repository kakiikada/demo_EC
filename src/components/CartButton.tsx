import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

interface CartButtonProps {
  productId: string;
  quantity: number;
}

const CartButton = ({
  productId,
  quantity,
}: CartButtonProps) => {
  const { addToCart } = useCart();

  // 購入用トースト
  const [showToast, setShowToast] = useState(false);

  // トーストの表示時間
  useEffect(() => {
    if (!showToast) return;

    const timer = setTimeout(() => {
      setShowToast(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [showToast]);

  const handleClick = () => {
    addToCart(productId, quantity);
    setShowToast(true);
  };

  return (
    <>
    <button
      type="button"
      className={`btn-cart ${showToast ? "active" : ""}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleClick();
      }}
    >
      カートに入れる
    </button>
    </>
  );
};

export default CartButton;
