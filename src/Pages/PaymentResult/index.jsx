import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import api from "../../apis/axiosConfig";

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading"); // loading | success | failed
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const resultCode = searchParams.get("resultCode");
    const extraData = searchParams.get("extraData");

    if (resultCode === "0") {
      // Payment successful on MoMo side — verify with backend
      try {
        const decoded = JSON.parse(atob(extraData));
        setOrderId(decoded.orderId);
        pollPaymentStatus(decoded.orderId);
      } catch {
        setStatus("success");
      }
    } else {
      // Payment failed or cancelled
      try {
        const decoded = JSON.parse(atob(extraData));
        setOrderId(decoded.orderId);
      } catch {
        // ignore
      }
      setStatus("failed");
    }
  }, []);

  const pollPaymentStatus = async (id) => {
    try {
      const { data } = await api.get(`/momo/status/${id}`);
      if (data.paymentStatus === "paid") {
        setStatus("success");
      } else if (data.paymentStatus === "failed") {
        setStatus("failed");
      } else {
        // Still pending — wait and retry once
        setTimeout(async () => {
          try {
            const { data: retryData } = await api.get(`/momo/status/${id}`);
            setStatus(
              retryData.paymentStatus === "paid" ? "success" : "failed",
            );
          } catch {
            setStatus("failed");
          }
        }, 3000);
      }
    } catch {
      setStatus("failed");
    }
  };

  if (status === "loading") {
    return (
      <section className="section" style={{ minHeight: "60vh" }}>
        <div className="container text-center py-5">
          <CircularProgress size={48} />
          <h4 className="mt-3">Đang xác nhận thanh toán...</h4>
          <p className="text-light">Vui lòng đợi trong giây lát</p>
        </div>
      </section>
    );
  }

  if (status === "failed") {
    return (
      <section className="section" style={{ minHeight: "60vh" }}>
        <div className="container text-center py-5">
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "#fee",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <span style={{ fontSize: 40 }}>✗</span>
          </div>
          <h3 className="text-danger">Thanh toán thất bại</h3>
          <p className="text-light">
            Giao dịch MoMo không thành công hoặc đã bị huỷ.
          </p>
          <div className="d-flex gap-3 justify-content-center mt-4">
            <Link to="/cart">
              <Button className="btn-blue btn-lg btn-big btn-round">
                Quay lại giỏ hàng
              </Button>
            </Link>
            {orderId && (
              <Link to={`/order/${orderId}`}>
                <Button className="btn-blue bg-red btn-lg btn-big btn-round">
                  Xem đơn hàng
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section" style={{ minHeight: "60vh" }}>
      <div className="container text-center py-5">
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "#e6f9e6",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
          }}
        >
          <span style={{ fontSize: 40, color: "#22c55e" }}>✓</span>
        </div>
        <h3 style={{ color: "#22c55e" }}>Thanh toán thành công!</h3>
        <p className="text-light">
          Đơn hàng của bạn đã được thanh toán qua MoMo.
        </p>
        <div className="d-flex gap-3 justify-content-center mt-4">
          <Link to="/">
            <Button className="btn-blue btn-lg btn-big btn-round">
              Tiếp tục mua sắm
            </Button>
          </Link>
          {orderId && (
            <Link to={`/order/${orderId}`}>
              <Button className="btn-blue bg-red btn-lg btn-big btn-round">
                Xem đơn hàng
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default PaymentResult;
