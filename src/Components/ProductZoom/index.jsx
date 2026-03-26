import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";

const ProductZoom = () => {
  const [zoomSliderBig, setzoomSliderBig] = useState(null);
  return (
    <div className="productZoom">
      <div className="productZoom productZoomBig position-relative mb-3">
        <div class="badge badge-primary">10%</div>
        <Swiper
          spaceBetween={0}
          navigation={true}
          thumbs={{ swiper: zoomSliderBig }}
          modules={[FreeMode, Navigation, Thumbs]}
        >
          <SwiperSlide>
            <div className="item">
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1}
                className=""
                src={`https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-62.jpg`}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item">
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1}
                className=""
                src={`https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image2-47.jpg`}
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <Swiper
        onSwiper={setzoomSliderBig}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="zoomSlider mb-2"
      >
        <SwiperSlide>
          <div className="item">
            <img
              src={`https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-62.jpg`}
              className="w-100"
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item">
            <img
              src={`https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image2-47.jpg`}
              className="w-100"
              alt=""
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ProductZoom;
