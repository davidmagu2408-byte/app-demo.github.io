import React, { useContext, useEffect } from "react";
import { MyContext } from "../../App";
import Logo from "../../assests/images/logo.jpg";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
  const context = useContext(MyContext);
  useEffect(() => {
    context.setisOpenHeaderFooterShow(false);
  });

  return (
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
          <div className="text-center">
            <img src={Logo} alt="Logo" />
          </div>
          <form className="mt-1">
            <h2 className="mb-2">Sign Up</h2>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <TextField
                    id="standard-basic"
                    label="Name"
                    type="text"
                    variant="standard"
                    required
                    className="w-100"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <TextField
                    id="standard-basic"
                    label="Phone No."
                    type="number"
                    variant="standard"
                    required
                    className="w-100"
                  />
                </div>
              </div>
            </div>
            <div className="form-group position-relative">
              <TextField
                id="standard-basic"
                label="Email"
                type="email"
                variant="standard"
                required
                className="w-100"
              />
            </div>
            <div className="form-group">
              <TextField
                id="standard-basic"
                label="Password"
                type="password"
                variant="standard"
                required
                className="w-100"
              />
            </div>
            <div className="d-flex align-items-center mt-3 mb-3">
              <Button className="btn-blue col btn-lg btn-big">Sign Up</Button>
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
              Not Registered?
              <a className="border-effect" href="/signUp">
                Sign In
              </a>
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
  );
};

export default SignUp;
