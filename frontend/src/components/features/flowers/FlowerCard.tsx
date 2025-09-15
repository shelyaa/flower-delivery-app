import toast from "react-hot-toast";
import {addToCart} from "../../../store/slices/cartSlice";
import type {Flower} from "../../../types/Flower";
import {useDispatch} from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {toggleFavorite} from "../../../api/flowers";

type FlowerCardProps = {
  flower: Flower;
  onFavoriteToggle: () => void;
};

export const FlowerCard = ({flower, onFavoriteToggle}: FlowerCardProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: flower.id,
        name: flower.name,
        price: flower.price,
        image_url: flower.image_url,
      })
    );
    toast.success("Item added to cart!");
  };

  const handleToggleFavorite = async () => {
    try {
      await toggleFavorite(flower.id);
      onFavoriteToggle();
      toast.success(
        flower.is_favorite ? "Removed from favorites!" : "Added to favorites!"
      );
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col">
      <div className="relative group">
        <img
          src={flower.image_url}
          alt={flower.name}
          className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          onClick={handleToggleFavorite}
          className="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full p-1 shadow transition"
          aria-label="Toggle favorite"
        >
          {flower.is_favorite ? (
            <FavoriteIcon fontSize="medium" color="error" />
          ) : (
            <FavoriteBorderIcon fontSize="medium" />
          )}
        </button>
      </div>
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <h3 className="text-medium text-gray-900 truncate">
            {flower.name}
          </h3>
          <p className="font-bold text-gray-900 mt-1">
            ${flower.price}
          </p>
        </div>
        <button
          className="mt-3 w-full border-black border hover:border-main hover:text-white text-black rounded-md px-4 py-2 transition-colors hover:bg-main active:scale-[.98]"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};
