import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Components/Footer";
import ProductModal from "./Components/ProductModal";
import Listing from "./Pages/Listing";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { fetchDataFromAPI } from "./apis/api";

const MyContext = createContext();

function App() {
  const [countryList, setContryList] = useState([]);
  const [selectedCountry, setselectedCountry] = useState("");
  const [isOpenProductModal, setisOpenProductModal] = useState({
    id: "",
    open: false,
  });
  const [isOpenHeaderFooterShow, setisOpenHeaderFooterShow] = useState(true);
  const [categoryData, setCategoryData] = useState([]);
  const [subcategoryData, setSubcategoryData] = useState([]);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    fetchDataFromAPI("/category").then((data) => setCategoryData(data));
    fetchDataFromAPI("/subcategory").then((data) => setSubcategoryData(data));
    fetchDataFromAPI("/product").then((data) => setProductData(data));
    getCountry("https://provinces.open-api.vn/api/v2");
  }, []);

  const getCountry = async (url) => {
    await axios.get(url).then((res) => {
      setContryList(res.data);
    });
  };
  const values = {
    countryList,
    selectedCountry,
    setselectedCountry,
    isOpenProductModal,
    setisOpenProductModal,
    isOpenHeaderFooterShow,
    setisOpenHeaderFooterShow,
    categoryData,
    subcategoryData,
    productData,
    setCategoryData,
    setSubcategoryData,
    setProductData,
  };

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        {isOpenHeaderFooterShow === true && <Header />}
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/cat/:id" exact={true} element={<Listing />} />
          <Route
            path="/product/:id"
            exact={true}
            element={<ProductDetails />}
          />
          <Route path="/cart" exact={true} element={<Cart />} />
          <Route path="/checkout" exact={true} element={<Checkout />} />
          <Route path="/login" exact={true} element={<SignIn />} />
          <Route path="/signUp" exact={true} element={<SignUp />} />
        </Routes>
        {isOpenHeaderFooterShow === true && <Footer />}

        {isOpenProductModal.open === true && <ProductModal />}
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;

export { MyContext };
