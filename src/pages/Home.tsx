import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { fetchProducts } from "../features/productSlice";
import ProductCard from "../components/ProductCard";
import SearchByPrice from "../components/SearchByPrice";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, data, filteredData, isError } = useSelector(
    (state: RootState) => state.products
  );
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error loading products</h1>;

  return (
    <>
      <div className="flex flex-wrap justify-center gap-6 px-4 py-8 mx-auto max-w-[1200px]">

        <div className="w-full flex justify-center mb-6">
          <SearchByPrice />
        </div>

        {filteredData.map((product) => {
          const { id, image, title, description, category, price } = product;
          return (
            <div key={id} className="w-full sm:w-1/2 md:w-1/3 lg:w-[270px]">
              <ProductCard
                id={id}
                image={image}
                title={title}
                description={description}
                category={category}
                price={price}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
