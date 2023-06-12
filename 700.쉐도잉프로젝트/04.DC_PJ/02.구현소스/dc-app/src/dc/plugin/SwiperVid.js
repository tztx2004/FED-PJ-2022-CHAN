import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

/* 폰트어썸 임포트 */
import { faChessBishop, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./SwiperVid.css";

// import required modules
import { Pagination,Navigation } from "swiper";
import swipervid_data from "../data/swipervid";
import $ from 'jquery';

export default function SwiperVid(props) {

    // 데이터 셋팅
    const sdt = swipervid_data

    // 비디오보이기 함수
    const showVid = (src,tit)=>{
        // src - 비디오경로, tit - 비디오제목
        console.log(src,tit)
        // 1. 아이프레임 src 넣기
        $(".playvid iframe")
        .attr("src",src + "?autoplay=1");

        // 2. 비디오 타이틀 넣기
        $(".ifrtit").text(tit)
    }////// showVid //////
    

    return (
        <>
            <Swiper
                // 한화면당 개수를 Hook변수사용
                slidesPerView={4}
                spaceBetween={10}
                navigation={true}
                modules={[Navigation]}
                // 스와이퍼 사이즈 별 슬라이드 수 변경
                breakpoints={{
                    200: {
                        slidesPerView:2
                    },
                    700: {
                        slidesPerView:2
                    },
                    1000: {
                        slidesPerView:3
                    },
                    1200: {
                        slidesPerView:4
                    },
                }}
                className="mySwiper"
            >
                {
                    swipervid_data.map((v,i)=>
                        <SwiperSlide key={i}>
                            <div className="swi_wrapper" onClick={()=>showVid(v.vsrc,v.tit)}>
                                <img className="swi" src={v.isrc}/>
                            </div>
                            <FontAwesomeIcon icon={faPlayCircle} 
                                style={{
                                    position:"absolute",
                                    bottom:"55%",
                                    left:"10%",
                                    color:"#fff",
                                    fontSize:"50px"
                                    }} />
                            <h3 className="swc">{v.cat}</h3>
                            <h2 className="swt">{v.tit}</h2>
                        </SwiperSlide>
                    )
                }
            </Swiper>
            {/* 스와이퍼 모듈에 이벤트 입히기 */}
            {/* {evtFn()} */}
        </>
    );
}
