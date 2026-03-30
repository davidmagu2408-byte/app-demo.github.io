import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import Logo from "../../assets/images/logo.webp";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FcGoogle } from "react-icons/fc";
import { postData } from "../../apis/api";
import { useToast } from "../../utils/Toast";
import { Toast } from "../../utils/Toast";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const context = useContext(MyContext);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formField, setFormField] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    address: "",
    images: "",
    isAdmin: false,
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const changeInput = (e) => {
    setFormField({
      ...formField,
      [e.target.name]: e.target.value,
    });
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (
      !formField.email.trim() ||
      !formField.password.trim() ||
      !formField.name.trim() ||
      !formField.phone.trim()
    ) {
      showToast("Vui lòng điền đầy đủ thông tin", "error");
      return;
    }
    if (formField.password !== confirmPassword) {
      showToast("Mật khẩu không khớp", "error");
      return;
    }
    setIsLoading(true);
    try {
      const data = await postData("/user/register", {
        ...formField,
        address: "",
        images: "",
      });
      if (data && data.success === true) {
        showToast("Đăng ký thành công!", "success");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        showToast(data?.message || "Đăng ký thất bại", "error");
      }
    } catch (error) {
      showToast(error.response?.data?.message || "Đăng ký thất bại", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    context.setisOpenHeaderFooterShow(false);
  }, []);

  return (
    <>
      <Toast />
      <section className="section signInPage">
      <div className="shape-bottom">
        <svg
          width="1921"
          height="820"
          viewBox="0 0 1921 820"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,413.1v406.7h1921V0.5h-0.4l-228.1,598.3c-30,74.235-80.8,130.6-152.5,168.6c-107.6,57-212.1,40.7-245.7,34.4 c-22.4-4.2-54.9-13.1-97.5-26.6L0,400.5V413.1z"
            fill="#007BFF"
          />
        </svg>
      </div>
      <div className="container">
        <div className="box card p-3 shadow border-0">
          <div className="text-center imgSignIn">
            <img src={Logo} alt="Logo" />
          </div>
          <form className="mt-1" onSubmit={handleSignUp}>
            <h2 className="mb-2">Đăng ký tài khoản</h2>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <TextField
                    id="standard-basic"
                    label="Họ và tên"
                    type="text"
                    name="name"
                    variant="standard"
                    required
                    className="w-100"
                    onChange={changeInput}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <TextField
                    id="standard-basic"
                    label="Số điện thoại"
                    type="tel"
                    variant="standard"
                    name="phone"
                    placeholder="09xx xxx xxx"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    required
                    className="w-100"
                    onChange={changeInput}
                  />
                </div>
              </div>
            </div>
            <div className="form-group position-relative">
              <TextField
                id="standard-basic"
                label="Địa chỉ email"
                type="email"
                name="email"
                variant="standard"
                required
                className="w-100"
                onChange={changeInput}
              />
            </div>
            <div className="form-group">
              <TextField
                id="password"
                label="Nhập mật khẩu"
                type="password"
                name="password"
                variant="standard"
                required
                className="w-100"
                onChange={changeInput}
              />
            </div>
            <div className="form-group">
              <TextField
                id="confirm_password"
                label="Nhập lại mật khẩu"
                type="password"
                variant="standard"
                name="confirm_password"
                required
                helperText={
                  confirmPassword !== "" &&
                  formField.password !== confirmPassword
                    ? "Mật khẩu không khớp"
                    : ""
                }
                error={
                  confirmPassword !== "" &&
                  formField.password !== confirmPassword
                }
                className="w-100"
                onChange={handleConfirmPassword}
              />
            </div>
            <div className="d-flex align-items-center mt-3 mb-3">
              <Button
                type="submit"
                disabled={isLoading}
                className="btn-blue col btn-lg btn-big"
              >
                {isLoading ? "Đang xử lý..." : "Đăng ký"}
              </Button>
              <Button
                className="btn-lg btn-big col ms-2"
                variant="outlined"
                onClick={() => {
                  context.setisOpenHeaderFooterShow(true);
                  navigate("/");
                }}
              >
                Cancel
              </Button>
            </div>
            <p className="txt">
              Đã có tài khoản?
              <span
                className="border-effect ms-1 cursor"
                onClick={() => navigate("/login")}
              >
                Đăng nhập
              </span>
            </p>
            <h6 className="mt-4 text-center font-weight-bold">
              Or continue with social account
            </h6>
            <Button className="loginWithGoogle mt-2" variant="outlined">
              <FcGoogle className="me-1" />
              Sign In with Google
            </Button>
          </form>
        </div>
      </div>
    </section>
    </>
  );
};

export default SignUp;
