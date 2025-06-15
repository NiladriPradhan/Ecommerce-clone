import { useDebounce } from "react-use";
import { Input } from "./ui/input";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { searchByName } from "../features/productSlice";
import { RxCross1 } from "react-icons/rx";

const SearchByInput = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<string>("");

  // Proper usage: pass a function to useDebounce
  useDebounce(
    () => {
      console.log("Dispatching search:", inputValue);
      dispatch(searchByName(inputValue)); // inputValue is always a string here
    },
    500,
    [inputValue]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <div className="relative w-[400px] mx-auto mb-4">
        <Input
          type="text"
          placeholder="Search Products..."
          value={inputValue}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        />
        {inputValue && (
          <RxCross1
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
            size={18}
            onClick={() => setInputValue("")}
          />
        )}
      </div>
    </>
  );
};

export default SearchByInput;
