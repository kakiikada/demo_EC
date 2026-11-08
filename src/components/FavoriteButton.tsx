import { useFavorites } from "../context/FavoriteContext";

interface FavoriteButtonProps {
  productId: string;
  variant?: "default" | "compact" | "icon";
}

const FavoriteButton = ({
  productId,
  variant = "default",
 }: FavoriteButtonProps) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const active = isFavorite(productId);

  return (
    <button
      type="button"
      className={`btn-favo-${variant} ${
        active ? "active" : ""
      }`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(productId)
      }}
      aria-pressed={active}
      aria-label={active ? "お気に入りを解除" : "お気に入りに追加"}
    >
    {variant === "icon"
      ? active ? "" : ""
      : active ? "お気に入り解除" : "お気に入り登録"
    }
    </button>
  );
};

export default FavoriteButton;