import { useContext } from "react";
import { MyContext } from "../../App";
import { IoIosClose } from "react-icons/io";
import { IoBagCheckOutline } from "react-icons/io5";
import Button from "@mui/material/Button";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const formatVND = (n) =>
  n?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const Cart = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const { cartData, updateCartQty, removeFromCart } = context;

  const subtotal = cartData.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shippingFee = subtotal >= 500000 ? 0 : 30000;
  const total = subtotal + shippingFee;

  return (
    <section className="section cartPage">
      <div className="container">
        {cartData.length === 0 ? (
          <div className="text-center py-5">
            <h3>Giỏ hàng trống</h3>
            <p className="text-light">
              Bạn chưa có sản phẩm nào trong giỏ hàng
            </p>
            <Link to="/">
              <Button className="btn-blue btn-lg btn-big btn-round mt-3">
                Tiếp tục mua sắm
              </Button>
            </Link>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-9 pe-5">
              <h2 className="hd mb-0">Giỏ hàng</h2>
              <p>
                Có <b>{cartData.length}</b> sản phẩm trong giỏ hàng
              </p>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th width="35%">Sản phẩm</th>
                      <th width="15%">Đơn giá</th>
                      <th width="25%">Số lượng</th>
                      <th width="15%">Thành tiền</th>
                      <th width="10%">Xoá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartData.map((item) => (
                      <tr key={item.productId}>
                        <td width="35%">
                          <div className="d-flex align-items-center cartItemimgWrapper">
                            <div className="imgWrapper">
                              <img
                                src={item.image}
                                className="w-100"
                                alt={item.name}
                              />
                            </div>
                            <div className="info px-3">
                              <Link to={`/product/${item.productId}`}>
                                <h6>{item.name}</h6>
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td width="15%">{formatVND(item.price)}</td>
                        <td width="25%">
                          <div className="quantityDrop d-flex align-items-center">
                            <Button
                              onClick={() =>
                                item.quantity > 1 &&
                                updateCartQty(item.productId, item.quantity - 1)
                              }
                            >
                              <FaMinus />
                            </Button>
                            <input value={item.quantity} readOnly />
                            <Button
                              onClick={() =>
                                item.quantity < item.countInStock &&
                                updateCartQty(item.productId, item.quantity + 1)
                              }
                            >
                              <FaPlus />
                            </Button>
                          </div>
                        </td>
                        <td width="15%">
                          {formatVND(item.price * item.quantity)}
                        </td>
                        <td width="10%">
                          <span
                            className="remove cursor"
                            onClick={() => removeFromCart(item.productId)}
                          >
                            <IoIosClose />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border p-3 cartDetails">
                <h4>TỔNG GIỎ HÀNG</h4>
                <div className="d-flex align-items-center mb-3">
                  <span>Tạm tính</span>
                  <span className="ms-auto font-weight-bold">
                    {formatVND(subtotal)}
                  </span>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <span>Phí vận chuyển</span>
                  <span className="ms-auto">
                    <b>
                      {shippingFee === 0 ? "Miễn phí" : formatVND(shippingFee)}
                    </b>
                  </span>
                </div>
                {subtotal < 500000 && (
                  <p className="cartFreeShipHint">
                    Mua thêm{" "}
                    <b className="text-danger">
                      {formatVND(500000 - subtotal)}
                    </b>{" "}
                    để được miễn phí vận chuyển
                  </p>
                )}
                <div className="d-flex align-items-center">
                  <span>Tổng cộng</span>
                  <span className="ms-auto text-red font-weight-bold">
                    {formatVND(total)}
                  </span>
                </div>
                <br />
                <Button
                  className="btn-blue bg-red btn-lg btn-big w-100"
                  onClick={() => navigate("/checkout")}
                >
                  <IoBagCheckOutline />
                  &nbsp; Thanh toán
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
