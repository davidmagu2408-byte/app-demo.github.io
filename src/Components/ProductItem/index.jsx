import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { TfiFullscreen } from "react-icons/tfi";
import { IoMdHeartEmpty } from "react-icons/io";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";

const ProductItem = (props) => {
  const context = useContext(MyContext);
  if (!props.item) return null;
  const viewProductDetails = (id) => {
    context.setisOpenProductModal({
      id: id,
      open: true,
    });
  };
  return (
    <>
      <div className="productItem">
        <Link to={`/product/${props.item._id || props.item.id}`} className="img_wrapper d-block">
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
          </div>
        </Link>
        <Link to={`/product/${props.item._id || props.item.id}`} className="info d-block text-decoration-none text-dark">
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
