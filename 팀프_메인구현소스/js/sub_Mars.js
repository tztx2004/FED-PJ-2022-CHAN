/* 화성 JS */

// 로드 ///////////
window.addEventListener("DOMContentLoaded",setMars);

// 화성 셋팅 ///
function setMars(){
    console.log("화성 로딩완료");
    
    /************************************* 
     함수명 : appr()
     기능 : 스크롤해서 내려가면 글씨가 나타남
     *************************************/
    // 1. 대상선정
    const md_h3 = document.querySelector(".model h3");
    // *스타일 선택
    const sty = (x)=>x.style;
    


    setTimeout(()=>{
        // 일단 실행 확인
        // 글씨 나타남
        md_h3.classList.add("on_mars");
        // 글씨 위로 올라옴
        md_h3.style.top = 0 + "px";
    },800);


    function appr(ele){
        // 글씨 나타남
    }

}////////// setMars ////////////