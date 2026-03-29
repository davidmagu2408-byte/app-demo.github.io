import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.webp";
import CountryDropDown from "../CountryDropDown";
import Button from "@mui/material/Button";
import { IoBagOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import SearchBox from "./SearchBox";
import Navigation from "./Navigation";
import { useContext, useState } from "react";
import { MyContext } from "../../App";
import LoadingBar from "../LoadingBar";

const Header = () => {
  const context = useContext(MyContext);
  const [progress, setProgress] = useState(0);

  const handleRefresh = () => {
    // 1. Start the bar
    setProgress(30);

    // 2. Scroll to top immediately
    window.scrollTo({ top: 0, behavior: "smooth" });

    // 3. Simulate loading (or real data fetch)
    setTimeout(() => setProgress(70), 300);

    setTimeout(() => {
      setProgress(100);
      // 4. Reset bar after completion
      setTimeout(() => setProgress(0), 400);
    }, 800);
  };
  return (
    <>
      <div className="headerWrapper">
        <LoadingBar progress={progress} />
        <header className="header">
          <div className="container">
            <div className="row">
              <div className="logoWrapper d-flex align-items-center col-sm-2">
                <Link to={"/"} href="/">
                  <img src={Logo} alt="Logo" onClick={handleRefresh} />
                </Link>
              </div>
              <div className="col-sm-10 d-flex align-items-center part2">
                {context.countryList && context.countryList.lenght !== 0 && (
                  <CountryDropDown />
                )}
                <SearchBox />
                <div className="part3 d-flex align-items-center">
                  <a href="/login">
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
