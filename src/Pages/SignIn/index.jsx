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
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";

const SignIn = () => {
  const context = useContext(MyContext);
  const { showToast, closeToast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formfield, setformfield] = useState({
    email: "",
    password: "",
  });

  const changeInput = (e) => {
    setformfield({
      ...formfield,
      [e.target.name]: e.target.value,
    });
  };

  const signIn = async (e) => {
    e.preventDefault();
    if (!formfield.email.trim() || !formfield.password.trim()) {
      showToast("Vui lòng nhập email và mật khẩu", "error");
      return;
    }
    setIsLoading(true);
    try {
      const data = await postData("/user/login", formfield);
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
              fill="#007BFF"
            />
          </svg>
        </div>
        <div className="container">
          <div className="box card p-3 shadow border-0">
            <div className="text-center imgSignIn">
              <img src={Logo} alt="Logo" />
            </div>
            <div className="text-center mt-1">
              <h2>ECOMERCE WEBSITE</h2>
            </div>
            <form className="mt-1" onSubmit={signIn}>
              <h2 className="mb-2">Đăng nhập</h2>
              <div className="form-group position-relative">
                <TextField
                  id="standard-basic"
                  label="Email"
                  type="email"
                  variant="standard"
                  name="email"
                  onChange={changeInput}
                  required
                  className="w-100"
                />
              </div>
              <div className="form-group">
                <TextField
                  id="standard-basic"
                  label="Password"
                  type="password"
                  name="password"
                  onChange={changeInput}
                  autoComplete="off"
                  variant="standard"
                  required
                  className="w-100"
                />
              </div>
              <a className="border-effect cursor" href="/#">
                Quên mật khẩu?
              </a>
              <div className="d-flex align-items-center mt-3 mb-3">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="btn-blue col btn-lg btn-big"
                >
                  {isLoading ? "Đang đăng nhập..." : "Sign In"}
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
                Bạn có tài khoản chưa?
                <span
                  className="border-effect ms-1 cursor"
                  onClick={() => navigate("/signUp")}
                >
                  Đăng kí
                </span>
              </p>
              <div className="d-flex align-items-center">
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
