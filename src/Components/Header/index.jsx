import { Link } from "react-router-dom";
import Logo from "../../assests/images/logo.jpg";
import CountryDropDown from "../CountryDropDown";
import Button from "@mui/material/Button";
import { IoBagOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import SearchBox from "./SearchBox";
import Navigation from "./Navigation";
import { useContext } from "react";
import { MyContext } from "../../App";

const Header = () => {
  const context = useContext(MyContext);
  return (
    <>
      <div className="headerWrapper">
        <div className="top-strip bg-blue">
          <div className="container">
            <p className="mb-0 mt-0 text-center">
              {" "}
              Due to the <b>COVID 19</b> epidemic, orders may be processed with
              a slight delay
            </p>
          </div>
        </div>
        <header className="header">
          <div className="container">
            <div className="row">
              <div className="logoWrapper d-flex align-items-center col-sm-2">
                <Link to={"/"}>
                  <img src={Logo} alt="Logo" />
                </Link>
              </div>
              <div className="col-sm-10 d-flex align-items-center part2">
                {context.countryList.lenght !== 0 && <CountryDropDown />}
                <SearchBox />
                <div className="part3 d-flex align-items-center">
                  <a href="/SignIn">
                    <Button className="circle">
                      <FiUser />
                    </Button>
                  </a>
                  <div className="ml-auto cartTab d-flex align-items-center">
                    <span className="price">50000</span>
                    <div className="position-relative">
                      <a href="/cart">
                        <Button className="circle ml-2">
                          <IoBagOutline />
                        </Button>
                        <span className="count d-flex align-items-center justify-content-center">
                          1
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <Navigation />
      </div>
    </>
  );
};
export default Header;
