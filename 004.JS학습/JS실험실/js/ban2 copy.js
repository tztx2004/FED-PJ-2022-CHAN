// JS실험실: 03.배너스타일2 JS -  ban.js

// HTML태그 로딩후 loadFn함수 호출! ///
window.addEventListener("DOMContentLoaded", loadFn);

/***************************************************** 
    [ 슬라이드 이동 기능정의 ]
    1. 이벤트 종류: click
    2. 이벤트 대상: 이동버튼(.abtn)
    3. 변경 대상: 슬라이드 박스(#slide)
    4. 기능 설계:
        -> left 이동의 기준값이 -220% 인것이 포인트!
        (이유: 2장의 슬라이드가 앞에 나가있음. 잘라내는 것이
            숨겨져야하므로 셋팅한것임!)

        (1) 오른쪽 버튼 클릭시

            ※ 변경된부분!!!
            {   트랜지션 중앙 커지기를 적용한 경우이므로
                왼쪽버튼과 같이 잘라내기를 먼저하여
                슬라이드 주인공 순서를 일치 시킨다!!!! }

            -> 슬라이드 이동전!!! 
            바깥에 나가있는 첫번째 슬라이드
            li를 잘라서 맨뒤로 보낸다!
            동시에 left값을 -110%으로 변경한다!
        
            다음 슬라이드가
            나타나도록 슬라이드 박스의 left값을
            -220%로 변경시킨다.
            

        (2) 왼쪽버튼 클릭시 이전 슬라이드가
            나타나도록 하기위해 우선 맨뒤 li를
            맨앞으로 이동하고 동시에 left값을
            -330%로 변경한다.
            그 후 left값을 -220%으로 애니메이션하여
            슬라이드가 왼쪽에서 들어온다.

        (3) 공통기능: 슬라이드 위치표시 블릿
            - 블릿 대상: .indic li
            - 변경 내용: 슬라이드 순번과 같은 순번의
            li에 클래스 "on"주기(나머진 빼기->초기화!)

*****************************************************/

