import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.webp";
import CountryDropDown from "../CountryDropDown";
import Button from "@mui/material/Button";
import { IoBagOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { IoLogOutOutline, IoReceiptOutline } from "react-icons/io5";
import SearchBox from "./SearchBox";
import Navigation from "./Navigation";
import { useContext, useState } from "react";
import { MyContext } from "../../App";
import LoadingBar from "../LoadingBar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";

const Header = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleUserClick = (e) => {
    if (context.user) {
      setAnchorEl(e.currentTarget);
    } else {
      navigate("/login");
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    await context.handleLogout();
    context.setisOpenHeaderFooterShow(false);
    navigate("/login");
  };

  const handleRefresh = () => {
    setProgress(30);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setProgress(70), 300);
    setTimeout(() => {
      setProgress(100);
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
                {context.countryList && context.countryList.length !== 0 && (
                  <CountryDropDown />
                )}
                <SearchBox />
                <div className="part3 d-flex align-items-center">
                  {context.user ? (
                    <>
                      <Button
                        className="circle userBtn"
                        onClick={handleUserClick}
                      >
                        <FiUser />
                      </Button>
                      <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        transformOrigin={{
                          horizontal: "right",
                          vertical: "top",
                        }}
                        anchorOrigin={{
                          horizontal: "right",
                          vertical: "bottom",
                        }}
                      >
                        <MenuItem disabled>
                          <span style={{ fontWeight: 600 }}>
                            {context.user.name}
                          </span>
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleClose();
                            navigate("/orders");
                          }}
                        >
                          <ListItemIcon>
                            <IoReceiptOutline size={20} />
                          </ListItemIcon>
                          Đơn hàng
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                          <ListItemIcon>
                            <IoLogOutOutline size={20} />
                          </ListItemIcon>
                          Đăng xuất
                        </MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <Link to="/login">
                      <Button className="circle">
                        <FiUser />
                      </Button>
                    </Link>
                  )}
                  <div className="ml-auto cartTab d-flex align-items-center">
                    <span className="price">
                      {(context.cartData || [])
                        .reduce((s, i) => s + i.price * i.quantity, 0)
                        .toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                    </span>
                    <div className="position-relative">
                      <Link to="/cart">
                        <Button className="circle ml-2">
                          <IoBagOutline />
                        </Button>
                        <span className="count d-flex align-items-center justify-content-center">
                          {(context.cartData || []).reduce(
                            (s, i) => s + i.quantity,
                            0,
                          )}
                        </span>
                      </Link>
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
