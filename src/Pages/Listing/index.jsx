import SideBar from "../../Components/SideBar";
import Button from "@mui/material/Button";
import { IoIosMenu } from "react-icons/io";
import { BiSolidGrid } from "react-icons/bi";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { FaAngleDown } from "react-icons/fa";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import ProductItem from "../../Components/ProductItem";
import Pagination from "@mui/material/Pagination";

const Listing = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [productView, setproductView] = useState("four");
  const openDrop = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <section className="product_Listing_Page">
        <div className="container">
          <div className="productListing d-flex">
            <SideBar />
            <div className="content_right">
              <div class="showBy mt-0 mb-3 d-flex align-items-center">
                <div class="d-flex align-items-center btnWrapper">
                  <Button
                    className={console.log(productView === "one" && "act")}
                    onClick={() => {
                      setproductView("one");
                    }}
                  >
                    <IoIosMenu />
                  </Button>
                  <Button
                    className={productView === "three" && "act"}
                    onClick={() => {
                      setproductView("three");
                    }}
                  >
                    <BiSolidGrid />
                  </Button>
                  <Button
                    className={productView === "four" && "act"}
                    onClick={() => {
                      setproductView("four");
                    }}
                  >
                    <TfiLayoutGrid4Alt />
                  </Button>
                </div>
                <div class="ms-auto showByFilter">
                  <Button onClick={handleClick}>
                    Show 9 <FaAngleDown />
                  </Button>
                  <Menu
                    id="basic-menu showPerPageDropdown"
                    slotProps={{
                      list: {
                        "aria-labelledby": "fade-button",
                      },
                    }}
                    slots={{ transition: Fade }}
                    anchorEl={anchorEl}
                    open={openDrop}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>40</MenuItem>
                    <MenuItem onClick={handleClose}>50</MenuItem>
                    <MenuItem onClick={handleClose}>60</MenuItem>
                  </Menu>
                </div>
              </div>
              <div className="productListing">
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
              </div>
              <div className="d-flex align-items-center justify-content-center mt-3">
                <Pagination count={10} color="primary" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Listing;
