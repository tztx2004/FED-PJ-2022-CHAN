/* 화성 JS */

// 로드 ///////////
window.addEventListener("DOMContentLoaded",setMars);

// 화성 로딩 - setMars ///
function setMars(){
    console.log("화성 로딩완료");
    
    /************************************* 
     함수명 : appr()
     기능 : 스크롤해서 내려가면 글씨가 나타남
     *************************************/
    // 1. 대상선정
    const md_h3 = document.querySelector(".model h3");
    
    // 2. 이벤트설정 (스크롤)
    // window.scrollTo()
    const retVal = x => x.getBoundingClientRect().top;
    

    function appr(ele){
        // 글씨 나타남
        ele.style.opacity = 1;
        // 글씨 위로 올라옴
        ele.style.top = 0 + "px";
        // 약간의 시간 후 색상 변경
        setTimeout(()=>{
            ele.style.color = "#fff";
        },800);
    }
    // 3. 함수호출
    appr(md_h3);


}////////// setMars ////////////