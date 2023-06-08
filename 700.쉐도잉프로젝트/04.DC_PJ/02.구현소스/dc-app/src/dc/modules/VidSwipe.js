// VidSwipe 모듈 - VidSwipe.js
import $ from "jquery";
import SwiperVid from "../plugin/SwiperVid";
import "../css/vidswipe.css"
import swipervid_data from "../data/swipervid";

// 제이쿼리 로드구역 함수
function jqFn(){
    $(()=>{
        const ss = $(".swiper-slide");
        ss.on("click",function(){
            console.log(this)
            $(".vidbx").fadeIn();

        })
        $(".cbtn").on("click",function(){
            $(".vidbx").fadeOut()
            $(".playvid iframe").attr("src","")
        })
        
    }); //// jQB ////
}//////// jqFn ////////

function VidSwipe(props){
    // props.pg - 페이지별 데이터 구분
    // props.tit - 모듈타이틀
    return(
        <>
            <section className="vidswbox">
                {/* 1. 모듈타이틀 */}
                <h2 className="tit">{props.tit}</h2>
                {/* 2. 스와이퍼 컴포넌트 */}
                <SwiperVid name="나는" />

                {/* 3. 비디오 재생창 */}
                <section className="vidbx">
                    <div className="playvid">
                        {/* 비디오타이틀 */}
                        <h2 className="ifrtit"></h2>
                        {/* 아이프레임 */}
                        <iframe src="" allow="autoplay"></iframe>
                        {/* 닫기버튼 */}
                        <button className="cbtn">×</button>
                    </div>
                </section>
            </section>
            {/* 빈루트를 만들고 JS로드함수포함 */}
            {jqFn()}
        </>
    );
}

export default VidSwipe;