import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Virtual } from "swiper/modules";
import { useContext } from "react";
import { MyContext } from "../../App";

const HomeCate = () => {
  const context = useContext(MyContext);
  const categoryData = context.categoryData;

  return (
    <>
      <div className="container">
        <section className="homeCate">
          <div className="container">
            <div className="info2">Featured Categories</div>
            <Swiper
              slidesPerView={8}
              spaceBetween={20}
              navigation={true}
              slidesPerGroup={3}
              breakpoints={{
                0: { slidesPerView: 2, slidesPerGroup: 1 },
                480: { slidesPerView: 3, slidesPerGroup: 1 },
                640: { slidesPerView: 4, slidesPerGroup: 2 },
                900: { slidesPerView: 6, slidesPerGroup: 2 },
                1200: { slidesPerView: 8, slidesPerGroup: 3 },
              }}
              modules={[Navigation, Virtual]}
              className="mySwiper"
              virtual
            >
              {categoryData.category &&
                categoryData.category.length > 0 &&
                categoryData.category?.map((item) => {
                  return (
                    <SwiperSlide key={item.id}>
                      <div
                        className="item text-center cursor"
                        style={{ background: item.color }}
                      >
                        <img src={item.images?.[0] || ""} alt={item.name} />
                      </div>
                      <h6>{item.name}</h6>
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
