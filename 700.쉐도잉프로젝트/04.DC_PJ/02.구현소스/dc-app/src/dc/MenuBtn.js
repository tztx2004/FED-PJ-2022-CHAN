// 메뉴버튼 모듈 - MenuBtn.js
import $ from "jquery";
import "./css/menubtn.css"

let data = [
    {
        "isrc":"./images/menu_btn1.jpg",
        "tit":"WORLDS COLLIDE^The Flash is Only in Theaters June 16",
        "btn":"TICKETS ON SALE NOW"
    },
    {
        "isrc":"./images/menu_btn2.jpg",
        "tit":"DC SHOP^GET NUTS WITH THE 1/6 SCALE BATMAN FIGURE",
        "btn":"Shop New Arrivals"
    },
    {
        "isrc":"./images/menu_btn3.jpg",
        "tit":"DC PRIDE^Celebrate with LGBTQ creators, characters, & stories",
        "btn":"Visit our Pride Hub"
    },
    {
        "isrc":"./images/menu_btn4.jpg",
        "tit":"DC COMMUNITY ^Share Your DC Pride Fanworks",
        "btn":"SUBMIT YOUR ART"
    },
]

let stit=[];
let btit=[]

data.forEach((x,i)=>{
    stit.push(x.tit.split("^")[0])
    btit.push(x.tit.split("^")[1])
})



// 제이쿼리 로드구역 함수
function jqFn(){
    $(()=>{

    }); //// jQB ////
}//////// jqFn ////////

function Comp(props){
    return(
        <>
            <div>
                <div className="imbx">
                    <img src={data[props.num].isrc} alt="이미지" />
                </div>
                <div className="titbx">
                    <h3>{stit[props.num]}</h3>
                    <h2>{btit[props.num]}</h2>
                </div>
                <div className="btnbx">
                    <button>{data[props.num].btn}</button>
                </div>
            </div>
        </>
    )
}

function MenuBtn(){
    return(
        <>
            <section className="MenuBtn" style={{width:"100%", display:"flex"}}>
                {
                    data.map((x,i)=><Comp num={i} key={i}/>)
                }
            </section>
            {/* 빈루트를 만들고 JS로드함수포함 */}
            {jqFn()}
        </>
    );
}

export default MenuBtn;