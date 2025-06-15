import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  fetchProducts,
  removeFromCart,
} from "../features/productSlice";
import type { RootState, AppDispatch } from "../store/store";
import { Link } from "react-router-dom";

const Electronics = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, isError, cart } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const cat = [...new Set(data.map((p) => p.category))];
  console.log(cat);

  const jeweleryProducts = data.filter(
    (product) => product.category.toLowerCase() === "jewelery"
  );

  const handleCartToggle = (id: number) => {
    const isInCart = cart.some((item) => item.id === id);
    if (isInCart) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(addToCart(id));
    }
  };

  if (isLoading)
    return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500 text-lg">
        Error loading products.
      </p>
    );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Electronics Products
      </h2>
      {jeweleryProducts.length === 0 ? (
        <p className="text-center text-gray-500">
          No electronics products found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {jeweleryProducts.map((product) => {
            const isInCart = cart.some((item) => item.id === product.id);

            return (
              <div
                key={product.id}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center hover:scale-105 transform transition duration-300 ease-in-out"
              >
                <Link
                  to={`/products/${product.id}`}
                  className="w-full flex flex-col items-center"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-32 h-32 object-contain mb-4"
                  />
                  <h3 className="text-lg font-semibold text-center mb-2">
                    {product.title.length > 40
                      ? product.title.slice(0, 40) + "..."
                      : product.title}
                  </h3>
                  <p className="text-gray-800 font-bold text-lg mb-4">
                    ${product.price}
                  </p>
                </Link>

                <Link
                  to={`/products/${product.id}`}
                  className={`mt-auto px-4 py-2 rounded bg-blue-500 text-white text-sm font-medium `}
                >
                  View Details
                </Link>
                {/* <button
                  onClick={() => handleCartToggle(product.id)}
                  className={`mt-auto px-4 py-2 rounded text-white text-sm font-medium ${
                    isInCart
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  } transition-colors duration-200`}
                >
                  {isInCart ? "Remove From Cart" : "Add To Cart"}
                </button> */}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Electronics;
