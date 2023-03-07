setTimeout(()=>{
    // scrollTo(가로, 세로) -> 위치이동 메서드
    window.scrollTo(0,0);
},100);

window.addEventListener("DOMContentLoaded",loadFn);

/* loadFn */
function loadFn(){
    console.log("로딩완료");

    // 이벤트 연결 대상 선정하기
    // (1) GNB메뉴
    const gnb = document.querySelectorAll(".gnb a");

    // (2) 인디케이터메뉴 //
    const indic = document.querySelectorAll(".indic a");

    // [ 이벤트 연결함수등록 ]//
    // (1) gnb메뉴 이벤트 연결
    gnb.forEach((ele,idx,obj)=>{
        ele.addEventListener("click",()=>movePg(idx,obj));
    }); ////////////// forEach ///////////

    // movePg전에 변수 설정
    // 0. 변수설정
    // (1) 전체 페이지변수
    let pgnum = 0; // 현재페이지번호(0)
    // (2) 전체 페이지 수
    const pgcnt = document.querySelectorAll(".page").length;
    // (3) 광스크롤 금지 변수
    let prot_sc = 0; // (0 - 허용, 1 - 불허)

    // 1. 전체 휠 이벤트 설정 //
    window.addEventListener("wheel",wheelFn,{passive:false});

    // 2. 휠 이벤트 함수 만들기 
    function wheelFn(e){
        // (0) 기본기능 멈추기
        e.preventDefault();

        // 광스크롤 막기
        if(prot_sc) return;
        prot_sc = 1;
        setTimeout(()=>prot_sc=0,800);

        // (1) 호출확인
        // console.log("휠")
        // (2) 휠방향 알아내기
        // 이벤트 객체.wheelDelta
        let dir = e.wheelDelta;
        // console.log(dir);
        // (3) 방향에 따른 페이지 번호 증감
        if(dir<0){
            pgnum++;
            // 한계수 : 페이지 끝번호(페이지 수 -1)
            if(pgnum> pgcnt - 1) pgnum = pgcnt -1;
        }//// if /////
        else{
            pgnum--;
            if(pgnum<0) pgnum = 0;
        }////// else //////
        updatePg(gnb);
        updatePg(indic);

    };

    /* movePg */
    function movePg(seq,obj){
        // 1. 기본기능 막기
        event.preventDefault();
        // 2. 호출확인
        // console.log("이동",seq,obj);
        // 3. 페이지번호(pgnum) 업데이트
        pgnum = seq;
        // 4. 업데이트 페이지 호출 -> 페이지 이동, 메뉴변경
        updatePg(gnb);
        updatePg(indic);
    }

    /* upadatepg */
    function updatePg(obj){
        // 1. 호출확인
        // console.log("업뎃");
        // 2. 페이지 이동하기
        window.scrollTo(0,window.innerHeight * pgnum);
        // 3. 메뉴초기화 하기
        for(let x of obj) x.parentElement.classList.remove("on");
        // 4. 해당메뉴에 클래스 넣기
        obj[pgnum].parentElement.classList.add("on");
        // 5. 페이지 이동 후 해당페이지 액션
        // pageAction함수 호출 (페이지이동 시차를 1초 설정)
        setTimeout(()=>pageAction(pgnum),1000);
    }

    /* initCSS */
    // 1. 대상 : .minfo
    const minfo = document.querySelectorAll(".minfo");
    // 2. 이벤트 설정
    minfo.forEach((ele,idx)=>{
        initCSS(ele,idx);
    }); ////forEach////

    // 3. 함수만들기
    function initCSS(ele,seq){
        // console.log("초기화");

        // 2. 해당요소 스타일 속성 선택
        let sty = ele.style;

        // 3. 각 요소별 초기화
        // 트랜지션 공통초기화
        sty.transition = "none";

        // 페이지별 초기화
        if(seq === 0){ // 1페이지
            sty.left = "150%";
        }

    }


    /* pageAction */
    function pageAction(seq){
        // 1. 호출확인
        // console.log("액션");

        // 2. 변경대상 스타일 속성선택
        let sty = minfo[seq].style;

        // 3. 전체초기화
        minfo.forEach((ele,idx)=>{initCSS(ele,idx)});

        // 4. 해당페이지 액션주기
        if(seq === 0){
            sty.left = "50%";
            sty.transition = "1.5s ease-in";
        }
    }

    // 첫페이지 페이지 액션 적응 위해 최초호출하기
    setTimeout(()=>pageAction(0),100);
} //////////// loadFn //////////////