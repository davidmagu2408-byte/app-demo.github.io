import { LuShirt } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { PiSealPercentBold } from "react-icons/pi";
import { CiBadgeDollar } from "react-icons/ci";
import { FaFacebookF } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import LogoLetter from "../../assets/images/newsletter.png";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";

const Footer = () => {
  const context = useContext(MyContext);
  const categories = context.categoryData?.category || [];
  const subcategories = context.subcategoryData?.subCategory || [];

  // Split categories into columns (max 5 columns)
  const footerCols = categories.slice(0, 5);

  return (
    <>
      <section className="newsLetterSection mt-3 mb-3 d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p className="text-white mb-1">Giảm 20% cho đơn hàng đầu tiên</p>
              <h3 className="text-white">Đăng ký nhận tin khuyến mãi...</h3>
              <p className="text-light">
                Đăng ký email để nhận thông tin
                <br /> khuyến mãi và ưu đãi mới nhất.
              </p>
              <form onSubmit={(e) => e.preventDefault()}>
                <IoMailOutline />
                <input type="text" placeholder="Nhập email của bạn" />
                <Button>Đăng ký</Button>
              </form>
            </div>
            <div className="col-md-6">
              <img src={LogoLetter} alt="banner" />
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="container"></div>
        <div className="container">
          <div className="topInfo row">
            <div className="col d-flex align-items-center">
              <span>
                <LuShirt />
              </span>
              <span className="ms-2">Sản phẩm mới mỗi ngày</span>
            </div>
            <div className="col d-flex align-items-center">
              <span>
                <TbTruckDelivery />
              </span>
              <span className="ms-2">Miễn phí vận chuyển đơn từ 500K</span>
            </div>
            <div className="col d-flex align-items-center">
              <span>
                <PiSealPercentBold />
              </span>
              <span className="ms-2">Ưu đãi lớn mỗi ngày</span>
            </div>
            <div className="col d-flex align-items-center">
              <span>
                <CiBadgeDollar />
              </span>
              <span className="ms-2">Giá tốt nhất thị trường</span>
            </div>
          </div>
          <div className="row mt-5 linksWrap">
            {footerCols.map((cat) => {
              const subs = subcategories.filter((s) => s.category === cat.id);
              return (
                <div className="col" key={cat._id}>
                  <h5>
                    <Link
                      to={`/cat/${cat._id}`}
                      className="text-decoration-none text-dark"
                    >
                      {cat.name?.toUpperCase()}
                    </Link>
                  </h5>
                  <ul>
                    {subs.length > 0 ? (
                      subs.map((sub) => (
                        <li key={sub._id}>
                          <Link to={`/cat/${cat._id}?subCat=${sub._id}`}>
                            {sub.name}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <li>
                        <Link to={`/cat/${cat._id}`}>Xem tất cả</Link>
                      </li>
                    )}
                  </ul>
                </div>
              );
            })}
          </div>
          <div className="copyright mt-3 pt-3 pb-3 d-flex">
            <p className="mb-0">
              © {new Date().getFullYear()} Ecommerce Website. All rights
              reserved.
            </p>
            <ul className="list list-inline ms-auto mb-0 socials">
              <li className="list-inline-item">
                <a href="/">
                  <FaFacebookF />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="/">
                  <FaXTwitter />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="/">
                  <FaInstagram />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
