// 인트로 페이지 JS - intro.js

// 로딩호출 ///////////
window.addEventListener("DOMContentLoaded",loadFn);

// 로딩실행함수 ///
function loadFn(){
    
    console.log("로딩완료!");

    // 동영상 시간을 체크하여 일정시간 후 메인 페이지로 넘기기 가능
    // setTimeout(()=>{
    //     location.href = "main.html";
    // },40000);
    // 그러나, 동영상 시간 이벤트를 사용하여 넘기자!

    
    // 대상 : #myvid
    const myvid = document.querySelector("#myvid");
    // console.log(myvid);
    
    // 동영상재생 중 발생하는 이벤트는?
    // timeupdate -> 동영상재생 시간이 계속 업데이트 시 발생
    myvid.addEventListener("timeupdate",chkVid);

    function chkVid(){
        console.log("멈춤?", myvid.paused);
        // 비디오가 멈추면 재생 끝이므로 비디오 멈춤상태 체크
        // paused는 멈추면 true, 재생중이면 false 리턴
        // 주의: 비디오가 loop이면 안됨


    };////////// chkVid /////////////
    
}; /////// loadFn ////////////////////////////////////