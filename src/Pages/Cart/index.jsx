import Rating from "@mui/material/Rating";
import QuantityBox from "../../Components/QuantityBox";
import { IoIosClose } from "react-icons/io";
import { IoBagCheckOutline } from "react-icons/io5";
import Button from "@mui/material/Button";

const Cart = () => {
  return (
    <section className="section cartPage">
      <div className="container">
        <div className="row">
          <div className="col-md-9 pe-5">
            <h2 className="hd mb-0">Your Cart</h2>
            <p>
              There are <b>3</b> products in your cart
            </p>

            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th width="35%">Product</th>
                    <th width="15%">Unit Price</th>
                    <th width="25%">Quanity</th>
                    <th width="15%">Subtotal</th>
                    <th width="10%">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td width="35%">
                      <div className="d-flex align-items-center cartItemimgWrapper">
                        <div className="imgWrapper">
                          <img
                            src="https://theboondocksofficial.com/cdn/shop/files/The-Boondocks-The-Freeman-Cycle-Black-Stone-Wash-T-Shirt-2.jpg?v=1772563924&width=823"
                            className="w-100"
                            alt=""
                          ></img>
                        </div>
                        <div class="info px-3">
                          <h6>Men Alias-N Regular Fit Spread...</h6>
                          <Rating
                            className="ms-4"
                            name="read-only"
                            value={4.5}
                            readOnly
                            size="small"
                            precision={0.5}
                          />
                        </div>
                      </div>
                    </td>
                    <td width="15%">$ 15</td>
                    <td width="25%">
                      <QuantityBox />
                    </td>
                    <td width="15%">$ 15</td>
                    <td width="10%">
                      <span className="remove">
                        <IoIosClose />
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-3">
            <div class="card border p-3 cartDetails">
              <h4>CART TOTALS</h4>
              <div class="d-flex align-items-center mb-3">
                <span>Subtotal</span>
                <span class="ms-auto text-red font-weight-bold">₹260.00</span>
              </div>
              <div class="d-flex align-items-center mb-3">
                <span>Shipping</span>
                <span class="ms-auto">
                  <b>Free</b>
                </span>
              </div>
              <div class="d-flex align-items-center mb-3">
                <span>Estimate for</span>
                <span class="ms-auto">
                  <b>United Kingdom</b>
                </span>
              </div>
              <div class="d-flex align-items-center">
                <span>Total</span>
                <span class="ms-auto text-red font-weight-bold">₹260.00</span>
              </div>
              <br />
              <a href="/checkout">
                <Button className="btn-blue bg-red btn-lg btn-big">
                  <IoBagCheckOutline />
                  &nbsp; Checkout
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
