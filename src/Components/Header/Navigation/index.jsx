import { FiMenu } from "react-icons/fi";
import Button from "@mui/material/Button";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { MyContext } from "../../../App";

const Navigation = ({ isMobileMenuOpen, onMobileMenuToggle }) => {
  const [isopenSidebarNav, setisopenSidebarNav] = useState(false);
  const context = useContext(MyContext);
  const categoryData = context.categoryData;
  const subcategoryData = context.subcategoryData;

  const renderCategoryLinks = () =>
    categoryData?.categoryList &&
    categoryData.categoryList.length > 0 &&
    categoryData.categoryList.map((item) => {
      const subItems = subcategoryData?.subCategoryList || [];
      return (
        <li className="list-inline-item" key={item.id || item._id}>
          <Link to={`/cat/${item._id}`} onClick={() => onMobileMenuToggle?.(false)}>
            <Button>{item.name}</Button>
          </Link>
          {subItems.filter((sub) => String(sub.category) === String(item._id || item.id)).length > 0 && (
            <div className="submenu shadow">
              {subItems
                .filter((sub) => String(sub.category) === String(item._id || item.id))
                .map((it) => (
                  <Link
                    to={`/cat/${item._id}?subCat=${it._id}`}
                    key={it._id || it.id}
                    onClick={() => onMobileMenuToggle?.(false)}
                  >
                    <Button>{it.name}</Button>
                  </Link>
                ))}
            </div>
          )}
        </li>
      );
    });

  return (
    <>
      <nav className={`mainNav ${isMobileMenuOpen ? "mobile-open" : ""}`}>
        <div className="container">
          <div className="row navRow">
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
                    {categoryData?.categoryList &&
                      categoryData.categoryList.length > 0 &&
                      categoryData.categoryList.map((item) => {
                        const subItems = subcategoryData?.subCategoryList || [];
                        return (
                          <li key={item.id || item._id}>
                            <Link to={`/cat/${item._id}`} onClick={() => setisopenSidebarNav(false)}>
                              <Button>
                                {item.name}
                                <FaAngleRight className="ms-auto" />
                              </Button>
                            </Link>
                            {subItems.filter((sub) => String(sub.category) === String(item._id || item.id)).length > 0 && (
                              <div className="submenu">
                                {subItems
                                  .filter((sub) => String(sub.category) === String(item._id || item.id))
                                  .map((it) => (
                                    <Link
                                      to={`/cat/${item._id}?subCat=${it._id}`}
                                      key={it._id || it.id}
                                      onClick={() => setisopenSidebarNav(false)}
                                    >
                                      <Button>{it.name}</Button>
                                    </Link>
                                  ))}
                              </div>
                            )}
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-sm-10 navPart2 d-flex justify-items-center">
              <div className="mobileNavToggleWrap">
                <Button
                  className="mobileNavToggle"
                  onClick={() => onMobileMenuToggle?.(!isMobileMenuOpen)}
                >
                  <FiMenu />
                  Menu
                </Button>
              </div>
              <ul className={`list list-inline ms-auto me-5 ${isMobileMenuOpen ? "mobile-open" : ""}`}>
                {renderCategoryLinks()}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
