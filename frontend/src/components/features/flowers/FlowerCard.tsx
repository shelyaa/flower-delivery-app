import toast from "react-hot-toast";
import { addToCart } from "../../../store/slices/cartSlice";
import type { Flower } from "../../../types/Flower";
import { useDispatch } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { toggleFavorite } from "../../../api/flowers";

type FlowerCardProps = {
  flower: Flower;
  onFavoriteToggle: () => void;
};

export const FlowerCard = ({ flower, onFavoriteToggle }: FlowerCardProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: flower.id,
        name: flower.name,
        price: flower.price,
        image_url: flower.image_url,
      }),
    );
    toast.success("Item added to cart!");
  };

  const handleToggleFavorite = async () => {
    try {
      await toggleFavorite(flower.id);

      onFavoriteToggle();

      toast.success(
        flower.is_favorite ? "Removed from favorites!" : "Added to favorites!",
      );
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  return (
    <div className="rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 p-6 cursor-pointer">
      <img
        src={flower.image_url}
        alt={flower.name}
        className="w-full h-48 object-cover"
      />
      <div className="pt-8 flex flex-col items-center">
        <div className="flex justify-between w-full gap-6">
          <h3>{flower.name}</h3>
          <p>${flower.price}</p>
        </div>
        <div className="flex gap-12">
          <button
            className="border border-black rounded-md px-4 py-2 mt-4 transition-colors hover:bg-[#535bf2] hover:text-white hover:border-white"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
          <button onClick={handleToggleFavorite} className="pt-4 ">
            {flower.is_favorite ? (
              <FavoriteIcon fontSize="medium" color="error" />
            ) : (
              <FavoriteBorderIcon fontSize="medium" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
