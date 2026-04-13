import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../../apis/axiosConfig";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";

const formatVND = (n) =>
  n?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const statusSteps = [
  { key: "pending", label: "Chờ xử lý", icon: "🕐" },
  { key: "confirmed", label: "Đã xác nhận", icon: "✅" },
  { key: "shipping", label: "Đang giao", icon: "🚚" },
  { key: "delivered", label: "Đã giao", icon: "📦" },
];

const statusColors = {
  pending: "#ff9800",
  confirmed: "#2196f3",
  shipping: "#673ab7",
  delivered: "#4caf50",
  cancelled: "#f44336",
};

const OrderDetails = () => {
  const { id } = useParams();
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (!context.user) {
      navigate("/login");
      return;
    }
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/order/${id}`);
      if (data.success) {
        setOrder(data.order);
      }
    } catch (err) {
      toast.error("Không tìm thấy đơn hàng");
      navigate("/orders");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm("Bạn có chắc muốn huỷ đơn hàng này?")) return;
    setCancelling(true);
    try {
      const { data } = await api.put(`/order/${id}/cancel`);
      if (data.success) {
        toast.success("Đã huỷ đơn hàng");
        setOrder(data.order);
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Không thể huỷ đơn hàng");
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <section className="section orderDetailPage">
        <div className="container text-center py-5">
          <p>Đang tải...</p>
        </div>
      </section>
    );
  }

  if (!order) return null;

  const currentIdx = statusSteps.findIndex((s) => s.key === order.orderStatus);
  const isCancelled = order.orderStatus === "cancelled";

  return (
    <section className="section orderDetailPage">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
          <h2 className="hd mb-0">
            Đơn hàng #{order._id.slice(-8).toUpperCase()}
          </h2>
          <Button
            className="btn-blue btn-round"
            onClick={() => navigate("/orders")}
          >
            Quay lại
          </Button>
        </div>

        {/* Timeline */}
        {!isCancelled ? (
          <div className="orderTimeline mb-4">
            {statusSteps.map((step, i) => {
              const done = i <= currentIdx;
              return (
                <div
                  key={step.key}
                  className={`timelineStep ${done ? "done" : ""} ${
                    i === currentIdx ? "current" : ""
                  }`}
                >
                  <div className="timelineIcon">{step.icon}</div>
                  <div className="timelineBar">
                    <div
                      className="timelineFill"
                      style={{ width: done ? "100%" : "0%" }}
                    />
                  </div>
                  <span className="timelineLabel">{step.label}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="cancelledBanner mb-4">❌ Đơn hàng đã bị huỷ</div>
        )}

        <div className="row">
          {/* Left: items */}
          <div className="col-md-8">
            <div className="orderCard mb-3">
              <h5 className="mb-3">Sản phẩm ({order.items.length})</h5>
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="orderItem d-flex align-items-center gap-3 mb-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="orderItemImg orderItemClickable"
                    onClick={() => navigate(`/product/${item.productId}`)}
                  />
                  <div className="flex-grow-1">
                    <p
                      className="mb-1 fw-bold orderItemName orderItemClickable"
                      onClick={() => navigate(`/product/${item.productId}`)}
                    >
                      {item.name}
                    </p>
                    <p className="mb-0 orderItemSubText">
                      {formatVND(item.price)} × {item.quantity}
                    </p>
                  </div>
                  <span className="fw-bold">
                    {formatVND(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: info */}
          <div className="col-md-4">
            {/* Summary */}
            <div className="orderCard mb-3">
              <h5 className="mb-3">Tổng quan</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Tạm tính</span>
                <span>{formatVND(order.subtotal)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Phí vận chuyển</span>
                <span>
                  {order.shippingFee === 0 ? (
                    <span className="freeShipText">Miễn phí</span>
                  ) : (
                    formatVND(order.shippingFee)
                  )}
                </span>
              </div>
              <hr />
              <div className="d-flex justify-content-between orderTotalRow">
                <span>Tổng cộng</span>
                <span className="orderTotalValue">
                  {formatVND(order.total)}
                </span>
              </div>
            </div>

            {/* Payment */}
            <div className="orderCard mb-3">
              <h5 className="mb-3">Thanh toán</h5>
              <p className="mb-1">
                <strong>Phương thức:</strong>{" "}
                {order.paymentMethod === "cod"
                  ? "💵 Thanh toán khi nhận hàng"
                  : order.paymentMethod === "momo"
                    ? "📱 Ví MoMo"
                    : "🏦 Chuyển khoản ngân hàng"}
              </p>
              <p className="mb-0">
                <strong>Trạng thái:</strong>{" "}
                <span
                  className="statusBadge"
                  style={{
                    background:
                      order.paymentStatus === "paid"
                        ? "#4caf50"
                        : order.paymentStatus === "failed"
                          ? "#f44336"
                          : "#ff9800",
                  }}
                >
                  {order.paymentStatus === "paid"
                    ? "Đã thanh toán"
                    : order.paymentStatus === "failed"
                      ? "Thất bại"
                      : "Chưa thanh toán"}
                </span>
              </p>
              {order.paymentMethod === "banking" &&
                order.paymentStatus === "pending" && (
                  <Link to={`/banking-payment/${order._id}`}>
                    <Button className="btn-blue btn-round mt-3" size="small">
                      Xem thông tin chuyển khoản
                    </Button>
                  </Link>
                )}
            </div>

            {/* Shipping address */}
            <div className="orderCard mb-3">
              <h5 className="mb-3">Địa chỉ giao hàng</h5>
              <p className="mb-1">
                <strong>{order.shippingAddress.fullName}</strong>
              </p>
              <p className="mb-1">{order.shippingAddress.phone}</p>
              <p className="mb-1">{order.shippingAddress.address}</p>
              <p className="mb-0">
                {order.shippingAddress.ward}, {order.shippingAddress.district},{" "}
                {order.shippingAddress.province}
              </p>
            </div>

            {order.note && (
              <div className="orderCard mb-3">
                <h5 className="mb-2">Ghi chú</h5>
                <p className="mb-0">{order.note}</p>
              </div>
            )}

            {/* Date */}
            <div className="orderCard mb-3">
              <p className="mb-0 orderDateText">
                Ngày đặt: {new Date(order.dateCreated).toLocaleString("vi-VN")}
              </p>
            </div>

            {/* Cancel button */}
            {order.orderStatus === "pending" && (
              <Button
                className="btn-big w-100"
                variant="outlined"
                color="error"
                onClick={handleCancel}
                disabled={cancelling}
              >
                {cancelling ? "Đang huỷ..." : "Huỷ đơn hàng"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
