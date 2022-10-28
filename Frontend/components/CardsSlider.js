// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { getNFt } from "../pages/api/getNFT";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Import Swiper styles
import "swiper/css";
import { useEffect } from "react";

export default () => {
  const callNFts = async () => {
    const data = await getNFt();
    console.log("data is ", data);
  };

  useEffect(() => {
    callNFts();
  }, []);

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={4}
      navigation
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <img src="/Nft.jpg" width="80%" height="80%"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src="/Nft.jpg" width="80%" height="80%"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src="/Nft.jpg" width="80%" height="80%"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src="/Nft.jpg" width="80%" height="80%"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src="/Nft.jpg" width="80%" height="80%"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src="/Nft.jpg" width="80%" height="80%"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src="/Nft.jpg" width="80%" height="80%"></img>
      </SwiperSlide>
    </Swiper>
  );
};
