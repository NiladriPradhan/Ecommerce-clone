import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { removeFromCart } from "../features/productSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.products.cart);

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  if (cart.length === 0) return <h1>No Item in Cart</h1>;

  return (
    <>
      <div className=" justify-center flex mx-auto items-center">
        <div className="flex flex-wrap justify-center gap-2 px-4">
          {cart.map((product) => {
            const { id, image, title, price, description } = product;
            return (
              <Card
                key={id}
                className="w-full flex-col sm:w-[45%] lg:w-[40%] flex justify-between rounded-xl shadow-md p-4"
              >
                <CardContent className="flex p-0 space-x-4">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-40 object-contain"
                  />
                  <div className="flex flex-col">
                    <CardTitle className="text-lg font-semibold">
                      {title}
                    </CardTitle>
                    <p className="text-primary font-medium">${price}</p>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {description}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="">
                  <Button
                    variant="destructive"
                    onClick={() => handleRemove(id)}
                    className="w-full"
                  >
                    Remove
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Cart;
