import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { TfiFullscreen } from "react-icons/tfi";
import { IoMdHeartEmpty } from "react-icons/io";
import { useContext } from "react";
import { MyContext } from "../../App";

const ProductItem = (props) => {
  const context = useContext(MyContext);
  const viewProductDetails = (id) => {
    context.setisOpenProductModal(true);
  };

  return (
    <>
      <div className={`productItem ${props.itemView}`}>
        <div className="img_wrapper">
          <img
            src="https://api.spicezgold.com/download/file_1734776362505_herbal-max-apple-cider-vinegar-dietary-supplement-800-mg-capsule-30-s-prod-o1054774-p608296074-0-202403012346.jpg"
            className="w-100"
            alt="product"
          />
          <span className="badge badge-primary">28%</span>
          <div className="actions">
            <Button className="zoom" onClick={() => viewProductDetails(1)}>
              <TfiFullscreen />
            </Button>
            <Button className="favorite">
              <IoMdHeartEmpty />
            </Button>
          </div>
        </div>
        <div className="info">
          <h4>Weather's Original Caramel Hard Candies</h4>
          <span className="text-success d-block">In Stock</span>
          <Rating
            className="mt-2"
            name="read-only"
            value={5}
            readOnly
            size="small"
            precision={0.5}
          />
          <div className="d-flex">
            <span className="oldPrice">$20.00</span>
            <span className="newPrice text-danger ms-2">$14.00</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
