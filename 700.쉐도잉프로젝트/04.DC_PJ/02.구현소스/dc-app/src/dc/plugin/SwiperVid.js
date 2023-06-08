import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./SwiperVid.css";

// import required modules
import { Pagination,Navigation } from "swiper";
import swipervid_data from "../data/swipervid";

export default function SwiperVid(props) {

    
    

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
                    swipervid_data.map((v,i)=>
                        <SwiperSlide key={i}>
                            <div className="swi_wrapper"><img className="swi" src={v.isrc}/></div>
                            <h3 className="swc">{v.cat}</h3>
                            <h2 className="swt">{v.tit}</h2>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </>
    );
}
