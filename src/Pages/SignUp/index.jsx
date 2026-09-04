import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import Logo from "../../assets/images/logo.webp";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FcGoogle } from "react-icons/fc";
import { postData } from "../../apis/api";
import { useToast } from "../../utils/Toast";
import { Toast } from "../../utils/Toast";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";

const SignUp = () => {
  const context = useContext(MyContext);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const emailIsValid = (value) => /\S+@\S+\.\S+/.test(value);
  const phoneIsValid = (value) => /^0\d{9,10}$/.test(value);
  const passwordIsStrongEnough = (value) =>
    value.length >= 8 && /[A-Z]/.test(value) && /\d/.test(value);

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

    if (!emailIsValid(formField.email)) {
      showToast("Email không hợp lệ", "error");
      return;
    }

    if (!phoneIsValid(formField.phone)) {
      showToast("Số điện thoại phải bắt đầu bằng 0 và có 10-11 chữ số", "error");
      return;
    }

    if (!passwordIsStrongEnough(formField.password)) {
      showToast("Mật khẩu tối thiểu 8 ký tự, bao gồm chữ hoa và số", "error");
      return;
    }

    if (formField.password !== confirmPassword) {
      showToast("Mật khẩu không khớp", "error");
      return;
    }
    const payload = {
      ...formField,
      name: formField.name.trim(),
      email: formField.email.trim(),
      phone: formField.phone.trim(),
      address: "",
      images: "",
      password: formField.password.trim(),
    };

    setIsLoading(true);
    try {
      const data = await postData("/user/register", payload);
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

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const gUser = result.user;
      const data = await postData("/user/google-login", {
        email: gUser.email,
        name: gUser.displayName,
        photo: gUser.photoURL,
      });
      if (data && data.success) {
        localStorage.setItem("accessToken", data.accessToken);
        context.setAccessToken(data.accessToken);
        context.setUser(data.user);
        showToast("Đăng nhập thành công!", "success");
        setTimeout(() => {
          context.setisOpenHeaderFooterShow(true);
          navigate("/");
        }, 1000);
      } else {
        showToast(data?.message || "Đăng nhập Google thất bại", "error");
      }
    } catch (error) {
      if (error.code !== "auth/popup-closed-by-user") {
        showToast("Đăng nhập Google thất bại", "error");
      }
    }
  };

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
              fill="#2563eb"
            />
          </svg>
        </div>
        <div className="container authContainer">
          <div className="box card shadow border-0">
            <div className="text-center imgSignIn">
              <img src={Logo} alt="Logo" />
            </div>
            <div className="text-center mt-2 brandHeader">
              <span className="brandBadge">Create account</span>
              <h2>ECOMMERCE WEBSITE</h2>
            </div>
            <form className="mt-1" onSubmit={handleSignUp}>
              <h2 className="mb-3 authTitle">Đăng ký tài khoản</h2>
              <div className="row g-2">
                <div className="col-md-6">
                  <div className="form-group">
                    <TextField
                      label="Họ và tên"
                      type="text"
                      name="name"
                      variant="outlined"
                      required
                      className="w-100 authField"
                      size="small"
                      onChange={changeInput}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <TextField
                      label="Số điện thoại"
                      type="tel"
                      variant="outlined"
                      name="phone"
                      value={formField.phone}
                      placeholder="09xx xxx xxx"
                      pattern="[0-9]*"
                      inputMode="numeric"
                      required
                      className="w-100 authField"
                      size="small"
                      error={Boolean(formField.phone) && !phoneIsValid(formField.phone)}
                      helperText={
                        Boolean(formField.phone) && !phoneIsValid(formField.phone)
                          ? "Số điện thoại không hợp lệ"
                          : ""
                      }
                      onChange={changeInput}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group position-relative">
                <TextField
                  label="Địa chỉ email"
                  type="email"
                  name="email"
                  value={formField.email}
                  variant="outlined"
                  required
                  className="w-100 authField"
                  size="small"
                  error={Boolean(formField.email) && !emailIsValid(formField.email)}
                  helperText={
                    Boolean(formField.email) && !emailIsValid(formField.email)
                      ? "Email không hợp lệ"
                      : ""
                  }
                  onChange={changeInput}
                />
              </div>
              <div className="form-group">
                <TextField
                  label="Nhập mật khẩu"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formField.password}
                  variant="outlined"
                  required
                  className="w-100 authField"
                  size="small"
                  error={Boolean(formField.password) && !passwordIsStrongEnough(formField.password)}
                  helperText={
                    Boolean(formField.password) && !passwordIsStrongEnough(formField.password)
                      ? "Ít nhất 8 ký tự, 1 chữ hoa và 1 số"
                      : ""
                  }
                  onChange={changeInput}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="form-group">
                <TextField
                  label="Nhập lại mật khẩu"
                  type={showConfirmPassword ? "text" : "password"}
                  variant="outlined"
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
                  className="w-100 authField"
                  size="small"
                  onChange={handleConfirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={() => setShowConfirmPassword((prev) => !prev)}
                          edge="end"
                          size="small"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="d-flex align-items-center mt-3 mb-3 authActions">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="btn-blue col btn-lg btn-big authPrimaryBtn"
                >
                  {isLoading ? "Đang xử lý..." : "Đăng ký"}
                </Button>
                <Button
                  className="btn-lg btn-big col authSecondaryBtn"
                  variant="outlined"
                  onClick={() => {
                    context.setisOpenHeaderFooterShow(true);
                    navigate("/");
                  }}
                >
                  Hủy
                </Button>
              </div>
              <p className="txt text-center">
                Đã có tài khoản?
                <span
                  className="border-effect ms-1 cursor"
                  onClick={() => navigate("/login")}
                >
                  Đăng nhập
                </span>
              </p>
              <div className="d-flex align-items-center dividerWrap">
                <div className="line" />
                <div>
                  <h6 className="m-1 text-center font-weight-bold">Hoặc</h6>
                </div>
                <div className="line" />
              </div>
              <Button
                className="loginWithGoogle mt-2"
                variant="outlined"
                onClick={handleGoogleLogin}
              >
                <FcGoogle className="me-1" />
                Đăng nhập với Google
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
