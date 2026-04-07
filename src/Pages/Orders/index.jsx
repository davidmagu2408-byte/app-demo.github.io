import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import api from "../../apis/axiosConfig";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import { IoEyeOutline } from "react-icons/io5";
import toast from "react-hot-toast";

const formatVND = (n) =>
  n?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const statusMap = {
  pending: { label: "Chờ xử lý", color: "#ff9800" },
  confirmed: { label: "Đã xác nhận", color: "#2196f3" },
  shipping: { label: "Đang giao", color: "#673ab7" },
  delivered: { label: "Đã giao", color: "#4caf50" },
  cancelled: { label: "Đã huỷ", color: "#f44336" },
};

const paymentStatusMap = {
  pending: { label: "Chưa thanh toán", color: "#ff9800" },
  paid: { label: "Đã thanh toán", color: "#4caf50" },
  failed: { label: "Thất bại", color: "#f44336" },
};

const Orders = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!context.user) {
      navigate("/login");
      return;
    }
    fetchOrders(1);
  }, []);

  const fetchOrders = async (p) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/order/my-orders?page=${p}`);
      if (data.success) {
        setOrders(data.orders);
        setTotalPages(data.totalPages);
        setPage(data.page);
      }
    } catch (_) {
      toast.error("Không thể tải danh sách đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section ordersPage">
      <div className="container">
        <h2 className="hd mb-4">Đơn hàng của tôi</h2>

        {loading ? (
          <div className="text-center py-5">
            <p>Đang tải...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-5">
            <h4>Bạn chưa có đơn hàng nào</h4>
            <Button
              className="btn-blue btn-lg btn-big btn-round mt-3"
              onClick={() => navigate("/")}
            >
              Mua sắm ngay
            </Button>
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table orderTable">
                <thead>
                  <tr>
                    <th>Mã đơn</th>
                    <th>Ngày đặt</th>
                    <th>Sản phẩm</th>
                    <th>Tổng tiền</th>
                    <th>Thanh toán</th>
                    <th>Trạng thái</th>
                    <th>Chi tiết</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    const os = statusMap[order.orderStatus] || {};
                    const ps = paymentStatusMap[order.paymentStatus] || {};
                    return (
                      <tr key={order._id}>
                        <td>
                          <span className="orderId">
                            #{order._id.slice(-8).toUpperCase()}
                          </span>
                        </td>
                        <td>
                          {new Date(order.dateCreated).toLocaleDateString(
                            "vi-VN",
                          )}
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-1">
                            {order.items.slice(0, 3).map((item, i) => (
                              <img
                                key={i}
                                src={item.image}
                                alt=""
                                className="orderThumb"
                              />
                            ))}
                            {order.items.length > 3 && (
                              <span
                                className="text-light"
                                style={{ fontSize: 12 }}
                              >
                                +{order.items.length - 3}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="fw-bold">{formatVND(order.total)}</td>
                        <td>
                          <span
                            className="statusBadge"
                            style={{ background: ps.color }}
                          >
                            {ps.label}
                          </span>
                        </td>
                        <td>
                          <span
                            className="statusBadge"
                            style={{ background: os.color }}
                          >
                            {os.label}
                          </span>
                        </td>
                        <td>
                          <Button
                            className="viewDetailBtn"
                            onClick={() => navigate(`/order/${order._id}`)}
                          >
                            <IoEyeOutline />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-3">
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_, v) => fetchOrders(v)}
                  color="primary"
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Orders;
