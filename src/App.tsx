import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";


const AuthLayout = React.lazy(()=>import('./layouts/AuthLayout'))

const Login = React.lazy(()=>import('./pages/Login'))
const SignUp = React.lazy(()=>import('./pages/SignUp'))

const MainLayout = React.lazy(()=>import('./layouts/MainLayout'))
const Home = React.lazy(()=>import('./pages/Home'))
const About = React.lazy(()=>import('./pages/About'))
const ProductDetails = React.lazy(()=>import('./pages/ProductDetails'))
const WomensCloths = React.lazy(()=>import('./pages/WomensCloths'))
const MensCloths = React.lazy(()=>import('./pages/MensCloths'))
const Cart = React.lazy(()=>import('./pages/Cart'))
const WishPage = React.lazy(()=>import('./pages/WishPage'))
const Electronics = React.lazy(()=>import('./pages/Electronics'))
const Jewellery = React.lazy(()=>import('./pages/Jewellery'))

const App = () => {
  const isUser = true; // 👈 change to true or false to test

  return (
    <>
      {/* <Header /> */}

      <Routes>
        {/* Protected Routes (MainLayout) */}
        <Route
          path="/"
          element={
            isUser ? <MainLayout /> : <Navigate to="/auth/login" replace />
          }
        >
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="fashion/mens-cloth" element={<MensCloths />} />
          <Route path="fashion/womens-cloth" element={<WomensCloths />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="wish" element={<WishPage />} />
          <Route path="electronics" element={<Electronics />} />
          <Route path="jewellery" element={<Jewellery />} />
          <Route path="about" element={<About />} />
        </Route>

        {/* Auth Routes */}
        <Route
          path="/auth"
          element={!isUser ? <AuthLayout /> : <Navigate to="/" replace />}
        >
          <Route index element={<Navigate to="login" />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

        {/* Catch-all redirect */}
        <Route
          path="*"
          element={<Navigate to={isUser ? "/home" : "/auth/login"} replace />}
        />
      </Routes>
    </>
  );
};

export default App;
