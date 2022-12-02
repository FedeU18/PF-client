import React from 'react'
import {Swiper , SwiperSlide} from "swiper/react";
import 'swiper/css';
import './Landing.css';

const Cardss = () => {
  return (



    <Swiper
    spaceBetween={19}
    slidesPerView={3}
    onSlideChange={() => console.log('slide change')}
    onSwiper={(swiper) => console.log(swiper)}
  >
    <SwiperSlide>
    </SwiperSlide>
    ...
  </Swiper>
    
  )
}

export default Cardss