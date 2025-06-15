import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { removeFromWish } from "../features/productSlice";
import { FaTrash } from "react-icons/fa";

const WishPage = () => {
  const dispatch = useDispatch();
  const { wish } = useSelector((state: RootState) => state.products);
  const handleRemove = (id: number) => {
    dispatch(removeFromWish(id));
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Wishlist ({wish.length})</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {wish.map(({ id, title, image, price }) => (
          <div
            key={id}
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col items-center p-4 transition-transform hover:scale-105"
          >
            <img
              src={image}
              alt={title}
              className="w-32 h-32 object-contain mb-4 bg-gray-50 rounded"
            />
            <h2 className="text-lg font-medium text-gray-800 mb-2 line-clamp-1">
              {title}
            </h2>
            <p className="text-green-600 font-bold mb-4">${price}</p>
            <button
              onClick={() => handleRemove(id)}
              className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors text-sm"
            >
              <FaTrash /> Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishPage;
