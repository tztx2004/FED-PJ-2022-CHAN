// jQuery로 구현한 자동 페이지 휠 JS : jQuery-autoScroll.js

// 로딩구역없이 함수로 구현함! //

/********************************************************** 
    이벤트 변수할당하기
**********************************************************/
// 전체 페이지 번호
let pno = 0;
// 페이지 요소
const pg = $(".page");
// 전체 페이지 개수
const pgcnt = $(".page").length;
// console.log(pgcnt,pg);
// 광실행금지변수
let prot = [];
// 광스크롤금지
prot[0] = 0;
// GNB메뉴 li
const gnb = $(".gnb li");
// indic메뉴 li
const indic = $(".indic li");
// 각 페이지별 등장요소
const minfo = $(".minfo");

/********************************************************** 
    이벤트 등록하기
**********************************************************/
// 윈도우 휠이벤트 발생 시
$(window).on("wheel", wheelFn);
// GNB메뉴 클릭 시 : 대상 - .gnb a
$(".gnb a").click(chgMenu);
// 인디케이터 클릭시 : 대상 - .indic a
$(".indic a").click(chgMenu);

// 새로고침 시 스크롤 위치 캐싱 변경하기
$("html,body").animate({ scrollTop: "0px" });

/********************************************************* 
    함수명: wheelFn
    기능: 마우스휠 이벤트 발생 시 호출됨
    -> 한페이지 씩 자동스크롤 기능
*********************************************************/
function wheelFn() {
    // 광휠금지
    if (prot[0] === 1) return;
    chkCrazy(0);

    // console.log("wheelFn");

    // 1. 휠방향 알아내기
    let delta = event.wheelDelta;

    // 2. 방향에 다른 페이지 번호 증감
    if (delta < 0) {
        pno++;
        if (pno === pgcnt) pno = pgcnt - 1;
        // 마지막 페이지번호에 고정!
    } //// if /////
    else {
        pno--;
        if (pno === -1) pno = 0;
        // 첫페이지번호에 고정!
    } //// else /////

    console.log(pno);

    // 3. 스크롤 이동하기
    movePg();
} /////////// wheelFn ////////////

/******************************************* 
    함수명: chgMenu
    기능: 메뉴 클릭 시 메뉴변경과 페이지이동
*******************************************/
prot[1] === 0;
function chgMenu() {
    // 광클금지
    if (prot[1]) return;
    chkCrazy(1);

    // 1. 클릭된 a요소의 부모 li 순번을 구함 === pno
    let idx = $(this).parent().index();

    console.log($(this).text(), idx);

    // 2. 전역페이지번호에 순번 업데이트
    pno = idx;

    // 3. 페이지이동 + 메뉴에 클래스"on"넣기
    movePg();

    // 4. 메뉴에 클래스 "on"넣기
} /////////////chgMenu///////////////

/******************************************* 
    함수명: chkCrazy
    기능: 광적동작 체크하여 제어리턴
*******************************************/
function chkCrazy(seq) {
    // seq - 관리변수 순번
    prot[seq] = 1;
    setTimeout(() => (prot[seq] = 0), 800);
} ///////// chkCrazy //////////

/******************************************* 
    함수명: movePg
    기능: 페이지이동 애니메이션
*******************************************/
function movePg() {
    // 대상: html,body -> 두개를 모두 잡아야 공통적으로 적용됨!
    $("html,body").animate(
        {
            scrollTop: $(window).height() * pno + "px",
        },
        800,
        "easeInOutQuint",
        showEle //이동후 콜백함수호출!
    );

    // 대상: GNB메뉴, 인디케이터 메뉴
    gnb.eq(pno).addClass("on").siblings().removeClass("on");
    indic.eq(pno).addClass("on").siblings().removeClass("on");
} /////////////// movePg ///////////////////

// 등장할 요소 초기화
minfo.css({
    opacity: 0,
    transform: "translateY(-50%,50%)",
    transition: ".6s ease-out"
}); //////////// css ////////////////

/******************************************* 
    함수명: showEle
    기능: 페이지이동 후 요소 등장하기
*******************************************/
function showEle() {
    // .minfo 페이지별 등장하기!
    pg.eq(pno).find(".minfo").css({
        opacity: 1,
        transform: "translateY(-50%,50%)",
    }) //////////// css ////////////////
    .parent(".page").siblings().find(".minfo").css({
        opacity: 0,
        transform: "translateY(-50%,50%)",
        transition: ".6s ease-out"
    });
} ///////// showEle /////////////

// 등장액션함수 최초호출
setTimeout(showEle,1000);