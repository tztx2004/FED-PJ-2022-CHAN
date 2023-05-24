/* 
    리액트 컴포넌트 이름은 반드시 첫글자가 대문자
*/

import Avengers from "./Avengers"

// 클래스형 컴포넌트 만들기
class Gogh extends React.Component{
    // render()메서드 사용
    render(){
        // HTML태그 리턴
        return(
            <React.Fragment>
                <h2>안녕! 나는 고흐 그림이야!</h2>
                <img src="./images/01.png" alt="고흐1" />
                {/* 홀로태그는 반드시 끝에 닫아준다 */}
            </React.Fragment>
        )
    }/// render ///
}/// Gogh컴포넌트 ///

// 랜더링하기
const root1 = ReactDOM.createRoot(document.getElementById("root1"))
root1.render(<Gogh/>)


// 함수형 컴포넌트
// 첫글자 대문자!!
function IronMan(){
    return(
        <div>
            <h2>안녕 나는 아이언맨이야!!</h2>
            <img src="./images/ab1.jpg" alt="아이언맨" />
        </div>
    )
}/// IronMan ///

// 랜더링하기
// ReactDOM.render(출력요소명,대상)
ReactDOM.render(<IronMan/>, document.querySelector("#root2"))


/* Props */
function Favorite(props){
    return(
        <h2>
            내가 좋아하는 색은 {props.color}이야<br/>
            그리고 내가 좋아하는 음식은 {props.food}이야!<br/>
            취미는 {props.hobby}이야! 알겠니?
        </h2>
    )
}///

ReactDOM.render(<Favorite color="빨간색" food="피자" bobby="게임" />,document.querySelector("#root3"))


// 컴포넌트 재사용 (랜더링만 새로해도됨)
ReactDOM.render(<Favorite color="파란색" food="알리오올리오" hobby="야구" />, document.querySelector("#root4"))

/* 컴포넌트 내부에서 다른 컴포넌트를 호출할 수 잇다! */
function Who(){
    return(
        <div>
            <h1>김똑팔</h1>
            {/* 다른 컴포넌트 넣기 */}
            <Ans></Ans>
        </div>
    )
}///

function Ans(){
    return(
        <h2>김씨 똑하고 팔 부러져</h2>
    )
}////

ReactDOM.render(<Who/>,document.querySelector("#root5"))

ReactDOM.render(<Avengers/>,document.querySelector("#root6"))

