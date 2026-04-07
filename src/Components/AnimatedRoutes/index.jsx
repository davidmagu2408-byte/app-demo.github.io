import { useLocation, Routes, Route } from "react-router-dom";
import { useEffect, useRef } from "react";
import Home from "../../Pages/Home";
import Listing from "../../Pages/Listing";
import ProductDetails from "../../Pages/ProductDetails";
import Cart from "../../Pages/Cart";
import Checkout from "../../Pages/Checkout";
import Orders from "../../Pages/Orders";
import OrderDetails from "../../Pages/OrderDetails";
import SignIn from "../../Pages/SignIn";
import SignUp from "../../Pages/SignUp";
import PaymentResult from "../../Pages/PaymentResult";
import BankingPayment from "../../Pages/BankingPayment";

const AnimatedRoutes = () => {
  const location = useLocation();
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      prevPath.current = location.pathname;
    }
  }, [location.pathname]);

  return (
    <div key={location.key} className="page-transition">
      <Routes location={location}>
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/cat/:id" exact={true} element={<Listing />} />
        <Route path="/product/:id" exact={true} element={<ProductDetails />} />
        <Route path="/cart" exact={true} element={<Cart />} />
        <Route path="/checkout" exact={true} element={<Checkout />} />
        <Route path="/orders" exact={true} element={<Orders />} />
        <Route path="/order/:id" exact={true} element={<OrderDetails />} />
        <Route
          path="/banking-payment/:id"
          exact={true}
          element={<BankingPayment />}
        />
        <Route
          path="/payment-result"
          exact={true}
          element={<PaymentResult />}
        />
        <Route path="/login" exact={true} element={<SignIn />} />
        <Route path="/signUp" exact={true} element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default AnimatedRoutes;
