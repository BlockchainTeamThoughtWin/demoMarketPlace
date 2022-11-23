// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { getNFt } from "../pages/api/apiCalls"
import style from "../styles/CardSlide.module.css"

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Import Swiper styles
import "swiper/css";
import { useEffect, useState } from "react";

import React from "react";

const CardsSlider = () => {
  const [fromdata, setFormData] = useState([]);

  useEffect(() => {
    callNFts();
  }, []);

  const callNFts = async () => {
    const data = await getNFt();
    const res = data.data;
    console.log("Response", res);
    setFormData(res);
  };

  return (
    <div className={style.CardDiv}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={4}
        navigation
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {
          fromdata.length > 0 && fromdata?.map((item) => (

            <SwiperSlide  >
              <div>
                <img src={item?.Imguri} width="100%" height="300px"  className={style.ImageDesign} />

                <h5 className={style.ImageName}>{
                  item?._name
                } </h5>

              </div>

            </SwiperSlide>


          ))
        }

      </Swiper>


    </div>
  )
};

export default CardsSlider;