/****************************************** 
    함수명: loadFn
    기능: 로딩 후 버튼 이벤트 및 기능구현
******************************************/
function loadFn() {
    

    // 1. 대상선정
    // 1-1 이벤트 대상 : .abtn
    const abtn = document.querySelectorAll(".abtn");

    // 1-2 변경대상 : #slide
    const slide = document.querySelector("#slide");

    // 1-3 블릿대상 : .indic li
    const indic = document.querySelectorAll(".indic li");

    
    // 1-4 슬라이드 li 리스트
    let slist = document.querySelectorAll("#slide>li");
    
    // console.log(slist);

    // [ 초기화1 - 순번붙이기 ]
    slist.forEach((ele,idx)=>{
        ele.setAttribute("data-seq",idx);
    });////////////forEach///////////

    // [ 초기화2 - 맨뒤요소 맨앞으로 이동 2번하기 ]
    // 맨뒤 맨앞이동 함수 만들기
    const chgSeq = ()=>{
        slist = document.querySelectorAll("#slide>li");
        slide.insertBefore(slist[slist.length-1],slist[0]);
    };
    
    // 2번 맨뒤 맨앞이동 함수 호출하기!!
    for(let i =0;i<2;i++) chgSeq();

    // 광클금지변수 : 0 - 허용, 1 - 불허용
    let prot = 0;

    // 2. 슬라이드 변경함수 만들기
    // 호출 시 seq에 들어오는 값 중 1은 오른쪽, 0은 왼쪽
    const goSlide = (seq)=>{
        console.log("슬고우",seq);

        // 광클금지 설정하기 /////
        if(prot) return;
        prot = 1; // 잠금
        setTimeout(()=>{
            prot = 0; // 해제
        },400); ////// 0.4초 후 해제 //////

        // 0 현재의 슬라이드 li수집하기
        let clist = slide.querySelectorAll("li");
        // clist -> currnet list 현재 리스트
        console.log(slist);
        // 1 방향에 따른 분기
        // 1-1 오른쪽 버튼 클릭 시
        if(seq){
            // 1 슬라이드 이동 전 먼저 잘라낸다!
            // 이유 : 슬라이드 순서를 왼쪽이동과 동일하게 함
            // 중앙확대 트랜지션 적용 시 동작이 달라지므로

            // (1-1) 바깥에 나가있는 첫번째 슬라이드
            //      li를 잘라서 맨뒤로 보낸다!
            slide.appendChild(clist[0]);
            // (1-2) 동시에 left값을 -110%으로 변경한다!
            slide.style.left = "-110%";
            // (1-3) 트랜지션 없애기
            slide.style.transition = "none";

            // (2) 오른쪽 버튼 클릭 시 다음 슬라이드가 나타나도록 슬라이드 박스의 left값을 -220%로 변경시킨다

            // [코드분리하기] /////////////
            // -> 같은속성변경을 같은 메모리 공간에서 수행하면 변경효과없음!
            setTimeout(()=>{
                slide.style.left = "-220%";
                slide.style.transition = "left .4s ease-in-out";
            },1); ////////// setTimeout ///////////

        }
        // 1-2 왼쪽버튼 클릭 시
        else {
            // (1) 왼쪽버튼 클릭 시 이전 슬라이드가 나타나도록 하기 위해 우선 맨 뒤 li를 맨앞으로 이동한다
            slide.insertBefore(clist[clist.length-1],clist[0]);

            // (2) 동시에 left값을 -330%로 변경한다
            slide.style.left = "-330%";
            // 이때 트랜지션을 없앤다(한번실행 후부터 생기므로)
            slide.style.transition = "none";

            // (3) 그 후 left값을 -220%로 애니메이션하여 슬라이드가 왼쪽에서 들어온다 =
            // 동일 속성인 left가 같은 코딩처리 공간에 동시에 있으므로 이것을 분리해야 효과가 있다
            setTimeout(()=>{
                slide.style.left = "-220%";
                slide.style.transition = "left .4s ease-in-out";
            },1);
        } ////////// else ////////////

        // 2 현재 슬라이드 순번과 같은 블릿표시하기
        // 대상 : .indic li -> indic 변수
        // 2-1 현재 배너리스트 업데이트하기 
        
        clist = slide.querySelectorAll("li");

        // 2-2 방향별 읽어올 슬라이드 순번으로 "data-seq"값 읽어오기
        // 세번째 슬라이드가 주인공이니까 0 1 2 즉 2번을 쓰면됨
        let cseq = clist[2].getAttribute("data-seq");

        // 2-3 블릿초기화
        for(let x of indic) x.classList.remove("on");

        // 2-4 읽어온 슬라이드 순번의 블릿에 클래스 "on"넣기
        indic[cseq].classList.add("on");

    };

    // 3. 이동버튼대상에 이벤트 설정하기
    abtn.forEach((ele,idx)=>{
        ele.onclick = ()=>{
            // 0. 기본이동막기
            event.preventDefault();
            // 1. 인터발지우기 함수 호출!
            clearAuto();
            // 2. 슬라이드 함수 호출
            goSlide(idx);
        }; ///////////click///////////
    });///////////forEach/////////

    // 인터발함수 지우기 위한 변수
    let autoI;
    // 타임아웃함수 지우기 위한 변수
    let autoT;

    ////////////autoSlide///////////
    function autoSlide(){
        console.log("인터발시작");

        autoI = setInterval(()=>{
            goSlide(1);
        },3000);
    };
    autoSlide();

    ///////////clearAuto////////////
    function clearAuto(){
        console.log("인터발멈춰!");

        // 1 인터발 지우기
        clearInterval(autoI);

        // 2 타임아웃도 지우지 않으면 쌓임
        clearTimeout(autoT);

        // 3 잠시 후 다시 작동하도록 타임아웃으로 인터발 함수 호출
        autoT = setTimeout(autoSlide,5000);
    };



} //////////////// loadFn 함수 ///////////////
/////////////////////////////////////////////