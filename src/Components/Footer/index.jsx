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

const Footer = () => {
  return (
    <>
      <section className="newsLetterSection mt-3 mb-3 d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p className="text-white mb-1">
                $20 discount for your first order
              </p>
              <h3 className="text-white">Join our newsletter and get...</h3>
              <p className="text-light">
                Join our email subscription now to get updates on
                <br /> promotions and coupons.
              </p>
              <form>
                <IoMailOutline />
                <input type="text" placeholder="Your Email Address" />
                <Button>Subscribe</Button>
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
              <span className="ms-2">Everyday fresh products</span>
            </div>
            <div className="col d-flex align-items-center">
              <span>
                <TbTruckDelivery />
              </span>
              <span className="ms-2">Free delivery for order over $70</span>
            </div>
            <div className="col d-flex align-items-center">
              <span>
                <PiSealPercentBold />
              </span>
              <span className="ms-2">Daily Mega Discounts</span>
            </div>
            <div className="col d-flex align-items-center">
              <span>
                <CiBadgeDollar />
              </span>
              <span className="ms-2">Best price on the market</span>
            </div>
          </div>
          <div className="row mt-5 linksWrap">
            <div className="col">
              <h5>FRUIT &amp; VEGETABLES</h5>
              <ul>
                <li>
                  <a href="/">Fresh Vegetables</a>
                </li>
                <li>
                  <a href="/">Herbs &amp; Seasonings</a>
                </li>
                <li>
                  <a href="/">Fresh Fruits</a>
                </li>
                <li>
                  <a href="/">Cuts &amp; Sprouts</a>
                </li>
                <li>
                  <a href="/">Exotic Fruits &amp; Veggies</a>
                </li>
                <li>
                  <a href="/">Packaged Produce</a>
                </li>
                <li>
                  <a href="/">Party Trays</a>
                </li>
              </ul>
            </div>
            <div className="col">
              <h5>BREAKFAST &amp; DAIRY</h5>
              <ul>
                <li>
                  <a href="/">Fresh Vegetables</a>
                </li>
                <li>
                  <a href="/">Herbs &amp; Seasonings</a>
                </li>
                <li>
                  <a href="/">Fresh Fruits</a>
                </li>
                <li>
                  <a href="/">Cuts &amp; Sprouts</a>
                </li>
                <li>
                  <a href="/">Exotic Fruits &amp; Veggies</a>
                </li>
                <li>
                  <a href="/">Packaged Produce</a>
                </li>
                <li>
                  <a href="/">Party Trays</a>
                </li>
              </ul>
            </div>
            <div className="col">
              <h5>MEAT &amp; SEAFOOD</h5>
              <ul>
                <li>
                  <a href="/">Fresh Vegetables</a>
                </li>
                <li>
                  <a href="/">Herbs &amp; Seasonings</a>
                </li>
                <li>
                  <a href="/">Fresh Fruits</a>
                </li>
                <li>
                  <a href="/">Cuts &amp; Sprouts</a>
                </li>
                <li>
                  <a href="/">Exotic Fruits &amp; Veggies</a>
                </li>
                <li>
                  <a href="/">Packaged Produce</a>
                </li>
                <li>
                  <a href="/">Party Trays</a>
                </li>
              </ul>
            </div>
            <div className="col">
              <h5>BEVERAGES</h5>
              <ul>
                <li>
                  <a href="/">Fresh Vegetables</a>
                </li>
                <li>
                  <a href="/">Herbs &amp; Seasonings</a>
                </li>
                <li>
                  <a href="/">Fresh Fruits</a>
                </li>
                <li>
                  <a href="/">Cuts &amp; Sprouts</a>
                </li>
                <li>
                  <a href="/">Exotic Fruits &amp; Veggies</a>
                </li>
                <li>
                  <a href="/">Packaged Produce</a>
                </li>
                <li>
                  <a href="/">Party Trays</a>
                </li>
              </ul>
            </div>
            <div className="col">
              <h5>BREADS &amp; BAKERY</h5>
              <ul>
                <li>
                  <a href="/">Fresh Vegetables</a>
                </li>
                <li>
                  <a href="/">Herbs &amp; Seasonings</a>
                </li>
                <li>
                  <a href="/">Fresh Fruits</a>
                </li>
                <li>
                  <a href="/">Cuts &amp; Sprouts</a>
                </li>
                <li>
                  <a href="/">Exotic Fruits &amp; Veggies</a>
                </li>
                <li>
                  <a href="/">Packaged Produce</a>
                </li>
                <li>
                  <a href="/">Party Trays</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="copyright mt-3 pt-3 pb-3 d-flex">
            <p className="mb-0">david</p>
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
