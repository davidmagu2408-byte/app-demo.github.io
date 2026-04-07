import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { TfiFullscreen } from "react-icons/tfi";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import toast from "react-hot-toast";

const ProductItem = (props) => {
  const context = useContext(MyContext);
  if (!props.item) return null;
  const viewProductDetails = (id) => {
    context.setisOpenProductModal({
      id: id,
      open: true,
    });
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!context.user) {
      toast.error("Vui lòng đăng nhập để thêm vào giỏ hàng");
      return;
    }
    if (props.item.countInStock === 0) {
      toast.error("Sản phẩm đã hết hàng");
      return;
    }
    context.addToCart(props.item);
    toast.success("Đã thêm vào giỏ hàng");
  };

  return (
    <>
      <div className="productItem">
        <Link
          to={`/product/${props.item._id || props.item.id}`}
          className="img_wrapper d-block"
        >
          <img src={props.item.images[0]} className="w-100" alt="product" />
          <span className="badge badge-primary">{props.item.discount}%</span>
          <div className="actions">
            <Button
              className="zoom"
              onClick={() => viewProductDetails(props.item.id)}
            >
              <TfiFullscreen />
            </Button>
            <Button className="favorite">
              <IoMdHeartEmpty />
            </Button>
            <Button
              className="addToCartBtn"
              onClick={handleAddToCart}
              disabled={props.item.countInStock === 0}
            >
              <IoCartOutline />
            </Button>
          </div>
        </Link>
        <Link
          to={`/product/${props.item._id || props.item.id}`}
          className="info d-block text-decoration-none text-dark"
        >
          <h4>{props.item.name}</h4>
          <span className="text-success d-block">
            {props.item.countInStock === 0 ? "Hết hàng" : "Còn hàng"}
          </span>
          <Rating
            className="mt-2"
            name="read-only"
            value={props.item.rating}
            readOnly
            size="small"
            precision={0.5}
          />
          <div className="d-flex">
            <span className="oldPrice">
              {props.item.oldPrice.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
            <span className="newPrice text-danger ms-2">
              {props.item.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductItem;
