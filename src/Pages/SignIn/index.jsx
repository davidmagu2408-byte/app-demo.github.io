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

const SignIn = () => {
  const context = useContext(MyContext);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formfield, setformfield] = useState({
    email: "",
    password: "",
  });

  const emailIsValid = (value) => /\S+@\S+\.\S+/.test(value);
  const passwordIsStrongEnough = (value) => value.length >= 8;

  const changeInput = (e) => {
    setformfield({
      ...formfield,
      [e.target.name]: e.target.value,
    });
  };

  const signIn = async (e) => {
    e.preventDefault();
    const trimmedEmail = formfield.email.trim();
    const trimmedPassword = formfield.password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      showToast("Vui lòng nhập email và mật khẩu", "error");
      return;
    }

    if (!emailIsValid(trimmedEmail)) {
      showToast("Email không hợp lệ", "error");
      return;
    }

    if (!passwordIsStrongEnough(trimmedPassword)) {
      showToast("Mật khẩu phải có ít nhất 8 ký tự", "error");
      return;
    }

    const payload = {
      email: trimmedEmail,
      password: trimmedPassword,
    };

    setIsLoading(true);
    try {
      const data = await postData("/user/login", payload);
      if (data && data.success === true) {
        if (data.user.isAdmin === true) {
          showToast("Tài khoản Admin không thể đăng nhập tại đây", "error");
        } else {
          localStorage.setItem("accessToken", data.accessToken);
          context.setAccessToken(data.accessToken);
          context.setUser(data.user);
          showToast(data.message, "success");
          setTimeout(() => {
            context.setisOpenHeaderFooterShow(true);
            navigate("/");
          }, 1000);
        }
      } else {
        showToast(data?.message || "Đăng nhập thất bại", "error");
      }
    } catch (error) {
      showToast(error.response?.data?.message || "Đăng nhập thất bại", "error");
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
              <span className="brandBadge">Premium Store</span>
              <h2>ECOMMERCE WEBSITE</h2>
            </div>
            <form className="mt-1" onSubmit={signIn}>
              <h2 className="mb-3 authTitle">Đăng nhập</h2>
              <div className="form-group position-relative">
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  name="email"
                  value={formfield.email}
                  onChange={changeInput}
                  required
                  className="w-100 authField"
                  size="small"
                  error={Boolean(formfield.email) && !emailIsValid(formfield.email)}
                  helperText={
                    Boolean(formfield.email) && !emailIsValid(formfield.email)
                      ? "Email không hợp lệ"
                      : ""
                  }
                />
              </div>
              <div className="form-group">
                <TextField
                  label="Mật khẩu"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formfield.password}
                  onChange={changeInput}
                  autoComplete="off"
                  variant="outlined"
                  required
                  className="w-100 authField"
                  size="small"
                  error={Boolean(formfield.password) && !passwordIsStrongEnough(formfield.password)}
                  helperText={
                    Boolean(formfield.password) && !passwordIsStrongEnough(formfield.password)
                      ? "Mật khẩu phải có ít nhất 8 ký tự"
                      : ""
                  }
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
              <div className="d-flex align-items-center justify-content-between mb-3 authMeta">
                <label className="rememberWrap">
                  <input type="checkbox" defaultChecked />
                  <span>Ghi nhớ</span>
                </label>
                <a className="border-effect cursor" href="/#">
                  Quên mật khẩu?
                </a>
              </div>
              <div className="d-flex align-items-center mt-3 mb-3 authActions">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="btn-blue col btn-lg btn-big authPrimaryBtn"
                >
                  {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
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
                Bạn chưa có tài khoản?
                <span
                  className="border-effect ms-1 cursor"
                  onClick={() => navigate("/signUp")}
                >
                  Đăng ký ngay
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
                <FcGoogle className="me-2" />
                Đăng nhập với Google
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
