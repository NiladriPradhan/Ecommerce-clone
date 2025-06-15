import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "../components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../features/productSlice";
import type { RootState } from "../store/store";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const cart = useSelector((state: RootState) => state.products.cart);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setData(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleCart = (id: number) => {
    dispatch(addToCart(id));
  };

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const isInCart = cart.some((item) => item.id === Number(id));

  if (loading) return <h1>Loading...</h1>;
  if (!data) return <h1>Product Not Found</h1>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="shadow-lg flex flex-col md:flex-row">
        {/* Left Side: Image */}
        <div className="w-full md:w-1/2 p-4 flex justify-center items-center">
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-64 object-contain"
          />
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-1/2 p-4 flex flex-col justify-between">
          <CardContent className="p-0">
            <CardTitle className="text-2xl mb-2">{data.title}</CardTitle>
            <p className="text-gray-600 mb-4">${data.price}</p>
            <p className="text-gray-700">{data.description}</p>
          </CardContent>

          <CardFooter className="mt-4 p-0">
            {isInCart ? (
              <button
                onClick={() => handleRemoveFromCart(data.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md w-full text-center text-sm font-medium transition-colors duration-200"
              >
                Remove From Cart
              </button>
            ) : (
              <button
                onClick={() => handleCart(data.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full text-center text-sm font-medium transition-colors duration-200"
              >
                Add To Cart
              </button>
            )}
          </CardFooter>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetails;
