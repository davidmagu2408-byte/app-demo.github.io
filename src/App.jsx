import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, useLocation } from "react-router-dom";
import Header from "./Components/Header";
import { createContext, useCallback, useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Components/Footer";
import ProductModal from "./Components/ProductModal";
import { fetchDataFromAPI } from "./apis/api";
import api from "./apis/axiosConfig";
import AnimatedRoutes from "./Components/AnimatedRoutes";

const MyContext = createContext();

const normalizeApiPayload = (payload, aliases = []) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== "object") {
    return {};
  }

  const normalized = { ...payload };

  for (const alias of aliases) {
    if (!normalized[alias] && Array.isArray(payload[alias])) {
      normalized[alias] = payload[alias];
    }
  }

  const findFirstArray = (...keys) => {
    for (const key of keys) {
      const value = payload[key];
      if (Array.isArray(value)) {
        return value;
      }
    }
    return [];
  };

  const categoryList = findFirstArray("categoryList", "category");
  const subCategoryList = findFirstArray("subCategoryList", "subCategory");
  const productList = findFirstArray("productList", "product", "products");

  if (!normalized.categoryList && categoryList.length > 0) {
    normalized.categoryList = categoryList;
  }
  if (!normalized.category && categoryList.length > 0) {
    normalized.category = categoryList;
  }

  if (!normalized.subCategoryList && subCategoryList.length > 0) {
    normalized.subCategoryList = subCategoryList;
  }
  if (!normalized.subCategory && subCategoryList.length > 0) {
    normalized.subCategory = subCategoryList;
  }

  if (!normalized.productList && productList.length > 0) {
    normalized.productList = productList;
  }
  if (!normalized.product && productList.length > 0) {
    normalized.product = productList;
  }
  if (!normalized.products && productList.length > 0) {
    normalized.products = productList;
  }

  return normalized;
};

function AppContent() {
  const location = useLocation();
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
  }, [api, setUser, setAccessToken]);

  const getAvailableStock = (product) => {
    const stock = Number(product?.countInStock ?? product?.stock ?? 0);
    return Number.isFinite(stock) ? stock : 0;
  };

  const syncCart = useCallback((nextCart) => {
    setCartData(nextCart);
    localStorage.setItem("cart", JSON.stringify(nextCart));
  }, []);

  useEffect(() => {
    const handleCartSync = (event) => {
      const nextCart = Array.isArray(event.detail) ? event.detail : [];
      syncCart(nextCart);
    };

    window.addEventListener("cart:sync", handleCartSync);
    return () => window.removeEventListener("cart:sync", handleCartSync);
  }, [syncCart]);

  const addToCart = useCallback((product, qty = 1) => {
    setCartData((prev) => {
      const availableStock = getAvailableStock(product);
      const existing = prev.find((item) => item.productId === product.id);
      const currentQty = existing ? Number(existing.quantity) || 0 : 0;
      const allowedQty = Math.min(Number(qty) || 0, Math.max(0, availableStock - currentQty));

      if (allowedQty <= 0) {
        return prev;
      }

      let updated;
      if (existing) {
        updated = prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: currentQty + allowedQty }
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
            quantity: allowedQty,
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
      const currentItem = prev.find((item) => item.productId === productId);
      const stockLimit = Number(currentItem?.countInStock ?? 0);
      const maxQty = stockLimit > 0 ? stockLimit : 0;
      const nextQty = Math.min(Math.max(0, Number(qty) || 0), maxQty);

      const updated = prev.map((item) =>
        item.productId === productId ? { ...item, quantity: nextQty } : item,
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
    localStorage.removeItem("pendingMomoCart");
  }, []);

  useEffect(() => {
    fetchDataFromAPI("/category").then((data) =>
      setCategoryData(normalizeApiPayload(data, ["categoryList", "category"])),
    );
    fetchDataFromAPI("/subcategory").then((data) =>
      setSubcategoryData(normalizeApiPayload(data, ["subCategoryList", "subCategory"])),
    );
    fetchDataFromAPI("/product").then((data) =>
      setProductData(normalizeApiPayload(data, ["productList", "product", "products"])),
    );
    getCountry(import.meta.env.VITE_API_PROVINCES);

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
    await axios.get(url, { withCredentials: false }).then((res) => {
      setContryList(res.data);
    });
  };

  useEffect(() => {
    const hiddenPaths = ["/login", "/signUp"];
    setisOpenHeaderFooterShow(!hiddenPaths.includes(location.pathname));
  }, [location.pathname]);

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
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

export { MyContext };
