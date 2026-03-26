import { FiMenu } from "react-icons/fi";
import Button from "@mui/material/Button";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";

const Navigation = () => {
  const [isopenSidebarNav, setisopenSidebarNav] = useState(false);

  return (
    <>
      <nav>
        <div className="container">
          <div className="row">
            <div className="col-sm-2 navPart1">
              <div className="catWrapper">
                <Button
                  className="AllCateTab d-flex justify-items-center"
                  onClick={() => {
                    setisopenSidebarNav(!isopenSidebarNav);
                  }}
                >
                  <span className="icon1">
                    <FiMenu />
                  </span>
                  <span className="text">ALL CATEGORIES</span>
                  <span className="icon2">
                    <FaAngleDown />
                  </span>
                </Button>
                <div
                  className={`sidebarNav ${isopenSidebarNav === true ? "open" : ""}`}
                >
                  <ul>
                    <li>
                      <Link to="/">
                        <Button>
                          Fashion
                          <FaAngleRight className="ms-auto" />
                        </Button>
                      </Link>
                      <div className="submenu">
                        <Link to="/">
                          <Button>Men</Button>
                        </Link>
                        <Link to="/">
                          <Button>Men</Button>
                        </Link>
                        <Link to="/">
                          <Button>Women</Button>
                        </Link>
                        <Link to="/">
                          <Button>Children</Button>
                        </Link>
                      </div>
                    </li>
                    <li>
                      <Link to="/">
                        <Button>ELectronics</Button>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <Button>Children</Button>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-sm-10 navPart2 d-flex justify-items-center">
              <ul className="list list-inline ms-auto me-5">
                <li className="list-inline-item">
                  <Link to="/">
                    <Button>Fashion</Button>
                  </Link>
                  <div className="submenu shadow">
                    <Link to="/">
                      <Button>Men</Button>
                    </Link>
                    <Link to="/">
                      <Button>Women</Button>
                    </Link>
                    <Link to="/">
                      <Button>Children</Button>
                    </Link>
                  </div>
                </li>
                <li className="list-inline-item">
                  <Link to="/">
                    <Button>ELectronics</Button>
                  </Link>
                  <div className="submenu shadow">
                    <Link to="/">
                      <Button>Phone</Button>
                    </Link>
                    <Link to="/">
                      <Button>Laptop</Button>
                    </Link>
                    <Link to="/">
                      <Button>PC</Button>
                    </Link>
                  </div>
                </li>
                <li className="list-inline-item">
                  <Link to="/">
                    <Button>ELectronics</Button>
                  </Link>
                  <div className="submenu shadow">
                    <Link to="/">
                      <Button>Phone</Button>
                    </Link>
                    <Link to="/">
                      <Button>Laptop</Button>
                    </Link>
                    <Link to="/">
                      <Button>PC</Button>
                    </Link>
                  </div>
                </li>
                <li className="list-inline-item">
                  <Link to="/">
                    <Button>ELectronics</Button>
                  </Link>
                  <div className="submenu shadow">
                    <Link to="/">
                      <Button>Phone</Button>
                    </Link>
                    <Link to="/">
                      <Button>Laptop</Button>
                    </Link>
                    <Link to="/">
                      <Button>PC</Button>
                    </Link>
                  </div>
                </li>
                <li className="list-inline-item">
                  <Link to="/">
                    <Button>ELectronics</Button>
                  </Link>
                  <div className="submenu shadow">
                    <Link to="/">
                      <Button>Phone</Button>
                    </Link>
                    <Link to="/">
                      <Button>Laptop</Button>
                    </Link>
                    <Link to="/">
                      <Button>PC</Button>
                    </Link>
                  </div>
                </li>
                <li className="list-inline-item">
                  <Link to="/">
                    <Button>ELectronics</Button>
                  </Link>
                  <div className="submenu shadow">
                    <Link to="/">
                      <Button>Phone</Button>
                    </Link>
                    <Link to="/">
                      <Button>Laptop</Button>
                    </Link>
                    <Link to="/">
                      <Button>PC</Button>
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
