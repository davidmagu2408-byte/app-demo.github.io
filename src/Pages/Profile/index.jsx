import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useToast, Toast } from "../../utils/Toast";
import api from "../../apis/axiosConfig";

const Profile = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { user, setUser } = context;
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    setForm((prev) => ({
      ...prev,
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
    }));
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      showToast("Vui lòng nhập họ tên và email", "error");
      return;
    }
    if (form.password && form.password !== form.confirmPassword) {
      showToast("Mật khẩu không khớp", "error");
      return;
    }
    if (form.password && form.password.length < 6) {
      showToast("Mật khẩu phải có ít nhất 6 ký tự", "error");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
      };
      if (form.password) {
        payload.password = form.password;
      }
      const { data } = await api.put("/user/update", payload);
      if (data.success) {
        setUser(data.user);
        showToast("Cập nhật thành công!", "success");
        setForm((prev) => ({ ...prev, password: "", confirmPassword: "" }));
      } else {
        showToast(data.message || "Cập nhật thất bại", "error");
      }
    } catch (err) {
      showToast(err.response?.data?.message || "Cập nhật thất bại", "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <>
      <Toast />
      <section className="section profilePage">
        <div className="container">
          <h2 className="hd mb-4">Tài khoản của tôi</h2>
          <div className="row">
            <div className="col-md-8">
              <div className="card border p-4">
                <h5 className="mb-3 fw-bold">Thông tin cá nhân</h5>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <TextField
                        label="Họ và tên"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        fullWidth
                        required
                        size="small"
                        inputProps={{ maxLength: 100 }}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <TextField
                        label="Email"
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        fullWidth
                        required
                        size="small"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <TextField
                        label="Số điện thoại"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        fullWidth
                        size="small"
                        inputProps={{ maxLength: 11 }}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <TextField
                        label="Địa chỉ"
                        value={form.address}
                        onChange={(e) =>
                          setForm({ ...form, address: e.target.value })
                        }
                        fullWidth
                        size="small"
                        inputProps={{ maxLength: 500 }}
                      />
                    </div>
                  </div>

                  <h6 className="mt-3 mb-2 fw-bold">
                    Đổi mật khẩu{" "}
                    <span className="text-light profilePasswordHint">
                      (bỏ trống nếu không đổi)
                    </span>
                  </h6>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <TextField
                        label="Mật khẩu mới"
                        type="password"
                        value={form.password}
                        onChange={(e) =>
                          setForm({ ...form, password: e.target.value })
                        }
                        fullWidth
                        size="small"
                        autoComplete="new-password"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <TextField
                        label="Nhập lại mật khẩu"
                        type="password"
                        value={form.confirmPassword}
                        onChange={(e) =>
                          setForm({ ...form, confirmPassword: e.target.value })
                        }
                        fullWidth
                        size="small"
                        error={
                          form.confirmPassword !== "" &&
                          form.password !== form.confirmPassword
                        }
                        helperText={
                          form.confirmPassword !== "" &&
                          form.password !== form.confirmPassword
                            ? "Mật khẩu không khớp"
                            : ""
                        }
                        autoComplete="new-password"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="btn-blue btn-lg btn-big mt-2"
                    disabled={isLoading}
                  >
                    {isLoading ? "Đang cập nhật..." : "Lưu thay đổi"}
                  </Button>
                </form>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border p-4 text-center">
                <div className="profileAvatar">
                  {user.name?.charAt(0)?.toUpperCase()}
                </div>
                <h5 className="fw-bold">{user.name}</h5>
                <p className="profileInfoText mb-1">{user.email}</p>
                {user.phone && (
                  <p className="profileInfoText mb-0">{user.phone}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
