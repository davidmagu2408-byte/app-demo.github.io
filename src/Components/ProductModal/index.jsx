import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { IoIosClose } from "react-icons/io";
import Rating from "@mui/material/Rating";
import { useContext, useEffect, useState } from "react";
import QuantityBox from "../QuantityBox";
import { FaHeart } from "react-icons/fa";
import { MdCompareArrows } from "react-icons/md";
import { MyContext } from "../../App";
import ProductZoom from "../ProductZoom";
import { fetchProductById } from "../../apis/api";
import toast from "react-hot-toast";

const ProductModal = () => {
  const context = useContext(MyContext);
  if (!context.isOpenProductModal.id) return null;
  const id = context.isOpenProductModal.id;

  const [product, setProduct] = useState([]);
  const [qty, setQty] = useState(1);
  useEffect(() => {
    fetchProductById(id).then((data) => setProduct(data));
    setQty(1);
  }, []);
  console.log("data", product);

  if (!product.data) return null;

  return (
    <>
      <Dialog
        open={true}
        className="productModal"
        onClose={() => context.setisOpenProductModal({ id: "", open: false })}
      >
        <Button
          className="close_"
          onClick={() =>
            context.setisOpenProductModal({
              id: "",
              open: false,
            })
          }
        >
          <IoIosClose />
        </Button>
        <h4 className="mb-1 font-weight-bold">{product.data.name}</h4>
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center me-4">
            <span>Nhãn hàng:</span>
            <span className="ms-2">
              <b>{product.data.brand.name}</b>
            </span>
          </div>
          <Rating
            className="ms-4"
            name="read-only"
            value={product.data.rating}
            readOnly
            size="small"
            precision={0.5}
          />
        </div>
        <hr />
        <div className="row mt-2 productDetailsModal">
          <div className="col-md-5">
            <ProductZoom
              value={product.data.images}
              discount={product.data.discount}
            />
          </div>
          <div className="col-md-7">
            <div className="d-flex info align-items-center">
              <span className="oldPrice lg me-3">
                {product.data.oldPrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
              <span className="newPrice text-danger lg">
                {product.data.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
            <span className="badge bg-success">
              {product.data.countInStock === 0 ? "Out of Stock" : "In Stock"}
            </span>
            <p className="mt-3">{product.data.description}</p>
            {/* <div className="productSize d-flex align-items-center">
              <span>Size:</span>
              <ul className="list list-inline mb-0 ps-4 false">
                <li className="list-inline-item">
                  <a className="tag" href="/">
                    S
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="tag" href="/">
                    M
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="tag" href="/">
                    L
                  </a>
                </li>
              </ul>
            </div> */}
            <div className="d-flex align-items-center actions_">
              {product.data.countInStock === 0 ? (
                <Button className="btn-blue btn-lg btn-big btn-round" disabled>
                  Hết hàng
                </Button>
              ) : (
                <>
                  <QuantityBox value={qty} onChange={setQty} max={product.data.countInStock} />
                  <Button
                    className="btn-blue btn-lg btn-big btn-round"
                    onClick={() => {
                      context.addToCart(product.data, qty);
                      toast.success("Đã thêm vào giỏ hàng");
                      context.setisOpenProductModal({ id: "", open: false });
                    }}
                  >
                    Thêm vào giỏ
                  </Button>
                </>
              )}
            </div>
            <div className="d-flex align-items-center mt-5 actions">
              <Button className="btn-round btn-sml" variant="outlined">
                <FaHeart />
                &nbsp; ADD TO WISHLIST
              </Button>
              <Button className="btn-round btn-sml" variant="outlined">
                <MdCompareArrows />
                &nbsp; COMPARE
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ProductModal;
