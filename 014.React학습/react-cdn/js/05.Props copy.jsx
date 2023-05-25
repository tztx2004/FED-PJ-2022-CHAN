// .5


/* props */

/* 자기차를 소개하는 컴포넌트1 */
function Car(props){
    return(
        <React.Fragment>
            <h2>나의 차는 {props.brand}입니다.</h2>
        </React.Fragment>
    )
}/// Car ///


// 자기차를 소개하는 컴포넌트2
function Car2(props){
    return(
        <React.Fragment>
            <h2>
                모델명은 {props.brand.model}이고, 차 색상은 {props.brand.color}입니다.
            </h2>
            <img src="./images/ray.png" alt="레이" style={props.brand.opt}/>
        </React.Fragment>
    )
}/// Car2 ///

// 차종류를 물어보고 답하는 컴포넌트 -> Car컴포넌트 사용
function Brand(){
    return(
        <React.Fragment>
            <h1>당신의 차는 무슨차죠?</h1>
            <Car brand="기아 레이"></Car>
        </React.Fragment>
    )
}//// Brand ////

function Brand2(props){
    const carInfo =[
        {
            color:"라잇블루",
            model:"2024년형",
            opt:{
                filter:"hue-rotate(0deg)",
                transform:"rotateY(0deg)"
            }
        },
        {
            color:"녹차그린",
            model:"2024년형",
            opt:{
                filter:"hue-rotate(207deg)",
                transform:"rotateY(180deg)"
            }
        },
    ]

    return(
        <React.Fragment>
            <h1>더 자세히 말씀해주시겠어요?</h1>
            <Car2 brand={carInfo[props.num]}/>
        </React.Fragment>
    )
}

ReactDOM.render(
<React.Fragment>
    <Brand/>
    <Brand2 num="0"/>
    <Brand2 num="1"/>
</React.Fragment>,document.querySelector("#root1")
)