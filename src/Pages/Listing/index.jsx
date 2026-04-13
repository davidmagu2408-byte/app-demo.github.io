import SideBar from "../../Components/SideBar";
import Button from "@mui/material/Button";
import { IoIosMenu } from "react-icons/io";
import { BiSolidGrid } from "react-icons/bi";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProductItem from "../../Components/ProductItem";
import Pagination from "@mui/material/Pagination";
import { fetchDataFromAPI } from "../../apis/api";
import { MyContext } from "../../App";

const Listing = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const subCatId = searchParams.get("subCat");
  const context = useContext(MyContext);

  const [productView, setproductView] = useState("four");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [priceRange, setPriceRange] = useState(null);
  const perPage = 12;

  // Find current category/subcategory names
  const categoryData = context.categoryData;
  const subcategoryData = context.subcategoryData;
  const currentCat = categoryData?.category?.find(
    (c) => c._id === id || c.id === id,
  );
  const currentSubCat = subCatId
    ? subcategoryData?.subCategory?.find(
        (s) => s._id === subCatId || s.id === subCatId,
      )
    : null;

  useEffect(() => {
    setLoading(true);
    setPage(1);
    setPriceRange(null);
    const endpoint = subCatId
      ? `/product/subcategory/${subCatId}`
      : `/product/category/${id}`;
    fetchDataFromAPI(endpoint)
      .then((data) => {
        if (data?.success) {
          setProducts(data.products);
          setFilteredProducts(data.products);
        } else {
          setProducts([]);
          setFilteredProducts([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setFilteredProducts([]);
        setLoading(false);
      });
  }, [id, subCatId]);

  const handlePriceFilter = (min, max) => {
    setPriceRange([min, max]);
    setPage(1);
    const filtered = products.filter((p) => p.price >= min && p.price <= max);
    setFilteredProducts(filtered);
  };

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / perPage));
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * perPage,
    page * perPage,
  );

  return (
    <>
      <section className="product_Listing_Page">
        <div className="container">
          <div className="productListing d-flex">
            <SideBar
              categoryId={id}
              subCatId={subCatId}
              onPriceFilter={handlePriceFilter}
            />
            <div className="content_right">
              <div className="showBy mt-0 mb-3 d-flex align-items-center">
                <div className="d-flex align-items-center btnWrapper">
                  <Button
                    className={productView === "one" ? "act" : ""}
                    onClick={() => setproductView("one")}
                  >
                    <IoIosMenu />
                  </Button>
                  <Button
                    className={productView === "three" ? "act" : ""}
                    onClick={() => setproductView("three")}
                  >
                    <BiSolidGrid />
                  </Button>
                  <Button
                    className={productView === "four" ? "act" : ""}
                    onClick={() => setproductView("four")}
                  >
                    <TfiLayoutGrid4Alt />
                  </Button>
                </div>
                <div className="ms-auto">
                  <h6 className="mb-0">
                    {currentSubCat
                      ? currentSubCat.name
                      : currentCat?.name || "Sản phẩm"}
                    <span className="productCountText ms-2">
                      ({filteredProducts.length} sản phẩm)
                    </span>
                  </h6>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-5">
                  <p>Đang tải...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-5">
                  <h5>Không có sản phẩm nào</h5>
                </div>
              ) : (
                <>
                  <div
                    className={`productListing ${
                      productView === "one"
                        ? "list"
                        : productView === "three"
                          ? "three"
                          : ""
                    }`}
                  >
                    {paginatedProducts.map((item) => (
                      <ProductItem
                        key={item._id}
                        item={item}
                        itemView={productView}
                      />
                    ))}
                  </div>
                  {totalPages > 1 && (
                    <div className="d-flex align-items-center justify-content-center mt-3">
                      <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(_, v) => {
                          setPage(v);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        color="primary"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Listing;
