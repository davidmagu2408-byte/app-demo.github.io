import ProductZoom from "../../Components/ProductZoom";
import Rating from "@mui/material/Rating";
import QuantityBox from "../../Components/QuantityBox";
import Button from "@mui/material/Button";
import { FaHeart } from "react-icons/fa";
import { MdCompareArrows } from "react-icons/md";
import { useState } from "react";

const ProductDetails = () => {
  const [activeSize, setactiveSize] = useState(0);
  const [activeTabs, setactiveTabs] = useState(0);
  const isActive = (index) => {
    setactiveSize(index);
  };

  return (
    <section className="productDetails section">
      <div className="container">
        <div className="row">
          <div className="col-md-4 ps-5 part1">
            <ProductZoom />
          </div>
          <div className="col-md-7 ps-5 pe-5 part2">
            <h2 className="hd text-capitalize">All Natural Intalian-Style</h2>
            <ul className="list list-inline d-flex align-items-center">
              <li className="list-inline-item">
                <div className="d-flex align-items-center">
                  <span class="text-light me-2">Brands : </span>
                  <span>
                    <b>Welch's</b>
                  </span>
                </div>
              </li>
              <li className="list-inline-item">
                <div className="d-flex align-items-center">
                  <Rating
                    className="ms-4"
                    name="read-only"
                    value={5}
                    readOnly
                    size="small"
                    precision={0.5}
                  />
                  <span class="text-light cursor ms-2">0 Review</span>
                </div>
              </li>
            </ul>
            <div className="d-flex info align-items-center mb-3">
              <span className="oldPrice lg me-3">$9.35</span>
              <span className="newPrice text-danger lg">$7.23</span>
            </div>
            <span className="badge badge-success">IN STOCK</span>
            <p className="mt-3">OWODKWOKW</p>
            <div className="productSize d-flex align-items-center">
              <span>Size:</span>
              <ul className="list list-inline mb-0 ps-4">
                <li className="list-inline-item">
                  <a
                    className={`tag ${activeSize === 0 ? "active" : ""}`}
                    onClick={() => {
                      isActive(0);
                    }}
                  >
                    100g
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    className={`tag ${activeSize === 1 ? "active" : ""}`}
                    onClick={() => {
                      isActive(1);
                    }}
                  >
                    200g
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    className={`tag ${activeSize === 2 ? "active" : ""}`}
                    onClick={() => {
                      isActive(2);
                    }}
                  >
                    300g
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    className={`tag ${activeSize === 3 ? "active" : ""}`}
                    onClick={() => {
                      isActive(3);
                    }}
                  >
                    400g
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    className={`tag ${activeSize === 4 ? "active" : ""}`}
                    onClick={() => {
                      isActive(4);
                    }}
                  >
                    500g
                  </a>
                </li>
              </ul>
            </div>
            <div className="d-flex align-items-center mt-3 actions_">
              <QuantityBox />
              <Button className="btn-blue btn-lg btn-big btn-round me-3">
                Add to Cart
              </Button>
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
          <div className="card mt-5 p-5 detailsPageTabs">
            <div className="customTabs">
              <ul className="list list-inline">
                <li className="list-inline-item">
                  <Button
                    className={`${activeTabs === 0 && "active"}`}
                    onClick={() => {
                      setactiveTabs(0);
                    }}
                  >
                    Description
                  </Button>
                </li>
                <li class="list-inline-item">
                  <Button
                    className={`${activeTabs === 1 && "active"}`}
                    onClick={() => {
                      setactiveTabs(1);
                    }}
                  >
                    Additional info
                  </Button>
                </li>
                <li class="list-inline-item">
                  <Button
                    className={`${activeTabs === 2 && "active"}`}
                    onClick={() => {
                      setactiveTabs(2);
                    }}
                  >
                    Reviews (1)
                  </Button>
                </li>
              </ul>
              <br />
              {activeTabs === 0 && (
                <div className="tabContent">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </p>
                </div>
              )}
              {activeTabs === 1 && (
                <div className="tabContent">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <tbody>
                        <tr className="stand-up">
                          <th>Stand Up</th>
                          <td>
                            <p>35″L x 24″W x 37-45″H(front to back wheel)</p>
                          </td>
                        </tr>
                        <tr className="folded-wo-wheels">
                          <th>Folded (w/o wheels)</th>
                          <td>
                            <p>32.5″L x 18.5″W x 16.5″H</p>
                          </td>
                        </tr>
                        <tr className="folded-w-wheels">
                          <th>Folded (w/ wheels)</th>
                          <td>
                            <p>32.5″L x 24″W x 18.5″H</p>
                          </td>
                        </tr>
                        <tr className="door-pass-through">
                          <th>Door Pass Through</th>
                          <td>
                            <p>24</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {activeTabs === 2 && (
                <div className="tabContent">
                  <div className="row">
                    <div className="col-md-8">
                      <h3>Customer questions & answers</h3>
                      <br />
                      <div className="mb-4 reviewsCard border-bottom">
                        <div className="info">
                          <div className="d-flex align-items-center w-100">
                            <h5>Viet do</h5>
                            <div className="ms-auto">
                              <Rating
                                className="ms-4"
                                name="read-only"
                                value={5}
                                readOnly
                                size="small"
                                precision={0.5}
                              />
                            </div>
                          </div>
                          <h6 className="text-light">24/08/2000</h6>
                          <p>Very good</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
