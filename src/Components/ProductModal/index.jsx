import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { IoIosClose } from "react-icons/io";
import Rating from "@mui/material/Rating";
import { useContext } from "react";
import QuantityBox from "../QuantityBox";
import { FaHeart } from "react-icons/fa";
import { MdCompareArrows } from "react-icons/md";
import { MyContext } from "../../App";
import ProductZoom from "../ProductZoom";

const ProductModal = () => {
  const context = useContext(MyContext);

  return (
    <>
      <Dialog
        open={true}
        className="productModal"
        onClose={() => context.setisOpenProductModal(false)}
      >
        <Button
          className="close_"
          onClick={() => context.setisOpenProductModal(false)}
        >
          <IoIosClose />
        </Button>
        <h4 className="mb-1 font-weight-bold">All Natural Intalian-Style</h4>
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center me-4">
            <span>Brand:</span>
            <span className="ms-2">
              <b>Welch's</b>
            </span>
          </div>
          <Rating
            className="ms-4"
            name="read-only"
            value={5}
            readOnly
            size="small"
            precision={0.5}
          />
        </div>
        <hr />
        <div className="row mt-2 productDetailsModal">
          <div className="col-md-5">
            <ProductZoom />
          </div>
          <div className="col-md-7">
            <div className="d-flex info align-items-center">
              <span className="oldPrice lg me-3">$9.35</span>
              <span className="newPrice text-danger lg">$7.23</span>
            </div>
            <span class="badge bg-success">IN STOCK</span>
            <p class="mt-3">
              Rs: Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type ajnd scrambled it to make a type specimen book.
            </p>
            <div class="productSize d-flex align-items-center">
              <span>Size:</span>
              <ul class="list list-inline mb-0 ps-4 false">
                <li class="list-inline-item">
                  <a class="tag" href="/">
                    S
                  </a>
                </li>
                <li class="list-inline-item">
                  <a class="tag" href="/">
                    M
                  </a>
                </li>
                <li class="list-inline-item">
                  <a class="tag" href="/">
                    L
                  </a>
                </li>
              </ul>
            </div>
            <div class="d-flex align-items-center actions_">
              <QuantityBox />
              <Button className="btn-blue btn-lg btn-big btn-round">
                Add to Cart
              </Button>
            </div>
            <div class="d-flex align-items-center mt-5 actions">
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
