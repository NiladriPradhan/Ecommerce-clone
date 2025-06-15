import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { useEffect, useState } from "react";
import { addToCart, fetchProducts } from "../features/productSlice";
import { useNavigate } from "react-router-dom";

const WomensCloths = () => {
  const dispatch = useDispatch<AppDispatch>(); 
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<number[]>([]);

  const { data } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredData = data.filter((p) => p.category === "women's clothing");

  const handleCart = (id: number) => {
    if (cartItems.includes(id)) {
      navigate("/cart");
    } else {
      dispatch(addToCart(id));
      setCartItems((prev) => [...prev, id]);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center my-6">Women's Fashion</h1>

      {filteredData.length === 0 ? (
        <h1 className="text-center text-lg text-red-500">Data not found</h1>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {filteredData.map((item) => {
            const isAdded = cartItems.includes(item.id);

            return (
              <div
                key={item.id}
                className="border rounded-xl p-4 shadow-md hover:shadow-xl transition-all bg-white flex flex-col items-center text-center"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-32 h-32 object-contain mb-4"
                />
                <p className="font-medium text-gray-800 mb-2">{item.title}</p>
                <p className="text-sm text-gray-600 mb-2">${item.price}</p>
                <button
                  onClick={() => handleCart(item.id)}
                  className={`mt-auto px-4 py-2 rounded transition text-white 
                    ${
                      isAdded
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                  {isAdded ? "Added" : "Add to Cart"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default WomensCloths;
