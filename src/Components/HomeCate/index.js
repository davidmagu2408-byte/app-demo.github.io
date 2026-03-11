import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useState } from "react";

const HomeCate = () => {
  const [itemBg, setItemBg] = useState([
    "#fffceb",
    "#ecffec",
    "#feefea",
    "#fff3eb",
    "#fff3ff",
    "#f2fce4",
    "#fffceb",
    "#ecffec",
    "#feefea",
    "#fff3eb",
    "#fff3ff",
    "#f2fce4",
  ]);
  console.log(setItemBg);
  return (
    <>
      <div className="container">
        <section className="homeCate">
          <div className="container">
            <div className="info2">Featured Categories</div>
            <Swiper
              slidesPerView={8}
              spaceBetween={30}
              navigation={true}
              slidesPerGroup={3}
              modules={[Navigation]}
              className="mySwiper"
            >
              {itemBg?.map((item, index) => {
                return (
                  <SwiperSlide>
                    <div
                      className="item text-center cursor"
                      style={{ background: item }}
                    >
                      <img
                        src="https://nest.botble.com/storage/product-categories/image-9.png"
                        alt=""
                      />
                    </div>
                    <h6>Red Apple</h6>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomeCate;
