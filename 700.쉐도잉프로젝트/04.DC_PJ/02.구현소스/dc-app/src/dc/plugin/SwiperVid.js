import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./SwiperVid.css";

// import required modules
import { Pagination,Navigation } from "swiper";

export default function SwiperVid(props) {

    const data = [
        {
            isrc : "",
            vsrc : "",
            cat : "",
            tit : "",
        },
    ];
    

    return (
        <>
            <Swiper
                slidesPerView={4}
                spaceBetween={10}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
            >
                {
                    data.map((v,i)=>
                        <SwiperSlide key={i}>{props.name}{v}</SwiperSlide>
                    )
                }
            </Swiper>
        </>
    );
}
