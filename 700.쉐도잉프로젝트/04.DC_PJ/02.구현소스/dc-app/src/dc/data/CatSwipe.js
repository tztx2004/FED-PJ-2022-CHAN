// CatSwipe 모듈 - CatSwipe.js
import $ from "jquery";
import Swipercat from "../plugin/Swipercat";
import "../css/catswipe.css"
import Swipercat_data from "../data/swipercat";

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

function CatSwipe(props){
    // props.pg - 페이지별 데이터 구분
    // props.tit - 모듈타이틀
    return(
        <>
            <section className="catswbox">
                {/* 1. 모듈타이틀 */}
                <h2 className="tit">{props.tit}</h2>
                {/* 2. 스와이퍼 컴포넌트 */}
                <Swipercat/>
            </section>
            {/* 빈루트를 만들고 JS로드함수포함 */}
            {jqFn()}
        </>
    );
}

export default CatSwipe;