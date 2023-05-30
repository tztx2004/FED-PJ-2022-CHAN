///////////////////////////////////////
// 07. 조건 렌더링 + 리스트 렌더링 JSX //
///////////////////////////////////////

// 리액트에서는 조건부로 구성요소를 렌더링 할 수 있다!

////////////////////////////////////////
// 1. if문을 사용하여 조건부 렌더링하기 //
////////////////////////////////////////

// 선택적으로 로딩하도록 컴포넌트 2개만들기

// 1번 컴포넌트
function MakeDev(){
    return <h1>나는 개발자야!</h1>
}///// makeDev ///////

// 2번 컴포넌트
function LostDev(){
    return <h1>개발자가 뭐지?</h1>
}///// makeDev ///////

// 3번 컴포넌트
function MakeImg(props){
    return <img src={props.isrc} alt={props.ialt}/>
}

// 출력 메인 컴포넌트 ///
// 위의 2가지 컴포넌트 중 선택적으로 출력한다!
function Developer(props){ // 호출시 전달되는 속성
    const isNow = props.isDev; // true/false
    // 조건문
    if(isNow) {
        return (
            <React.Fragment>
                <MakeDev/>
                <MakeImg isrc={props.isrc} ialt={props.ialt}/>
            </React.Fragment>
        )
    }

    // else문 없이도 if문에 들어가면
    // return 때문에 컴포넌트를 나감!
    return(
        <React.Fragment>
            <LostDev/>
            <MakeImg isrc={props.isrc} ialt={props.ialt}/>
        </React.Fragment>
    )
}////// developer 컴포넌트 //////

// 이미지경로 배열
const wisrc = [
    "https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg",
    "https://image.utoimage.com/preview/cp872722/2022/12/202212008462_206.jpg"
]

// 컴포넌트 호출하기1
ReactDOM.render(<Developer isDev={true} isrc={wisrc[0]} ialt = '프론트엔드 개발자 공유!'/>, document.querySelector("#root1"))

// 컴포넌트 호출하기2
ReactDOM.render(<Developer isDev={false} isrc={wisrc[1]} ialt='야호' />, document.querySelector("#root2"))