import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useToast, Toast } from "../../utils/Toast";
import api from "../../apis/axiosConfig";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

const formatVND = (n) =>
  n?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const Checkout = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { cartData, clearCart, user } = context;
  const [isLoading, setIsLoading] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [form, setForm] = useState({
    fullName: user?.name || "",
    phone: user?.phone || "",
    address: "",
    province: "",
    provinceName: "",
    district: "",
    districtName: "",
    ward: "",
    wardName: "",
    paymentMethod: "cod",
    note: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (cartData.length === 0) {
      navigate("/cart");
      return;
    }
    axios
      .get("https://provinces.open-api.vn/api/p")
      .then((res) => setProvinces(res.data));
  }, []);

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        fullName: prev.fullName || user.name || "",
        phone: prev.phone || user.phone || "",
      }));
    }
  }, [user]);

  const handleProvinceChange = async (e) => {
    const code = e.target.value;
    const prov = provinces.find((p) => p.code === Number(code));
    setForm({
      ...form,
      province: code,
      provinceName: prov?.name || "",
      district: "",
      districtName: "",
      ward: "",
      wardName: "",
    });
    setWards([]);
    const res = await axios.get(
      `https://provinces.open-api.vn/api/p/${code}?depth=2`
    );
    setDistricts(res.data.districts || []);
  };

  const handleDistrictChange = async (e) => {
    const code = e.target.value;
    const dist = districts.find((d) => d.code === Number(code));
    setForm({
      ...form,
      district: code,
      districtName: dist?.name || "",
      ward: "",
      wardName: "",
    });
    const res = await axios.get(
      `https://provinces.open-api.vn/api/d/${code}?depth=2`
    );
    setWards(res.data.wards || []);
  };

  const handleWardChange = (e) => {
    const code = e.target.value;
    const w = wards.find((w) => w.code === Number(code));
    setForm({ ...form, ward: code, wardName: w?.name || "" });
  };

  const subtotal = cartData.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingFee = subtotal >= 500000 ? 0 : 30000;
  const total = subtotal + shippingFee;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.fullName.trim() ||
      !form.phone.trim() ||
      !form.address.trim() ||
      !form.provinceName ||
      !form.districtName ||
      !form.wardName
    ) {
      showToast("Vui lòng điền đầy đủ thông tin giao hàng", "error");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        items: cartData.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        shippingAddress: {
          fullName: form.fullName.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
          province: form.provinceName,
          district: form.districtName,
          ward: form.wardName,
        },
        paymentMethod: form.paymentMethod,
        note: form.note,
      };

      const { data } = await api.post("/order/create", payload);
      if (data.success) {
        clearCart();
        showToast("Đặt hàng thành công!", "success");
        setTimeout(() => {
          navigate(`/order/${data.order._id}`);
        }, 1000);
      } else {
        showToast(data.message || "Đặt hàng thất bại", "error");
      }
    } catch (err) {
      showToast(
        err.response?.data?.message || "Đặt hàng thất bại",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toast />
      <section className="section checkoutPage">
        <div className="container">
          <h2 className="hd mb-4">Thanh toán</h2>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-8">
                <div className="card border p-4 mb-4">
                  <h5 className="mb-3 fw-bold">Thông tin giao hàng</h5>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <TextField
                        label="Họ và tên"
                        value={form.fullName}
                        onChange={(e) =>
                          setForm({ ...form, fullName: e.target.value })
                        }
                        fullWidth
                        required
                        size="small"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <TextField
                        label="Số điện thoại"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        fullWidth
                        required
                        size="small"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <TextField
                        select
                        label="Tỉnh/Thành"
                        value={form.province}
                        onChange={handleProvinceChange}
                        fullWidth
                        required
                        size="small"
                      >
                        {provinces.map((p) => (
                          <MenuItem key={p.code} value={p.code}>
                            {p.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <div className="col-md-4 mb-3">
                      <TextField
                        select
                        label="Quận/Huyện"
                        value={form.district}
                        onChange={handleDistrictChange}
                        fullWidth
                        required
                        size="small"
                        disabled={districts.length === 0}
                      >
                        {districts.map((d) => (
                          <MenuItem key={d.code} value={d.code}>
                            {d.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <div className="col-md-4 mb-3">
                      <TextField
                        select
                        label="Phường/Xã"
                        value={form.ward}
                        onChange={handleWardChange}
                        fullWidth
                        required
                        size="small"
                        disabled={wards.length === 0}
                      >
                        {wards.map((w) => (
                          <MenuItem key={w.code} value={w.code}>
                            {w.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </div>
                  <TextField
                    label="Địa chỉ cụ thể (số nhà, đường...)"
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                    fullWidth
                    required
                    size="small"
                    className="mb-3"
                  />
                  <TextField
                    label="Ghi chú đơn hàng (tuỳ chọn)"
                    value={form.note}
                    onChange={(e) =>
                      setForm({ ...form, note: e.target.value })
                    }
                    fullWidth
                    multiline
                    rows={2}
                    size="small"
                  />
                </div>

                <div className="card border p-4">
                  <h5 className="mb-3 fw-bold">Phương thức thanh toán</h5>
                  <div className="d-flex gap-3">
                    <div
                      className={`paymentOption ${form.paymentMethod === "cod" ? "active" : ""}`}
                      onClick={() =>
                        setForm({ ...form, paymentMethod: "cod" })
                      }
                    >
                      <span className="paymentIcon">💵</span>
                      <span>Thanh toán khi nhận hàng (COD)</span>
                    </div>
                    <div
                      className={`paymentOption ${form.paymentMethod === "banking" ? "active" : ""}`}
                      onClick={() =>
                        setForm({ ...form, paymentMethod: "banking" })
                      }
                    >
                      <span className="paymentIcon">🏦</span>
                      <span>Chuyển khoản ngân hàng</span>
                    </div>
                  </div>
                  {form.paymentMethod === "banking" && (
                    <div className="bankingInfo mt-3 p-3">
                      <p className="mb-1">
                        <b>Ngân hàng:</b> Vietcombank
                      </p>
                      <p className="mb-1">
                        <b>STK:</b> 1234567890
                      </p>
                      <p className="mb-1">
                        <b>Chủ TK:</b> ECOMMERCE WEBSITE
                      </p>
                      <p className="mb-0 text-light" style={{ fontSize: 13 }}>
                        Nội dung CK: [Họ tên] - [SĐT]
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-4">
                <div className="card border p-4 cartDetails">
                  <h5 className="mb-3 fw-bold">Đơn hàng của bạn</h5>
                  <div className="orderSummaryItems">
                    {cartData.map((item) => (
                      <div
                        key={item.productId}
                        className="d-flex align-items-center mb-3"
                      >
                        <div className="checkoutImgWrapper">
                          <img src={item.image} alt={item.name} />
                          <span className="qtyBadge">{item.quantity}</span>
                        </div>
                        <div className="ms-3" style={{ flex: 1, minWidth: 0 }}>
                          <p
                            className="mb-0 fw-bold"
                            style={{
                              fontSize: 13,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {item.name}
                          </p>
                          <span style={{ fontSize: 13 }}>
                            {formatVND(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <hr />
                  <div className="d-flex align-items-center mb-2">
                    <span>Tạm tính</span>
                    <span className="ms-auto">{formatVND(subtotal)}</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <span>Phí vận chuyển</span>
                    <span className="ms-auto">
                      {shippingFee === 0 ? "Miễn phí" : formatVND(shippingFee)}
                    </span>
                  </div>
                  <hr />
                  <div className="d-flex align-items-center mb-3">
                    <span className="fw-bold" style={{ fontSize: 16 }}>
                      Tổng cộng
                    </span>
                    <span
                      className="ms-auto text-red fw-bold"
                      style={{ fontSize: 18 }}
                    >
                      {formatVND(total)}
                    </span>
                  </div>
                  <Button
                    type="submit"
                    className="btn-blue bg-red btn-lg btn-big w-100"
                    disabled={isLoading}
                  >
                    {isLoading ? "Đang xử lý..." : "Đặt hàng"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Checkout;
