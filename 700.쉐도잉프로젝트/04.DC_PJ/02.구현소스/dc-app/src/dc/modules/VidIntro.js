// VidIntro 컴포넌트 JS - VidIntro.js

import $ from "jquery";
import "../css/vidintro.css"
import vidintro_data from "../data/vidintro";

// 제이쿼리 로드구역 함수
function jqFn(){
    $(()=>{

    }); //// jQB ////
}//////// jqFn ////////

function VidIntro(props){
    // props.pg 페이지 데이터
    // props.mm - 디자인 CSS클래스 "on"넣기 속성
    
    // 데이터 선택하기
    const sdt = vidintro_data[props.pg]

    // 링크코드 생성하기 함수 : desc 데이터 / sum 데이터에서 처리
    const lcode = (data)=>{ // data - desc/sum 둘중에 전달됨
        
        return(
            <>
                {data.split("^")[0]}
                <a href={sdt.link} target="_blank">
                    {data.split("^")[1] + '\n'}
                </a>
                {data.split("^")[2]}
            </>
        )
    }
    return(
        <>
            {/* 모듈코드 */}
            <section className={"vidbox"+' '+props.mm}>
                {/* 비디오파트 */}
                <div>
                    <iframe src={sdt.vsrc} title={sdt.stit}></iframe>
                </div>
                {/* 타이틀파트 */}
                <div className="vidTit">
                    <h3>{sdt.stit}</h3>
                    <h2>{sdt.btit}</h2>
                    <p className="vidsum">{sdt.sum}</p>
                    <p>
                        {/* 특수문자(*)여부에 따라 처리 
                        indexOf(문자열) -> 없으면 -1리턴 */}
                        {
                            sdt.desc.indexOf("^") ===-1?
                            "" : lcode(sdt.desc)
                        }
                        
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
