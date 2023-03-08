/* 화성 JS */

// 로드 ///////////
window.addEventListener("DOMContentLoaded", setMars);

// 화성 로딩 - setMars ///
function setMars() {
    console.log("로딩완료!");

    // header 영역 스크롤시 배경색, 찾기버튼 색변경 변수
    const searchbx = document.querySelector(".searchbx");
    const sbx = document.querySelector(".sbx");
    const sicon = document.querySelector(".sicon");

    /****************************************************
        [ GNB메뉴 스크롤 시 색변경 ]
    ******************************************************/
    window.addEventListener("scroll", function () {
        if (window.scrollY > 80) {
            document.querySelector(".top").classList.add("on");
            // document.querySelector('.active').classList.remove("on");
            searchbx.style = "background-color: #506a7e;";
            sicon.style = "background-color: #506a7e";
        } else {
            document.querySelector(".top").classList.remove("on");
            searchbx.style = "background-color: #575a5ecb;";
            sicon.style = "background-color: #575a5ecb;";
        }
    });

    /****************************************************
        [ 검색창 클릭시 열고 닫기 ]
    ******************************************************/
    // 마지막에 주석 풀기!!!
    // sicon.onclick = ()=>{
    //     sbx.classList.toggle("on");
    // };

    /************************************************* 
     함수명: chgMenu
     기능: 전체메뉴 보이기/숨기기
     *************************************************/
    // 햄버거버튼요소
    const ham = document.querySelector(".ham");
    // console.log("햄버거있니?",ham);

    // 햄버거요소에 이벤트 설정하기 //////
    ham.onclick = chgMenu;
    function chgMenu() {
        // 1. 호출확인
        // console.log("나야나!");

        // 2. 대상선정 : .top 요소
        var tg = document.querySelector(".top");

        // 3. 변경내용 : 대상에 클래스 "on"넣기
        tg.classList.toggle("active");
    } /////////////////// chgMenu 함수 ///////////////
    //////////////////////////////////////////////////

    //______________________________________________________________

    // console.log("화성 로딩완료");

    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100); // .1초 정도는 줘야 효과있음

    /************************************* 
     함수명 : appr()
     기능 : 스크롤해서 내려가면 글씨가 나타남
     *************************************/
    // 1. 대상선정
    const md_h3 = document.querySelector(".model h3");
    const copyFt = document.querySelectorAll(".copyFt");
    
    

    function scFn(scVal,ftC) {
    // 2. 이벤트설정 (스크롤)
    // window.scrollTo()
    window.addEventListener("scroll", () => {
            // 스크롤 위치값 변수
            let scHere = window.scrollY;
            console.log(scHere);
            // 스크롤 위치값이 1600넘어가면 copyFt 글씨 효과줌
            if (scHere >= scVal) appr(md_h3);
        }); /////////// scroll ///////////////
        
        // 3. 함수설정(appr)
        function appr(ele) {
            // 글씨 나타남
            ele.style.opacity = 1;
            // 글씨 위로 올라옴
            ele.style.top = 0 + "px";
            // 약간의 시간 후 색상 변경
            setTimeout(() => {
                ele.style.color = ftC;
            }, 800);
        } ////////////// appr ///////////////
    } //////////////// scFn //////////////////
    scFn(1600,"#fff");
    
    // (임시) 함수호출

} ////////// setMars ////////////
