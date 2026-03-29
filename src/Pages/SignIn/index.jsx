import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import Logo from "../../assets/images/logo.webp";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FcGoogle } from "react-icons/fc";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseapp } from "../../firebase";
import { postData } from "../../apis/api";
import { useToast } from "../../utils/Toast";
import { Toast } from "../../utils/Toast";

const auth = getAuth(firebaseapp);
const provider = new GoogleAuthProvider();

const SignIn = () => {
  const context = useContext(MyContext);
  const { showToast, closeToast } = useToast();
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

  const signIn = (e) => {
    e.preventDefault();
    if (
      formfield.email === null ||
      formfield.password === null ||
      formfield.email === "" ||
      formfield.password === ""
    ) {
      alert("Please enter email and password");
    } else {
      try {
        postData("/user/login", formfield).then((data) => {
          if (data && data.user.isAdmin === false) {
            localStorage.setItem(
              "accessToken",
              JSON.stringify(data.accessToken),
            );
            localStorage.setItem("userData", JSON.stringify(data.user));
            showToast(data.message, "success");
            setTimeout(() => {
              window.location.href = "/";
              context.setisOpenHeaderFooterShow(true);
              closeToast();
            }, 2000);
          } else {
            showToast(data.message, "success");
            setTimeout(() => {
              window.location.href = "/login";
              context.setisOpenHeaderFooterShow(false);
              closeToast();
            }, 2000);
          }
        });
      } catch (error) {
        const errMessage = error.response?.data?.message || error.message;
        showToast(errMessage, "error");
      }
    }
  };

  useEffect(() => {
    context.setisOpenHeaderFooterShow(false);
  });

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
                <Button type="submit" className="btn-blue col btn-lg btn-big">
                  Sign In
                </Button>
                <a href="/" variant="outlined">
                  <Button
                    className="btn-lg btn-big col ms-2"
                    variant="outlined"
                    onClick={() => {
                      context.setisOpenHeaderFooterShow(true);
                    }}
                  >
                    Cancel
                  </Button>
                </a>
              </div>
              <p className="txt">
                Bạn có tài khoản chưa?
                <a className="border-effect ms-1" href="/signUp">
                  Đăng kí
                </a>
              </p>
              <div className="d-flex align-items-center">
                <div className="line" />
                <div>
                  <h6 className="m-1 text-center font-weight-bold">Hoặc</h6>
                </div>
                <div className="line" />
              </div>

              <Button className="loginWithGoogle mt-2" variant="outlined">
                <FcGoogle className="me-2" />
                Login with Google
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
