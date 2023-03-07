// JS로 구현한 자동 페이지 휠 JS : js-autoScroll.js

// 새로고침할 때 스크롤 위치 캐싱 무시하고 맨 위로 이동!
// scrollTo(가로, 새로) -> 위치이동 메서드
setTimeout(()=>{
    window.scrollTo(0,0);
},100);

/////////////// 로딩함수호출 ///////////////
window.addEventListener("DOMContentLoaded",loadFn);


/******************************************* 
    함수명 : loadFn
    기능 : 페이지 로딩 시 실행기능
*******************************************/

function loadFn(){
    
    // 호출확인
    console.log("로딩완료");

    ///// 이벤트 연결 대상 선정하기 /////
    // (1) GNB메뉴 ///
    const gnb = document.querySelectorAll(".gnb a");
    // (2) 인디케이터메뉴 ///
    const indic = document.querySelectorAll(".indic a");
    // console.log(indic);

    //////// [이벤트 연결 함수등록하기] //////////
    // (1) GNB메뉴 이벤트 연결
    gnb.forEach((ele,idx,obj)=>{ // ele - 요소, idx - 순번, obj - 전체객체
        ele.addEventListener("click",()=>movePg(idx,obj));
        // 전체 객체(obj)를 함수에 전달하는 이유는?
        // -> 인디케이터도 GNB와 같은 기능을 수행하기 때문에
        // 호출 시 자기자신 전체를 보내야 각각에 맞게 기능을 수행할 수 있음

    }); //////////// forEach //////////////
    
    // (2) 인디케이터 메뉴 이벤트 연결
    indic.forEach((ele,idx,obj)=>{
        // ele - 요소, idx - 순번, obj - 전체객체
        ele.addEventListener("click",()=>movePg(idx,obj));
    }); //////////// forEach //////////////
    


    /*********************************************************** 
        [ 휠 이벤트를 이용한 페이지 이동 컨트롤 하기! ]
        -> 휠 이벤트 명 : wheel
        (예전엔 mousewheel 이벤트가 사용됨 - 공식적으로 폐기됨)

        1. 사용법 : 
            (1) 이벤트 속성에 함수를 할당
                요소.onwheel = 함수
            (2) 브라우저 이벤트에 등록함
                요소.addEventListener("wheel",함수,{옵션})

        2. 포인트 :
            (1) 기존 휠 이동 기능은 정지한다!
            -> event.preventDefault()
            (2) 휠 방향을 알아내어 기능과 매칭한다!
            -> event.wheelDelta (휠방향속성)
            (3) 페이지번호를 전역적으로 상용한다
            -> 예) let pgnum = 0;

        3. 휠 이벤트 대상
            (1) 전체 스크롤 바인 경우 : window
            (2) 개별박스인 경우 : 선택요소

        4. scroll 이벤트와 wheel 이벤트 비교
            (1) 공통점 : 스크롤되는 페이지의 위치이동
            (2) 차이점 : 
                마우스 휠의 동작에만 반응하는 이벤트는 wheel
                스크롤 바의 이동에 반응하는 이벤트는 scroll

        ___________________________________________________


        [ addEventListener 메서드의 옵션에 관하여 ]

        기존 addEventListener의 3번째 파라미터로 캡쳐링/버블링 여부를 
        제어할 수 있는 부분이 EventListenerOptions이라는 객체형태의 
        추가 옵션을 받을수 있음

        EventListenerOptions 사용 전
        document.addEventListener('touchstart', handler, false);

        EventListenerOptions 사용 후
        document.addEventListener("touchstart", handler, {
            capture: false,
            once: false,
            passive: false
        });

        ※ 현재 크롬에서 지원하는 EventListenerOptions 옵션은 다음과 같다.

        (1) capture: 이벤트 캡쳐링 적용 여부. 크롬 49부터 지원
        (2) once: 이벤트를 한번만 호출하고 해제되는 옵션. 크롬 55부터 지원
        (3) passive: 스크롤 성능 향상을 위한 옵션으로 true일 경우, 
                스크롤을 위해 블록되는 것을 방지함. 이 경우, 
                preventDefault를 사용할 수 없음. 크롬 51부터 지원
                이 중, passive 속성은 성능향상을 위해, 
                브라우저의 기능을 프로그래밍으로 제어할수 있음
                -> 최근 업데이트된 브라우저는 passive기본값이 true로
                셋팅됨으로 window,document,body 이 세가지 객체에 대해
                스크롤 막기기능을 비활성화 하였다
                따라서 기본기능을 막고자하면 passive:false로 기능을
                활성화 해야한다!!

    ***********************************************************/
    
    // 0. 변수 설정하기
    // (1) 전체 페이지변수
    let pgnum = 0; // 현재 페이지번호(첫페이지 0)
    // (2) 전체 페이지 수
    const pgcnt = document.querySelectorAll(".page").length;
    // console.log("전체 페이지수",pgcnt);
    // (3) 광스크롤 금지변수
    let prot_sc = 0; // (0 - 허용, 1 - 불허용)

    
    // 1. 전체 휠 이벤트 설정하기 //
    window.addEventListener("wheel",wheelFn,{passive:false});
    
    // 2. 휠 이벤트 함수 만들기 //
    function wheelFn(e){ // e - 이벤트 전달변수
        // (0) 기본기능 멈추기
        // addEventListener 옵션 passive:false 필수!
        e.preventDefault();

        // 광스크롤막기! //
        if(prot_sc) return;
        prot_sc = 1; // 신호 1개만 허용!!
        setTimeout(()=>prot_sc=0,800);
        // .8초의 시간 후 다시 허용 상태전환 //

        // (1) 호출확인
        // console.log("휠~");

        // (2) 휠 방향 알아내기
        // 이벤트객체.wheelDelta
        let dir = e.wheelDelta;
        // console.log("방향",dir);
        // 휠을 내리면 마이너스(올리면 플러스)
        
        // (3) 방향에 따른 페이지 번호 증감
        // 스크롤 아랫방향 : 페이지번호 증가
        if(dir<0) {
            //페이지번호 1씩증가
            pgnum++;
            // 한계수 : 페이지 끝번호(페이지 수 - 1)
            if(pgnum> pgcnt -1) pgnum = pgcnt -1;
        } ////// if //////
        // 스크롤 윗방향 : 페이지번호 감소
        else {
            // 페이지번호 1씩 감소
            pgnum--;
            // 한게수 : 페이지 첫번호 -> 0
            if(pgnum<0) pgnum = 0;
        } ////// else //////
        // console.log("페이지번호",pgnum);

        // (4) 페이지이동 + 메뉴변경 -> updatedPg 함수호출
        updatePg(gnb);
        updatePg(indic);

    } ////////////////// wheelFn /////////////////////

    /******************************************* 
        함수명 : movePg
        기능 : 메뉴 클릭 시 해당위치로 이동하기
    *******************************************/
   function movePg(seq,obj){ // seq - 순번, obj - 요소전체객체
        // 1. 기본기능 막기
        event.preventDefault();
        // 2. 호출확인
        console.log("이동~", seq, obj);
        // 3. 페이지번호(pgnum) 업데이트하기!
        pgnum = seq;
        console.log("메뉴클릭 페이지번호 : ",pgnum)
        // 4. 업데이트 페이지 호출 -> 페이지이동,메뉴변경
        // 개별객체를 업데이트 할 때는 obj가 필요했으나
        // GNB메뉴와 인디케이터가 모두 업데이트 돼야하므로
        // 개별 obj가 필요없게됨
        updatePg(gnb);
        updatePg(indic);

    }/////////////// movePg //////////////////

    /****************************************** 
        함수명 : updatePg
        기능 : 페이지 이동 시 설정값 업데이트하기
    ******************************************/
    function updatePg(obj){ // obj - 변경할 메뉴전체 객체
        // 1. 함수호출확인
        // console.log("업데이트");
        
        // 2. 페이지 이동하기
        // scrollTo(가로,세로)
        window.scrollTo(0,window.innerHeight * pgnum);
        // 세로 이동위치 : 윈도우높이값 * 페이지번호
        
        // 3. 메뉴초기화하기(class on 제거하기)
        for(let x of obj) x.parentElement.classList.remove("on");
        
        // 4. 해당메뉴에 클래스 넣기
        obj[pgnum].parentElement.classList.add("on");

        // 5. 페이지 이동 후 해당페이지 액션
        // pageAction함수 호출! (페이지이동 시차를 1초설정!)
        setTimeout(()=>pageAction(pgnum),1000); 
    }///////////// updatePg ////////////////


    /************************************************ 
        함수명 : initCSS
        기능 : 등장할 요소들의 초기값 셋팅
    ************************************************/
    // 1. 대상 : .minfo
    const minfo = document.querySelectorAll(".minfo");
    // console.log(minfo);
    // 2. 이벤트 설정
    minfo.forEach((ele,idx)=>{
        initCSS(ele, idx);
    }); ///////////// forEach //////////////////
    // 3. 함수만들기
    function initCSS(ele, seq){ // ele - 요소, seq - 순번
        // 1. 호출확인
        console.log("초기화!",seq);

        // 2. 해당요소 스타일속성 선택
        let sty = ele.style;

        // 3. 각 요소별 초기화하기

        // 트랜지션 공통초기화
        sty.transition = "none";

        // 페이지별 초기화
        if(seq === 0){ // 1번페이지
            sty.left = "150%"
        }////////// if ///////////
        else if(seq === 1){ // 2번페이지
            // 투명하게!
            sty.opacity = 0;
            
        }////////// else if ////////
        else if(seq === 2){ // 3번페이지
            // 위에 숨겨져있음
            sty.top = "-109px";
            
        }////////// else if ////////
        else if(seq === 3){ // 4번페이지
            
        }////////// else if ////////
        else if(seq === 4){ // 5번페이지
            sty.opacity ="0";
            sty.transform = "translate(-50%, -50%) rotateY(0)"
        }////////// else if ////////
        else if(seq === 5){ // 6번페이지
            sty.opacity ="0";
            sty.transform = "translate(-50%, -50%)"
            
        }////////// else if ////////
        else if(seq === 6){ // 7번페이지
            sty.opacity ="0";
            sty.transform = "translate(-50%, -50%) scaleX(2)"
            
        }////////// else if ////////
        
    } ////////////////// initCSS /////////////////

    /****************************************** 
        함수명 : pageAction
        기능 : 페이지별 액션주기
    ******************************************/
    function pageAction(seq){ // seq - 변경순번
        // 1. 호출확인
        console.log("액션");

        // 2. 변경대상 스타일 속성선택
        let sty = minfo[seq].style;

        // 3. 전체초기화
        minfo.forEach((ele,idx)=>{initCSS(ele, idx)});

        // 4. 해당페이지 액션주기
        if(seq === 0){ // 1번페이지
            // 들어옴
            sty.left = "50%";
            sty.transition = "1.5s ease-in";
        }////////// if ///////////
        else if(seq === 1){ // 2번페이지
            // 투명도 복원
            sty.opacity = 1;
            // 트랜지션
            sty.transition = "1.5s ease-in";
            
        }////////// else if ////////
        else if(seq === 2){ // 2번페이지
            // 위에서 내려옴
            sty.top = "50%";
            // 트랜지션
            sty.transition = "1s ease-in";
            
        }////////// else if ////////
        else if(seq === 3){ // 2번페이지
            
            sty.transform = "translate(-50%, -50%) rotateY(360deg) scale(1.2)";
            sty.transition = "2s ease-in";
        }////////// else if ////////
        else if(seq === 4){ // 5번페이지
            sty.opacity = 1;
            sty.transform = "translate(-50%, -50%) rotateX(360deg)";
            sty.transition = "2s ease-in";
        }////////// else if ////////
        else if(seq === 5){ // 6번페이지
            sty.opacity = 1;
            sty.transform = "translate(-50%, -50%) scale(1.2) rotateY(360deg)";
            sty.transition = "2s ease-in";
            
        }////////// else if ////////
        else if(seq === 6){ // 7번페이지
            sty.opacity = 1;
            sty.transform = "translate(-50%, -50%) scaleX(1)";
            sty.transition = "1s ease-in";
            
        }////////// else if ////////
    } ///////////// pageAction //////////////

    // 첫페이지 페이지 액션 적용위해 최초호출하기
    setTimeout(()=>pageAction(0),100);

};/////////////////////////////// loadFn /////////////////////////