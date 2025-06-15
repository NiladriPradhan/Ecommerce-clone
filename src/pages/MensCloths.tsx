import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { useEffect, useState } from "react";
import { addToCart, fetchProducts } from "../features/productSlice";
import { useNavigate } from "react-router-dom";

const MensCloths = () => {
  const dispatch = useDispatch<AppDispatch>(); 
  const navigate = useNavigate();
  const { data } = useSelector((state: RootState) => state.products);

  const [clickedItems, setClickedItems] = useState<number[]>([]);

  const mensFashion = data.filter((item) => item.category === "men's clothing");

  useEffect(() => {
    dispatch(fetchProducts()); 
  }, [dispatch]);

  const handleCart = (id: number) => {
    if (clickedItems.includes(id)) {
      navigate("/cart");
    } else {
      dispatch(addToCart(id));
      setClickedItems((prev) => [...prev, id]);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center my-6">Men's Fashion</h1>

      {mensFashion.length === 0 ? (
        <h1 className="text-center text-lg text-red-500">Data not found</h1>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {mensFashion.map((item) => (
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
                className="mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                {clickedItems.includes(item.id) ? "Go to Cart" : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MensCloths;
