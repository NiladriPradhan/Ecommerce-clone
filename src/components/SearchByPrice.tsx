import { Button } from "./ui/button";
import { searchByPrice } from "../features/productSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const SearchByPrice = () => {
  const dispatch = useDispatch();
  const [selectedPrice, setSelectedPrices] = useState<number | string>("All");

  //   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //     const value = e.target.value;
  //     console.log(value);
  //   };

  const handlePrice = (price: number | string) => {
    dispatch(searchByPrice(Number(price)));
    setSelectedPrices(price);
  };
  return (
    <>
      <div className="flex space-x-4 justify-center items-center">
       

        {["All", 100, 200, 300].map((price) => (
          <Button
            key={price}
            onClick={() => handlePrice(price)}
            variant={selectedPrice === price ? "default" : "secondary"}
          >
            {price}
          </Button>
        ))}
      </div>
    </>
  );
};

export default SearchByPrice;
