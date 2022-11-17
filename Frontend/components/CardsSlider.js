 // Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { getNFt } from "../pages/api/apiCalls.js";

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

  return(  
  <>
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
          <>
          <SwiperSlide>
        {/* <img src={item?.uri} width="80%" height="80%"/> */}
        <h3>{
          item?._name
        }</h3>
          <h1>dsfdsfddsfsf</h1>


      </SwiperSlide>
          </>

))
}
      
    </Swiper>
      <h1>
        fsdfdsfdsf
      </h1>
  
</>
  )
};

export default CardsSlider;
