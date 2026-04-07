import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./Components/Header";
import { createContext, useCallback, useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Components/Footer";
import ProductModal from "./Components/ProductModal";
import { fetchDataFromAPI } from "./apis/api";
import api from "./apis/axiosConfig";
import AnimatedRoutes from "./Components/AnimatedRoutes";

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
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cartData, setCartData] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const handleLogout = useCallback(async () => {
    try {
      await api.post("/user/logout");
    } catch (_) {
      // Ignore errors, proceed with local cleanup
    }
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
  }, []);

  const addToCart = useCallback((product, qty = 1) => {
    setCartData((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      let updated;
      if (existing) {
        updated = prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item,
        );
      } else {
        updated = [
          ...prev,
          {
            productId: product.id,
            name: product.name,
            image: product.images[0],
            price: product.price,
            oldPrice: product.oldPrice,
            quantity: qty,
            countInStock: product.countInStock,
          },
        ];
      }
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateCartQty = useCallback((productId, qty) => {
    setCartData((prev) => {
      const updated = prev.map((item) =>
        item.productId === productId ? { ...item, quantity: qty } : item,
      );
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartData((prev) => {
      const updated = prev.filter((item) => item.productId !== productId);
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartData([]);
    localStorage.removeItem("cart");
  }, []);

  useEffect(() => {
    fetchDataFromAPI("/category").then((data) => setCategoryData(data));
    fetchDataFromAPI("/subcategory").then((data) => setSubcategoryData(data));
    fetchDataFromAPI("/product").then((data) => setProductData(data));
    getCountry("https://provinces.open-api.vn/api/v2");

    // Restore session
    const initAuth = async () => {
      try {
        const { data } = await api.get("/user/refresh-token");
        if (data?.accessToken) {
          setAccessToken(data.accessToken);
          localStorage.setItem("accessToken", data.accessToken);
          const profileRes = await api.get("/user/profile", {
            headers: { Authorization: `Bearer ${data.accessToken}` },
          });
          if (profileRes.data.success) {
            setUser(profileRes.data.user);
          }
        }
      } catch (_) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userData");
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
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
    user,
    setUser,
    accessToken,
    setAccessToken,
    handleLogout,
    isLoading,
    cartData,
    addToCart,
    updateCartQty,
    removeFromCart,
    clearCart,
  };

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        <div
          className={`header-footer-wrapper ${isOpenHeaderFooterShow ? "visible" : "hidden"}`}
        >
          <Header />
        </div>
        <AnimatedRoutes />
        <div
          className={`header-footer-wrapper ${isOpenHeaderFooterShow ? "visible" : "hidden"}`}
        >
          <Footer />
        </div>

        {isOpenProductModal.open === true && <ProductModal />}
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;

export { MyContext };
