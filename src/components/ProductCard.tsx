import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { FaHeart } from "react-icons/fa"; // Filled heart
import { CiHeart } from "react-icons/ci"; // Outline heart
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWish, removeFromWish } from "../features/productSlice";
import type { RootState } from "../store/store";

interface ProductParams {
  id: number;
  image: string;
  title: string;
  description: string;
  category: string;
  price: number;
}

const ProductCard = ({
  id,
  image,
  title,
  description,
  price,
}: ProductParams) => {
  const { wish } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch();

  const [showish, setShowish] = useState<boolean>(false);

  const handleWishToggle = (id: number) => {
    const isInWish = wish.some((item) => item.id === id);
    if (isInWish) {
      dispatch(removeFromWish(id));
    } else {
      dispatch(addToWish(id));
    }
    setShowish(!showish);
  };

  const truncateDescription = (str: string, len = 30) => {
    return str.length > len ? str.slice(0, len) + "..." : str;
  };

  return (
    <Card className="shadow-lg rounded-2xl overflow-hidden h-auto w-[270px] mx-auto flex flex-col bg-white relative group">
      <CardHeader className="p-0 relative">
        {/* Wishlist Icon (appears on hover) */}
        <button
          onClick={() => handleWishToggle(id)}
          className="absolute top-0 right-2 bg-white p-1 rounded-full shadow opacity-0 group-hover:opacity-100 z-10"
        >
          {showish ? (
            <FaHeart className="size-5 text-red-500" /> // Filled red heart when clicked
          ) : (
            <CiHeart className="size-6 text-gray-600" /> // Outline gray heart when not clicked
          )}
        </button>

        <img
          src={image}
          alt={title}
          className="w-full object-contain aspect-video bg-gray-50"
        />
      </CardHeader>

      <CardContent className="flex-1 flex flex-col px-4 pt-3 pb-2">
        <h2 className="text-base font-semibold text-gray-800 line-clamp-1 mb-1">
          {title}
        </h2>

        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
          {truncateDescription(description)}
        </p>

        <p className="text-lg font-bold text-green-600 mb-3">${price}</p>

        <div className="flex items-center gap-1 mt-auto">
          <span className="text-yellow-500 text-sm">⭐</span>
          <span className="text-yellow-500 text-sm">⭐</span>
          <span className="text-yellow-500 text-sm">⭐</span>
          <span className="text-yellow-500 text-sm">⭐</span>
          <span className="text-gray-400 text-sm">☆</span>
          <span className="text-sm text-gray-500 ml-2">(120 reviews)</span>
        </div>
      </CardContent>

      <CardFooter className="px-4 pb-4">
        <Link
          to={`/products/${id}`}
          className="bg-blue-600 text-center hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full text-sm font-medium transition-colors duration-200"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
