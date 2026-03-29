import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const HomeBanner = () => {
  return (
    <>
      <div className="container">
        <div className="homeBannerSection mt-1">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{ clickable: true }}
            loop={true}
            allowTouchMove={false}
            speed={5000}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
              reverseDirection: true,
            }}
            modules={[Navigation, Autoplay, Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="item">
                <img
                  src="https://eu.louisvuitton.com/images/is/image//content/dam/lv/editorial-content/New-Homepage/2026/central/collections/women-show-ss26/WOMEN_SHOW_SS26_HP_Push_feb27_DI3.jpg?wid=1440"
                  alt="banner"
                  className=""
                ></img>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item">
                <img
                  src="https://eu.louisvuitton.com/images/is/image//content/dam/lv/editorial-content/New-Homepage/2026/central/collections/women-show-ss26/WOMEN_SHOW_SS26_HP_Push_feb27_DI3.jpg?wid=1440"
                  alt="banner"
                  className=""
                ></img>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item">
                <img
                  src="https://eu.louisvuitton.com/images/is/image//content/dam/lv/editorial-content/New-Homepage/2026/central/collections/women-show-ss26/WOMEN_SHOW_SS26_HP_Push_feb27_DI3.jpg?wid=1440"
                  alt="banner"
                  className=""
                ></img>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};
export default HomeBanner;
