// 1. JSX 사용
// (1) 사용
const myele1 = <h1>나는 JSX를 사용하고 있어!</h1>
// 리액트 루트 생성
const root1 = ReactDOM.createRoot(document.querySelectorAll("#root>div")[0])
// 적용하기 : 생성된 루트에 render
root1.render(myele1)

// (2) JSX를 사용하지 않는 방법
// 넣을 요소를 createElement()
const myele2 = 
React.createElement("h1",{},"나는 JSX를 쓰지않아")
// createElement(요소명,{JS코드작성},요소내용)
// 두번째 div요소에 출력하기
ReactDOM.render(myele2,document.querySelectorAll("#root>div")[1]);

// 3. JSX 표현식
let num1 = 100
let num2 = 3
const myele3 = <h1>리액트는 {num1*num2}번 사용해도 좋다!</h1>
ReactDOM.render(myele3,document.querySelectorAll("#root>div")[2])

// 4. 다중요소 html 블록삽입

const myele4 = 
<React.Fragment>
    <h2>[다중요소 HTML 블록출력하기]</h2>
    <ul>
        <li>프론트</li>
        <li>리액트</li>
        <li>뷰</li>
    </ul>
</React.Fragment>

ReactDOM.render(myele4,document.querySelectorAll("#root>div")[3])

const mydata = [
    {idx:1,name:"김",movie:"영화1"},
    {idx:2,name:"이",movie:"영화2"},
    {idx:3,name:"박",movie:"영화3"},
];

const mylist = mydata.map(x=>
    <li>{x.name}:{x.movie}</li>
)

const myele5 = 
<React.Fragment>
    <h1>배우리스트</h1>
    <ul>
        {mylist}
    </ul>
</React.Fragment>;

// 출력
ReactDOM.render(myele5,document.querySelectorAll("#root>div")[4])

/* JSX에서는 홀로태그라도 끝에 닫기를 꼭 해줘야한다! */
const myele6 = <input type="text" value="홀로태그는 스스로 닫아라"/>

// 출력
ReactDOM.render(myele6,document.querySelectorAll("#root>div")[5])

/* JSX에서는 class대신 className으로 표기 */
const myele7 =
<h1 className="myclass">className속성으로 클래스 셋팅!</h1>

// 출력
ReactDOM.render(myele7,document.querySelectorAll("#root>div")[6])

/* JSX에서 조건문 if */
// JSX 외부에서 if문 사용하기
const x = 1000
let txt = "이돈으로 충분히 살수 있어!"

if(x<10000){
    txt = "돈이 부족해서 살 수 없어"
}

const myele8 =
<div>
    <h1>현재 내가 가진 돈은 {x}원</h1>
    <h1>{txt}</h1>
</div>

ReactDOM.render(myele8,document.querySelectorAll("#root>div")[7])

// 삼항연산자
let time =8
const myele9 = (
    <React.Fragment>
        <h1>지금 몇시지? {time}시야!</h1>
        <h1>{time>9?"지금 집에 들어와":"더 놀다와~"}</h1>
    </React.Fragment>
)
// 출력
ReactDOM.render(myele9,document.querySelectorAll("#root>div")[8])
