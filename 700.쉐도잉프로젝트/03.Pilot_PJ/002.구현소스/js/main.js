// 파일럿 PJ 메인페이지 JS - main.js

import autoScroll from"./jquery-autoScroll.js";

// 자동스크롤 호출
autoScroll();

// 메인페이지

// 햄버거 버튼 클릭 시 전체 메뉴 보이기
$(".ham").click(function(){
    // 햄버거 버튼 클래스변경(토글)
    $(this).toggleClass("on");
    // 전체메뉴보이기
    $(".mbox").fadeToggle(400);
})