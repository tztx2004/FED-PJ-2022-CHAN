// 메뉴버튼 모듈 - MenuBtn.js
import $ from "jquery";
import "../css/menubtn.css"
import menubtn_data from "../data/menubtn"
import {Link} from "react-router-dom"


// 제이쿼리 로드구역 함수
function jqFn(){
    $(()=>{
        // $(".btnbx button").mouseover(
        //     function(){
        //         $(".btnbx button").animate({
        //             backgroundColor: "#0074e8",
        //             color: "#fff",
        //             cursor: "pointer",
        //             border: "none",
        //         },400)
        //     },
        //     function(){

        // })
    }); //// jQB ////
}//////// jqFn ////////


function Comp(props){
    return(
        <>
            <div className="wrap">
                <div className="wrapper">
                    <div className="imbx">
                        <img src={menubtn_data[props.num].isrc} alt="이미지"/>
                    </div>
                    <div className="titbx">
                        <h3>{props.x.tit.split("^")[0]}</h3>
                        <h2>{props.x.tit.split("^")[1].toUpperCase()}</h2>
                    </div>
                    <div className="btnbx">
                        {/* 라우터를 이용한 이동은 반드시 Link를 사용하자! */}
                        <Link to={menubtn_data[props.num].link}>
                            <button>
                                {menubtn_data[props.num].btn}
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

function MenuBtn(){
    return(
        <>
            <section className="MenuBtn">
                {
                    menubtn_data.map((x,i)=><Comp num={i} x={x} key={i}/>)
                }
            </section>
            {/* 빈루트를 만들고 JS로드함수포함 */}
            {jqFn()}
        </>
    );
}

export default MenuBtn;