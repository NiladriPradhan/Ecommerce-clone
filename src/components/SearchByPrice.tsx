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
    dispatch(searchByPrice(price));
    setSelectedPrices(price);
  };
  return (
    <>
      <div className="flex space-x-4 justify-center items-center">
        {/* <select onChange={handleChange}>
          <option value="">Select Price</option>
          <option value={100}>100</option>
          <option value={200}>200</option>
          <option value={300}>300</option>
          <option value={400}>400</option>
        </select> */}
        {/* <Button onClick={() => dispatch(fetchProducts())}>All</Button> */}

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
