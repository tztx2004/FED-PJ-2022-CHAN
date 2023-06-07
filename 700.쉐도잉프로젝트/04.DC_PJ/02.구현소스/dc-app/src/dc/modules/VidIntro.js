// VidIntro 컴포넌트 JS - VidIntro.js

import $ from "jquery";
import "../css/vidintro.css"
import vidintro_data from "../data/vidintro";

// 제이쿼리 로드구역 함수
function jqFn(){
    $(()=>{

    }); //// jQB ////
}//////// jqFn ////////

function VidIntro(){
    return(
        <>
            {/* 모듈코드 */}
            <section className="vidbox">
                {/* 비디오파트 */}
                <div>
                    <iframe src={vidintro_data.main.vsrc} title={vidintro_data.main.stit}></iframe>
                </div>
                {/* 타이틀파트 */}
                <div className="vidTit">
                    <h3>{vidintro_data.main.stit}</h3>
                    <h2>{vidintro_data.main.btit}</h2>
                    <p className="vidsum">{vidintro_data.main.sum}</p>
                    <p>
                        {vidintro_data.main.desc.split("^")[0]}
                        <a href={vidintro_data.main.link}>
                            {vidintro_data.main.desc.split("^")[1] + '\n'}
                        </a>
                        {vidintro_data.main.desc.split("^")[2]}
                    </p>
                    

                    {/* 링크있을경우 표시 */}
                </div>
            </section>
            {/* 빈루트를 만들고 JS로드함수포함 */}
            {jqFn()}
        </>
    );
}

export default VidIntro;
