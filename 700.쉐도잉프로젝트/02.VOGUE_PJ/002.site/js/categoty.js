// 보그 PJ 카테고리 페이지 JS - category.js

// 넘어온 url 받기! pm -> parameter(전달값변수)
let pm = location.href;
// location.href 이 이퀄 오른쪽에 있으면 url주소 읽어옴
// 문자열 잘라서 값 읽어오기
// -> 물음표로 잘라서 두번째 값, 이퀄로 잘라서 두번째 값
//pm = pm.split("?")[1].split("=")[1];
// pm값 특수문자 복원하기
pm = decodeURIComponent(pm);
console.log(pm);

//////////// 로딩구역 //////////////
window.addEventListener("DOMContentLoaded",loadFn);

//////////// 로드함수 ///////////////
function loadFn(){
    
    console.log("카테고리 로딩완료");

    // 1. 변경대상선정
    // (1) 서브타이틀
    const stit = document.querySelector(".stit");
    // (2) 서브메뉴
    const lnb = document.querySelector(".lnb");
    // (3) 컨텐츠 상위박스(카테고리 클래스 넣기)
    const cont = document.querySelector(".cont");
    // (4) title요소(타이틀내용에 카테고리명 앞에 추가)
    const titag = document.querySelector("title");

    // console.log(stit,lnb,cont,titag);

    // 2. 메뉴데이터 (sinfo변수) 객체에서 카테고리값 선택하기
    const mdata = sinfo[pm];

    console.log(mdata);

    // 3. 대상에 변경 적용하기
    // (1) 카테고리 페이지 타이틀 넣기
    // 대상: .stit -> stit변수
    stit.innerText = mdata["제목"];

    // (2) LNB 메뉴넣기

    // (3) 컨텐츠 박스에 pm과 같은 이름의 class 넣기
    cont.classList.add(pm.replace(" & ","-"));
    // replace(바뀔값,바꿀값)

}//////////// loadFn 함수 /////////////////