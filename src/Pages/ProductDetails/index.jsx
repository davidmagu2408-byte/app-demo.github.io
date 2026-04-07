import ProductZoom from "../../Components/ProductZoom";
import ProductItem from "../../Components/ProductItem";
import Rating from "@mui/material/Rating";
import QuantityBox from "../../Components/QuantityBox";
import Button from "@mui/material/Button";
import { FaHeart } from "react-icons/fa";
import { MdCompareArrows } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../../App";
import { fetchDataFromAPI } from "../../apis/api";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

const formatVND = (n) =>
  n?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const ProductDetails = () => {
  const { id } = useParams();
  const context = useContext(MyContext);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeTabs, setactiveTabs] = useState(0);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setQty(1);
    fetchDataFromAPI(`/product/${id}`)
      .then((data) => {
        if (data.success) {
          setProduct(data.product);
          // Fetch related products by same category
          fetchDataFromAPI(
            `/product/category/${data.product.category._id || data.product.category}`,
          )
            .then((catData) => {
              if (catData.success) {
                setRelatedProducts(
                  catData.products.filter((p) => p._id !== id).slice(0, 8),
                );
              }
            })
            .catch(() => {});
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <section className="productDetails section">
        <div className="container text-center py-5">
          <p>Đang tải...</p>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="productDetails section">
        <div className="container text-center py-5">
          <h4>Không tìm thấy sản phẩm</h4>
        </div>
      </section>
    );
  }

  const handleAddToCart = () => {
    if (!context.user) {
      toast.error("Vui lòng đăng nhập để thêm vào giỏ hàng");
      return;
    }
    context.addToCart(product, qty);
    toast.success("Đã thêm vào giỏ hàng");
  };

  return (
    <section className="productDetails section">
      <div className="container">
        <div className="row">
          {/* Product images */}
          <div className="col-md-4 ps-5 part1">
            <ProductZoom value={product.images} discount={product.discount} />
          </div>

          {/* Product info */}
          <div className="col-md-7 ps-5 pe-5 part2">
            <h2 className="hd text-capitalize">{product.name}</h2>
            <ul className="list list-inline d-flex align-items-center">
              <li className="list-inline-item">
                <div className="d-flex align-items-center">
                  <span className="text-light me-2">Nhãn hàng:</span>
                  <span>
                    <b>{product.brand?.name || "—"}</b>
                  </span>
                </div>
              </li>
              <li className="list-inline-item">
                <div className="d-flex align-items-center">
                  <Rating
                    className="ms-4"
                    name="read-only"
                    value={product.rating}
                    readOnly
                    size="small"
                    precision={0.5}
                  />
                  <span className="text-light cursor ms-2">
                    {product.numReviews} Đánh giá
                  </span>
                </div>
              </li>
            </ul>

            <div className="d-flex info align-items-center mb-3">
              <span className="oldPrice lg me-3">
                {formatVND(product.oldPrice)}
              </span>
              <span className="newPrice text-danger lg">
                {formatVND(product.price)}
              </span>
            </div>

            {product.countInStock > 0 ? (
              <span className="badge bg-success">Còn hàng</span>
            ) : (
              <span className="badge bg-danger">Hết hàng</span>
            )}

            <p className="mt-3">{product.description}</p>

            {product.category?.name && (
              <div className="d-flex align-items-center mb-2">
                <span className="text-light me-2">Danh mục:</span>
                <span>
                  <b>{product.category.name}</b>
                </span>
              </div>
            )}
            {product.subcategory?.name && (
              <div className="d-flex align-items-center mb-2">
                <span className="text-light me-2">Danh mục phụ:</span>
                <span>
                  <b>{product.subcategory.name}</b>
                </span>
              </div>
            )}

            <div className="d-flex align-items-center mt-3 actions_">
              {product.countInStock > 0 ? (
                <>
                  <QuantityBox
                    value={qty}
                    onChange={setQty}
                    max={product.countInStock}
                  />
                  <Button
                    className="btn-blue btn-lg btn-big btn-round me-3"
                    onClick={handleAddToCart}
                  >
                    Thêm vào giỏ
                  </Button>
                </>
              ) : (
                <Button
                  className="btn-blue btn-lg btn-big btn-round me-3"
                  disabled
                >
                  Hết hàng
                </Button>
              )}
              <Button
                className="btn-round btn-circle btn-sml me-3"
                variant="outlined"
              >
                <FaHeart />
              </Button>
              <Button
                className="btn-round btn-circle btn-sml"
                variant="outlined"
              >
                <MdCompareArrows />
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="card mt-5 p-5 detailsPageTabs">
            <div className="customTabs">
              <ul className="list list-inline">
                <li className="list-inline-item">
                  <Button
                    className={`${activeTabs === 0 && "active"}`}
                    onClick={() => setactiveTabs(0)}
                  >
                    Mô tả
                  </Button>
                </li>
                <li className="list-inline-item">
                  <Button
                    className={`${activeTabs === 1 && "active"}`}
                    onClick={() => setactiveTabs(1)}
                  >
                    Thông tin thêm
                  </Button>
                </li>
                <li className="list-inline-item">
                  <Button
                    className={`${activeTabs === 2 && "active"}`}
                    onClick={() => setactiveTabs(2)}
                  >
                    Đánh giá ({product.numReviews})
                  </Button>
                </li>
              </ul>
              <br />
              {activeTabs === 0 && (
                <div className="tabContent">
                  <p>{product.description}</p>
                </div>
              )}
              {activeTabs === 1 && (
                <div className="tabContent">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <th>Nhãn hàng</th>
                          <td>{product.brand?.name || "—"}</td>
                        </tr>
                        <tr>
                          <th>Danh mục</th>
                          <td>{product.category?.name || "—"}</td>
                        </tr>
                        <tr>
                          <th>Danh mục phụ</th>
                          <td>{product.subcategory?.name || "—"}</td>
                        </tr>
                        <tr>
                          <th>Tồn kho</th>
                          <td>{product.countInStock}</td>
                        </tr>
                        <tr>
                          <th>Đánh giá</th>
                          <td>{product.rating} / 5</td>
                        </tr>
                        {product.discount > 0 && (
                          <tr>
                            <th>Giảm giá</th>
                            <td>{product.discount}%</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {activeTabs === 2 && (
                <div className="tabContent">
                  <p className="text-light">Chưa có đánh giá nào.</p>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="relatedProducts mt-5">
              <h3 className="hd mb-4">Sản phẩm liên quan</h3>
              <Swiper
                slidesPerView={4}
                spaceBetween={20}
                navigation={true}
                modules={[Navigation]}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  480: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                }}
                className="relatedSwiper"
              >
                {relatedProducts.map((item) => (
                  <SwiperSlide key={item._id}>
                    <ProductItem item={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
