import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useEffect, useState, useCallback } from "react";
import { fetchDataFromAPI } from "../../apis/api";

const HomeBanner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetchDataFromAPI("/banner").then((data) => {
      if (data?.bannerList) {
        setBanners(data.bannerList);
      }
    });
  }, []);

  const handleReachEnd = useCallback((swiper) => {
    swiper.params.autoplay.reverseDirection = true;
  }, []);

  const handleReachBeginning = useCallback((swiper) => {
    swiper.params.autoplay.reverseDirection = false;
  }, []);

  return (
    <>
      <div className="container">
        <div className="homeBannerSection mt-1">
          {banners.length > 0 ? (
            <Swiper
              slidesPerView={1}
              spaceBetween={0}
              pagination={{ clickable: true }}
              navigation={true}
              speed={800}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                reverseDirection: false,
              }}
              onReachEnd={handleReachEnd}
              onReachBeginning={handleReachBeginning}
              modules={[Navigation, Autoplay, Pagination]}
              className="mySwiper"
            >
              {banners.map((banner) =>
                banner.images?.map((img, i) => (
                  <SwiperSlide key={`${banner.id}-${i}`}>
                    <div className="item">
                      <img src={img} alt={banner.name} />
                    </div>
                  </SwiperSlide>
                )),
              )}
            </Swiper>
          ) : (
            <div
              className="item placeholder-banner"
              style={{
                height: "400px",
                background: "#f0f0f0",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p style={{ color: "#999" }}>Đang tải banner...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default HomeBanner;
