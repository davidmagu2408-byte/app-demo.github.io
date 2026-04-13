import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductItem from "../../Components/ProductItem";
import Pagination from "@mui/material/Pagination";
import { fetchDataFromAPI } from "../../apis/api";

const Search = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 12;

  useEffect(() => {
    if (!q.trim()) {
      setProducts([]);
      return;
    }
    setLoading(true);
    setPage(1);
    fetchDataFromAPI(`/product/search?q=${encodeURIComponent(q)}`)
      .then((data) => {
        if (data?.success) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setLoading(false);
      });
  }, [q]);

  const totalPages = Math.max(1, Math.ceil(products.length / perPage));
  const paginatedProducts = products.slice(
    (page - 1) * perPage,
    page * perPage,
  );

  return (
    <section className="product_Listing_Page searchPage">
      <div className="container">
        <div className="py-4">
          <h3 className="hd mb-1">Kết quả tìm kiếm cho "{q}"</h3>
          <p className="searchResultCount mb-4">
            {products.length} sản phẩm được tìm thấy
          </p>

          {loading ? (
            <div className="text-center py-5">
              <p>Đang tìm kiếm...</p>
            </div>
          ) : !q.trim() ? (
            <div className="searchEmpty">
              <h5>Vui lòng nhập từ khóa tìm kiếm</h5>
            </div>
          ) : products.length === 0 ? (
            <div className="searchEmpty">
              <h5>Không tìm thấy sản phẩm nào</h5>
              <p>Thử tìm kiếm với từ khóa khác</p>
            </div>
          ) : (
            <>
              <div className="productListing">
                {paginatedProducts.map((item) => (
                  <ProductItem key={item._id} item={item} />
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
    </section>
  );
};

export default Search;
