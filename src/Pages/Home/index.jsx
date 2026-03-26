import HomeBanner from "../../Components/HomeBanner";
import { IoIosArrowRoundForward } from "react-icons/io";
import Button from "@mui/material/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ProductItem from "../../Components/ProductItem";
import HomeCate from "../../Components/HomeCate";

const Home = () => {
  return (
    <>
      <HomeBanner />
      <HomeCate />
      <section className="homeProducts">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="banner mt-4">
                <img
                  src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/banner-box.jpg"
                  alt="banner"
                  className="cursor w-100"
                ></img>
              </div>
              <div className="banner mt-5">
                <img
                  src="https://api.spicezgold.com/download/file_1734525767798_NewProject(35).jpg"
                  alt="banner"
                  className="cursor w-100"
                ></img>
              </div>
            </div>
            <div className="col-md-9 productRow">
              <div className="d-flex align-items-center">
                <div className="info w-75">
                  <h3 className="mb-0 hd">Best sellers</h3>
                  <p className="text-light text-sml mb-0">
                    Do not miss the current offers untill the end of March
                  </p>
                </div>
                <Button className="viewAllBtn ms-auto">
                  View all
                  <IoIosArrowRoundForward />
                </Button>
              </div>
              <div className="product_row w-100 mt-4 mb-4">
                <Swiper
                  slidesPerView={4}
                  spaceBetween={10}
                  navigation={true}
                  slidesPerGroup={3}
                  modules={[Navigation]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <ProductItem />
                  </SwiperSlide>
                  <SwiperSlide>
                    <ProductItem />
                  </SwiperSlide>
                  <SwiperSlide>
                    <ProductItem />
                  </SwiperSlide>
                  <SwiperSlide>
                    <ProductItem />
                  </SwiperSlide>
                  <SwiperSlide>
                    <ProductItem />
                  </SwiperSlide>
                </Swiper>
              </div>
              <div className="d-flex align-items-center">
                <div className="info w-75">
                  <h3 className="mb-0 hd">New products</h3>
                  <p className="text-light text-sml mb-0">
                    New products with updated stocks.
                  </p>
                </div>
                <Button className="viewAllBtn ms-auto">
                  View all
                  <IoIosArrowRoundForward />
                </Button>
              </div>
              <div className="product_row productRow2 w-100 mt-4 d-flex">
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
              </div>

              <div className="row">
                <div className="banner mt-4">
                  <img src="" alt="" className="cursor w-100" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Home;
