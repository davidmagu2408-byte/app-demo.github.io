import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../../apis/axiosConfig";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import toast from "react-hot-toast";

const formatVND = (n) =>
  n?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const BankingPayment = () => {
  const { id } = useParams();
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const [banking, setBanking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState({});

  useEffect(() => {
    if (!context.user) {
      navigate("/login");
      return;
    }
    fetchBankingInfo();
  }, [id]);

  const fetchBankingInfo = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/order/${id}/banking-info`);
      if (data.success) {
        setBanking(data.banking);
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Không thể tải thông tin thanh toán",
      );
      navigate("/orders");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (key, text) => {
    navigator.clipboard.writeText(text);
    setCopied((prev) => ({ ...prev, [key]: true }));
    toast.success("Đã sao chép!");
    setTimeout(() => {
      setCopied((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };

  if (loading) {
    return (
      <section className="section bankingPaymentPage">
        <div className="container text-center py-5">
          <CircularProgress size={48} />
          <h4 className="mt-3">Đang tải thông tin thanh toán...</h4>
        </div>
      </section>
    );
  }

  if (!banking) return null;

  const isPaid = banking.paymentStatus === "paid";

  return (
    <section className="section bankingPaymentPage">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="bankingPaymentCard text-center">
              {isPaid ? (
                <>
                  <div className="successIcon mb-3">
                    <CheckCircleIcon
                      style={{ fontSize: 64, color: "#4caf50" }}
                    />
                  </div>
                  <h3 style={{ color: "#4caf50" }}>
                    Thanh toán đã được xác nhận!
                  </h3>
                  <p className="text-light mb-4">
                    Đơn hàng của bạn đang được xử lý.
                  </p>
                  <Link to={`/order/${banking.orderId}`}>
                    <Button className="btn-blue btn-lg btn-big btn-round">
                      Xem đơn hàng
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <h3 className="mb-2">Chuyển khoản ngân hàng</h3>
                  <p className="text-light mb-4">
                    Quét mã QR hoặc chuyển khoản theo thông tin bên dưới
                  </p>

                  {/* QR Code */}
                  <div className="qrCodeWrapper mb-4">
                    <img
                      src={banking.qrUrl}
                      alt="QR chuyển khoản"
                      className="qrCodeImg"
                    />
                  </div>

                  {/* Banking details */}
                  <div className="bankingDetails">
                    <div className="bankingDetailRow">
                      <span className="bankingLabel">Ngân hàng</span>
                      <span className="bankingValue">{banking.bankName}</span>
                    </div>
                    <div className="bankingDetailRow">
                      <span className="bankingLabel">Số tài khoản</span>
                      <div className="bankingValueCopy">
                        <span className="bankingValue">
                          {banking.accountNo}
                        </span>
                        <button
                          className="copyBtn"
                          onClick={() =>
                            handleCopy("accountNo", banking.accountNo)
                          }
                        >
                          {copied.accountNo ? (
                            <CheckCircleIcon
                              style={{ fontSize: 18, color: "#4caf50" }}
                            />
                          ) : (
                            <ContentCopyIcon style={{ fontSize: 18 }} />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="bankingDetailRow">
                      <span className="bankingLabel">Chủ tài khoản</span>
                      <span className="bankingValue">
                        {banking.accountName}
                      </span>
                    </div>
                    <div className="bankingDetailRow">
                      <span className="bankingLabel">Số tiền</span>
                      <div className="bankingValueCopy">
                        <span
                          className="bankingValue"
                          style={{ color: "#d32f2f", fontWeight: 700 }}
                        >
                          {formatVND(banking.amount)}
                        </span>
                        <button
                          className="copyBtn"
                          onClick={() =>
                            handleCopy("amount", banking.amount.toString())
                          }
                        >
                          {copied.amount ? (
                            <CheckCircleIcon
                              style={{ fontSize: 18, color: "#4caf50" }}
                            />
                          ) : (
                            <ContentCopyIcon style={{ fontSize: 18 }} />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="bankingDetailRow highlight">
                      <span className="bankingLabel">Nội dung CK</span>
                      <div className="bankingValueCopy">
                        <span
                          className="bankingValue"
                          style={{ fontWeight: 700 }}
                        >
                          {banking.transferContent}
                        </span>
                        <button
                          className="copyBtn"
                          onClick={() =>
                            handleCopy(
                              "transferContent",
                              banking.transferContent,
                            )
                          }
                        >
                          {copied.transferContent ? (
                            <CheckCircleIcon
                              style={{ fontSize: 18, color: "#4caf50" }}
                            />
                          ) : (
                            <ContentCopyIcon style={{ fontSize: 18 }} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bankingNote mt-4 p-3">
                    <p className="mb-1">
                      <strong>⚠️ Lưu ý:</strong>
                    </p>
                    <ul className="mb-0 bankingNoteList">
                      <li>
                        Vui lòng chuyển <b>đúng số tiền</b> và{" "}
                        <b>đúng nội dung</b> chuyển khoản.
                      </li>
                      <li>
                        Đơn hàng sẽ được xác nhận sau khi chúng tôi nhận được
                        thanh toán.
                      </li>
                      <li>
                        Nếu không thanh toán trong 24 giờ, đơn hàng có thể bị
                        huỷ.
                      </li>
                    </ul>
                  </div>

                  <div className="d-flex gap-3 justify-content-center mt-4 flex-wrap">
                    <Link to={`/order/${banking.orderId}`}>
                      <Button className="btn-blue btn-lg btn-big btn-round">
                        Xem đơn hàng
                      </Button>
                    </Link>
                    <Link to="/">
                      <Button
                        className="btn-lg btn-big btn-round"
                        variant="outlined"
                      >
                        Tiếp tục mua sắm
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BankingPayment;
