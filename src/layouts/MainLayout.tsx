import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <>
      <div className="justify-center items-center flex flex-col">
        <Header />
        <div className="container mx-auto py-8">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
