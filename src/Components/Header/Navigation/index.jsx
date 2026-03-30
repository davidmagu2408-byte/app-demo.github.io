import { FiMenu } from "react-icons/fi";
import Button from "@mui/material/Button";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { MyContext } from "../../../App";

const Navigation = () => {
  const [isopenSidebarNav, setisopenSidebarNav] = useState(false);
  const context = useContext(MyContext);
  const categoryData = context.categoryData;
  const subcategoryData = context.subcategoryData;

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
                    {categoryData.category &&
                      categoryData.category.length > 0 &&
                      categoryData.category.map((item) => {
                        return (
                          <li key={item.id}>
                            <Link to={`/cat/${item._id}`}>
                              <Button>
                                {item.name}
                                <FaAngleRight className="ms-auto" />
                              </Button>
                            </Link>
                            <div className="submenu">
                              {subcategoryData.subCategory &&
                                subcategoryData.subCategory.length > 0 &&
                                subcategoryData.subCategory
                                  .filter((sub) => sub.category === item.id)
                                  .map((it) => {
                                    return (
                                      <Link to={`/cat/${item._id}?subCat=${it._id}`} key={it.id}>
                                        <Button>{it.name}</Button>
                                      </Link>
                                    );
                                  })}
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-sm-10 navPart2 d-flex justify-items-center">
              <ul className="list list-inline ms-auto me-5">
                {categoryData.category &&
                  categoryData.category.length > 0 &&
                  categoryData.category.map((item) => {
                    return (
                      <li className="list-inline-item" key={item.id}>
                        <Link to={`/cat/${item._id}`}>
                          <Button>{item.name}</Button>
                        </Link>
                        <div className="submenu shadow">
                          {subcategoryData.subCategory &&
                            subcategoryData.subCategory.length > 0 &&
                            subcategoryData.subCategory
                              .filter((sub) => sub.category === item.id)
                              .map((it) => {
                                return (
                                  <Link to={`/cat/${item._id}?subCat=${it._id}`} key={it.id}>
                                    <Button>{it.name}</Button>
                                  </Link>
                                );
                              })}
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
