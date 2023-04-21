// 패럴렉스 PJ JS - main.js

// 로드이벤트 설정 ///////////////////////////////
$(window).on("DOMContentLoaded",loadFn)
// window.addEventListener("DOMContentLoaded",loadFn);

// 로드 함수 //
function loadFn(){
    console.log("로딩완료");

    // 1. 부드러운 스크롤 적용하기
    startSS(); 

    // 2. 화면높이값읽기 : 등장요소의 시작값이 이것임!
    const winH = $(window).height();

    // 3. 패럴렉스 수치 범위 : 움직일 값 설정
    const setH1 = 100;
    const setH2 = 200;

    // 4. 패럴렉스 대상선정
    // (1). 글자박스
    const tg1 = $(".txt");
    // (2). 아이콘
    const tg2 = $(".icon");

    // 5. 페럴렉스 이동함수 //
    const moveEl = (elpos,ele,setH)=>{
        // 전달값: elpos - 위치값 / ele  -요소 / setH - 정한범위

        // 패럴렉스 범위 : 윈도우 높이값 ~0
        // 화면에서 완전히 사라질때 범위는 0이 아니고
        // 요소의 -높이값 만큼 이다! -> 적당히 -수치로 해결!
        if(elpos < winH && elpos > 0){

        // 1. 위치이동값 계산
        let x = setH - (elpos *setH) / winH;
        console.log(-x);

        // 2. 해당요소에 위치이동 CSS반영
        $(ele).css({
            transform:`translateY(${-x}px)`
        }); ////// css //////
        
        // cssText 속성은 style속성값을 직접넣어준다!

        // 대상요소의 트랜스폼 Y축이동
        // 위치이동의 계산원리
        // -> 윈도우화면 : 위치값 = 정한범위 : 실제이동값
        // -> 윈도우가 1000px : 500px = 200px : x?
        // 실제이동값 = 정한범위 - (위치값*정한범위) / 윈도우화면
        // x = setH2 - (elpos *setH2) / winH
        // -> 이동수치는 0부터 서서히 증가해야하므로
        // 정한범위수에서 빼준다!
        }//////////////// 페럴렉스 범위 if ///////////////////
    };///////////// moveEl ////////////
    
    // 제이쿼리롤 getBoundingClientRect().top값 만들기
    // 요소위치값 - 현재스크롤 위치값
    const retVal = (elpos,scTop)=>elpos-scTop;

    // 6. 스크롤 이벤트함수 만들기
    $(window).on("scroll",()=>{

        // 현재스크롤위치값
        let scTop = $(this).scrollTop();
        
        // 대상1 : 글자박스 페럴렉스호출!
        tg1.each((idx,ele)=>{
            moveEl(
                retVal($(ele).offset().top,scTop),
                ele, setH2);
        });
        // 대상2 : 아이콘 페럴렉스호출!
        tg2.each((idx,ele)=>{
            moveEl(
                retVal($(ele).offset().top,scTop),
                ele, setH1);
        });
        
    });////////////////// scroll /////////////////////

    // 스크롤바를 직접잡고 움직일 시 부드러운 스크롤 위치값 업데이트
    $(window).on("mouseup keyup",()=>{
        pos = $(this).scrollTop();
    });////////////////// mouseup keyup /////////////////////
    

    // 로딩시 맨 위로 이동
    // 전체스크롤 이동대상은 html,body 최상위부모 2개 다 잡아라!
    $("html,body").animate({scrollTop:0},200,
        ()=>{
            // 안하면 다시 스크롤 시 튐
            pos = $(this).scrollTop();
        });///////////////// animate /////////////////


}///////////////////// loadFn ////////////////////////